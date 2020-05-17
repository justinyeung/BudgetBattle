// TEMPORARY

import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { acceptComp, rejectOrDeleteComp, getCompTotals } from '../../actions/competitionActions';

const AcceptCompForm = ({ acceptComp, rejectOrDeleteComp, getCompTotals }) => {
    const [compID, setCompID] = useState('');

    const acceptCompBtn = () => {
        acceptComp({ compID });
        setCompID('');
    }

    const rejectOrDeleteCompBtn = () => {
        rejectOrDeleteComp({ compID });
        setCompID('');
    }

    const getCompTotalsBtn = () => {
        getCompTotals({ compID });
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
            <br />
            <button onClick={getCompTotalsBtn}>Get Comp Totals</button>
        </div>
    )
}

AcceptCompForm.propTypes = {
    acceptComp: PropTypes.func.isRequired,
    rejectOrDeleteComp: PropTypes.func.isRequired,
    getCompTotals: PropTypes.func.isRequired
}

export default connect(null, { acceptComp, rejectOrDeleteComp, getCompTotals })(AcceptCompForm);