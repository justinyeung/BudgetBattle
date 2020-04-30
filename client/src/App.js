import React from 'react';
import './App.css';

import FBLoginBtn from './components/auth/FBLoginBtn';
import GGLoginBtn from './components/auth/GGLoginBtn';
import LogoutBtn from './components/auth/LogoutBtn';

import CurrentUser from './components/user/CurrentUser';

import DeleteUserBtn from './components/temp/DeleteUserBtn';
import FriendForm from './components/temp/FriendForm';

import DeletePurchaseForm from './components/temp/DeletePurchaseForm';

import PurchaseForm from './components/purchases/PurchaseForm';
import CurrentPurchases from './components/purchases/CurrentPurchases';

import CompsForm from './components/competitions/CompsForm';
import CurrentComps from './components/competitions/CurrentComps';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div style={{ padding: '1rem' }}>
        <FBLoginBtn />
        <GGLoginBtn />
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
        <CurrentPurchases/>
      </div>
      <div style={{ padding: '1rem' }}>
        <CompsForm/>
      </div>
      <div style={{ padding: '1rem' }}>
        <CurrentComps/>
      </div>
    </Provider>
  );
}

export default App;
