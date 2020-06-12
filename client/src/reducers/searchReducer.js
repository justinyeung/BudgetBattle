import {
  SEARCH_USER,
  SEARCH_ERROR,
  SET_SEARCH_LOADING,
} from "../actions/types";

const initialState = {
  users: [],
  searchLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_LOADING:
      console.log("Setting search loading");
      return {
        ...state,
        searchLoading: true,
      };
    case SEARCH_USER:
      return {
        ...state,
        users: action.payload,
        searchLoading: false,
      };
    case SEARCH_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
        searchLoading: false,
      };
    default:
      return state;
  }
};
