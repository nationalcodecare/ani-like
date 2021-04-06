const crypto = require('crypto');
const { promisify } = require('util'); //  For -> jwt.verify
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const Email = require('../utils/email');
// Random Password generation
const passwordGenerate = require('../utils/passwordGenerate');

// Creates JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// Creates and sends JWT token to client
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  // Send token via Cookie
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    SameSite: 'None',
  });

  // Remove password from output
  user.password = undefined;

  //  4) Send token to Client
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  //  1) get data from req (in this case from form)
  const { name, email, password, confirmPassword } = req.body;

  // Check if user already exists
  const user = await User.findOne({ email });
  if (user) {
    return next(new AppError('User with current email already exists', 400));
  }

  //  2) Create new User
  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
  });

  //  3) Create token and send for new User
  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //  1) Check if email & password exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2) Check if user exists & password/email are correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to Client
  createSendToken(user, 200, req, res);
});

// Logout
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    token = req.header('x-auth-token');
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in', 401));
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); // Contain user id

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id); // No need to check id, cuz step 2) did all for us
  if (!currentUser) {
    return next(
      new AppError('User with current token does no longer exsist!', 401)
    );
  }
  // 4) Check if user changed password after the token was issued
  if (currentUser.checkPasswordChanged(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please Log in again.', 401)
    );
  }

  // Gtant access to protected route
  res.locals.user = currentUser;
  req.user = currentUser;
  next();
});

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.checkPasswordChanged(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

// Grant permissions to do smth for specific roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to do that!', 403));
    }

    next();
  };
};

// Forgot password
exports.forgotPassword = async (req, res, next) => {
  // 1) Get user based on email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('There is no user with that email', 403));
  }

  // 2) Generate random reset token for that user
  const resetToken = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send email to user with reset Token

  try {
    let resetURL;
    if (process.env.NODE_ENV === 'production') {
      resetURL = `https://ani-like.herokuapp.com/restorePassword/${resetToken}`;
    } else {
      resetURL = `${req.protocol}://127.0.0.1:3000/restorePassword/${resetToken}`;
    }
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
      resetToken,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    return next(new AppError('Cannot send email! Try again later.', 500));
  }
};
//  Reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedPassword = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedPassword,
    passwordResetExpires: { $gt: Date.now() },
  });
  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // 3) Update changedPasswordAt property for the user

  // 4) Log the user in, send JWT
  createSendToken(user, 200, req, res);
});

// Update password when logged in
exports.updatePassword = catchAsync(async (req, res, next) => {
  // // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, req, res);
});

exports.googleSignIn = catchAsync(async (req, res, next) => {
  //  1) get data from req
  const { name, email } = req.body;

  // Check if user already exists
  const user = await User.findOne({ email });
  if (user) {
    return createSendToken(user, 201, req, res);
  }

  // Passwsord generation + email url
  let url;
  if (process.env.NODE_ENV === 'production') {
    url = `https://ani-like.herokuapp.com/me`;
  } else {
    url = `${req.protocol}://localhost:3000/me/`;
  }

  const password = passwordGenerate();

  //  2) Create new User
  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword: password,
  });

  // Send password via email
  await new Email(newUser, url, password).sendPassword();

  //  3) Create token and send for new User
  createSendToken(newUser, 201, req, res);
});
