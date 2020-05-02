import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPurchases, getCompetitorPurchases } from '../../actions/purchaseActions';

const CurrentPurchases = ({ getPurchases, purchase: { purchases, competitor, competitorPurchases } }) => {

    useEffect(() => {
        // get purchases of currently logged in user
        getPurchases();

        // eslint-disable-next-line
    }, []);

    return (
        <ul>
            <li>Your Purchases:</li>
            {purchases !== [] && 
                purchases.map(purchase => (<div>
                    <li>
                        <ul>
                            <li>Purchase ID: {purchase._id}</li>
                            <li>User ID: {purchase.userID}</li>
                            <li>Date: {purchase.date}</li>
                            <li>Amount: {purchase.amount}</li>
                            <li>Category: {purchase.category}</li>
                            <li>Location: {purchase.location}</li>
                        </ul>
                    </li>
                </div>))
            }
            <li>Competitor's ID: {competitor !== null && competitor.userID}</li>
            <li>Competitor's Name: {competitor !== null && competitor.name}</li>
            <li>Competitor's Purchases</li>
            {competitorPurchases !== [] && 
                competitorPurchases.map(purchase => (<div>
                    <li>
                        <ul>
                            <li>Purchase ID: {purchase._id}</li>
                            <li>User ID: {purchase.userID}</li>
                            <li>Date: {purchase.date}</li>
                            <li>Amount: {purchase.amount}</li>
                            <li>Category: {purchase.category}</li>
                            <li>Location: {purchase.location}</li>
                        </ul>
                    </li>
                </div>))
            }
        </ul>
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