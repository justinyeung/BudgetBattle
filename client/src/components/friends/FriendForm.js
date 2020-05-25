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

  const [friendID, setFriendID] = useState("");

  const searchBtn = () => {
    console.log(friendID);
    setFriendID("");
    // sendFriendRequest({ friendID });
  };

  return (
    <Container maxWidth="md" className="container-spacing">
      <Box boxShadow={1} className="container-spacing">
        {/* <TextField
          fullWidth
          label="Search by Name or User ID"
          variant="outlined"
          value={friendID}
          onChange={(e) => setFriendID(e.target.value)}
        />
        <Box
          id="purchases-form-submit"
          display="flex"
          flexDirection="row-reverse"
        >
          <Toolbar disableGutters={true}>
            <Button variant="contained" onClick={() => searchBtn()}>
              Search
            </Button>
          </Toolbar>
        </Box> */}
        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            value={friendID}
            onChange={(e) => setFriendID(e.target.value)}
            placeholder="Search Users by Name or ID"
            inputProps={{ "aria-label": "search google maps" }}
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
      </Box>
    </Container>
  );
};

FriendForm.propTypes = {
  sendFriendRequest: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
};

export default connect(null, { sendFriendRequest, searchUsers })(FriendForm);
