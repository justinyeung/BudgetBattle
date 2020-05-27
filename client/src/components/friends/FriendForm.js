import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendFriendRequest } from "../../actions/userActions";
import { searchUsers } from "../../actions/searchActions";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  list: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    margin: 0,
  },
}));

const FriendForm = ({
  sendFriendRequest,
  searchUsers,
  user: { user },
  search: { users },
}) => {
  const classes = useStyles();

  const [friendSearch, setFriendSearch] = useState("");

  const searchBtn = () => {
    searchUsers({ friendSearch });
    setFriendSearch("");
    // sendFriendRequest({ friendSearch });
  };

  const addFriendBtn = (friendID) => {
    sendFriendRequest({ friendID });
  };

  return (
    <Container maxWidth="md" className="container-spacing">
      <Box boxShadow={1} className="container-spacing">
        <Typography variant="h6" id="header-title">
          Add Friend
        </Typography>
        <Divider />
        <div id="purchases-form-grid">
          <Paper component="div" className={classes.root}>
            <InputBase
              className={classes.input}
              value={friendSearch}
              onChange={(e) => setFriendSearch(e.target.value)}
              onKeyPress={(e) => {
                e.key === "Enter" && searchBtn();
              }}
              placeholder="Search Users by Name or ID"
              inputProps={{ "aria-label": "search users" }}
            />
            <IconButton
              type="button"
              onClick={() => searchBtn()}
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={5}
          className="send-comp-request"
        >
          {users.length > 0 &&
            users.map(
              (searchUser) =>
                user.userID !== searchUser.userID && (
                  <Grid item lg={6} key={searchUser._id}>
                    <ListItem ContainerComponent="div">
                      <ListItemAvatar>
                        <Avatar>
                          {searchUser.name && searchUser.name.substring(0, 1)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={searchUser.name}
                        secondary={
                          searchUser.friends.length == 1
                            ? searchUser.friends.length + " Friend"
                            : searchUser.friends.length + " Friends"
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => addFriendBtn(searchUser.userID)}
                        >
                          <PersonAddIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Grid>
                )
            )}
        </Grid>
      </Box>
    </Container>
  );
};

FriendForm.propTypes = {
  search: PropTypes.object.isRequired,
  sendFriendRequest: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  search: state.search,
});

export default connect(mapStateToProps, { sendFriendRequest, searchUsers })(
  FriendForm
);
