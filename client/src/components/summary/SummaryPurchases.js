import React from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const SummaryPurchases = ({ purchases }) => {
    const formatDate = (date) => {
        const newDate = new Date(date);
        return (
            <p>
                {newDate.getMonth() +
                    1 +
                    '/' +
                    newDate.getDate() +
                    '/' +
                    newDate.getFullYear()}
            </p>
        );
    };
    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Amount</TableCell>
                    </TableRow>
                </TableHead>
                {purchases &&
                    purchases.map((purchase) => (
                        <TableRow key={purchase._id}>
                            <TableCell>{formatDate(purchase.date)}</TableCell>
                            <TableCell>{purchase.location}</TableCell>
                            <TableCell>{purchase.category}</TableCell>
                            <TableCell>${purchase.amount}</TableCell>
                        </TableRow>
                    ))}
            </Table>
        </TableContainer>
    );
};

SummaryPurchases.propTypes = {
    purchases: PropTypes.object.isRequired,
};

export default SummaryPurchases;
