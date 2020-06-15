// TEMPORARY

import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    getCompetitor,
    getCompetitorPurchases,
    clearCompetitor,
} from '../../actions/purchaseActions';

const getCompetitorForm = ({
    getCompetitor,
    getCompetitorPurchases,
    clearCompetitor,
}) => {
    const [id, setID] = useState('');

    const getCompetitorButton = () => {
        getCompetitor({ id });

        getCompetitorPurchases({ id });
        setID('');
    };

    const clearCompetitorButton = () => {
        clearCompetitor();
    };

    return (
        <div>
            <input
                type="text"
                placeholder="User ID"
                value={id}
                onChange={(e) => setID(e.target.value)}
            />
            <br />
            <button onClick={() => getCompetitorButton()}>
                Set Competitor
            </button>
            <br />
            <br />
            <button onClick={() => clearCompetitorButton()}>
                Clear Competitor
            </button>
        </div>
    );
};

getCompetitorForm.propTypes = {
    getCompetitor: PropTypes.func.isRequired,
    getCompetitorPurchases: PropTypes.func.isRequired,
    clearCompetitor: PropTypes.func.isRequired,
};

export default connect(null, {
    getCompetitor,
    getCompetitorPurchases,
    clearCompetitor,
})(getCompetitorForm);
