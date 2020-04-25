// TEMPORARY BUTTON

import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPurchase, getPurchases } from '../../actions/purchaseActions';

const PurchaseForm = ({ addPurchase, getPurchases }) => {
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');

    const addPurchaseBtn = () => {
        addPurchase({ date, amount, location, category });
    }

    const getPurchaseBtn = () => {
        getPurchases();
    }

    return(
        <div>
            <input type="text" placeholder="Date" value={date} onChange={e => setDate(e.target.value)} />
            <input type="text" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
            <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
            <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />

            <button onClick={addPurchaseBtn}>Add Purchase</button>
            <button onClick={getPurchaseBtn}>Get User's Purchases</button>
        </div>
    )
}

PurchaseForm.propTypes = {
    addPurchase: PropTypes.func.isRequired,
    getPurchases: PropTypes.func.isRequired
}

export default connect(null, { addPurchase, getPurchases })(PurchaseForm);