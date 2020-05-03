import React from 'react';

import LogoutBtn from '../auth/LogoutBtn';

import CurrentUser from '../user/CurrentUser';
import DeleteUserBtn from '../temp/DeleteUserBtn';
import FriendForm from '../temp/FriendForm';

import SetCompetitorForm from '../temp/SetCompetitorForm';
import PurchaseForm from '../purchases/PurchaseForm';
import CurrentPurchases from '../purchases/CurrentPurchases';
import DeletePurchaseForm from '../temp/DeletePurchaseForm';

import CompsForm from '../competitions/CompsForm';
import CurrentComps from '../competitions/CurrentComps';
import AcceptCompForm from '../temp/AcceptCompForm';


const Home = () => {
  return (
    <div>
      <div style={{ padding: '1rem' }}>
        <LogoutBtn />
        <DeleteUserBtn />
      </div>
      <div style={{ padding: '1rem' }}>
        <FriendForm />
      </div>
      <div style={{ padding: '1rem' }}>
        <CurrentUser/>
      </div>
      <div style={{ padding: '1rem' }}>
        <PurchaseForm />
      </div>
      <div style={{ padding: '1rem' }}>
        <DeletePurchaseForm />
      </div>
      <div style={{ padding: '1rem' }}>
        <SetCompetitorForm />
      </div>
      <div style={{ padding: '1rem' }}>
        <CurrentPurchases/>
      </div>
      <div style={{ padding: '1rem' }}>
        <CompsForm/>
      </div>
      <div style={{ padding: '1rem' }}>
        <CurrentComps/>
      </div>
      <div style={{ padding: '1rem' }}>
        <AcceptCompForm/>
      </div>
    </div>
  );
}

export default Home;
