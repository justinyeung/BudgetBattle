import React from "react";

import PurchaseForm from "../components/purchases/PurchaseForm";
import CurrentPurchases from "../components/purchases/CurrentPurchases";

const PurchasePage = () => {
  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <PurchaseForm />
      </div>
      <div style={{ padding: "1rem" }}>
        <CurrentPurchases />
      </div>
    </div>
  );
};

export default PurchasePage;
