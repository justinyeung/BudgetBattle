import { SEARCH_USER, SEARCH_ERROR } from "../actions/types";

const initialState = {
  users: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USER:
      return {
        ...state,
        users: action.payload,
      };
    case SEARCH_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
