import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { Card, Left, Right, Body, CardItem, Container, Icon, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';

import { getDataSales, testThunk, getDetails, tambahLibrary, cariBarang } from '../actions';

import axios from 'axios';

import DetailSales from './DetailSales';
import { color1, color2, color3, color4, color5 } from './Color';

const data = [
  {id: 1, nama_barang: 'Sajadah Sujud', merk: 'Sykava', kategori:'Sajadah', biaya: 10000, harga: 12000, alert: 1, stock: 100},
  {id: 2, nama_barang: 'Mukena',merk: 'Sykava', kategori:'Sajadah', biaya: 10000, harga: 12000, alert: 1, alert: 2, stock: 20},
  {id: 3, nama_barang: 'Sarung',merk: 'Sykava', kategori:'Sajadah', biaya: 10000, harga: 12000, alert: 1, alert: 2, stock: 20},
  {id: 4, nama_barang: 'Peci',merk: 'Sykava', kategori:'Sajadah', biaya: 10000, harga: 12000, alert: 1, alert: 2, stock: 20},
  {id: 5, nama_barang: 'Sajadah Sujud', merk: 'Sykava', kategori:'Sajadah', biaya: 10000, harga: 12000, alert: 1, stock: 100},
  {id: 6, nama_barang: 'Mukena',merk: 'Sykava', kategori:'Sajadah', biaya: 10000, harga: 12000, alert: 1, alert: 2, stock: 20},
  {id: 7, nama_barang: 'Sarung',merk: 'Sykava', kategori:'Sajadah', biaya: 10000, harga: 12000, alert: 1, alert: 2, stock: 20},
  {id: 8, nama_barang: 'Peci',merk: 'Sykava', kategori:'Sajadah', biaya: 10000, harga: 12000, alert: 1, alert: 2, stock: 20},
  {id: 9, nama_barang: 'Sajadah Sujud', merk: 'Sykava', kategori:'Sajadah', biaya: 10000, harga: 12000, alert: 1, stock: 100},
  {id: 10, nama_barang: 'Mukena',merk: 'Sykava', kategori:'Sajadah', biaya: 10000, harga: 12000, alert: 1, alert: 2, stock: 20},
  {id: 11, nama_barang: 'Sarung',merk: 'Sykava', kategori:'Sajadah', biaya: 10000, harga: 12000, alert: 1, alert: 2, stock: 20},
  {id: 12, nama_barang: 'Peci',merk: 'Sykava', kategori:'Sajadah', biaya: 10000, harga: 12000, alert: 1, alert: 2, stock: 20},
  {id: 13, nama_barang: 'Sajadah Sujud', merk: 'Sykava', kategori:'Sajadah', biaya: 10000, harga: 12000, alert: 1, stock: 100},
  {id: 14, nama_barang: 'Mukena',merk: 'Sykava', kategori:'Sajadah', biaya: 10000, harga: 12000, alert: 1, alert: 2, stock: 20},
  {id: 15, nama_barang: 'Sarung',merk: 'Sykava', kategori:'Sajadah', biaya: 10000, harga: 12000, alert: 1, alert: 2, stock: 20},
  {id: 16, nama_barang: 'Peci',merk: 'Sykava', kategori:'Sajadah', biaya: 10000, harga: 12000, alert: 1, alert: 2, stock: 20},

]

class Activity extends Component{

  constructor(props){
    super(props);

    this.state=({
      dataList: [],
      cari:"",
    })
  }

  componentDidMount(){
    axios.get("http://mpos-dev.bursasajadah.com/api/v1/products?api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s&&limit=50")
      .then(
        (res)=>{

          this.props.tambahLibrary(res);

        }
      )
      .catch((error) => {
          console.log(error);
      });
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
      <View style={{ padding: 10, marginBottom: 10, justifyContent: "space-between", flexDirection: "row", borderBottomWidth: 1, borderColor: "#E9EDEC" }} onPress={()=> {this.onTestClickItem(item.item);}}>
        <Col style={ styles.colStyle }>
          <Text style={ styles.textStyle }>{item.item.name}</Text>
        </Col>
        <Col style={ styles.colStyle }>
          <Text style={ styles.textStyle }>{item.item.price}</Text>
        </Col>
        <Col style={ styles.colStyle }>
          <Text style={ styles.textStyle }>{qty}</Text>
        </Col>
        <Col style={ styles.colStyle }>
          <Text style={ styles.textStyle }>0</Text>
        </Col>
      </View>
    );
  }

  testLoop = () => {
    return data.map(res=> this.renderItem(res));
  }

  onCariBarang = () => {
    this.props.cariBarang(this.state.cari);
  }

  onTextCari(value: string) {
    this.setState({
      cari: value
    });
  }


  render(){

    return(
      <Container>

        <View style={{ height: 70, backgroundColor: color3, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 30, fontFamily: 'Roboto', color: 'white', fontWeight:'bold' }}>INVENTORY</Text>
        </View>
        <Grid style={{ padding: 10}}>
            <Row style={{ height: 80, backgroundColor: 'white' }}>
              <Col style={{ margin: 10 }}>
                <View style={{ height: 40, width: 300, justifyContent: 'center', backgroundColor: color5, margin: 5, borderRadius: 20, paddingLeft: 10 }}>
                  <Input placeholder="Cari Barang"
                    onChangeText={(text)=> this.onTextCari(text)}
                    onSubmitEditing={()=> this.onCariBarang() }
                  />
                </View>
              </Col>
            </Row>
            <Row style={{ borderBottomWidth: 1, height: 40}}>
              <Col style={ styles.colStyle }>
                <Text style={ styles.textStyle }>Nama Barang</Text>
              </Col>

              <Col style={ styles.colStyle }>
                <Text style={ styles.textStyle }>Harga</Text>
              </Col>

              <Col style={ styles.colStyle }>
                <Text style={ styles.textStyle }>Kuantitas</Text>
              </Col>

              <Col style={ styles.colStyle }>
                <Text style={ styles.textStyle }>Alert</Text>
              </Col>
            </Row>

            <Row>
              <Col>

                <FlatList
                  data={this.props.dataLibrary.dataList}
                  renderItem={(res)=>this.renderItem(res)}
                />
              </Col>
            </Row>

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
              <Col style={{ backgroundColor: color2}}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.props.navigation.navigate('Home')} }>
                  <Icon type="Entypo" name="list" style={{ color: 'white', fontSize: 40}}/>
                  <Text style={{ fontFamily: "Roboto", fontSize: 15, color: 'white'}}>Library</Text>
                </TouchableOpacity>
              </Col>
              <Col style={{ backgroundColor: color3}}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                  <Icon type="Ionicons" name="md-calculator" style={{ color: 'white', fontSize: 40}}/>
                  <Text style={{ fontFamily: "Roboto", fontSize: 15, color: 'white'}}>Inventory</Text>
                </TouchableOpacity>
              </Col>
            </Row>
          </Grid>
        </View>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  colStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  textStyle: {
    fontFamily: 'Roboto',
    color: 'grey'
  }
})


export default connect(mapStateToProps,{ testThunk, getDetails, tambahLibrary, cariBarang })(Activity);

function mapStateToProps(state){
  return{
    dataLibrary: state.setDataList,
    dataSales: state.setGetDataSales,
    dataDetail: state.setDataDetail,
    dataGeneral: state.setGeneral,
  };
}
