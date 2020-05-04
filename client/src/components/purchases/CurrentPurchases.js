import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPurchases, getCompetitorPurchases } from '../../actions/purchaseActions';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Container } from '@material-ui/core';

function createData(id, date, amount, location, category) {
    return { id, date, amount, location, category };
}
  
const rows = [
    createData(0, '16 Mar, 2019', 90.78, 'Chipotle', 'Lunch'),
    createData(1, '16 Mar, 2019', 89.90, 'Milestones', 'Dinner'),
    createData(2, '16 Mar, 2019', 41.23, 'Apple Store', 'Technology'),
    createData(3, '16 Mar, 2019', 32.65, 'McDonalds', 'Lunch'),
    createData(4, '15 Mar, 2019', 23.45, 'Uber', 'Transportation'),
];

const CurrentPurchases = ({ getPurchases, purchase: { purchases, competitor, competitorPurchases } }) => {

    useEffect(() => {
        // get purchases of currently logged in user
        getPurchases();

        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <Container maxWidth="lg">
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Category</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {purchases != [] && purchases.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>{row.location}</TableCell>
                                <TableCell>{row.category}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Container>
        </div>
    )
}

CurrentPurchases.propTypes = {
    getPurchases: PropTypes.func.isRequired,
    getCompetitorPurchases: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    purchase: state.purchase
});

export default connect(mapStateToProps, { getPurchases, getCompetitorPurchases })(CurrentPurchases);