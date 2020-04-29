import React from 'react';
import './App.css';

import FBLoginBtn from './components/auth/FBLoginBtn';
import GGLoginBtn from './components/auth/GGLoginBtn';
// import UpdateState from './components/temp/UpdateState';
import LogoutBtn from './components/auth/LogoutBtn';
import DeleteUserBtn from './components/temp/DeleteUserBtn';
import FriendForm from './components/temp/FriendForm';
import PurchaseForm from './components/purchases/PurchaseForm';
import DeletePurchaseForm from './components/temp/DeletePurchaseForm';
import CurrentUser from './components/user/CurrentUser';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      {/* <div style={{ padding: '1rem' }}>
        <UpdateState />
      </div> */}
      <div style={{ padding: '1rem' }}>
        <FBLoginBtn />
        <GGLoginBtn />
        <LogoutBtn />
        <DeleteUserBtn />
      </div>
      <div style={{ padding: '1rem' }}>
        <CurrentUser/>
      </div>
      <div style={{ padding: '1rem' }}>
        <FriendForm />
      </div>
      <div style={{ padding: '1rem' }}>
        <PurchaseForm />
      </div>
      <div style={{ padding: '1rem' }}>
        <DeletePurchaseForm />
      </div>
    </Provider>
  );
}

export default App;
