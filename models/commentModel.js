const mongoose = require('mongoose');
const Title = require('./titleModel');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Comment cannot be empty!'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    title: {
      type: mongoose.Schema.ObjectId,
      ref: 'Title',
      required: [true, 'Comment must belong to Title'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Comment have belong to User'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Middleware

commentSchema.pre(/^find/, function (next) {
  // console.log('Populating');
  this.populate({
    path: 'user',
    select: 'name photo',
  }).populate({
    path: 'title',
    select: 'name image slug'
  });

  next();
});

// For calculating comments
commentSchema.statics.calcComments = async function (titleId) {
  const stats = await this.aggregate([
    {
      $match: { title: titleId },
    },
    {
      $group: {
        _id: '$title',
        nComments: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Title.findByIdAndUpdate(titleId, {
      commentsQuantity: stats[0].nComments,
    });
  } else {
    await Title.findByIdAndUpdate(titleId, {
      commentsQuantity: 0,
    });
  }
};

commentSchema.post('save', function () {
  // this points to current review
  this.constructor.calcComments(this.title);
});

// findByIdAndUpdate
// findByIdAndDelete
commentSchema.pre(/^findOneAnd/, async function (next) {
  this.c = await this.findOne();
  next();
});

commentSchema.post(/^findOneAnd/, async function () {
  // await this.findOne(); does NOT work here, query has already executed
  await this.c.constructor.calcComments(this.c.title);
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
