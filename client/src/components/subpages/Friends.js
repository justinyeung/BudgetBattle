import React from 'react';

import CurrentUser from '../user/CurrentUser';
import FriendForm from '../temp/FriendForm';

const Friends = () => {
  return (
    <div>
      <div style={{ padding: '1rem' }}>
        <FriendForm />
      </div>
      <div style={{ padding: '1rem' }}>
        <CurrentUser/>
      </div>
    </div>
  );
}

export default Friends;
