import React from 'react';
import GenericInput from './../../../components/UI/GenericInput';

const EditProfile = ({ user, submit, handleChange }) => {
  return (
    <form onSubmit={submit}>
      <h4>Description</h4>
      <textarea
        name='introduction'
        id=''
        rows='6'
        className='form-control'
        value={user.introduction}
        onChange={handleChange}
      />
      <h4>Looking For</h4>
      <textarea
        name='lookingFor'
        id=''
        rows='6'
        className='form-control'
        value={user.lookingFor}
        onChange={handleChange}
      />
      <h4>Interest</h4>
      <textarea
        name='interests'
        id=''
        rows='6'
        className='form-control'
        value={user.interests}
        onChange={handleChange}
      />
      <h4>Location Details:</h4>
      <div className='form-inline'>
        <label htmlFor='city' style={{ margin: '0 3px 0 0' }}>
          City:
        </label>
        <GenericInput
          type='text'
          classes='form-control'
          name='city'
          value={user.city}
          onChange={handleChange}
        />
        <label htmlFor='country' style={{ margin: '0 3px 0 8px' }}>
          Country:
        </label>
        <GenericInput
          type='text'
          classes='form-control'
          name='country'
          value={user.country}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default EditProfile;
