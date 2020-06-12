import {
  LOGIN,
  GET_USER,
  LOGOUT,
  DELETE_USER,
  AUTH_ERROR,
  USER_ERROR,
  SEND_FRIEND,
  ACCEPT_FRIEND,
  FRIEND_ERROR,
  DELETE_FRIEND,
  SET_USER_LOADING,
} from "../actions/types";

const initialState = {
  user: null,
  userLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOADING:
      return {
        ...state,
        userLoading: true,
      };
    case LOGIN:
      return {
        ...state,
        userLoading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        userLoading: false,
      };
    case LOGOUT:
    case DELETE_USER:
      return {
        ...state,
        user: null,
        userLoading: false,
      };
    case SEND_FRIEND:
      return {
        ...state,
        user: action.payload,
        userLoading: false,
      };
    case ACCEPT_FRIEND:
      state.user.friends = state.user.friends.map((friend) =>
        friend._id === action.payload._id ? action.payload : friend
      );
      return {
        ...state,
        userLoading: false,
      };
    case DELETE_FRIEND:
      state.user.friends = state.user.friends.filter(
        (friend) => friend.user1 !== action.payload
      );
      state.user.friends = state.user.friends.filter(
        (friend) => friend.user2 !== action.payload
      );
      return {
        ...state,
        userLoading: false,
      };
    case AUTH_ERROR:
    case USER_ERROR:
    case FRIEND_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
        userLoading: false,
      };
    default:
      return state;
  }
};
