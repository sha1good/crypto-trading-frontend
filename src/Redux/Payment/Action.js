import api from "@/Api/api";
import * as types from "./ActionTypes";


export const paymentHandler =
  ({ amount, paymentMethod }) =>
  async (dispatch) => {
   
    try {
      const response = await api.post(
        `/api/payment/${paymentMethod}/amount/${amount}`)
         console.log(response.data)
       
       if(response.data.payment_link_url){
         // Construct the URL with query parameters
        //  const paymentUrl = new URL(response.data.payment_link_url);
        //  paymentUrl.searchParams.append("payment_intent", response.data.payment_intent);
        // window.location.href = paymentUrl.toString();
        window.location.href = response.data.payment_link_url;
       }
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: types.PAYMENT_FAILURE,
        error: error.message,
      });
    }
  };

