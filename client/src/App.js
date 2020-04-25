import React from 'react';
import './App.css';

import FBLoginBtn from './components/auth/FBLoginBtn';
import GGLoginBtn from './components/auth/GGLoginBtn';
import GetUserBtn from './components/temp/GetUserBtn';
import LogoutBtn from './components/auth/LogoutBtn';
import DeleteUserBtn from './components/temp/DeleteUserBtn';
import AddFriendForm from './components/temp/AddFriendForm';
import PurchaseForm from './components/purchases/PurchaseForm';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div style={{ padding: '1rem' }}>
        <FBLoginBtn />
        <GGLoginBtn />
        <GetUserBtn />
        <LogoutBtn />
      </div>
      <div style={{ padding: '1rem' }}>
        <DeleteUserBtn />
      </div>
      <div style={{ padding: '1rem' }}>
        <AddFriendForm />
      </div>
      <div style={{ padding: '1rem' }}>
        <PurchaseForm />
      </div>
    </Provider>
  );
}

export default App;
