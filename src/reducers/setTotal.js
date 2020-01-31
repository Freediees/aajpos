const setTotal = (total = 0, action) => {
  switch(action.type){
    case "TAMBAH_TOTAL":

      total = action.data;
      //console.log(total);

      return total;
    default:
      return total;
    break;
  }
}

export default setTotal;
