const setDataDetail = (state=[], action) => {
  switch(action.type){
    case "GET_DATA_DETAIL":

      //console.log("naruto")
      console.log(action.payload);
      //const data = action.data.data.data;
      state = action.payload

      return state;

    default:
      return state;
  }
}

export default setDataDetail;
