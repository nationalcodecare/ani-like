import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-scroll';

const Pagination = ({ thingsPerPage, totalCount, paginate, target, titleLoading }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCount / thingsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPagination = () => {
    if (totalCount === 0 || titleLoading) return <Fragment></Fragment>;

    return (
      <div data-testid="pagination" className="pagination">
        <div className="pagination__pages">
          {pageNumbers.map((number) => (
            <Link
              onClick={() => paginate(number)}
              to={target}
              key={number}
              className="pagination__small"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              {number}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return renderPagination();
};

Pagination.propTypes = {
  thingsPerPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
};

export default Pagination;
