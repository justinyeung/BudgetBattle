import { SEARCH_USER, SEARCH_ERROR } from "./types";

import axios from "axios";

export const searchUsers = (friendID) => async (dispatch) => {
  try {
    // api call to search user

    dispatch({
      type: SEARCH_USER,
      payload: null,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_ERROR,
      payload: err,
    });
  }
};
