import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    acceptComp,
    rejectOrDeleteComp,
    getInPendingComp,
    setCompLoading,
} from '../../actions/competitionActions';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: 0,
    },
    inline: {
        display: 'inline',
    },
}));

const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const CompRequests = ({
    acceptComp,
    rejectOrDeleteComp,
    getInPendingComp,
    setCompLoading,
    competition: { inpending },
}) => {
    useEffect(() => {
        setCompLoading();
        getInPendingComp();

        // eslint-disable-next-line
    }, []);

    const classes = useStyles();

    const [snacbarMsg, setSnackbarMsg] = useState('');
    const [open, setOpen] = useState(false);

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

    // buttons
    const acceptBtn = (compID) => {
        setCompLoading();
        acceptComp({ compID });
        setSnackbarMsg('Competition Request Accepted');
        handleClick();
    };
    const rejectBtn = (compID) => {
        setCompLoading();
        rejectOrDeleteComp({ compID });
        setSnackbarMsg('Rejected Competition Request');
        handleClick();
    };

    const renderSnackbar = (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={snacbarMsg}
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
            <Box boxShadow={1} className="container-spacing component-box">
                <Typography variant="h6" id="header-title">
                    Battle Requests
                </Typography>
                <Divider />
                <List className={classes.root}>
                    {(inpending.length === 0 || inpending === null) && (
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar>{':('}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={'No Competitions to show.'}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            Invite Friends to start Budget
                                            Battling!
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    )}
                    {inpending !== [] &&
                        inpending.map((comp) => (
                            <ListItem alignItems="flex-start" id={comp._id}>
                                <ListItemAvatar>
                                    <Avatar>
                                        {comp.user1name &&
                                            comp.user1name.substring(0, 1)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={comp.user1name}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                {monthNames[comp.month]}{' '}
                                                {comp.year}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => acceptBtn(comp._id)}
                                    >
                                        <CheckIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => rejectBtn(comp._id)}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                </List>
            </Box>
            {renderSnackbar}
        </div>
    );
};

CompRequests.propTypes = {
    competition: PropTypes.object.isRequired,
    getInPendingComp: PropTypes.func.isRequired,
    acceptComp: PropTypes.func.isRequired,
    rejectOrDeleteComp: PropTypes.func.isRequired,
    setCompLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    competition: state.competition,
});

export default connect(mapStateToProps, {
    getInPendingComp,
    acceptComp,
    rejectOrDeleteComp,
    setCompLoading,
})(CompRequests);
