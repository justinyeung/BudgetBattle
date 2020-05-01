import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendRequest } from '../../actions/competitionActions';

const CompsForm = ({ sendRequest }) => {
    const [id, setID] = useState('');

    const requestBtn = () => {
        sendRequest({ id });
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
    sendRequest: PropTypes.func.isRequired
}

export default connect(null, { sendRequest })(CompsForm);