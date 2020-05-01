// TEMPORARY

import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { acceptComp, rejectOrDeleteComp } from '../../actions/competitionActions';

const AcceptCompForm = ({ acceptComp, rejectOrDeleteComp }) => {
    const [compID, setCompID] = useState('');

    const acceptCompBtn = () => {
        acceptComp({ compID });
        setCompID('');
    }

    const rejectOrDeleteCompBtn = () => {
        rejectOrDeleteComp({ compID });
        setCompID('');
    }

    return(
        <div>
            <input type="text" placeholder="Competition ID" value={compID} onChange={e => setCompID(e.target.value)} />
            <br/>
            <button onClick={acceptCompBtn}>Accept Competition Request</button>
            <br />
            <button onClick={rejectOrDeleteCompBtn}>Reject Competition Request</button>
            <br />
            <button onClick={rejectOrDeleteCompBtn}>Delete Competition</button>
        </div>
    )
}

AcceptCompForm.propTypes = {
    acceptComp: PropTypes.func.isRequired,
    rejectOrDeleteComp: PropTypes.func.isRequired
}

export default connect(null, { acceptComp, rejectOrDeleteComp })(AcceptCompForm);