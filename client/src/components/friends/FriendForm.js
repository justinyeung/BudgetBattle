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
}));

const FriendForm = ({ sendFriendRequest, searchUsers }) => {
  const classes = useStyles();

  const [friendSearch, setFriendSearch] = useState("");

  const searchBtn = () => {
    searchUsers({ friendSearch });
    console.log(friendSearch);
    setFriendSearch("");
    // sendFriendRequest({ friendSearch });
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
      </Box>
    </Container>
  );
};

FriendForm.propTypes = {
  sendFriendRequest: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
};

export default connect(null, { sendFriendRequest, searchUsers })(FriendForm);
