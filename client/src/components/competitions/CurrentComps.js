import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    rejectOrDeleteComp,
    setCompLoading,
    getAcceptedComps,
} from '../../actions/competitionActions';
import { monthNames } from '../../models/lists';

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
    // root: {
    //     width: '100%',
    // },
    // heading: {
    //     fontWeight: 'fontWeightBold',
    // },
    // primaryHeading: {
    //     color: theme.palette.text.secondary,
    // },
    // secondaryHeading: {
    //     fontSize: theme.typography.pxToRem(15),
    //     color: theme.palette.text.secondary,
    // },
    // winningColour: {
    //     color: 'green',
    // },
    // icon: {
    //     verticalAlign: 'bottom',
    //     height: 20,
    //     width: 20,
    // },
    details: {
        alignItems: 'center',
        paddingTop: '16px',
    },
    detailsAvatar: {
        alignItems: 'center',
        paddingTop: '32px',
    },
    // column: {
    //     flexBasis: '25%',
    // },
    // list: {
    //     width: '100%',
    //     margin: 0,
    // },
}));

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
    rejectOrDeleteComp,
    setCompLoading,
    getAcceptedComps,
    user: { user },
    competition: { accepted, compLoading },
}) => {
    const classes = useStyles();

    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [compID, setCompID] = useState('');

    useEffect(() => {
        setCompLoading();
        getAcceptedComps();

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
                total: comp.user2total.toFixed(2),
            };
        } else {
            return {
                name: comp.user1name,
                total: comp.user1total.toFixed(2),
            };
        }
    };

    const getLeft = (comp) => {
        if (user.userID !== comp.user1) {
            return {
                name: comp.user2name,
                total: comp.user2total.toFixed(2),
            };
        } else {
            return {
                name: comp.user1name,
                total: comp.user1total.toFixed(2),
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
            <DialogTitle style={{ cursor: 'move' }}>Remove Battle</DialogTitle>
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
            <Box boxShadow={1} className="competitions">
                <Typography variant="h6" className="competitions-title">
                    Battles
                </Typography>
                <Divider />
                {!compLoading && (
                    <div className="competitions-full-width">
                        {accepted.length === 0 && (
                            <List className="competitions-list">
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
                                                    className="competitions-description"
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
                                <div key={comp._id}>
                                    <ExpansionPanel
                                        key={comp._id}
                                        className="competitions-expanded-panel"
                                    >
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1c-content"
                                        >
                                            <div className="competitions-left-column">
                                                <Typography
                                                    variant="h6"
                                                    className="competitions-competitor-name"
                                                >
                                                    {getRight(comp).name}
                                                </Typography>
                                            </div>
                                            <div className="competitions-center-column" />
                                            <div className="competitions-right-column">
                                                <Typography
                                                    variant="h5"
                                                    className="competitions-date"
                                                >
                                                    {monthNames[comp.month]}{' '}
                                                    {comp.year}
                                                </Typography>
                                            </div>
                                        </ExpansionPanelSummary>
                                        <Divider />
                                        <ExpansionPanelDetails className="competitions-expanded-panel-avatar">
                                            <div className="competitions-left-column">
                                                <Avatar>
                                                    {getLeft(
                                                        comp
                                                    ).name.substring(0, 1)}
                                                </Avatar>
                                            </div>
                                            <div className="competitions-center-column" />
                                            <div className="competitions-right-column">
                                                <Avatar>
                                                    {getRight(
                                                        comp
                                                    ).name.substring(0, 1)}
                                                </Avatar>
                                            </div>
                                        </ExpansionPanelDetails>
                                        <ExpansionPanelDetails className="competitions-expanded-panel-text">
                                            <div className="competitions-left-column">
                                                <Typography variant="h5">
                                                    {getLeft(comp).name}
                                                </Typography>
                                            </div>
                                            <div className="competitions-center-column" />
                                            <div className="competitions-right-column">
                                                <Typography variant="h5">
                                                    {getRight(comp).name}
                                                </Typography>
                                            </div>
                                        </ExpansionPanelDetails>
                                        <ExpansionPanelDetails className="competitions-expanded-panel-text">
                                            <div className="competitions-left-column">
                                                <Typography variant="h5">
                                                    ${getLeft(comp).total}
                                                </Typography>
                                            </div>
                                            <div className="competitions-center-column">
                                                <h5>Total Spent</h5>
                                            </div>
                                            <div className="competitions-right-column">
                                                <Typography variant="h5">
                                                    ${getRight(comp).total}
                                                </Typography>
                                            </div>
                                        </ExpansionPanelDetails>
                                        <ExpansionPanelActions>
                                            <Button
                                                variant="outlined"
                                                size="large"
                                                color="secondary"
                                                onClick={() =>
                                                    deleteBtn(comp._id)
                                                }
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
                                </div>
                            ))}
                    </div>
                )}
            </Box>
            {renderDialog}
            {renderSnackbar}
        </div>
    );
};

CurrentComps.propTypes = {
    user: PropTypes.object.isRequired,
    competition: PropTypes.object.isRequired,
    rejectOrDeleteComp: PropTypes.func.isRequired,
    setCompLoading: PropTypes.func.isRequired,
    getAcceptedComps: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    competition: state.competition,
    user: state.user,
});

export default connect(mapStateToProps, {
    rejectOrDeleteComp,
    setCompLoading,
    getAcceptedComps,
})(CurrentComps);
