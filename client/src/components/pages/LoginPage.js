import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import FBLoginBtn from '../auth/FBLoginBtn';
import GGLoginBtn from '../auth/GGLoginBtn';

import Container from '@material-ui/core/Container';
import { getUser } from '../../actions/userActions';

const LoginPage = ({ getUser, user: { user } }) => {

  useEffect(()=>{
    getUser();
  }, []);

  return(
    <div>
      {!localStorage.getItem('isLoggedIn') || user === null ? (
        <div className='drawer-container'>
          <Container maxWidth="sm">
            <FBLoginBtn />
            <GGLoginBtn />
          </Container>
        </div>
      ) : (
        <div>
          <Redirect to='/' />
        </div>
      )}
    </div>
  )
}

LoginPage.propTypes = {
  getUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { getUser })(LoginPage);
