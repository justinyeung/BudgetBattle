import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPurchase } from '../../actions/purchaseActions';

import { Container, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

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
        console.log("Button pressed");
        addPurchase({ date, amount, location, category });
        setDate(new Date());
        setAmount('');
        setLocation('');
        setCategory('');
    }

    return(
        <div>
            
            <Container maxWidth="lg" id="purchases-form">
                <Box boxShadow={1}>
                    <Box id="purchases-form-toolbar" display="flex" justifyContent="flex-left">
                        <Toolbar disableGutters={true}>
                            <Typography id="purchases-form-title" variant='h6'>Add Purchase</Typography>
                        </Toolbar>
                    </Box>
                    <Box display="flex" justifyContent="center">
                    <Grid
                        id="purchases-form-grid" 
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={5}
                    >
                            <Grid item md={3} sm={5} xs={8}>
                                <FormControl fullWidth>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
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
                                </FormControl>
                            </Grid>
                            <Grid item md={3} sm={5} xs={8}>
                                <FormControl fullWidth>
                                    <TextField id="outlined-basic" autoComplete='off' label="Amount" variant="outlined" value={amount} onChange={amount => setAmount(amount.target.value)}/>
                                </FormControl>
                            </Grid>
                            <Grid item md={3} sm={5} xs={8}>
                                <FormControl fullWidth >
                                    <TextField id="outlined-basic" autoComplete='off' label="Location" variant="outlined" value={location} onChange={location => setLocation(location.target.value)}/>
                                </FormControl>
                            </Grid>
                            <Grid item md={3} sm={5} xs={8}>
                                <FormControl fullWidth >
                                    <TextField id="outlined-basic" autoComplete='off' label="Category" variant="outlined" value={category} onChange={category => setCategory(category.target.value)}/>
                                </FormControl>
                            </Grid>
                    </Grid>
                    </Box>
                    <Box id="purchases-form-submit" display="flex" flexDirection="row-reverse">
                        <Toolbar disableGutters={true}>
                            <Button variant="contained" onClick={addPurchaseBtn}>
                                Add Purchase
                            </Button>
                        </Toolbar>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

PurchaseForm.propTypes = {
    addPurchase: PropTypes.func.isRequired
}

export default connect(null, { addPurchase
 })(PurchaseForm);