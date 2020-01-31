const initialState = [];
var count = 0;

const setDataTransaksi = (state=[], action) => {
  switch(action.type){

    case 'TAMBAH_DATA':
      console.log(action.data);
      console.log(action.group_id);

      // let qty = 0;
      // if(action.data.warehouses != false){
      //   qty = action.data.warehouses[0].quantity;
      //   qty = parseInt(qty);
      // }else{
      //   qty = 0;
      // }

      console.log('Jadi: ');
      console.log(action);


      var totalDiskon = 0;

      if(action.group_id == 1){
        totalDiskon = 0;
      }else if(action.group_id == 6){
        totalDiskon = parseInt(parseInt(action.data.price)) * 10 /100;
      }

      var harga_fix = 0;
      if(action.data.promo_price == 0){
        harga_fix = action.data.unit_price;
      }else{
        alert('Barang promo');
        harga_fix = action.data.promo_price;
      }


      count = count + 1;

      return [
        ...state, {
          id: action.data.id,
          name: action.data.name,
          option: 'a',
          real_unit_price: action.data.price,
          unit_price: harga_fix,
          quantity: 1,
          serial: action.data.code,
          discount: totalDiskon,
          subtotal: action.data.price,
          spg: 'SPG',
          index: count,
        }
      ]

    case 'RESET_DATA_TRANSAKSI':

      count = 0;
      state = initialState;

      return state;

    case 'REMOVE_TRANSAKSI_BY_ID':

      return action.data;

    case 'PLUS_ONE':

      let a = action.payload;

      console.log(a);

      return [...state = a];

    case 'MINUS_ONE':

      let b = action.payload;
      return [...state = b];

    case 'ADD_SPG':

      let c = action.payload;

      return [...state = c ];

    case 'UPDATE_TRANSAKSI':

      console.log(action.payload);

      return [...state = action.payload];

    default:

      return state;
  }
}

export default setDataTransaksi;
