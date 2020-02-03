import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({
  itemsCount,
  pageSize,
  currentPage,
  totalPages,
  onPageChange
}) => {

  
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, totalPages + 1);

  return (
    <nav>
      <ul className='pagination'>
        <li className='page-item disabled'>
          <button className='page-link'>&laquo;</button>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? 'page-item active' : 'page-item'}
          >
            <button className='page-link' onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
        <li className='page-item disabled'>
          <button className='page-link'>&raquo;</button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
