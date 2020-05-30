import { SEARCH_USER, SEARCH_ERROR } from "./types";

import axios from "axios";

export const searchUsers = ({ friendSearch }) => async (dispatch) => {
  try {
    // api call to search user
    let res = await axios.get(`/api/search/${friendSearch}`);

    dispatch({
      type: SEARCH_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_ERROR,
      payload: err,
    });
  }
};
