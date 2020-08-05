Component to show Current Battles that have been accepted:

```js
import { MemoryRouter } from 'react-router-dom';
const user = {
    user: {
        _id: '111111',
        name: 'your user',
        userID: '1',
        friends: [
            {
                status: 'Accepted',
                user1: '1',
                user1name: 'Justin Yeung',
                user2: '2',
                user2name: 'John Doe',
            },
        ],
    },
};
const competition = {
    accepted: [
        {
            _id: '222222',
            user1: '2',
            user1name: 'Justin Yeung',
            user1total: 200,
            user2: '1',
            user2name: 'John Doe',
            user2total: 300,
            month: 10,
            year: 2020,
        },
        {
            _id: '33333',
            user1: '1',
            user1name: 'John Doe',
            user1total: 200,
            user2: '3',
            user2name: 'Terren Chan',
            user2total: 300,
            month: 5,
            year: 2020,
        },
    ],
    compLoading: false,
};
const rejectOrDeleteComp = () => {};
const setCompLoading = () => {};
<MemoryRouter>
    <CurrentComps
        rejectOrDeleteComp={rejectOrDeleteComp}
        setCompLoading={setCompLoading}
        user={user}
        competition={competition}
    />
</MemoryRouter>;
```

Example with no Current Battles:

```js
import '../../styles/index.scss';
const user = {
    user: {
        _id: '1',
        name: 'temp name',
        userID: '2',
        friends: [
            {
                status: 'Accepted',
                user1: '1',
                user1name: 'Justin Yeung',
                user2: '2',
                user2name: 'temp name',
            },
        ],
    },
};
const competition = {
    accepted: [],
    compLoading: false,
};
const rejectOrDeleteComp = () => {};
const setCompLoading = () => {};
<CurrentComps
    rejectOrDeleteComp={rejectOrDeleteComp}
    setCompLoading={setCompLoading}
    user={user}
    competition={competition}
/>;
```
