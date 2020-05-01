// TEMPORARY

import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { acceptComp, rejectComp } from '../../actions/competitionActions';

const AcceptCompForm = ({ acceptComp, rejectComp }) => {
    const [compID, setCompID] = useState('');

    const acceptCompBtn = () => {
        acceptComp({ compID });
        setCompID('');
    }

    const rejectCompBtn = () => {
        rejectComp({ compID });
        setCompID('');
    }

    return(
        <div>
            <input type="text" placeholder="Competition ID" value={compID} onChange={e => setCompID(e.target.value)} />
            <br/>
            <button onClick={acceptCompBtn}>Accept Competition Request</button>
            <br />
            <button onClick={rejectCompBtn}>Reject Competition Request</button>
        </div>
    )
}

AcceptCompForm.propTypes = {
    acceptComp: PropTypes.func.isRequired,
    rejectComp: PropTypes.func.isRequired
}

export default connect(null, { acceptComp, rejectComp })(AcceptCompForm);