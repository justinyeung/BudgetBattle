import React from 'react';

import CurrentUser from '../user/CurrentUser';
import FriendForm from '../temp/FriendForm';
import FriendsList from '../friends/FriendsList';

const FriendsPage = () => {
  return (
    <div>
      <div style={{ padding: '1rem' }}>
        <FriendForm />
      </div>
      <div style={{ padding: '1rem' }}>
        <FriendsList/>
      </div>
    </div>
  );
}

export default FriendsPage;
