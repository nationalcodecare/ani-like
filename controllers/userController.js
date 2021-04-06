const path = require('path');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handleFactory');
// AWS S3
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-sharp-s3');

// For SINGLE photo upload
// _______________________________________________________________________________
let newImageName;

const s3 = new aws.S3({
  region: 'us-west-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: process.env.BUCKET,
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    Bucket: 'anime-like-bucket/users',
    ACL: 'public-read',
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    Key: function (req, file, cb) {
      const fileName =
        path.basename(file.originalname, path.extname(file.originalname)) +
        '-' +
        Date.now() +
        path.extname(file.originalname);
      cb(null, fileName);
      newImageName = fileName;
    },
    resize: {
      width: 250,
      height: 250,
    },
    max: true,
  }),
  fileFilter: multerFilter,
});

// Update List of titles for User
const updateCurrentTitle = async (req, listName, currentElement) => {
  let updatedUser;
  let data = {};

  // Update user document
  let find = {};
  let found = false;
  find[`${listName}`] = { $elemMatch: { $eq: currentElement } };

  const user = await User.findById(req.user._id);
  if (user[listName].includes(currentElement)) found = true;

  // If title already in collection
  if (found) {
    data[`${listName}`] = currentElement;

    // Check if current Title already exists
    updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: data },
      {
        new: true,
        runValidators: true,
      }
    );
    // If NOT
  } else {
    data[`${listName}`] = [];
    data[`${listName}`].push(currentElement);

    updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: data },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  return updatedUser;
};

// Filters whick fields allowed to updated
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.uploadUserPhoto = upload.single('photo');

// Delete user avatar
exports.deleteAvatarForever = catchAsync(async (req, res, next) => {
  if (req.user.photo === 'default.jpg') return next();
  const params = {
    Bucket: process.env.BUCKET + '/users',
    Key: req.user.photo,
  };

  await s3.createBucket();
  await s3.deleteObject(params, function (err) {
    if (err) console.log(err);
    else console.log('Successfully Deleted!');
  });

  next();
});

// Check if file exist
exports.checkForFile = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  next();
});

exports.setImageFilenameForDataBase = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = newImageName;
  next();
});

// When logged in
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename; // for files

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// Add title in collection
exports.updateMyTitles = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updatePassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    'favourites',
    'currents',
    'completed',
    'planned',
    'onHold',
    'dropped'
  );

  let updatedUser;

  // Get property name
  const bodyKey = Object.keys(filteredBody);

  if (bodyKey[0]) {
    updatedUser = await updateCurrentTitle(
      req,
      bodyKey[0],
      bodyKey.map((el) => filteredBody[el])[0] //  Get value of property from <filteredBody>
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// Actions
exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
// exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
// Auth
exports.auth = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});
