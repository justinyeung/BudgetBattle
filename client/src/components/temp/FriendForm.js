// TEMPORARY

import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  sendFriendRequest,
  acceptFriend,
  deleteFriend,
} from "../../actions/userActions";

const FriendForm = ({ sendFriendRequest, acceptFriend, deleteFriend }) => {
  const [friendID, setFriendID] = useState("");

  const sendFriendRequestBtn = () => {
    sendFriendRequest({ friendID });
  };

  const deleteFriendBtn = () => {
    deleteFriend({ friendID });
  };

  const acceptFriendBtn = () => {
    acceptFriend({ friendID });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Friend's UserID"
        value={friendID}
        onChange={(e) => setFriendID(e.target.value)}
      />
      <br />
      <button onClick={() => sendFriendRequestBtn()}>
        Send Friend Request
      </button>
      <br />
      <button onClick={() => acceptFriendBtn()}>Accept Friend Request</button>
      <br />
      <button onClick={() => deleteFriendBtn()}>
        Delete Friend/Friend Request
      </button>
    </div>
  );
};

FriendForm.propTypes = {
  sendFriendRequest: PropTypes.func.isRequired,
  acceptFriend: PropTypes.func.isRequired,
  deleteFriend: PropTypes.func.isRequired,
};

export default connect(null, { sendFriendRequest, acceptFriend, deleteFriend })(
  FriendForm
);
