// TEMPORARY

import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletePurchase } from '../../actions/purchaseActions';

const DeletePurchaseForm = ({ deletePurchase }) => {
    const [purchaseID, setPurchaseID] = useState('');

    const deletePurchaseBtn = () => {
        deletePurchase(purchaseID);
    }

    return(
        <div>
            <input type="text" placeholder="Purchase ID" value={purchaseID} onChange={e => setPurchaseID(e.target.value)} />
            <br/>
            <button onClick={deletePurchaseBtn}>Delete Purchase</button>
        </div>
    )
}

DeletePurchaseForm.propTypes = {
    deletePurchase: PropTypes.func.isRequired
}

export default connect(null, { deletePurchase })(DeletePurchaseForm);