import React from 'react';
import './App.css';

import FBLoginBtn from './components/layout/FBLoginBtn';
import GGLoginBtn from './components/layout/GGLoginBtn';
import GetUserBtn from './components/temp/GetUserBtn';
import LogoutBtn from './components/layout/LogoutBtn';
import DeleteUserBtn from './components/temp/DeleteUserBtn';
import AddFriendForm from './components/temp/AddFriendForm';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <FBLoginBtn />
      <GGLoginBtn />
      <GetUserBtn />
      <LogoutBtn />
      <DeleteUserBtn />
      <AddFriendForm />
    </Provider>
  );
}

export default App;
