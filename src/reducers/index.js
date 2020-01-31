import {combineReducers} from 'redux';

import setDataTransaksi from './setDataTransaksi';
import setDataList from './setDataList';
import setTotal from './setTotal';
import setGetDataSales from './setGetDataSales';
import setDataDetail from './setDataDetail';
import setDataCustomer from  './setDataCustomer';
import setPayment from './setPayment';
import setGeneral from './setGeneral';

export default combineReducers({
  setDataTransaksi,
  setDataList,
  setTotal,
  setGetDataSales,
  setDataDetail,
  setDataCustomer,
  setPayment,
  setGeneral
})
