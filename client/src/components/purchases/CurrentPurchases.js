import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPurchases, deletePurchase } from '../../actions/purchaseActions';

import { Container } from '@material-ui/core';

import MaterialTable from "material-table";
import { forwardRef } from 'react';

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

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const setData = (purchasesArray) => {
    const currentPurchases = purchasesArray.map((purchase) => (
       {id: purchase._id,
        userID: purchase.userID,
        date: purchase.date, 
        location: purchase.location, 
        category: purchase.category, 
        amount: purchase.amount
       }));
    return currentPurchases;
}

const CurrentPurchases = ({ getPurchases, deletePurchase, purchase: { purchases } }) => {

    useEffect(() => {
        // get purchases of currently logged in user
        getPurchases();

        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <Container maxWidth="lg">
                <MaterialTable
                    columns={[
                        { title: "Date", field: "date" },
                        { title: "Location", field: "location"},
                        { title: "Category", field: "category"},
                        { title: "Amount", field: "amount" },
                    ]}
                    data={setData(purchases)}
                    title="Purchases"
                    icons={tableIcons}
                    editable={{
                        isEditable: rowData => rowData.name !== null, // only name(a) rows would be editable
                        isDeletable: rowData => rowData.name !== null, // only name(a) rows would be deletable
                        onRowAdd: null,
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        /* const data = this.state.data;
                                        const index = data.indexOf(oldData);
                                        data[index] = newData;                
                                        this.setState({ data }, () => resolve()); */
                                        
                                    }
                                    resolve();
                                }, 1000);
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        /* let data = this.state.data;
                                        const index = data.indexOf(oldData);
                                        data.splice(index, 1);
                                        this.setState({ data }, () => resolve()); */
                                        deletePurchase(oldData.id);
                                    }
                                    resolve();
                                }, 1000);
                            })
                    }}
                />
            </Container>
        </div>
    )
}

CurrentPurchases.propTypes = {
    getPurchases: PropTypes.func.isRequired,
    deletePurchase: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    purchase: state.purchase
});

export default connect(mapStateToProps, { getPurchases, deletePurchase })(CurrentPurchases);