import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUser, deleteFriend } from "../../actions/userActions";

import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";

import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

const moment = require("moment");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    margin: 0,
  },
  inline: {
    display: "inline",
  },
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

const FriendsList = ({ getUser, deleteFriend, user: { user } }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentID, setCurrentID] = useState("");
  const [currentName, setCurrentName] = useState("");

  const classes = useStyles();

  //   snackbar open and close
  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  //   dialog open and close
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  //   button that removes a friend
  const removeButton = (friendID, friendName) => {
    // deleteFriend({ friendID });
    setCurrentID(friendID);
    setCurrentName(friendName);
    handleClickOpenDialog();
  };

  //   button to confirm delete in dialog
  const confirmDelete = () => {
    // console.log(currentID);
    deleteFriend({ friendID: currentID });
    handleCloseDialog();
    handleClickSnackbar();
  };

  //   Get all accepted friends
  const getAccepted = (friendslist) => {
    return friendslist.filter(
      (friend) =>
        friend.status === "Accepted" &&
        (friend.user2 === user.userID || friend.user1 === user.userID)
    );
  };

  useEffect(() => {
    getUser();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Box boxShadow={1} className="container-spacing">
        <Typography variant="h6" id="header-title">
          Friends
        </Typography>
        <Divider />
        <List className={classes.root}>
          {(user === null ||
            getAccepted(user.friends).length === 0 ||
            getAccepted(user.friends) === undefined) && (
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{":("}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={"No Friends to show."}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Add Friends to start Budget Battling!
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          )}
          {user !== null && (
            <div>
              {getAccepted(user.friends).map(
                (friend) =>
                  (friend.user2 === user.userID && (
                    <div>
                      <ListItem alignItems="flex-start" key={friend._id}>
                        <ListItemAvatar>
                          <Avatar>
                            {friend.user1name &&
                              friend.user1name.substring(0, 1)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={friend.user1name}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                              >
                                Since{" "}
                                {moment(new Date(friend.date)).format(
                                  "MMM DD YYYY"
                                )}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => removeButton(friend.user1)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </div>
                  )) ||
                  (friend.user1 === user.userID && (
                    <ListItem alignItems="flex-start" key={friend._id}>
                      <ListItemAvatar>
                        <Avatar>
                          {friend.user2name && friend.user2name.substring(0, 1)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={friend.user2name}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              Since{" "}
                              {moment(new Date(friend.date)).format(
                                "MMM DD YYYY"
                              )}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() =>
                            removeButton(friend.user2, friend.user2name)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
              )}
            </div>
          )}
        </List>
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Remove Friend
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove {currentName} as a friend?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={"Friend Removed"}
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
    </div>
  );
};

FriendsList.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  deleteFriend: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUser, deleteFriend })(FriendsList);
