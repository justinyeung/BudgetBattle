import React from 'react';
import './App.css';

import FBLoginBtn from './components/layout/FBLoginBtn';
import GGLoginBtn from './components/layout/GGLoginBtn';
import GetUserBtn from './components/layout/GetUserBtn';
import LogoutBtn from './components/layout/LogoutBtn';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <FBLoginBtn />
      <GGLoginBtn />
      <GetUserBtn />
      <LogoutBtn />
    </Provider>
  );
}

export default App;
