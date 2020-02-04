import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Card, Left, Right, Body, CardItem, Container, Icon } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';

import { getDataSales, testThunk, getDetails } from '../actions';

import axios from 'axios';

import DetailSales from './DetailSales';
import { color1, color2, color3, color4, color5 } from './Color';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


class Activity extends Component{

  constructor(props){
    super(props);

    this.state=({
      dataList: [],
    })
  }

  componentDidMount(){

    this.props.testThunk();

  }

  getDetail(id){
    this.props.getDetails(id);
    //alert(id);
  }

  renderItem(item){
    //console.log(item);


    var grand_total = item.item.grand_total.slice(0, -5);

    return(
      <TouchableOpacity onPress={ ()=> { this.getDetail(item.item.reference_no)} }>
        <View style={{ padding: 10, backgroundColor: '#a5d6a7' }}>
          <Text>{item.item.date}</Text>
        </View>
        <Grid>
          <Col style={{ width: 55, height: 55, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="paper" />
          </Col>
          <Col>
            <Row>
              <Col size={3} style={{ justifyContent: 'flex-end'}}>
                <Text style={{ fontSize: 17, fontFamily: 'Roboto', fontWeight: 'bold' }}>Rp.{ numberWithCommas(grand_total)}</Text>
              </Col>
              <Col size={1} style={{ justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: 10}}>
                <Text>{item.item.payment_status}</Text>
              </Col>
            </Row>
            <Row>
              <Text>Rp.{item.item.sale_status}</Text>
            </Row>
          </Col>
        </Grid>
      </TouchableOpacity>
    );
  }

  render(){
    //console.log(this.props.dataDetail);

    let kirimData = this.props.dataDetail

    //console.log(this.props.dataSales.transaksi.data);

    let konten =<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}><Text>Tunggu Sebentars</Text>
    <ActivityIndicator size="large" /></View>

    let konten2 = konten;

    if(this.props.dataSales.isFetching == false){
      konten = <FlatList
        data={this.props.dataSales.transaksi.data}
        renderItem={(item)=>this.renderItem(item)}
      />

      konten2 = <DetailSales data={kirimData || this.props.dataSales.transaksi.data}/>
    }




    return(
      <Container>
        <View style={{ height: 70, backgroundColor: color3, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 30, fontFamily: 'Roboto', color: 'white', fontWeight:'bold' }}>TRANSACTION</Text>
        </View>
        <Grid>
          <Row>
            <Col size={1} style={{ backgroundColor: '#ffffff', padding: 0, borderRightWidth: 2, borderColor: color3 }}>
              <View style={{ padding: 5, margin: 2, backgroundColor: 'white', height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>Search</Text>
              </View>
              {konten}
            </Col>
            <Col size={2} style={{ padding: 16, alignItems: 'center' }}>
              {konten2}
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
              <Col style={{ backgroundColor: color3}}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
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
              <Col style={{ backgroundColor: color2}}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.props.navigation.navigate('Inventory')} }>
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


export default connect(mapStateToProps,{ testThunk, getDetails })(Activity);

function mapStateToProps(state){
  return{
    dataSales: state.setGetDataSales,
    dataDetail: state.setDataDetail,
  };
}
