import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getUser } from '../actions/userActions';
import LoginPage from './LoginPage';

const GetStartedPage = ({ getUser, user: { user } }) => {
    useEffect(() => {
        getUser();

        // eslint-disable-next-line
    }, []);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const renderLoginDialog = (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="alert-dialog-title">
                    {user
                        ? 'You are already Logged in'
                        : 'Log in to Get Started'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {user
                            ? 'Thank you for creating an account with us!'
                            : 'In order to use our features and services, you must create an account.'}
                    </DialogContentText>
                </DialogContent>
                {!user && <LoginPage />}
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

    return (
        <div>
            <Container maxWidth="lg" className="container-spacing">
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                >
                    <Grid item xs={12} className="grid-spacing">
                        <Box
                            boxShadow={1}
                            className="container-spacing component-box"
                        >
                            <Typography variant="h6" id="header-title">
                                Sign in using Facebook or Google
                            </Typography>
                            <Divider />
                            <Container className="container-spacing">
                                <p>Create an account with us to get started!</p>
                                <Button
                                    onClick={handleClickOpen}
                                    variant="contained"
                                >
                                    Go to Sign In
                                </Button>
                            </Container>
                        </Box>
                    </Grid>
                    <Grid item xs={12} className="grid-spacing">
                        <Box
                            boxShadow={1}
                            className="container-spacing component-box"
                        >
                            <Typography variant="h6" id="header-title">
                                Log and keep track of your purchases
                            </Typography>
                            <Divider />
                            <Container className="container-spacing">
                                <p>
                                    Input all your purchases to keep track of
                                    what you bought, where you bought it, when
                                    you bought it and how much you spent.
                                </p>
                                <p>
                                    Easily keep track of your purchases and sort
                                    by Date, Location, Category and Amount.
                                </p>
                                {user ? (
                                    <Link to="/purchases">
                                        <Button variant="contained">
                                            Go to Purchases
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button
                                        onClick={handleClickOpen}
                                        variant="contained"
                                    >
                                        Go to Purchases
                                    </Button>
                                )}
                            </Container>
                        </Box>
                    </Grid>
                    <Grid item xs={12} className="grid-spacing">
                        <Box
                            boxShadow={1}
                            className="container-spacing component-box"
                        >
                            <Typography variant="h6" id="header-title">
                                Connect with your Friends
                            </Typography>
                            <Divider />
                            <Container className="container-spacing">
                                <p>
                                    Add Friends on Budget Battle to meet your
                                    budgeting goals together!
                                </p>
                                <p>
                                    Easily search for your friends and send them
                                    a friend request. If they find you first,
                                    accept their request!
                                </p>
                                {user ? (
                                    <Link to="/friends">
                                        <Button variant="contained">
                                            Go to Friends
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button
                                        onClick={handleClickOpen}
                                        variant="contained"
                                    >
                                        Go to Friends
                                    </Button>
                                )}
                            </Container>
                        </Box>
                    </Grid>
                    <Grid item xs={12} className="grid-spacing">
                        <Box
                            boxShadow={1}
                            className="container-spacing component-box"
                        >
                            <Typography variant="h6" id="header-title">
                                Compete with your friends in Monthly Battles
                            </Typography>
                            <Divider />
                            <Container className="container-spacing">
                                <p>
                                    Compete with your friends to see who can
                                    stay on budget.
                                </p>
                                <p>
                                    Compare your purchases and see who can meet
                                    their goal by the end of the month.
                                </p>
                                {user ? (
                                    <Link to="/battles">
                                        <Button variant="contained">
                                            Go to Battles
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button
                                        onClick={handleClickOpen}
                                        variant="contained"
                                    >
                                        Go to Battles
                                    </Button>
                                )}
                            </Container>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            {renderLoginDialog}
        </div>
    );
};

GetStartedPage.propTypes = {
    getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, { getUser })(GetStartedPage);
