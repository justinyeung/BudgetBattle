import React from 'react';
import PropTypes from 'prop-types';

import { TableBody, Table, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

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
        <TableContainer className="summary">
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {purchases &&
                        purchases.map((purchase) => (
                            <TableRow key={purchase._id}>
                                <TableCell>
                                    {formatDate(purchase.date)}
                                </TableCell>
                                <TableCell>{purchase.location}</TableCell>
                                <TableCell>{purchase.category}</TableCell>
                                <TableCell>
                                    ${purchase.amount.toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

SummaryPurchases.propTypes = {
    purchases: PropTypes.array.isRequired,
};

export default SummaryPurchases;
