import React from "react";

import PurchaseForm from "../components/purchases/PurchaseForm";
import CurrentPurchases from "../components/purchases/CurrentPurchases";

const PurchasePage = () => {
  return (
    <div>
      <PurchaseForm />
      <CurrentPurchases />
    </div>
  );
};

export default PurchasePage;
