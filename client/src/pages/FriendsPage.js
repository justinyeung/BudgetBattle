import React from 'react';

import FriendForm from '../components/temp/FriendForm';
import FriendsList from '../components/friends/FriendsList';

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
