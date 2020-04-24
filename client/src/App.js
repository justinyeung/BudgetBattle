import React from 'react';
import './App.css';

import FBLoginBtn from './components/layout/FBLoginBtn';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <FBLoginBtn />
    </Provider>
  );
}


export default App;
