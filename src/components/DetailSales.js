import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ListItem, Icon, Left, Right, Body, Switch } from 'native-base';

import { color1, color2, color3, color4, color5 } from './Color';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


class List extends Component{



  componentDidMount(){
    //console.log(this.props);
  }
  render(){
    return(
      <ListItem icon>
        <Left>
            <Icon name={this.props.icons} />
        </Left>
        <Body>
          <Text>{this.props.judul}</Text>
        </Body>
        <Right>
          <Text>{this.props.value}</Text>
        </Right>
      </ListItem>
    );
  }
}

class DetailSales extends Component{

  constructor(props){
    super(props)
    this.state = {
      refund: false,
      listRefund: true,
    }
  }

  componentDidMount(){

    this.setState({
      refund: false
    })
  }



  renderRefund =()=> {

    //console.log(this.state.refund);

    let cik = <Text></Text>

    if(this.state.refund){
      cik = <Switch
      value={this.state.listRefund}
      trackColor={ 'red', 'black'} color='blue'
      onValueChange = { ()=> this.setState({ listRefund: !this.state.listRefund })}
      />
      //cik = <View style={{ marginLeft: 20, width: 100, height: 40, backgroundColor: '#D32F2F', justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 5 }}><Text style={ [styles.textStyle], { color: 'white'} }>Refund</Text></View>
    }else{
      cik = <Text style={ [styles.textStyle], {marginLeft: 20} }></Text>
    }

    return cik;
  }

  renderDataItem(data){

    //console.log(data);

    let a = data.map(item=>{


    var unit_price = item.unit_price.slice(0, -5);
    return(
    <View key={item.product_id} style={{ margin: 10, marginBottom: 20 }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={ styles.textStyle }>{item.product_name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
          <Text style={ styles.textStyle }>Rp. {numberWithCommas(unit_price)}</Text>
          {this.renderRefund()}
        </View>

      </View>
    </View>
    )

    });

    return a;

  }

  onPressButton = () => {
    this.setState({
      refund: !this.state.refund
    })
  }

  onCetakButton = () => {
    alert('Printer Tidak Terhubung');
  }

  onReturn = (datareal) => {
    console.log(datareal);
    //alert("hello world");

    let objData = {
      id: datareal.id,
      date: datareal.date,
      reference_no: datareal.reference_no,
      note: datareal.note,
      user_id: datareal.biller_id,
      paid_by: datareal.payment_method,
      pcc_no: 1,
      pcc_holder: 1,
      pcc_type: 1,
      pcc_month: 1,
      pcc_year: 1,
      pcc_ccv: 1,
      cheque_no: 1,
      gift_card_no: 1,
      amount_paid:datareal.paid,
      order_tax: datareal.total_tax,
      discount: datareal.total_discount,
      payment_reference_no: ""
    };

    console.log(JSON.stringify(objData));


    // const opt = {
    //     headers: {'Content-Type': 'application/json', 'api-key':'kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s'},
    //     url: 'https://mpos-dev.bursasajadah.com/api/v1/retur_sales',
    //     data: objData,
    //     method: 'post'
    // }

    // axios(opt)
    // .then((res) =>
    //   {
    //       //console.log(res);
    //       this.props.setDataStruk(res.data.data.sales);
    //       this.props.setDataKembalian(this.state.kembalian);
    //       this.props.changeModalVisibility(false, 7);
    //       this.props.navigation.navigate('Struk');
    //     alert('Berhasil');
    //   }
    // ).catch((error) => {
    //     console.log(error);
    
    //     alert("Terjasi kesalahan");
    // });


  }

  renderButtonKonfirmasi(datareal){

    

    if(this.state.refund){

      //console.log(datareal);

      return(

        <TouchableOpacity style={styles.konfirmasiStyle} onPress={ this.onReturn.bind(this, datareal) }>
          <Text style={ styles.konfimasiTeks }>Konfirmasi Return Barang</Text>
        </TouchableOpacity>

      );
    }

    return <View></View>;
  }
  render(){
      //console.log(this.props);

      const datareal = this.props.data;

      //console.log("hemeh");
      //console.log(datareal.items);
      var grand_total = 0;
      if(datareal.grand_total != null){
        grand_total = datareal.grand_total.slice(0, -5);
      }
      return(
        <ScrollView style={ styles.viewStyles }>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 20, borderBottomWidth: 1}}>
            <TouchableOpacity style = {[styles.buttonStyle, { backgroundColor: '#D32F2F'}]} onPress={ this.onPressButton.bind()}>
              <Text style={[ styles.text, { color: 'white'}]}>Refund</Text>
            </TouchableOpacity>
            <View style = {[styles.buttonStyle, { backgroundColor: '#0288D1'}]}>
              <Text style={[ styles.text, { color: 'white'}]}>Kirim Invoice</Text>
            </View>
            <TouchableOpacity style = {styles.buttonStyle} onPress={ this.onCetakButton.bind() }>
              <Text style={[ styles.text, { color: 'white'}]}>Cetak Invoice</Text>
            </TouchableOpacity>
          </View>
          <Text style={ [styles.teks], {padding: 10} }>Details</Text>

          <View style={ styles.content }>
              <List icons="home" judul="Payment Method" value={datareal.payment_method || ""}/>
              <List icons="wifi" judul="Invoice" value={datareal.reference_no}/>
              <List icons="call" judul="Time of Purchase" value={datareal.date}/>
              <List icons="cart" judul="Due In" value={datareal.due_date || ""}/>
              <List icons="calculator" judul="Status" value={datareal.sale_status}/>
              <List icons="paper" judul="Customer" value={datareal.customer}/>
              <List icons="ios-add" judul="Grand Total" value={'Rp. ' + numberWithCommas(grand_total)}/>
          </View>

          <View style={{ borderTopWidth: 1, borderBottomWidth: 1, marginTop: 10, marginBottom: 10}}>
            <Text style={ [styles.teks], {padding: 10} }>Product</Text>
          </View>

          <View>
            {this.renderDataItem(datareal.items || [])}
          </View>

          {this.renderButtonKonfirmasi(datareal)}


        </ScrollView>
      );
  }
}

export default DetailSales;

const styles = StyleSheet.create({
  viewStyles: {
    flex: 1,
    width: '100%',
    paddingTop: 0,
  },
  header: {
    width: '100%',
    flexDirection:'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    paddingBottom: 20
  },
  button: {
    borderColor: 'green',
    borderWidth: 1,
    width: 140,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  teks: {
    fontSize: 15,
    fontFamily: 'Roboto'
  },
  content: {
    borderTopWidth: 1,
    paddingTop: 10,
    borderTopWidth: 1
  },
  buttonStyle: {
    backgroundColor:  color3,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 100,
    borderRadius: 5,
    margin: 10,
    elevation: 3
  },
  konfirmasiStyle: {
    backgroundColor: '#0288D1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    elevation: 1,
  },
  konfimasiTeks: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Roboto',
  },
});
