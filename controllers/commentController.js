const Comment = require('../models/commentModel');
const factory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');

exports.setTitleUserIds = (req, res, next) => {
  if (!req.body.title) req.body.title = req.params.titleId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

// Routes
exports.getAllComments = factory.getAll(Comment);
exports.getComment = factory.getOne(Comment);
exports.createComment = factory.createOne(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);

// Delete all comments for specific User
exports.deleteUserComments = catchAsync (async (req, res, next) => {
  const comments = await Comment.deleteMany({ user: req.params.id });
  
  if (!comments) {
    return next(new AppError('Cannot delete User comments! Check user id -_-', 404));
  }

 next();
});