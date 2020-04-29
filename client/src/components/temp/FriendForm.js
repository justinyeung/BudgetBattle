// TEMPORARY BUTTON

import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFriend, deleteFriend } from '../../actions/userActions';

const FriendForm = ({ addFriend, deleteFriend }) => {
    const [friendID, setFriendID] = useState('');

    const addFriendBtn = () => {
        addFriend(friendID);
    }

    const deleteFriendBtn = () => {
        deleteFriend(friendID);
    }

    return(
        <div>
            <input type="text" placeholder="Friend's UserID" value={friendID} onChange={e => setFriendID(e.target.value)} />
            <br/>
            <button onClick={addFriendBtn}>Add Friend</button>
            <br/>
            <button onClick={deleteFriendBtn}>Delete Friend</button>
        </div>
    )
}

FriendForm.propTypes = {
    addFriend: PropTypes.func.isRequired,
    deleteFriend: PropTypes.func.isRequired
}

export default connect(null, { addFriend, deleteFriend })(FriendForm);