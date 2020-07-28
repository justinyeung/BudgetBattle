Component to search for other users:

```js
import '../../styles/index.scss';
import 'typeface-roboto';
import { MemoryRouter } from 'react-router-dom';
const user = { 
    user: {
        _id: '1', 
        name: 'John Doe',
        userID: '1', 
        friends: [ 
            { _id: '12', status: 'Accepted', user1: '1', user1name: 'Justin Yeung', user2: '2', user2name: 'temp name' },
            { _id: '34', status: 'Pending', user1: '3', user1name: 'Terren Chan', user2: '1', user2name: 'John Doe' },
            { _id: '56', status: 'Pending',  user1: '1', user1name: 'John Doe', user2: '4', user2name: 'Aaron Chin' },
        ]
    }
};
const search = {
    users: [ 
        {_id: '111111', 
        name: 'Justin Yeung',
        userID: '2', 
        friends: [ 
                { _id: '12', status: 'Accepted', user1: '1', user1name: 'Justin Yeung', user2: '2', user2name: 'temp name' } 
            ]
        },
        {_id: '22222', 
        name: 'Terren Chan',
        userID: '3', 
        friends: [ 
                 { _id: '34', status: 'Pending', user1: '3', user1name: 'Terren Chan', user2: '1', user2name: 'John Doe' },
            ]
        },
        {_id: '33333', 
        name: 'Aaron Chin',
        userID: '4', 
        friends: [ 
                 { _id: '56', status: 'Pending',  user1: '1', user1name: 'John Doe', user2: '4', user2name: 'Aaron Chin' },
            ]
        },
        {_id: '44444', 
        name: 'Justin Phan',
        userID: '5', 
        friends: []
        }
    ]
}
const sendFriendRequest = () => {};
const searchUsers = () => {};
const deleteFriend = () => {};
const acceptFriend = () => {};
const setUserLoading = () => {};
const setSearchLoading = () => {};
<MemoryRouter>
    <FriendForm 
        sendFriendRequest={sendFriendRequest} 
        searchUsers={searchUsers} 
        deleteFriend={deleteFriend} 
        acceptFriend={acceptFriend} 
        setUserLoading={setUserLoading} 
        setSearchLoading={setSearchLoading} 
        user={user}
        search={search}
    />
</MemoryRouter>
```
