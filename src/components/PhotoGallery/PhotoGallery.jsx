import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

import './PhotoGallery.css';

const PhotoGallery = ({ photos }) => {
  let items = [];

  photos.forEach(photo => {
    let item = {
      src: photo.url,
      altText: '',
      caption: photo.description && photo.description,
      header: 'findyourMatch.com'
    };
    items.push(item);
  });

  return (
    <div className='card'>
      <div className='carousel_wrapper'>
        <UncontrolledCarousel items={items} />
      </div>
    </div>
  );
};

export default PhotoGallery;
