const Title = require("../models/titleModel");
const factory = require('./handleFactory');

exports.aliasTopTen = (req, res, next) => {
    req.query.limit = '10';
    req.query.sort = '-rating';
    // req.query.fields = 'name,rating,ratingsAverage,summary,difficulty';
    next();
  };

exports.limitOverview = (req, res, next) => {
  req.query.limit = '4';
  next();
};

// Actions
exports.getAllTitles = factory.getAll(Title);
exports.getTitle = factory.getOne(Title, { path: 'comments' });
exports.createTitle = factory.createOne(Title);
exports.updateTitle = factory.updateOne(Title);
exports.deleteTitle = factory.deleteOne(Title);