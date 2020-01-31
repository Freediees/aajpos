const initialState = {
  diskon: 0,
  kas:0,
  totalDiskon: 0,
  kembalian: 0,
  dataUser:
      {
        company: "",
        created_on: "",
        email: "",
        first_name: "",
        last_login: "",
        last_name: "",
        phone: "",
        username: "",
        warehouse: null,
        warehouse_id: null,
      },
  dataStruk: [],
  }

const setGeneral = (state=initialState, action) => {
  switch(action.type){
    case "SET_GENERAL":

      return {...state, diskon: action.payload};

    case "SET_KAS":

      return {...state, kas: action.payload};

    case "SET_TOTAL_DISKON":

      return {...state, totalDiskon: action.payload};

    case "SET_DATA_USER":


      return {...state, dataUser: action.payload};

    case "SET_DATA_KEMBALIAN":

      return {...state, kembalian: action.payload};
    case "SET_DATA_STRUK":

      return {...state, dataStruk: action.payload};
    
    case "RESET_DATA_GENERAL" :
      
      return {...state, initialState };
      
    default:

      return state;
  }
}

export default setGeneral;
