import React from 'react';
import classnames from 'classnames';

import Button from '../../../components/UI/Button';
import './MemberPhoto.css';

const MemberPhoto = ({ photo, setMainPhoto, deletePhoto }) => {
  return (
    <div className='col-sm-2 img-wrapper'>
      <img
        src={photo.url}
        className='memberPhoto p-1'
        alt={photo.description}
      />

      <div className='text-center'>
        <button
          type='button'
          className={classnames({
            'btn btn-sm': true,
            'btn-success active': photo.isMain,
            'btn-outline-primary': !photo.isMain
          })}
          onClick={() => setMainPhoto(photo)}
          disabled={photo.isMain}
        >
          Main
        </button>
        <Button
          type='button'
          bsClasses='btn btn-sm btn-danger'
          clicked={() => deletePhoto(photo.id)}
          disabled={photo.isMain}
        >
          <i className='fa fa-trash-o' />
        </Button>
      </div>
    </div>
  );
};

export default MemberPhoto;
