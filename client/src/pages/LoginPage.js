import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import GGLoginBtn from '../components/auth/GGLoginBtn';
import FBLoginBtn from '../components/auth/FBLoginBtn';

import { getUser, setUserLoading } from '../actions/userActions';

import LockIcon from '@material-ui/icons/Lock';
import { Avatar, CssBaseline, Box, Typography, Container } from '@material-ui/core';

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            Budget Battle
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

const LoginPage = ({
    getUser,
    setUserLoading,
    user: { user, userLoading },
}) => {
    useEffect(() => {
        setUserLoading();
        getUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            {!userLoading && user === null && (
                <Container
                    component="main"
                    maxWidth="xs"
                    className="pages-login"
                >
                    <CssBaseline />
                    <div className="pages-login-heading">
                        <Avatar>
                            <LockIcon />
                        </Avatar>
                        <Typography component="h1" variant="h3">
                            Login
                        </Typography>
                    </div>
                    <Box mt={8}>
                        <FBLoginBtn />
                        <GGLoginBtn />
                    </Box>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </Container>
            )}
            {!userLoading && user !== null && <Redirect to="/" />}
        </div>
    );
};

LoginPage.propTypes = {
    getUser: PropTypes.func.isRequired,
    setUserLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, { getUser, setUserLoading })(LoginPage);
