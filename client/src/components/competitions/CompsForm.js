import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CloseIcon from '@material-ui/icons/Close';

import {
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Button,
    Grid,
    Box,
    Toolbar,
    Typography,
    Divider,
    Snackbar,
    IconButton,
} from '@material-ui/core';

const CompsForm = ({ sendCompRequest, setCompLoading, user: { user } }) => {
    const [open, setOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const [id, setID] = useState('');
    const [date, setDate] = useState(new Date());

    // snackbar
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    //   Get all accepted friends
    const getAccepted = (friendslist) => {
        return friendslist.filter(
            (friend) =>
                friend.status === 'Accepted' &&
                (friend.user2 === user.userID || friend.user1 === user.userID)
        );
    };

    const requestBtn = () => {
        const numMonth = new Date(date).getMonth();
        const numYear = new Date(date).getFullYear();
        if (id === '') {
            setSnackbarMsg('No Friend Selected');
            handleClick();
        } else {
            setCompLoading();
            sendCompRequest({ id, numMonth, numYear });
            setID('');
            setDate(new Date());
            setSnackbarMsg('Competition Request Sent');
            handleClick();
        }
    };

    const renderSnackbar = (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={snackbarMsg}
            action={
                <React.Fragment>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        />
    );

    return (
        <div>
            <Box boxShadow={1} className="competitions">
                <Typography variant="h6" className="competitions-title">
                    Send Battle Request
                </Typography>
                <Divider />
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item sm={6} xs={8}>
                        <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            className="competitions-calendar"
                        >
                            <DatePicker
                                className="competitions-full-width"
                                variant="inline"
                                inputVariant="outlined"
                                views={['month', 'year']}
                                label="Month and Year"
                                value={date}
                                autoOk="true"
                                onChange={(date) =>
                                    date !== null
                                        ? setDate(new Date(date))
                                        : setDate(new Date())
                                }
                                onKeyPress={(e) => {
                                    e.key === 'Enter' && requestBtn();
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item sm={6} xs={8}>
                        <FormControl
                            variant="outlined"
                            className="competitions-full-width"
                        >
                            <InputLabel>Friend</InputLabel>
                            <Select
                                value={id}
                                onChange={(e) => setID(e.target.value)}
                                onKeyPress={(e) => {
                                    e.key === 'Enter' && requestBtn();
                                }}
                                label="Select Friend"
                            >
                                <MenuItem value="">
                                    <em>-</em>
                                </MenuItem>
                                {user !== null &&
                                    getAccepted(user.friends).map(
                                        (friend) =>
                                            (friend.user2 === user.userID && (
                                                <MenuItem
                                                    value={friend.user1}
                                                    key={friend.user1}
                                                >
                                                    {friend.user1name}
                                                </MenuItem>
                                            )) ||
                                            (friend.user1 === user.userID && (
                                                <MenuItem
                                                    value={friend.user2}
                                                    key={friend.user2}
                                                >
                                                    {friend.user2name}
                                                </MenuItem>
                                            ))
                                    )}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Box
                    display="flex"
                    flexDirection="row-reverse"
                    className="competitions-submit"
                >
                    <Toolbar disableGutters={true}>
                        <Button
                            variant="contained"
                            onClick={() => requestBtn()}
                        >
                            Send Request
                        </Button>
                    </Toolbar>
                </Box>
            </Box>
            {renderSnackbar}
        </div>
    );
};

CompsForm.propTypes = {
    user: PropTypes.object.isRequired,
    sendCompRequest: PropTypes.func.isRequired,
    setCompLoading: PropTypes.func.isRequired,
};

export default CompsForm;
