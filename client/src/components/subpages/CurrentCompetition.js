import React from 'react';


import PurchaseForm from '../purchases/PurchaseForm';
import DeletePurchaseForm from '../temp/DeletePurchaseForm';
import SetCompetitorForm from '../temp/SetCompetitorForm';
import CurrentPurchases from '../purchases/CurrentPurchases';

const CurrentCompetition = () => {
    return (
        <div>
            <div style={{ padding: '1rem' }}>
                <PurchaseForm />
            </div>
            <div style={{ padding: '1rem' }}>
                <DeletePurchaseForm />
            </div>
            <div style={{ padding: '1rem' }}>
                <SetCompetitorForm />
            </div>
            <div style={{ padding: '1rem' }}>
                <CurrentPurchases/>
            </div>
        </div>
    );
}

export default CurrentCompetition;
