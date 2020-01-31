const initialState = {
  isFetching: true,
  transaksi: [],
}

const setGetDataSales = (state = initialState, action)=> {
  switch (action.type) {
    case "GET_DATA_SALES":


      //console.log(action.payload);
      var data = action.payload;

      return { ...state, isFetching: false, transaksi: data };
      //return state;

      break;

    default:

      return state;

  }
}

export default setGetDataSales;
