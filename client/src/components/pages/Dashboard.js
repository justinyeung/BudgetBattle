import React from 'react';

import CurrentUser from '../user/CurrentUser';
import FriendForm from '../temp/FriendForm';
import PurchaseForm from '../purchases/PurchaseForm';

const Dashboard = () => {

  return (
    <div>
      <div style={{ padding: '1rem' }}>
        <PurchaseForm/>
      </div>
      <div style={{ padding: '1rem' }}>
        <FriendForm />
      </div>
      <div style={{ padding: '1rem' }}>
        <CurrentUser/>
      </div>
      
    </div>
  );
}

export default Dashboard;
