import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import FBLoginBtn from '../auth/FBLoginBtn';
import GGLoginBtn from '../auth/GGLoginBtn';

import { getUser } from '../../actions/userActions';

const Login = ({ user: { user }, getUser }) => {
  
  useEffect(() => {
    getUser();
    
    
  }, [getUser]);

  return(
    <div>
      {user !== null ? (
        <div>
          <Redirect to='/' />
        </div>
      ) : (
        <div>
          <FBLoginBtn />
          <GGLoginBtn />
        </div>
      )}
    </div>
  )
}

Login.propTypes = {
  getUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user
});


export default connect(mapStateToProps, { getUser })(Login);
