class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.results = {};
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);

    // For Search by name
    if (queryObj.hasOwnProperty('name')) {
      const name = queryObj.name;
      this.query = this.query.find({
        name: {
          $regex: new RegExp('^' + '.*' + name.toLowerCase() + '.*' + '$', 'i'),
        },
      });
    } else {
      queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
      this.query = this.query.find(JSON.parse(queryStr));
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    let page = this.queryString.page * 1 || 1;
    if (page <= 0) page = 1;
    
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    const end = limit * page;

    // Prev & next pages
    if (end < this.limit)  this.results.next = page + 1;
    if (end < this.query.exec())  this.results.next = page + 1;
    if (skip > 0) this.results.previous = page - 1;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  getResults() {
    return this.results;
  }
}
module.exports = APIFeatures;
