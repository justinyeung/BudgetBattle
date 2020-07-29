Component to show user profile:

```js
import '../../styles/index.scss';
import 'typeface-roboto';
const profile = {
    user: {
        name: 'Justin Yeung',
        userID: '1234',
    },
    numFriends: 20,
    numPurchases: 536,
    numCompetitions: 45,
    profileLoading: false,
};
<Profile profile={profile} />;
```
