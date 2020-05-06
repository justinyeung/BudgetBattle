import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPurchase } from '../../actions/purchaseActions';

import { Container } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

const PurchaseForm = ({ addPurchase }) => {
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    // const [open, setOpen] = useState(false);

    const classes = useStyles();

    const addPurchaseBtn = () => {
        addPurchase({ date, amount, location, category });
        setDate(new Date());
        setAmount('');
        setLocation('');
        setCategory('');
    }

    return(
        <div>
            <Container maxWidth="lg">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date"
                        inputVariant="outlined"
                        autoOk="true"
                        value={date}
                        onChange={date => date !== null ? setDate(date) : setDate(new Date())}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <TextField id="outlined-basic" label="Amount" variant="outlined" value={amount} onChange={amount => setAmount(amount.target.value)}/>
                <TextField id="outlined-basic" label="Location" variant="outlined" value={location} onChange={location => setLocation(location.target.value)}/>
                <TextField id="outlined-basic" label="Category" variant="outlined" value={category} onChange={category => setCategory(category.target.value)}/>
                {/* <TextField id="outlined-basic" label="Amount" variant="outlined" value={amount} />
                <TextField id="outlined-basic" label="Location" variant="outlined" value={location} />
                <TextField id="outlined-basic" label="Category" variant="outlined" value={category} /> */}
                <br/>
                <button onClick={addPurchaseBtn}>Add Purchase</button>
            </Container>
        </div>
    )
}

PurchaseForm.propTypes = {
    addPurchase: PropTypes.func.isRequired
}

export default connect(null, { addPurchase
 })(PurchaseForm);