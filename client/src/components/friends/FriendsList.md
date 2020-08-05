Component to search for other users:

```js
const user = {
    user: {
        _id: '1',
        name: 'John Doe',
        userID: '1',
        friends: [
            {
                _id: '12',
                status: 'Accepted',
                user1: '2',
                user1name: 'Justin Yeung',
                user2: '1',
                user2name: 'John Doe',
                date: new Date(),
            },
            {
                _id: '34',
                status: 'Pending',
                user1: '3',
                user1name: 'Terren Chan',
                user2: '1',
                user2name: 'John Doe',
                date: new Date(),
            },
            {
                _id: '56',
                status: 'Pending',
                user1: '1',
                user1name: 'John Doe',
                user2: '4',
                user2name: 'Aaron Chin',
                date: new Date(),
            },
        ],
    },
};
const deleteFriend = () => {};
const setUserLoading = () => {};
<FriendsList
    deleteFriend={deleteFriend}
    setUserLoading={setUserLoading}
    user={user}
/>;
```

Example with no Friends:

```js
const user = {
    user: {
        _id: '1',
        name: 'John Doe',
        userID: '1',
        friends: [],
    },
};
const deleteFriend = () => {};
const setUserLoading = () => {};
<FriendsList
    deleteFriend={deleteFriend}
    setUserLoading={setUserLoading}
    user={user}
/>;
```
