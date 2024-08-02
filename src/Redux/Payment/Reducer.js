import * as types from "./ActionTypes";

const initialState = {
  paymentReq: {},
  loading: false,
  error: null,
 
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
   case types.PAYMENT_SUCCESS:
        return {
          ...state,
         paymentReq:action.payload,
          loading: false,
          error: null,
        };
    case types.PAYMENT_FAILURE:
    
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default paymentReducer;
