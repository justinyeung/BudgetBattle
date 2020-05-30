import { combineReducers } from "redux";
import userReducer from "./userReducer";
import purchaseReducer from "./purchaseReducer";
import competitionReducer from "./competitionReducer";
import searchReducer from "./searchReducer";

export default combineReducers({
  user: userReducer,
  purchase: purchaseReducer,
  competition: competitionReducer,
  search: searchReducer,
});
