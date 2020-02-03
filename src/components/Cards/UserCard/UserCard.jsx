import React from 'react';
import './UserCard.css';
import TimeAgo from 'react-timeago';

const UserCard = ({ user, save, type }) => {
  let btnGroup = null;
  if (type === 'save') {
    btnGroup = (
      <button className='btn btn-success btn-block' onClick={save}>
        Save Changes <i className='fa fa-user-plus' aria-hidden='true' />
      </button>
    );
  }

  let userCreated = new Date(user.created);
  userCreated = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }).format(userCreated);

  return (
    <div className='card'>
      <img
        className='img-thumbnail'
        src={
          user.photoUrl ? user.photoUrl : require('../../../assets/user.png')
        }
        alt={user.knownAs}
      />
      <div className='card-body'>
        <div>
          <strong>Location:</strong>
          <p>
            {user.city}, {user.country}
          </p>
        </div>
        <div>
          <strong>Age:</strong>
          <p>{user.age}</p>
        </div>
        <div>
          <strong>Last Active:</strong>
          <p>
            <TimeAgo date={user.lastActive} live={false} />
          </p>
        </div>
        <div>
          <strong>Member since:</strong>
          <p>{userCreated}</p>
        </div>
      </div>
      <div className='card-footer'>{btnGroup}</div>
    </div>
  );
};

export default UserCard;
