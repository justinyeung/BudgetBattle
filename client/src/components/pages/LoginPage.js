import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import FBLoginBtn from '../auth/FBLoginBtn';
import GGLoginBtn from '../auth/GGLoginBtn';

import { getUser } from '../../actions/userActions';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginPage = ({ getUser, user: { user } }) => {
  useEffect(()=>{
    getUser();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

    return(
        <div>
            {!localStorage.getItem('isLoggedIn') || user === null ? (
                <div className='drawer-container'>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                          <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                          </Avatar>
                          <Typography component="h1" variant="h5">
                            Log in
                          </Typography>
                        </div>
                        <FBLoginBtn />
                        <GGLoginBtn />
                        <Box mt={8}>
                            <Copyright />
                        </Box>
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
