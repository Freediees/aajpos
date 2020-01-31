const initialState = {
  address: "",
  award_points: "0",
  cf1: "",
  cf2: "",
  cf3: "",
  cf4: "",
  cf5: "",
  cf6: "",
  city: "",
  company: "",
  country: "",
  id: "2",
  customer_group_id: "1",
  customer_group_name: "General",
  deposit_amount: null,
  email: "",
  gst_no: "",
  payment_term: "0",
  person: "Walk In Customer",
  phone: "",
  postal_code: "",
  price_group_id: "1",
  price_group_name: "",
  state: "",
  vat_no: ""
}

const setDataCustomer = (state=initialState, action) => {
  switch(action.type){
    case "SET_DATA_CUSTOMER":

      //console.log('hemeh');
      //const data = action.data.data.data;
      state = action.payload

      return state;

    case "RESET_DATA_CUSTOMER":

      state = initialState

    return state

    default:
      return state;
  }
}

export default setDataCustomer;
