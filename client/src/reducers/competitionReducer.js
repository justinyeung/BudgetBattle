import {
  SEND_COMP,
  ACCEPT_COMP,
  REJECT_DELETE_COMP,
  GET_ACCEPTED_COMP,
  GET_OUTPENDING_COMP,
  GET_INPENDING_COMP,
  CLEAR_COMPS,
} from "../actions/types";

const initialState = {
  accepted: [],
  outpending: [],
  inpending: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_COMP:
      state.outpending = [...state.outpending, action.payload];
      return {
        ...state,
      };
    case GET_ACCEPTED_COMP:
      state.accepted = action.payload;
      return {
        ...state,
      };
    case GET_OUTPENDING_COMP:
      state.outpending = action.payload;
      return {
        ...state,
      };
    case GET_INPENDING_COMP:
      state.inpending = action.payload;
      return {
        ...state,
      };
    case ACCEPT_COMP:
      return {
        ...state,
        accepted: [...state.accepted, action.payload],
        inpending: state.inpending.filter(
          (comp) => comp._id !== action.payload._id
        ),
      };
    case REJECT_DELETE_COMP:
      return {
        ...state,
        accepted: state.outpending.filter(
          (comp) => comp._id !== action.payload.compID
        ),
        outpending: state.outpending.filter(
          (comp) => comp._id !== action.payload.compID
        ),
        inpending: state.inpending.filter(
          (comp) => comp._id !== action.payload.compID
        ),
      };
    case CLEAR_COMPS:
      return {
        ...state,
        accepted: [],
        outpending: [],
        inpending: [],
      };
    default:
      return state;
  }
};
