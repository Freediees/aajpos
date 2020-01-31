
import { UPDATE_TRANSAKSI, DELETE_TRANSAKSI, SET_DATA_KEMBALIAN, SET_DATA_USER, SET_TOTAL_DISKON, DELETE_PAYMENT, SET_KAS, SET_GENERAL, UPDATE_PAYMENT, SET_PAYMENT, SET_DATA_CUSTOMER, TAMBAH_DATA, ADD_LIBRARY, TAMBAH_TOTAL, GET_DATA_SALES, RESET_DATA_TRANSAKSI, REMOVE_TRANSAKSI_BY_ID, GET_DATA_DETAIL, PLUS_ONE, MINUS_ONE, ADD_SPG, UPDATE_LIBRARY, SET_DATA_STRUK, RESET_DATA_GENERAL, RESET_DATA_CUSTOMER} from './actionTypes';

export const tambahData = (data, group_id) => ({
  type: TAMBAH_DATA,
  data,
  group_id,
})

export const updateLibrary = (data) => ({
  type: UPDATE_LIBRARY,
  data
})

export const removeTransaksiById = (data) => ({
  type: REMOVE_TRANSAKSI_BY_ID,
  data
})

export const resetData = () => ({
  type: RESET_DATA_TRANSAKSI,
})

export const tambahLibrary = (data) => ({
  type: ADD_LIBRARY,
  data
})

export const tambahTotal = (data) => ({
  type: TAMBAH_TOTAL,
  data
})

export const getDataSales = (data) => ({
  type: GET_DATA_SALES,
  payload: data
})

export const plusOneA = (index) => ({
  type: PLUS_ONE,
  payload: index
})

export const minusOneA = (index) => ({
  type: MINUS_ONE,
  payload: index
})

export const setDataCustomer = (data) => ({
  type: SET_DATA_CUSTOMER,
  payload: data
})


export const setPayment = (data) => ({
  type: SET_PAYMENT,
  payload: data
})

export const updatePayment = (data) => ({
  type: UPDATE_PAYMENT,
  payload: data
})

export const setGeneral = (data) => ({
 type: SET_GENERAL,
 payload: data
})

export const setKas = (data) => ({
  type: SET_KAS,
  payload: data
})

export const deletePayment = (data) => ({
  type: DELETE_PAYMENT,
  payload: data
})

export const setTotalDiskon = (data) => ({
  type: SET_TOTAL_DISKON,
  payload: data
})

export const setDataUser = (data) => ({
  type: SET_DATA_USER,
  payload: data
})

export const setDataKembalian = (data) => ({
  type: SET_DATA_KEMBALIAN,
  payload: data
})

export const resetDataGeneral = () => ({
  type: RESET_DATA_GENERAL,
})

export const resetDataCustomer = () => ({
  type: RESET_DATA_CUSTOMER,
})


export const cariBarang = (text) => {
  return async dispatch => {
    try{
      let response = await fetch(`http://mpos-dev.bursasajadah.com/api/v1/products?query=${text}&api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s`)
      let json = await response.json();

      //console.log(json.data);

      dispatch(updateLibrary(json));

    }catch(error){
      console.log(error);
    }
  }
}

export const testThunk = () => {
  return async dispatch => {

    try{
      //let response = await fetch('http://mpos-dev.bursasajadah.com/api/v1/sales?api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s');
      //let response = await fetch('http://10.250.1.68/test/index.php/api/transaksi/transaksi');

      let response = await fetch('http://mpos-dev.bursasajadah.com/api/v1/sales/?api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s&&limit=2')
      let json = await response.json();


      //console.log(json);

      dispatch(getDataSales(json));

    }catch(error){
      console.log(error);
    }
  }
}

export const setDataStruk = (data) => ({
  type: SET_DATA_STRUK,
  payload: data
})


export const getDataDetail = (data) => ({
  type: GET_DATA_DETAIL,
  payload: data
})

export const addSPGA = (data) => ({
  type: ADD_SPG,
  payload: data
})

export const updateTransaksi = (data) => ({
  type: UPDATE_TRANSAKSI,
  payload: data
})

export const deleteTransaksi = (index, data) => {
  return async dispatch => {
    try{

      //console.log(data);

      var a = [];
      for(var i = 0; i< data.length; i++){
        if(i != index){
          a.push(data[i]);
        }
      }

      //console.log(a);

      dispatch(updateTransaksi(a));

    }catch(e){
      console.log(e);
    }
  }
}


export const plusOne = (index,data,group_id) => {
  return async dispatch => {

    try{


      let a = data[index];
      //console.log(group_id);

      var totalDiskon = 0;
      if(group_id == 1){
        totalDiskon = 0;
      }else if(group_id == 6){
        totalDiskon = 10;
      }

      a.quantity = a.quantity + 1;
      a.subtotal = a.quantity * a.unit_price;
      a.discount = a.subtotal * totalDiskon / 100;


      data[index] = a;

      dispatch(plusOneA(data));

      //console.log(data);


    }catch(error){
      console.log(error);
    }
  }
}

export const plusAmount = (index,data,amount, group_id) => {
  return async dispatch => {

    try{

      //console.log(to)


      var totalDiskon = 0;
      if(group_id == 1){
        totalDiskon = 0;
      }else if(group_id == 6){
        totalDiskon = 10;
      }


      var a = data[index];
      a.quantity = parseInt(amount);
      a.subtotal = a.quantity * a.unit_price;
      a.discount = a.subtotal * totalDiskon / 100;

      var b = data;
      b[index] = a;


      dispatch(plusOneA(b));

      //console.log(data);


    }catch(error){
      console.log(error);
    }
  }
}

export const minusOne = (index,data) => {
  return async dispatch => {

    try{

      let a = data[index];

      if(a.quantity > 1){
        a.quantity = a.quantity - 1;
        a.subtotal = a.quantity * a.unit_price;
      }

      data[index] = a;

      dispatch(minusOneA(data));


    }catch(error){

    }
  }
}



export const getDetails = (id) => {
  return async dispatch => {
    try{

      //console.log(id);

      let response = await fetch(`http://mpos-dev.bursasajadah.com/api/v1/sales?reference=${id}&api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s&include=items`);
      let json = await response.json();

      //console.log(json);

      dispatch(getDataDetail(json));

    }catch(error){

    }
  }
}

export const addSPG = (person,index, data) => {
  return async dispatch => {
    try{


      let c = data[index];

      c.spg = person;

      data[index] = c;


      //console.log(data);

      dispatch(addSPGA(data));

    }catch(error){

    }
  }
}

export const removeDataTransaksi = (data) => {
  return async dispatch => {
    try{

      var array = await data.hemeh1; // make a separate copy of the array
      var index = await array[data.hemeh2];


      if (index !== -1) {

        array.splice(index, 1);

        dispatch(removeTransaksiById(array));
        //console.log(array)
        //state = array;
      }
    }catch(error){

    }
  }
}

export const setFromBill = (index, data) => {

  return async dispatch => {
    try{

      //console.log(index);
      //console.log(data);

      dispatch(plusOneA(data.data));

    }catch(error){

    }
  }

}
