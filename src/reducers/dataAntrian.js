const dataAntrian = (state=[], action) => {
  switch(action.type){
    case "SET_DATA_ANTRIAN":

      console.log('set data antrian');
      //const data = action.data.data.data;
      state = action.payload

      return state;

    default:
      return state;
  }
}

export default dataAntrian;
