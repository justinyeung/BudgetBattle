import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';

import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import CloseIcon from '@material-ui/icons/Close';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { Snackbar, IconButton } from '@material-ui/core';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
        <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const setData = (purchasesArray) => {
    return purchasesArray.map((purchase) => ({
        id: purchase._id,
        userID: purchase.userID,
        date: purchase.date,
        location: purchase.location,
        category: purchase.category,
        amount: purchase.amount,
    }));
};

const CurrentPurchases = ({
    getPurchases,
    editPurchase,
    deletePurchase,
    setPurchaseLoading,
    purchase: { purchases },
}) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');

    useEffect(() => {
        setPurchaseLoading();
        getPurchases();

        // eslint-disable-next-line
    }, []);

    const handleClick = () => {
        setOpenSnackbar(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const editBtn = (purchase) => {
        editPurchase(purchase);
        setSnackbarMsg('Purchase Edited');
        handleClick();
    };
    const deleteBtn = (id) => {
        deletePurchase(id);
        setSnackbarMsg('Purchase Deleted');
        handleClick();
    };

    const renderSnackbar = (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={openSnackbar}
            autoHideDuration={1000}
            onClose={handleClose}
            message={snackbarMsg}
            action={
                <React.Fragment>
                    <IconButton
                        size="small"
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
        <div className="purchases">
            <MaterialTable
                columns={[
                    {
                        title: 'Date',
                        field: 'date',
                        type: 'date',
                        defaultSort: 'desc',
                        filtering: false,
                        editComponent: (props) => (
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy/MM/dd"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date"
                                    inputVariant="outlined"
                                    autoOk="true"
                                    value={props.value}
                                    onChange={(date) => props.onChange(date)}
                                />
                            </MuiPickersUtilsProvider>
                        ),
                    },
                    { title: 'Location', field: 'location', type: 'string' },
                    { title: 'Category', field: 'category', type: 'string' },
                    {
                        title: 'Amount',
                        field: 'amount',
                        type: 'currency',
                        filtering: false,
                    },
                ]}
                data={setData(purchases)}
                title="Purchases"
                icons={tableIcons}
                options={{
                    filtering: true,
                }}
                editable={{
                    isEditable: (rowData) => rowData.name !== null, // only name(a) rows would be editable
                    isDeletable: (rowData) => rowData.name !== null, // only name(a) rows would be deletable
                    onRowAdd: null,
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    const oldPurchase = {
                                        purchaseID: oldData.id,
                                        userID: newData.userID,
                                        date: newData.date,
                                        location: newData.location,
                                        category: newData.category,
                                        amount: newData.amount,
                                    };
                                    editBtn(oldPurchase);
                                }
                                resolve();
                            }, 1000);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                deleteBtn(oldData.id);
                                resolve();
                            }, 1000);
                        }),
                }}
            />
            {/* {renderSnackbar} */}
        </div>
    );
};

CurrentPurchases.propTypes = {
    getPurchases: PropTypes.func.isRequired,
    editPurchase: PropTypes.func.isRequired,
    deletePurchase: PropTypes.func.isRequired,
    setPurchaseLoading: PropTypes.func.isRequired,
    purchase: PropTypes.object.isRequired,
};

export default CurrentPurchases;
