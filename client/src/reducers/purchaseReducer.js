import {
  ADD_PURCHASE,
  EDIT_PURCHASE,
  GET_PURCHASES,
  SET_COMPETITOR,
  GET_COMPETITOR_PURCHASES,
  DELETE_PURCHASE,
  PURCHASE_ERROR,
  CLEAR_PURCHASES,
  CLEAR_COMPETITOR,
  SET_PURCHASE_LOADING,
  SET_PURCHASE_LOADING_FALSE,
} from "../actions/types";

const initialState = {
  purchases: [],
  competitor: null,
  competitorPurchases: [],
  purchaseLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PURCHASE_LOADING:
      return {
        ...state,
        purchaseLoading: true,
      };
    case SET_PURCHASE_LOADING_FALSE:
      return {
        ...state,
        purchaseLoading: false,
      };
    case GET_PURCHASES:
      state.purchases = action.payload;
      return {
        ...state,
        purchaseLoading: false,
      };
    case SET_COMPETITOR:
      return {
        ...state,
        competitor: action.payload,
        purchaseLoading: false,
      };
    case GET_COMPETITOR_PURCHASES:
      state.competitorPurchases = action.payload;
      return {
        ...state,
        purchaseLoading: false,
      };
    case ADD_PURCHASE:
      state.purchases = [...state.purchases, action.payload];
      return {
        ...state,
        purchaseLoading: false,
      };
    case EDIT_PURCHASE:
      state.purchases = state.purchases.map((purchase) =>
        purchase._id === action.payload._id ? action.payload : purchase
      );
      return {
        ...state,
        purchaseLoading: false,
      };
    case DELETE_PURCHASE:
      state.purchases = state.purchases.filter(
        (purchase) => purchase._id !== action.payload
      );
      return {
        ...state,
        purchaseLoading: false,
      };
    case PURCHASE_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
        purchaseLoading: false,
      };
    case CLEAR_PURCHASES:
      return {
        ...state,
        purchases: [],
        competitor: null,
        competitorPurchases: [],
        purchaseLoading: false,
      };
    case CLEAR_COMPETITOR:
      return {
        ...state,
        competitor: null,
        competitorPurchases: [],
        purchaseLoading: false,
      };
    default:
      return state;
  }
};
