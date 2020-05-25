import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendFriendRequest } from "../../actions/userActions";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";

const FriendForm = ({ sendFriendRequest }) => {
  const [friendID, setFriendID] = useState("");

  const sendFriendRequestBtn = () => {
    sendFriendRequest({ friendID });
  };

  return (
    <Container maxWidth="md" className="container-spacing">
      <Box boxShadow={1} className="container-spacing">
        <TextField
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
            <Button variant="contained" onClick={() => sendFriendRequestBtn()}>
              Send Friend Request
            </Button>
          </Toolbar>
        </Box>
      </Box>
    </Container>
  );
};

FriendForm.propTypes = {
  sendFriendRequest: PropTypes.func.isRequired,
};

export default connect(null, { sendFriendRequest })(FriendForm);
