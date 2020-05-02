import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendCompRequest } from '../../actions/competitionActions';

const CompsForm = ({ sendCompRequest }) => {
    const [id, setID] = useState('');

    const requestBtn = () => {
        sendCompRequest({ id });
        setID('');
    }

    return(
        <div>
            <input type="text" placeholder="User ID" value={id} onChange={e => setID(e.target.value)} />
            <br/>
            <button onClick={requestBtn}>Send Competition Request</button>
            
        </div>
    )
}

CompsForm.propTypes = {
    sendCompRequest: PropTypes.func.isRequired
}

export default connect(null, { sendCompRequest })(CompsForm);