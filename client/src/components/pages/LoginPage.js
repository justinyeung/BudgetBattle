import React from 'react';

import { Redirect } from 'react-router-dom';

import FBLoginBtn from '../auth/FBLoginBtn';
import GGLoginBtn from '../auth/GGLoginBtn';

import Container from '@material-ui/core/Container';

const Login = () => {

  return(
    <div>
      {localStorage.getItem('isLoggedIn') ? (
        <div>
          <Redirect to='/' />
        </div>
      ) : (
        <div className='drawer-container'>
          <Container maxWidth="sm">
            <FBLoginBtn />
            <GGLoginBtn />
          </Container>
        </div>
      )}
    </div>
  )
}

export default Login;
