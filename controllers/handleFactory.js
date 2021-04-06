const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// GET All Titles
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET comments on specific title (hack)
    let filter = {};
    if (req.params.titleId && req.params.titleId.match(/^[0-9a-fA-F]{24}$/))
      filter = { title: req.params.titleId };

    // For user comments
    if (req.params.userId) filter = { user: req.params.userId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        doc,
      },
    });
  });

// GET ONE Title
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    // Populate
    let query;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
      query = Model.findById(req.params.id);
    } else {
      return next(new AppError('Cannot find Data with that id', 404));
    }

    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('Cannot find Data with that id', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

//Create Title
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

// Update Title
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('Cannot update title with that id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id || req.user._id);

    if (!doc) {
      return next(new AppError('Cannot delete title with that id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        _id: req.params.id,
      },
    });
  });
