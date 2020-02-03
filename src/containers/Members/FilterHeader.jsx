import React from 'react';

const FilterHeader = ({
  userParams,
  applyFilters,
  resetFilters,
  onChange,
  genderList,
  orderByList
}) => {
  return (
    <form className='form-inline'>
      <div className='form-group'>
        <label htmlFor='minAge'>Age From</label>
        <input
          type='number'
          className='form-control ml-1'
          style={{ width: '70px' }}
          id='minAge'
          name='minAge'
          value={userParams.minAge}
          onChange={onChange}
        />
      </div>

      <div className='form-group px-2'>
        <label htmlFor='maxAge'>Age To</label>
        <input
          type='number'
          className='form-control ml-1'
          style={{ width: '70px' }}
          id='maxAge'
          name='maxAge'
          value={userParams.maxAge}
          onChange={onChange}
        />
      </div>

      <div className='form-group px-2'>
        <label htmlFor='gender'>Show: </label>
        <select
          className='form-control ml-1'
          style={{ width: '130px' }}
          id='gender'
          name='gender'
          value={userParams.gender}
          onChange={onChange}
        >
          {genderList.map(gender => (
            <option key={gender.value} value={gender.value}>
              {gender.display}
            </option>
          ))}
        </select>
      </div>
      <div className='form-group px-2'>
        <label htmlFor='gender'>Find by: </label>
        <select
          className='form-control ml-1'
          style={{ width: '130px' }}
          id='orderBy'
          name='orderBy'
          onChange={onChange}
        >
          {orderByList.map(order => (
            <option key={order.value} value={order.value}>
              {order.display}
            </option>
          ))}
        </select>
      </div>
      <button
        type='button'
        className='btn btn-primary'
        style={{ marginLeft: '10px' }}
        onClick={applyFilters}
      >
        Apply Filters
      </button>
      <button
        type='button'
        className='btn btn-info'
        onClick={resetFilters}
        style={{ marginLeft: '10px' }}
      >
        Reset Filter
      </button>
    </form>
  );
};

export default FilterHeader;
