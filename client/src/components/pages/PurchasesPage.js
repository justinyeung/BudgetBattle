import React from 'react';


import PurchaseForm from '../purchases/PurchaseForm';
import DeletePurchaseForm from '../temp/DeletePurchaseForm';
import CurrentPurchases from '../purchases/CurrentPurchases';





const PurchasePage = () => {
    

    return (
        <div>
            
                <div style={{ padding: '1rem' }}>
                    <PurchaseForm />
                </div>
                <div style={{ padding: '1rem' }}>
                    <DeletePurchaseForm />
                </div>
                <div style={{ padding: '1rem' }}>
                    <CurrentPurchases/>
                </div>
            
        </div>
    );
}

export default PurchasePage;
