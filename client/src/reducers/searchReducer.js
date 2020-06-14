import {
  SEARCH_USER,
  SEARCH_ERROR,
  SET_SEARCH_LOADING,
  SET_SEARCH_LOADING_FALSE,
} from "../actions/types";

const initialState = {
  users: [],
  searchLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_LOADING:
      return {
        ...state,
        searchLoading: true,
      };
    case SET_SEARCH_LOADING_FALSE:
      return {
        ...state,
        searchLoading: false,
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
