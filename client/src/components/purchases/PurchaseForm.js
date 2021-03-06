import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import CloseIcon from '@material-ui/icons/Close';

import {
    Typography,
    Divider,
    TextField,
    FormControl,
    Grid,
    Box,
    Toolbar,
    Button,
    Snackbar,
    IconButton,
} from '@material-ui/core';

const PurchaseForm = ({ addPurchase, setPurchaseLoading }) => {
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [open, setOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');

    // snackbar
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const addPurchaseBtn = () => {
        setPurchaseLoading();
        addPurchase({ date, amount, location, category });
        if (amount === 0) {
            setSnackbarMsg('Purchase Added');
        } else if (!amount) {
            setSnackbarMsg('Purchase Amount Required');
        } else {
            setSnackbarMsg('Purchase Added');
        }
        setDate(new Date());
        setAmount('');
        setLocation('');
        setCategory('');
        handleClick();
    };

    const renderSnackbar = (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={snackbarMsg}
            action={
                <React.Fragment>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        />
    );

    return (
        <div>
            <Box boxShadow={1} className="purchases">
                <FormControl fullWidth>
                    <Typography variant="h6">Add Purchase</Typography>
                    <Divider />
                    <Box display="flex" justifyContent="center">
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            className="purchases-form"
                        >
                            <Grid item md={3} sm={6} xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        id="date-picker-inline"
                                        label="Date"
                                        inputVariant="outlined"
                                        autoOk="true"
                                        fullWidth
                                        value={date}
                                        onChange={(date) =>
                                            date !== null
                                                ? setDate(new Date(date))
                                                : setDate(new Date())
                                        }
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        onKeyPress={(e) => {
                                            e.key === 'Enter' &&
                                                addPurchaseBtn();
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item md={3} sm={6} xs={12}>
                                <TextField
                                    autoComplete="off"
                                    label="Location"
                                    variant="outlined"
                                    fullWidth
                                    value={location}
                                    onChange={(location) =>
                                        setLocation(location.target.value)
                                    }
                                    onKeyPress={(e) => {
                                        e.key === 'Enter' && addPurchaseBtn();
                                    }}
                                />
                            </Grid>
                            <Grid item md={3} sm={6} xs={12}>
                                <TextField
                                    autoComplete="off"
                                    label="Category"
                                    variant="outlined"
                                    fullWidth
                                    value={category}
                                    onChange={(category) =>
                                        setCategory(category.target.value)
                                    }
                                    onKeyPress={(e) => {
                                        e.key === 'Enter' && addPurchaseBtn();
                                    }}
                                />
                            </Grid>
                            <Grid item md={3} sm={6} xs={12}>
                                <TextField
                                    autoComplete="off"
                                    label="Amount"
                                    variant="outlined"
                                    fullWidth
                                    value={amount}
                                    onChange={(amount) =>
                                        setAmount(amount.target.value)
                                    }
                                    onKeyPress={(e) => {
                                        e.key === 'Enter' && addPurchaseBtn();
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="row-reverse"
                        className="purchases-submit-btn"
                    >
                        <Toolbar disableGutters={true}>
                            <Button
                                type="submit"
                                variant="contained"
                                onClick={() => addPurchaseBtn()}
                            >
                                Add Purchase
                            </Button>
                        </Toolbar>
                    </Box>
                </FormControl>
            </Box>
            {renderSnackbar}
        </div>
    );
};

PurchaseForm.propTypes = {
    addPurchase: PropTypes.func.isRequired,
    setPurchaseLoading: PropTypes.func.isRequired,
};

export default PurchaseForm;
