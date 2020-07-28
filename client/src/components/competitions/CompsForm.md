Component to send Battle Requests to friends:

```js
import '../../styles/index.scss';
import 'typeface-roboto';
const user = { 
    user: {
        _id: '1', 
        name: 'temp name',
        userID: '2', 
        friends: [ 
            { status: 'Accepted', user1: '1', user1name: 'Justin Yeung', user2: '2', user2name: 'temp name' } 
        ]
    }
};
const sendCompRequest = () => {};
const setCompLoading = () => {};
<CompsForm 
    sendCompRequest={sendCompRequest} 
    setCompLoading={setCompLoading} 
    user={user}
/>
```
