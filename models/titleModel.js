const mongoose = require('mongoose');
const slugify = require('slugify');

const titleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A title must have a name'],
      trim: true,
    },
    episodes: {
      type: Number,
      required: [true, 'A title must have a series'],
    },
    aired: Number,
    onGoing: {
      day: String,
      time: String,
      emitting: Boolean
    },
    seasons: [Number],
    class: {
      type: String,
      required: [true, 'Title must have a classification'],
    },
    rating: {
      type: Number,
      required: [true, 'Title must have a rating'],
      min: 0,
      max: 10,
      default: 0,
    },
    ratingsQuantity: Number,
    commentsQuantity: Number,
    dub: Boolean,
    description: {
      type: String,
      default: 'No description',
    },
    genre: {
      type: [String],
      required: [true, 'Title must have a genre'],
    },
    author: String,
    license: String,
    image: String,
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
titleSchema.index({ slug: 1 });
titleSchema.index({ rating: -1, aired: -1 });

// Virtual populate
titleSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'title',
  localField: '_id',
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
titleSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Title', titleSchema);
