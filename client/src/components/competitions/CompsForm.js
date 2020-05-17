import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendCompRequest } from '../../actions/competitionActions';

const moment = require('moment');

const CompsForm = ({ sendCompRequest }) => {
    const [id, setID] = useState('');
    const [date, setDate] = useState('');

    const requestBtn = () => {
        const numMonth = moment(date).format("MM");
        const numYear = moment(date).format("YYYY");
        sendCompRequest({ id, numMonth, numYear });
        setID('');
        setDate('');
    }

    return(
        <div>
            <input type="month" value={date} onChange={e => setDate(e.target.value)} />
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