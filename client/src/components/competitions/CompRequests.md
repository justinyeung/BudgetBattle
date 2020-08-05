Component to show Battle Requests:

```js
const competition = {
    inpending: [
        { _id: '1', user1name: 'Justin Yeung', month: 10, year: 2020 },
        { _id: '2', user1name: 'Terren Chan', month: 5, year: 2020 },
    ],
};
const acceptComp = () => {};
const rejectOrDeleteComp = () => {};
const setCompLoading = () => {};
<CompRequests
    acceptComp={acceptComp}
    rejectOrDeleteComp={rejectOrDeleteComp}
    setCompLoading={setCompLoading}
    competition={competition}
/>;
```

Example with no Battle Requests:

```js
import '../../styles/index.scss';
const competition = { inpending: [] };
const acceptComp = () => {};
const rejectOrDeleteComp = () => {};
const setCompLoading = () => {};
<CompRequests
    acceptComp={acceptComp}
    rejectOrDeleteComp={rejectOrDeleteComp}
    setCompLoading={setCompLoading}
    competition={competition}
/>;
```
