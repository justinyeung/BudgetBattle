Component for showing competitor names in a battle:

```js
const user = {
    user: {
        _id: '1',
        name: 'Justin Yeung',
        userID: '1',
    },
};

const competition = {
    competition: {
        status: 'Accepted',
        user1: '1',
        user1name: 'Justin Yeung',
        user2: '2',
        user2name: 'Terren Chan',
        user1total: 200,
        user2total: 150,
    },
};

<SummaryHeader user={user} competition={competition} />;
```

Example with current user in the lead:

```js
const user = {
    user: {
        _id: '1',
        name: 'Justin Yeung',
        userID: '1',
    },
};

const competition = {
    competition: {
        status: 'Accepted',
        user1: '1',
        user1name: 'Justin Yeung',
        user2: '2',
        user2name: 'Terren Chan',
        user1total: 25,
        user2total: 100,
    },
};

<SummaryHeader user={user} competition={competition} />;
```

Example with a tie:

```js
const user = {
    user: {
        _id: '1',
        name: 'Justin Yeung',
        userID: '1',
    },
};

const competition = {
    competition: {
        status: 'Accepted',
        user1: '1',
        user1name: 'Justin Yeung',
        user2: '2',
        user2name: 'Terren Chan',
        user1total: 100,
        user2total: 100,
    },
};

<SummaryHeader user={user} competition={competition} />;
```
