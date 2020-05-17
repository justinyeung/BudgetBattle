import React from 'react';

import CurrentUser from '../components/user/CurrentUser';
import FriendForm from '../components/temp/FriendForm';
import PurchaseForm from '../components/purchases/PurchaseForm';
import CompRequests from '../components/competitions/CompRequests';
import FriendRequests from '../components/friends/FriendRequests';
import AcceptCompForm from '../components/temp/AcceptCompForm';

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
