Component to for the top Navigation Buttons:

```js
import '../../styles/index.scss';
import 'typeface-roboto';
import { MemoryRouter } from 'react-router-dom';
const getUser = () => {};
const getPurchases = () => {};
const getAcceptedComps = () => {};
const getInPendingComp = () => {};
const setUserLoading = () => {};
const setPurchaseLoading = () => {};
const setCompLoading = () => {};
<MemoryRouter>
    <NavButtons
        getUser={getUser}
        getPurchases={getPurchases}
        getAcceptedComps={getAcceptedComps}
        getInPendingComp={getInPendingComp}
        setUserLoading={setUserLoading}
        setPurchaseLoading={setPurchaseLoading}
        setCompLoading={setCompLoading}
    />
</MemoryRouter>;
```
