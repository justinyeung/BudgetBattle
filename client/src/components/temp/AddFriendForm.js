// TEMPORARY BUTTON

import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { addFriend } from '../../actions/friendActions';
import { addFriend } from '../../actions/userActions';

const AddFriendForm = ({ addFriend }) => {
    const [friendID, setFriendID] = useState('');

    const onSubmit = () => {
        addFriend(friendID);
    }

    return(
        <div>
            <input type="text" placeholder="Friend's UserID" value={friendID} onChange={e => setFriendID(e.target.value)} />
            <button onClick={onSubmit}>Add Friend</button>
        </div>
    )
}

AddFriendForm.propTypes = {
    addFriend: PropTypes.func.isRequired,
}

export default connect(null, { addFriend })(AddFriendForm);