Component to show user's purchases:

```js
const getPurchases = () => {};
const editPurchase = () => {};
const deletePurchase = () => {};
const setPurchaseLoading = () => {};
const purchase = {
    purchases: [
        {
            amount: 11.87,
            location: 'Chipotle',
            category: 'Lunch',
            date: new Date(2011, 5, 25),
        },
        {
            amount: 24.95,
            location: 'Swiss Chalet',
            category: 'Dinner',
            date: new Date(2017, 8, 1),
        },
        {
            amount: 1.98,
            location: `McDonald's`,
            category: 'Dessert',
            date: new Date(2019, 1, 25),
        },
        {
            amount: 40,
            location: 'Goodlife',
            category: 'Gym Membership',
            date: new Date(2014, 12, 12),
        },
        {
            amount: 34.58,
            location: 'Esso',
            category: 'Gas',
            date: new Date(2012, 8, 3),
        },
        {
            amount: 37.14,
            location: `Jack Astor's`,
            category: 'Dinner',
            date: new Date(2020, 7, 14),
        },
        {
            amount: 11.14,
            location: 'GO Bus',
            category: 'Transportation',
            date: new Date(2020, 1, 25),
        },
    ],
};

<CurrentPurchases
    getPurchases={getPurchases}
    editPurchase={editPurchase}
    deletePurchase={deletePurchase}
    setPurchaseLoading={setPurchaseLoading}
    purchase={purchase}
/>;
```
