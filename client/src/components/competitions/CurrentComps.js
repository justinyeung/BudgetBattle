import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    getAcceptedComp,
    rejectOrDeleteComp,
    setCompLoading,
} from '../../actions/competitionActions';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontWeight: 'fontWeightBold',
    },
    primaryHeading: {
        color: theme.palette.text.secondary,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    winningColour: {
        color: 'green',
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
        paddingTop: '16px',
    },
    detailsAvatar: {
        alignItems: 'center',
        paddingTop: '32px',
    },
    column: {
        flexBasis: '25%',
    },
    list: {
        width: '100%',
        margin: 0,
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

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

const CurrentComps = ({
    getAcceptedComp,
    rejectOrDeleteComp,
    setCompLoading,
    user: { user },
    competition: { accepted },
}) => {
    const classes = useStyles();

    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [compID, setCompID] = useState('');

    useEffect(() => {
        setCompLoading();
        getAcceptedComp();

        // eslint-disable-next-line
    }, []);

    // snackbar
    const handleClickSnackbar = () => {
        setOpen(true);
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const getRight = (comp) => {
        if (user.userID === comp.user1) {
            return {
                name: comp.user2name,
                total: comp.user2total,
            };
        } else {
            return {
                name: comp.user1name,
                total: comp.user1total,
            };
        }
    };

    const getLeft = (comp) => {
        if (user.userID !== comp.user1) {
            return {
                name: comp.user2name,
                total: comp.user2total,
            };
        } else {
            return {
                name: comp.user1name,
                total: comp.user1total,
            };
        }
    };

    //   dialog open and close
    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    //   button that removes a competition
    const deleteBtn = (id) => {
        setCompID(id);
        handleClickOpenDialog();
    };
    const confirmDeleteBtn = () => {
        setCompLoading();
        rejectOrDeleteComp({ compID });
        handleCloseDialog();
        handleClickSnackbar();
    };

    const renderSnackbar = (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            message="Competition Removed"
            action={
                <React.Fragment>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleCloseSnackbar}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        />
    );

    const renderDialog = (
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Remove Battle
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to remove this battle?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCloseDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={confirmDeleteBtn} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <div>
            <Box boxShadow={1} className="container-spacing component-box">
                <Typography variant="h6" id="header-title">
                    Battles
                </Typography>
                <Divider />
                <div className={classes.root}>
                    {accepted.length === 0 && (
                        <List className={classes.list}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar>{':('}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={'No Battles to show.'}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                Invite Friends to start
                                                Battling!
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </List>
                    )}
                    {accepted !== [] &&
                        accepted.map((comp) => (
                            <ExpansionPanel key={comp._id} id="expansion-panel">
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1c-content"
                                    id="panel1c-header"
                                >
                                    <div
                                        id="competitions-left-column"
                                        className={classes.column}
                                    >
                                        <Typography
                                            className={classes.primaryHeading}
                                            variant="h6"
                                        >
                                            {getRight(comp).name}
                                        </Typography>
                                    </div>
                                    <div
                                        id="competitions-center-column"
                                        className={classes.column}
                                    />
                                    <div
                                        id="competitions-right-column"
                                        className={classes.column}
                                    >
                                        <Typography
                                            variant="h5"
                                            className={classes.secondaryHeading}
                                        >
                                            {monthNames[comp.month - 1]}{' '}
                                            {comp.year}
                                        </Typography>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails
                                    className={classes.detailsAvatar}
                                >
                                    <div
                                        id="competitions-left-column"
                                        className={classes.column}
                                    >
                                        <Avatar>
                                            {getLeft(comp).name.substring(0, 1)}
                                        </Avatar>
                                    </div>
                                    <div
                                        id="competitions-center-column"
                                        className={classes.column}
                                    />
                                    <div
                                        id="competitions-right-column"
                                        className={classes.column}
                                    >
                                        <Avatar>
                                            {getRight(comp).name.substring(
                                                0,
                                                1
                                            )}
                                        </Avatar>
                                    </div>
                                </ExpansionPanelDetails>
                                <ExpansionPanelDetails
                                    className={classes.details}
                                >
                                    <div
                                        id="competitions-left-column"
                                        className={classes.column}
                                    >
                                        <Typography variant="h5">
                                            {getLeft(comp).name}
                                        </Typography>
                                    </div>
                                    <div
                                        id="competitions-center-column"
                                        className={classes.column}
                                    />
                                    <div
                                        id="competitions-right-column"
                                        className={classes.column}
                                    >
                                        <Typography variant="h5">
                                            {getRight(comp).name}
                                        </Typography>
                                    </div>
                                </ExpansionPanelDetails>
                                <ExpansionPanelDetails
                                    className={classes.details}
                                >
                                    <div
                                        id="competitions-left-column"
                                        className={classes.column}
                                    >
                                        <Typography variant="h5">
                                            ${getLeft(comp).total}
                                        </Typography>
                                    </div>
                                    <div
                                        id="competitions-center-column"
                                        className={classes.column}
                                    >
                                        <h5>Total Spent</h5>
                                    </div>
                                    <div
                                        id="competitions-right-column"
                                        className={classes.column}
                                    >
                                        <Typography variant="h5">
                                            ${getRight(comp).total}
                                        </Typography>
                                    </div>
                                </ExpansionPanelDetails>
                                <ExpansionPanelDetails
                                    className={classes.details}
                                >
                                    <div
                                        id="competitions-left-column"
                                        className={classes.column}
                                    >
                                        <Typography variant="h5">
                                            {getLeft(comp).total -
                                                getRight(comp).total}
                                        </Typography>
                                    </div>
                                    <div
                                        id="competitions-center-column"
                                        className={classes.column}
                                    >
                                        <h5>Difference</h5>
                                    </div>
                                    <div
                                        id="competitions-right-column"
                                        className={classes.column}
                                    >
                                        <Typography variant="h5">
                                            {getRight(comp).total -
                                                getLeft(comp).total}
                                        </Typography>
                                    </div>
                                </ExpansionPanelDetails>
                                <ExpansionPanelActions>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        color="secondary"
                                        onClick={() => deleteBtn(comp._id)}
                                    >
                                        Remove
                                    </Button>
                                    <Link to={`/battles/${comp._id}`}>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            color="primary"
                                        >
                                            View More
                                        </Button>
                                    </Link>
                                </ExpansionPanelActions>
                                <Divider />
                            </ExpansionPanel>
                        ))}
                </div>
            </Box>
            {renderDialog}
            {renderSnackbar}
        </div>
    );
};

CurrentComps.propTypes = {
    getAcceptedComp: PropTypes.func.isRequired,
    rejectOrDeleteComp: PropTypes.func.isRequired,
    setCompLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    competition: state.competition,
    user: state.user,
});

export default connect(mapStateToProps, {
    getAcceptedComp,
    rejectOrDeleteComp,
    setCompLoading,
})(CurrentComps);
