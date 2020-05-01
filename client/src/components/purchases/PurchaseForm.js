import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPurchase } from '../../actions/purchaseActions';

const PurchaseForm = ({ addPurchase }) => {
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');

    const addPurchaseBtn = () => {
        addPurchase({ date, amount, location, category });
        setDate('');
        setAmount('');
        setLocation('');
        setCategory('');
    }

    return(
        <div>
            <input type="text" placeholder="Date" value={date} onChange={e => setDate(e.target.value)} />
            <input type="text" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
            <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
            <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
            <br/>
            <button onClick={addPurchaseBtn}>Add Purchase</button>
            
        </div>
    )
}

PurchaseForm.propTypes = {
    addPurchase: PropTypes.func.isRequired
}

export default connect(null, { addPurchase
 })(PurchaseForm);