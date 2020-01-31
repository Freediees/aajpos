import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Container, Header,Content, Footer, FooterTab, Button, Icon, Input, Toast } from 'native-base';
import { Row, Col, Grid} from 'react-native-easy-grid';
import { connect } from 'react-redux';

import { color1, color2, color3, color4, color5 } from './Color';
import { setGeneral, resetData, setTotalDiskon, setDataKembalian, resetDataCustomer } from '../actions';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


var date = new Date().getDate(); //Current Date
var month = new Date().getMonth() + 1; //Current Month
var year = new Date().getFullYear(); //Current Year
var hours = new Date().getHours(); //Current Hours
var min = new Date().getMinutes(); //Current Minutes
var sec = new Date().getSeconds(); //Current Seconds
var day = new Date().getDay(); //Current Seconds

var hari = '';

//console.log(day);

if(day == 1){
  hari = "Senin";
}else if(day == 2){
  hari = "Selasa";
}else if(day == 3){
  hari = "Rabu";
}else if(day == 4){
  hari = "Kamis";
}else if(day == 5){
  hari = "Jumat";
}else if(day == 6){
  hari = "Sabtu";
}else if(day == 7){
  hari = "Minggu";
}

var tanggal = hari + ' ' + date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;


class Struk extends Component{

  renderTransaksi(item){
    //console.log(item);
    return(
      <Row key={item.id} style={{ borderBottomWidth: 1, marginBottom: 10 }}>
        <Col>
          <Row>
            <Col>
              <Text style={ [styles.textStyle, {color: 'black', marginBottom: 5 }]}>#{item.index}: {item.item.name}</Text>
            </Col>
          </Row>
          <Row>
            <Col style={{ alignItems: 'flex-start'}}>
              <Text Text style={ [styles.textStyle, {color: 'black', marginBottom: 5 }]}>{item.item.quantity} x Rp. {item.item.unit_price}</Text>
            </Col>
            <Col style={{ alignItems: 'flex-end'}}>
              <Text Text style={ [styles.textStyle, {color: 'black', marginBottom: 5 }]}>Diskon Rp. {numberWithCommas(item.item.discount)}</Text>
            </Col>
            <Col style={{ alignItems: 'flex-end'}}>
              <Text Text style={ [styles.textStyle, {color: 'black', marginBottom: 5 }]}>Rp. {numberWithCommas(item.item.subtotal - item.item.discount)}</Text>
            </Col>
          </Row>

          {
            // <Row>
            //   <Col style={{ alignItems: 'flex-start'}}>
            //     <Text Text style={ [styles.textStyle, {color: 'black', marginBottom: 5, fontWeight: 'bold' }]}>Total</Text>
            //   </Col>
            //   <Col style={{ alignItems: 'flex-end'}}>
            //     <Text Text style={ [styles.textStyle, {color: 'black', marginBottom: 5, fontWeight: 'bold' }]}>Rp. {numberWithCommas(item.item.subtotal)}</Text>
            //   </Col>
            // </Row>
          }

        </Col>
      </Row>
    );
  }

  renderPayment(item){

    //console.log(item);
    return(
      <Row style={{ marginTop: 5, marginBottom: 5, borderBottomWidth: 1 }}>
        <Col style={{ alignItems: 'flex-start'}}>
          <Text Text style={ [styles.textStyle, {color: 'black', marginTop: 5 }]}>{item.item.paying_by}</Text>
        </Col>
        <Col style={{ alignItems: 'flex-end'}}>
          <Text Text style={ [styles.textStyle, {color: 'black', marginTop: 5 }]}>Jumlah : Rp. {numberWithCommas(item.item.amount)}</Text>
        </Col>
      </Row>
    );
  }

  backToPOS(){
    //console.log('hemeh');
    this.props.setGeneral(0);
    this.props.setTotalDiskon(0);
    this.props.setDataKembalian(0);
    this.props.resetDataCustomer();
    this.props.resetData();
    this.props.navigation.navigate('Home');
  }


  render(){
    console.log("Data Struk adalah : ");
    console.log(this.props.dataGeneral.dataStruk);
    return(
      <ScrollView>
        <View style={ [styles.viewStyle, {paddingBottom: 100}] }>
          <View>
            <Image source={require('./img/logo.png')} style={{ width: 250, height: 110 }} resizeMode={'contain'}/>
          </View>
          <View style={ [styles.viewStyle, { marginBottom: 50 }] }>
            <Text style={[styles.textStyle, {fontSize: 25}]}>{this.props.dataGeneral.dataUser.company}</Text>
            <Text style={[styles.textStyle, {fontSize: 15}]}>{this.props.dataGeneral.dataUser.warehouse.address}</Text>
            <Text style={[styles.textStyle, {fontSize: 15}]}>Telp: {this.props.dataGeneral.dataUser.phone}</Text>
          </View>

          <View style={{ width: 500, justifyContent: 'flex-start' }}>
            <Text style={styles.textStyle}>Tanggal: { this.props.dataGeneral.dataStruk.date}</Text>
            <Text style={styles.textStyle}>Penjualan No : {this.props.dataGeneral.dataStruk.reference_no} </Text>
            <Text style={styles.textStyle}>Kasir : {this.props.dataGeneral.dataStruk.biller}</Text>
            <Text style={styles.textStyle}>Konsumen : {this.props.dataGeneral.dataStruk.customer}</Text>
          </View>


          <Grid style={{ width: 500, marginTop: 50 }}>
          <FlatList
            data={this.props.dataTransaksi}
            renderItem={(item)=>this.renderTransaksi(item)}
          />

          <Row style={{ marginTop: 0}}>
            <Col style={{ alignItems: 'flex-start'}}>
              <Text Text style={ [styles.textStyle, {color: 'black', marginBottom: 5, fontWeight: 'bold' }]}>Subtotal</Text>
            </Col>
            <Col style={{ alignItems: 'flex-end'}}>
              <Text Text style={ [styles.textStyle, {color: 'black', marginBottom: 5, fontWeight: 'bold' }]}>Rp. {numberWithCommas(this.props.dataGeneral.totalDiskon + this.props.dataGeneral.diskon)} </Text>
            </Col>
          </Row>
          <Row style={{ marginTop: 10, borderBottomWidth: 1 }}>
            <Col style={{ alignItems: 'flex-start'}}>
              <Text Text style={ [styles.textStyle, {color: 'black', marginBottom: 5, fontWeight: 'bold' }]}>Diskon : </Text>
            </Col>
            <Col style={{ alignItems: 'flex-end'}}>
              <Text Text style={ [styles.textStyle, {color: 'black', marginBottom: 5, fontWeight: 'bold' }]}>Rp. {numberWithCommas(this.props.dataGeneral.diskon)} </Text>
            </Col>
          </Row>
          <Row style={{ marginTop: 10}}>
            <Col style={{ alignItems: 'flex-start'}}>
              <Text Text style={ [styles.textStyle, {color: 'black', marginBottom: 5, fontWeight: 'bold' }]}>Grand Total</Text>
            </Col>
            <Col style={{ alignItems: 'flex-end'}}>
              <Text Text style={ [styles.textStyle, {color: 'black', marginBottom: 5, fontWeight: 'bold' }]}>Rp. {numberWithCommas(this.props.dataGeneral.totalDiskon)} </Text>
            </Col>
          </Row>


          <Text style={ styles.textStyle }>Dibayar dengan : </Text>
          <FlatList
            data={this.props.payment}
            renderItem={(item)=>this.renderPayment(item)}
          />

          <Row style={{ marginTop: 10}}>
            <Col style={{ alignItems: 'flex-start'}}>
              <Text Text style={ [styles.textStyle, {color: 'black', marginBottom: 5, fontWeight: 'bold' }]}>Sisa</Text>
            </Col>
            <Col style={{ alignItems: 'flex-end'}}>
              <Text Text style={ [styles.textStyle, {color: 'black', marginBottom: 5, fontWeight: 'bold' }]}>Rp. {numberWithCommas(this.props.dataGeneral.kembalian)} </Text>
            </Col>
          </Row>

          </Grid>

          <Text style={[styles.textStyle, {marginTop: 40}]}>Terima kasih telah berbelanja dengan kami</Text>

          <TouchableOpacity style={[styles.viewStyle, {backgroundColor: color1, borderRadius: 5, height: 50, width: 300, marginTop: 50 }]}
            onPress={()=> alert('Koneksikan Printer')}
          >
            <Text style={[styles.textStyle, {color: 'white'}]}>Cetak Struk</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.viewStyle, {backgroundColor: color3, borderRadius: 5, height: 50, width: 300, marginTop: 20 }]}
            onPress={()=> this.backToPOS()}
          >
            <Text style={[styles.textStyle, {color: 'white'}]}>Kembali ke POS</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 18,
    fontFamily: 'Roboto',
    color: 'black',
  }
})
function mapStateToProps(state){
  return {
    dataTransaksi: state.setDataTransaksi,
    dataLibrary: state.setDataList,
    setTotal: state.setTotal,
    dataCustomer: state.setDataCustomer,
    payment: state.setPayment,
    dataGeneral: state.setGeneral,
  };
}

export default connect(mapStateToProps, {resetData, setGeneral, setTotalDiskon, setDataKembalian, resetDataCustomer })(Struk);
