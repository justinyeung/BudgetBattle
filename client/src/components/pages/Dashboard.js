import React from 'react';

import CurrentUser from '../user/CurrentUser';
import FriendForm from '../temp/FriendForm';
import PurchaseForm from '../purchases/PurchaseForm';
import CompRequests from '../competitions/CompRequests';
import FriendRequests from '../friends/FriendRequests';
import AcceptCompForm from '../temp/AcceptCompForm';

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
      <div style={{ padding: '1rem' }}>
        <FriendRequests/>
      </div>
      <div style={{ padding: '1rem' }}>
        <AcceptCompForm/>
      </div>
      <div style={{ padding: '1rem' }}>
        <CompRequests/>
      </div>
    </div>
  );
}

export default Dashboard;
