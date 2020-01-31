const initialState = [{
  index: 0,
  id_pay: 0,
  paying_by: 'Cash',
  payment_reference_no: '000',
  amount:0,
  cheque_no: '',
  gift_card_no: '',
  cc_no: '',
  cc_holder: '',
  cc_month: '',
  cc_year: '',
  cc_type: -1,
  note: '',
}]

var count = 0;

const setPayment = (state=initialState, action) => {
  switch(action.type){
    case "SET_PAYMENT":

      //console.log(action.payload);
      count = count + 1;


      let arr = action.payload;
      arr.index = count;
      //const data = action.data.data.data;
      //state = action.payload

      return [...state, arr];

    case "UPDATE_PAYMENT":


      let arr3 = state;
      let arr2 = action.payload
      let index = action.payload.index;

      arr3[index] = arr2;

      return [...state = arr3 ];

    case "DELETE_PAYMENT":

      //console.log(action.payload);
      return [...state = action.payload];

    default:
      return state;
  }
}

export default setPayment;
