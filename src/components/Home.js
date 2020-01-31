import React, { Component} from 'react';
import { AppState, View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, AsyncStorage, DeviceEventEmitter } from 'react-native';
import { Container, Header,Content, Footer, FooterTab, Button, Icon, Input, Toast } from 'native-base';
import { Row, Col, Grid} from 'react-native-easy-grid';
import { connect } from 'react-redux';
import axios from 'axios';
import { deleteTransaksi, setGeneral, setTotalDiskon, tambahData, tambahLibrary, tambahTotal, resetData, removeTransaksiById, removeDataTransaksi, plusOne, minusOne, cariBarang } from '../actions';
import SimpleModal from './SimpleModal';
import ModalSPG from './ModalSpgDiskon';
import ModalSimpanBill from './ModalSimpanBill';
import ModalListBill from './ModalListBill';
import ModalCustomer from './ModalCustomer';
import ModalDiskon from  './ModalDiskon';
import ModalSetQty from  './ModalSetQty';


import { StarPRNT } from 'react-native-star-prnt';

let emulation = 'StarPRNT';
let portName = '';
let commands = [];
var nama = "Naruto";

commands.push({appendAlignment: StarPRNT.AlignmentPosition.Center});
commands.push({append: "Bursa Sajadah\n" + nama + "Menyelamatkan desa konoha"});
commands.push({appendCutPaper:StarPRNT.CutPaperAction.PartialCutWithFeed});



const data=[
  {key:"Jason1"},
  {key:"Jason2"},
  {key:"Jason3"},
];


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


let totalNilai = 0;

import { color1, color2, color3, color4, color5 } from './Color';


class Home extends Component{

  constructor(props){
    super(props)
    link_url = "http://mpos-dev.bursasajadah.com/api/v1/products?api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s";
    this.state= {
      data: [],
      transaksi: [],
      isModalVisible: false,
      testModal: <View></View>,
      tempBill: [],
      indexTemp: '',
      diskon: 0,
      appState: AppState.currentState,
      statusWifi: false,
      statusBluetooth: false,
      statusPrinter: false,
    }
  }


  connectx = async() => {

    console.log(portName);
    console.log(emulation);

    try {
      var connectx = await StarPRNT.connect(portName, emulation, true);
      //console.log('hemeh');
      this.setState({
        statusPrinter: true,
      })
      //console.log(connectx); // Printer Connected!
    } catch (e) {
      console.log('error broh');
      await this.connectx();
      //console.error(e);
    }
  }

  componentWillUnmount(){
    AppState.removeEventListener('change', this._handleAppStateChange);
    if(this.listener) this.listener.remove();
  }

  portDiscovery = async() => {
    try {
      let printers = await StarPRNT.portDiscovery('All');
      console.log(printers);
      return printers;
    } catch (e) {
      console.error(e);
    }
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      this.connectx();
    }
    this.setState({appState: nextAppState});
  }

  print = async() => {
    try {
      var printResult = await StarPRNT.print(emulation, commands, portName);
      console.log(printResult); // Success!
    } catch (e) {
      console.error(e);
    }
  }

  onScanBarcode(sku){

    //let sku_temp = '1160300204059';
    //console.log('sku adalah : ' + sku);
    axios.get(`http://mpos-dev.bursasajadah.com/api/v1/products?query=${sku}&api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s`)
      .then(
        (res)=>{
          console.log('Respon Data');
          //console.log(res.data.data[0]);
          this.onTestClickItem(res.data.data[0]);
          //console.log(abc);
        }
      )
      .catch((error) => {
          alert('Produk tidak ditemukan');
          console.log(error);
      });
  }

  componentDidMount = async() => {

    //console.log(this.props.dataGeneral);

    AppState.removeEventListener('change', this._handleAppStateChange);
    if(this.listener) this.listener.remove();


    //AppState.addEventListener('change', this._handleAppStateChange);
    //let printers = await this.portDiscovery();
    //console.log(printers);
    // if(printers != null){
    //   portName = printers[0].portName;
    //   this.connectx();
    // }

    this.listener = Platform.select({
      android: () => {
        //console.log(e)
        DeviceEventEmitter.addListener('starPrntData', e => {
          console.log(e.dataType);
          if(e.dataType == "barcodeDataReceive"){
            //alert(e.data);
            this.onScanBarcode(e.data);
            //this.onScanBarcode(e.data);
          }
        });
        return DeviceEventEmitter.addListener('starPrntData', e => console.log(e))
      },
    })();


    //console.log('sini');
    this._getData();

    axios.get("http://mpos-dev.bursasajadah.com/api/v1/products?api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s")
      .then(
        (res)=>{

          this.props.tambahLibrary(res);

        }
      )
      .catch((error) => {
          console.log(error);
      });
  }

  onSetDiskon = (value) => {

    //console.log('beres bos ' + value);
    this.setState({
      diskon: value
    })
  }

  onClickItem(data){

    var temp = this.state.transaksi.concat(data);
    this.setState({ transaksi: temp });

  }

  onTestClickItem(data){

    //console.log('ListData');
    //console.log(data);
    var group_id = this.props.dataCustomer.customer_group_id;
    //console.log(this.props.dataTransaksi);

    let status = 0;
    let index = 0;
    for(i=0;i<this.props.dataTransaksi.length;i++){
      if(data.id == this.props.dataTransaksi[i].id){
        status = 1;
        index = i;
      }
    }

    //console.log(data);

    if(status == 0){
      this.props.tambahData(data, group_id);
    }else{
      this.props.plusOne(index, this.props.dataTransaksi, group_id);
    }


    let a = this.hitungTotal();
    //console.log(a);
  }


  hitungTotal(){
    let a = this.props.dataTransaksi.length;
    //console.log(a);

    totalNilai = 0;
    let i = 0;
    for(i=0;i<a;i++){
      totalNilai = totalNilai + parseInt(this.props.dataTransaksi[i].subtotal, 10);
    }

    let persen = this.state.diskon;
    let besardiskon = persen * totalNilai / 100;

    totalAkhir = totalNilai - besardiskon

    return totalAkhir;
  }

  plusButton = (index, data, b) => {
    //console.log(index);
    //console.log(data);

    this.props.plusOne(index, data);
  }

  minusButton = (index, data, b) => {
    this.props.minusOne(index,data);
  }

  clearAll = () => {
    this.props.setGeneral(0);
    this.props.resetData();
  }

  cetakBill = () => {

    //alert("Tidak ada koneksi ke printers");

    this.print();
  }

  deleteTransaksi(index){
    //console.log()
    this.props.deleteTransaksi(index, this.props.dataTransaksi);
  }



  renderItem(item){
    //console.log(item);

    let qty = 0;
    if(item.item.warehouses != false){

      let status = 0;
      let i = 0;
      while(status == 0 && i< item.item.warehouses.length){

        if(this.props.dataGeneral.dataUser.warehouse_id == item.item.warehouses[i].id){
          status = 1;
          qty = item.item.warehouses[i].quantity;
        }

        i++;
      }

      if(status == 0){
        qty = 0;
      }

      //qty = item.item.warehouses[0].quantity;
      qty = parseInt(qty);
    }else{
      qty = 0;
    }

    return(
      <TouchableOpacity style={{ padding: 10, marginBottom: 10, justifyContent: "space-between", flexDirection: "row", borderBottomWidth: 1, borderColor: "#E9EDEC" }} onPress={()=> {this.onTestClickItem(item.item);}}>
        <Text style={styles.text}>{item.item.name} ({qty})</Text>
        <Icon type="AntDesign" name="right" style={{ color: 'grey', fontSize: 20 }}/>
      </TouchableOpacity>
    );
  }

  renderTransaksi(item){
    //console.log(item);
    return(
      <Row style={{ borderBottomWidth: 0.5, borderColor: '#E9EDEC', marginLeft: 2, marginRight: 2 }} onPress={()=> this.changeModalVisibility(true, 5, item.index)}>
        <Col size={4} style={{ padding: 10, justifyContent: 'center' }}>
          <Text style={styles.text}>{item.item.name}</Text>
        </Col>
        <Col size={3} style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
          <Text style={styles.text}>Rp. {numberWithCommas(item.item.unit_price)}</Text>
        </Col>
        <Col size={1} style={{ padding: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
            <TouchableOpacity style={{ height: 30, width: 30, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderColor: color3, borderWidth: 0.5}} onPress={()=> this.changeModalVisibility(true, 8, item.index)}>
               <Text style={[styles.text, {fontSize: 17 }]}>{item.item.quantity}</Text>
            </TouchableOpacity>
        </Col>
        <Col size={3} style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
          <Text style={styles.text}>Rp. {numberWithCommas(item.item.discount)}</Text>
        </Col>
        <Col size={3} style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
          <Text style={styles.text}>Rp. {numberWithCommas(item.item.subtotal - item.item.discount)}</Text>
        </Col>
        <Col size={3} style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 2 }}>
          <Text style={styles.text}>{item.item.spg}</Text>
        </Col>
        <Col size={1} style={{ padding: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
            <TouchableOpacity style={{ height: 20, width: 20, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}} onPress={()=> this.deleteTransaksi(item.index)}>
               <Text style={[styles.text, {fontSize: 15, fontWeight: 'bold', color: 'white' }]}>X</Text>
            </TouchableOpacity>
        </Col>
      </Row>
    );
  }

  onCheckout = () => {
    //console.log('oke bos');
    let a = this.hitungTotal();

    //console.log(a);
    //this.changeModalVisibility(true, 1);

    if(a <= 0){

      Toast.show({
        text: 'Keranjang Kosong',
        buttonText: 'OK'
      });

    }else if(this.props.dataCustomer.person == ""){
      Toast.show({
        text: 'Silahkan Pilih Customer Dahulu',
        buttonText: 'OK'
      })
    }else{
      this.props.setTotalDiskon(this.hitungDiskon());
      this.changeModalVisibility(true, 1);
    }
  }
  changeModalVisibility=(bool, data, index)=>{
    //console.log('data adalah : ' + data)

    if(data == 1){
      this.setState({ testModal: <SimpleModal changeModalVisibility={this.changeModalVisibility} totalHarga={this.props.setTotal} navigation={this.props.navigation}/>})
    }else if(data == 2){
      this.setState({ testModal: <ModalListBill changeModalVisibility={this.changeModalVisibility}  tempBill={this.state.tempBill} />})
    }else if(data == 3){
      this.setState({ testModal: <ModalSimpanBill changeModalVisibility={this.changeModalVisibility} tempBill={this.state.tempBill} />})
    }else if(data == 4){
      this.setState({ testModal: <ModalCustomer changeModalVisibility={this.changeModalVisibility} navigation={this.props.navigation} />})
    }else if(data == 5){
      this.setState({ testModal: <ModalSPG changeModalVisibility={this.changeModalVisibility} navigation={this.props.navigation} indexSPG={index}/>})
    }else if(data == 6){
      this.setState({ testModal: <ModalDiskon changeModalVisibility={this.changeModalVisibility} onButtonPress={ this.onSetDiskon }/>})
    }else if(data == 8){
      this.setState({ testModal: <ModalSetQty changeModalVisibility={this.changeModalVisibility} indexItem={index}/>})
    }

    this.setState({ isModalVisible: bool });
  }



  cekButton(){
    let hitung = this.hitungTotal();
    this.props.tambahTotal(hitung);
  }

  updateData = () => {
    let arr  = this.props.dataTransaksi;

    let dataFix = arr.map(el => {
      //console.log(el);
      el.id==='3'? {...el, name: 'hemeh'}: el
    })

    //console.log(dataFix);
  }

  simpanBill = () => {
    //console.log('simpanBill ok')
  }

  _getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Data');
      if (value !== null) {
        // We have data!!
        let data = JSON.parse(value);
        this.setState({
            tempBill: data
        })
      }else{
        this.setState({
          tempBill: []
        })
      }
    } catch (error) {
      // Error retrieving data
    }
  }


  onCariBarang = (text) => {
    this.props.cariBarang(text);
  }

  hitungDiskon=()=>{

    let total = this.hitungTotal();

    let pjgDiskon = this.props.dataTransaksi.length;
    //console.log(a);

    let diskon = 0;
    let i = 0;
    for(i=0;i<pjgDiskon;i++){
      diskon = diskon + parseInt(this.props.dataTransaksi[i].discount, 10);
    }


    let final = total  - diskon;
    final  = final - this.props.dataGeneral.diskon;

    return final;

  }

  render(){

    //console.log(this.props.dataGeneral);

    this.cekButton();

    let statusPrinter = <Text style={{ color: 'red', marginRight: 20 }}>Disconnected</Text>
    if(this.state.statusPrinter){
      statusPrinter = <Text style={{ color: 'green', marginRight: 20 }}>Connected</Text>
    }
    //console.log(this.props.dataLibrary);
    //console.log(this.props.setTotal);
    //console.log(this.props.dataTransaksi);
    //console.log(this.props.setGeneral);

    const { col1, col2 } = styles;
    return(
      <Container style={{backgroundColor: '#E9EDEC', paddingTop: 10}}>
        <Grid>
          <Col size={1} style={{margin: 10, marginRight: 0, paddingLeft: 10, paddingRight: 10}}>
            <Row style={{ height: 50, marginBottom: 8, backgroundColor: '#FFFFFF' }}>
              <View style={{ flex: 1 , justifyContent: "space-between", alignItems: 'center', flexDirection: 'row', paddingLeft: 16, paddingRight: 16}}>
                <Input placeholder="Cari Barang"
                onChangeText={( text )=> this.onCariBarang(text) }
                />
              </View>
            </Row>

            <Row style={{ height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', padding: 10, borderBottomWidth: 1, borderColor: 'grey'}}>
                <Text style={styles.text}>Library</Text>
            </Row>
            <Row style={{ backgroundColor: '#ffffff'}}>
              <Grid style={{ padding: 10, margin: 0}}>
                <FlatList
                  data={this.props.dataLibrary.dataList}
                  renderItem={(item)=>this.renderItem(item)}
                />
              </Grid>
            </Row>
          </Col>
          <Col size={2} style={{backgroundColor:'white', borderRadius: 0, margin: 10, marginRight: 20, marginLeft: 0}}>
            <Row style={{ height: 30 }}>
              <Col style={{ alignItems: 'flex-end', justifyContent: 'center', paddingRight: 10 }}>
                <View style={{ flexDirection: 'row'}}>

                <Text>Printer Status : </Text>
                {statusPrinter}

                <Text>Wifi Status : </Text>
                <Text style={{ color: 'green', marginRight: 20 }}>Connected</Text>

                <Text>Bluetooth Status : </Text>
                <Text style={{ color: 'red'}}>Disconnected</Text>
                </View>
              </Col>
            </Row>
            <Row style={{height: 80}}>
                <Col size={1} style={{ backgroundColor: color3, borderTopLeftRadius: 10 }}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={()=> this.changeModalVisibility(true, 2)}>
                  <Icon type="Entypo" name="list" style={{ color: 'white', fontSize: 40}}/>
                  </TouchableOpacity>
                </Col>
                <Col size={3} style={{ backgroundColor: color2, borderTopRightRadius: 10 }}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={()=> this.changeModalVisibility(true, 4)}>
                    <Text style={{ fontSize: 25, color: '#ffffff' }}>+Customer {": " + this.props.dataCustomer.person} </Text>
                  </TouchableOpacity>
                </Col>
            </Row>
            <Row style={{ height: 35, backgroundColor: color1}}>
              <Col size={4} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={ [styles.text , {color: 'white'}]}>Produk</Text>
              </Col>
              <Col size={3} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={ [styles.text , {color: 'white'}]}>Harga</Text>
              </Col>
              <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={ [styles.text , {color: 'white'}]}>QTY</Text>
              </Col>
              <Col size={3} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={ [styles.text , {color: 'white'}]}>Diskon</Text>
              </Col>
              <Col size={3} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={ [styles.text , {color: 'white'}]}>Subtotal</Text>
              </Col>
              <Col size={3} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={ [styles.text , {color: 'white'}]}>SPG</Text>
              </Col>
              <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={ [styles.text , {color: 'white'}]}></Text>
              </Col>
            </Row>
            <Row>
              <FlatList
                data={this.props.dataTransaksi}
                renderItem={(item)=>this.renderTransaksi(item)}
              />
            </Row>

            <Row style={{ height: 40, borderTopWidth: 1}}>
              <Col style={{ backgroundColor: 'white', margin: 1, height: 40, justifyContent: 'center', paddingLeft: 10 }}>
                <Text style={[styles.text,{ fontSize: 20 }]}>Total Diskon : Rp.{numberWithCommas(this.props.dataGeneral.diskon)}</Text>
              </Col>
            </Row>

              <Row style={{ height: 40,}}>
                <Col style={{ backgroundColor: color1, margin: 1 }}>
                  <TouchableOpacity style={{ flex: 1, justifyContent:'center', alignItems:'center'}} onPress={ ()=> this.changeModalVisibility(true, 3)}>
                    <Text style={[styles.text , {color: '#ffffff'}]}>Simpan Bill</Text>
                  </TouchableOpacity>
                </Col>
                <Col style={{ backgroundColor: color1, margin: 1 }}>
                <TouchableOpacity style={{ flex: 1, justifyContent:'center', alignItems:'center'}} onPress={ this.cetakBill.bind(this)}>
                  <Text style={[styles.text , {color: '#ffffff'}]}>Cetak Bill</Text>
                </TouchableOpacity>
                </Col>
              </Row>
              <Row style={{ height: 40,}}>
                <Col style={{ backgroundColor: color1, margin: 1 }}>
                  <TouchableOpacity style={{ flex: 1, justifyContent:'center', alignItems:'center'}} onPress={ ()=> this.changeModalVisibility(true, 6)}>
                    <Text style={[styles.text , {color: '#ffffff'}]}>Set Diskon</Text>
                  </TouchableOpacity>
                </Col>
                <Col style={{ backgroundColor: color1, margin: 1 }}>
                <TouchableOpacity style={{ flex: 1, justifyContent:'center', alignItems:'center'}} onPress={this.clearAll.bind(this)}>
                  <Text style={[styles.text , {color: '#ffffff'}]}>Hapus Daftar</Text>
                </TouchableOpacity>
                </Col>
              </Row>
              <Row style = {{ backgroundColor: color3, height: 60, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                <Col>
                  <TouchableOpacity style={{ flex: 1, justifyContent:'center', alignItems:'center'}} onPress={()=> {this.onCheckout()}}>
                    <Text style={{ fontSize: 30, color: '#ffffff' }}>Total Rp.{numberWithCommas(this.hitungDiskon())}</Text>
                    {
                      //<Text style={{ fontSize: 30, color: '#ffffff' }}>{this.hitungDiskon()}</Text>
                    }
                  </TouchableOpacity>
                </Col>
              </Row>

          </Col>
        </Grid>

          <View style={{ height: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Grid>
              <Row>
                <Col style={{ backgroundColor: color2, width: 80}}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', paddingLeft: 20 }} onPress={()=> this.props.navigation.openDrawer()}>
                    <Icon type="Entypo" name="menu" style={{ color: 'white', fontSize: 40}} />
                  </TouchableOpacity>
                </Col>
                <Col style={{ backgroundColor: color2}}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.props.navigation.navigate('Favorites')} }>
                    <Icon type="Ionicons" name="md-star" style={{ color: 'white', fontSize: 40}} />
                    <Text style={{ fontFamily: "Roboto", fontSize: 15, color: 'white'}}>Transaksi</Text>
                  </TouchableOpacity>
                </Col>
                <Col style={{ backgroundColor: color3}}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon type="Entypo" name="list" style={{ color: 'white', fontSize: 40}}/>
                    <Text style={{ fontFamily: "Roboto", fontSize: 15, color: 'white'}}>Library</Text>
                  </TouchableOpacity>
                </Col>
                <Col style={{ backgroundColor: color2}}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.props.navigation.navigate('Inventory')} }>
                    <Icon type="Ionicons" name="md-calculator" style={{ color: 'white', fontSize: 40}}/>
                    <Text style={{ fontFamily: "Roboto", fontSize: 15, color: 'white'}}>Inventory</Text>
                  </TouchableOpacity>
                </Col>
              </Row>
            </Grid>
          </View>


          <Modal animationType="slide" transparent={true} visible={this.state.isModalVisible} onRequestClose={()=> this.setState({ isModalVisible: false })}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              {this.state.testModal}
              </View>
          </Modal>


      </Container>
    );
  }
}

export default connect(mapStateToProps, {deleteTransaksi, setGeneral, setTotalDiskon, cariBarang, tambahData, tambahLibrary, tambahTotal, resetData, removeTransaksiById, removeDataTransaksi, plusOne, minusOne})(Home);

function mapStateToProps(state){
  return {
    dataTransaksi: state.setDataTransaksi,
    dataLibrary: state.setDataList,
    setTotal: state.setTotal,
    dataCustomer: state.setDataCustomer,
    dataGeneral: state.setGeneral,
  };
}

// function mapDispatchToProps(dispatch){
//   return{
//     setDataList: ()=> dispatch({ type: "SET_DATA_LIST" }),
//     setDataTransaksi: ()=> dispatch({ type: "SET_DATA_TRANSAKSI "}),
//   }
// }

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto",
    fontSize: 15,
    color: 'grey'
  },
  col1: {
    flex: 2,
    justifyContent: "center",
    alignItems:"center",
    padding: 10
  },
  col2: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
    padding: 10
  }
});
