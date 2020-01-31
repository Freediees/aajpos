const initialState = {
  isFetching: true,
  dataList: []
}

const setDataList = (state=initialState, action) => {
  switch(action.type){
    case "ADD_LIBRARY":

      //console.log(action.data.data.data);
      //console.log('hemeh');
      const data = action.data.data.data;

      return{...state, isFetching: false, dataList: data};

    case "UPDATE_LIBRARY":

      console.log(action);
      const data2 = action.data.data;

      return{...state, isFetching: false, dataList: data2};

    default:
      return state;
  }
}

export default setDataList;
