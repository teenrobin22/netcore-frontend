import React from 'react';
import './MemberCard.css';

const MemberCard = ({ user, toDetail }) => {
  return (
    <div className='card mb-4 '>
      <div className='card-img-wrapper'>
        <img
          src={
            user.photoUrl ? user.photoUrl : require('../../../assets/user.png')
          }
          alt={user.knownAs}
          className='card-img-top img-card'
        />
        <ul className='list-inline member-icons animate text-center'>
          <li className='list-inline-item'>
            <button
              className='btn btn-primary btn-icon'
              onClick={() => toDetail(user.id)}
            >
              <i className='fa fa-user' />
            </button>
          </li>
        </ul>
      </div>
      <div className='card-body p-1'>
        <h6 className='card-title text-center mb-1'>
          <i className='fa fa-user' /> {user.knownAs},{user.age}
        </h6>
        <p className='card-text text-muted text-center'>{user.city}</p>
      </div>
    </div>
  );
};

export default MemberCard;
