// TEMPORARY

import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCompetitor, getCompetitorPurchases, clearCompetitor } from '../../actions/purchaseActions';

const SetCompetitorForm = ({ setCompetitor, getCompetitorPurchases, clearCompetitor }) => {
    const [id, setID] = useState('');

    const setCompetitorButton = () => {
        setCompetitor({ id });

        getCompetitorPurchases({ id });
        setID('');
    }

    const clearCompetitorButton = () => {
        clearCompetitor();
    }

    return(
        <div>
            <input type="text" placeholder="User ID" value={id} onChange={e => setID(e.target.value)} />
            <br/>
            <button onClick={() => setCompetitorButton()}>Set Competitor</button>
            <br/>
            <br/>
            <button onClick={() => clearCompetitorButton()}>Clear Competitor</button>
        </div>
    )
}

SetCompetitorForm.propTypes = {
    setCompetitor: PropTypes.func.isRequired,
    getCompetitorPurchases: PropTypes.func.isRequired,
    clearCompetitor: PropTypes.func.isRequired
}

export default connect(null, { setCompetitor, getCompetitorPurchases, clearCompetitor })(SetCompetitorForm);