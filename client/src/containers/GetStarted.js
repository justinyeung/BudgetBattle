import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import LoginPage from './Login';

import {
    Container,
    Box,
    Grid,
    Typography,
    Divider,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';

const GetStartedPage = ({ user: { user } }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleClickOpen = () => {
        console.log('login dialog');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const renderLoginDialog = (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {user
                        ? 'You are already Logged in'
                        : 'Log in to Get Started'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
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
            <Container maxWidth="lg" className="pages">
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    className="pages-get-started"
                >
                    <Grid item xs={12} className="pages-sections">
                        <Box boxShadow={1}>
                            <Typography variant="h6">
                                Sign in using Facebook or Google
                            </Typography>
                            <Divider />
                            <Container>
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
                    <Grid item xs={12} className="pages-sections">
                        <Box boxShadow={1}>
                            <Typography variant="h6">
                                Log and keep track of your purchases
                            </Typography>
                            <Divider />
                            <Container>
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
                    <Grid item xs={12} className="pages-sections">
                        <Box boxShadow={1}>
                            <Typography variant="h6">
                                Connect with your Friends
                            </Typography>
                            <Divider />
                            <Container>
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
                    <Grid item xs={12} className="pages-sections">
                        <Box boxShadow={1}>
                            <Typography variant="h6">
                                Compete with your friends in Monthly Battles
                            </Typography>
                            <Divider />
                            <Container>
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
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(GetStartedPage);
