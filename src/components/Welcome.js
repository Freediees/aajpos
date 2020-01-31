import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Card, Left, Right, Body, CardItem, Container, Icon, List, ListItem } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';

import { getDataSales, testThunk, getDetails } from '../actions';

import SettingUser from './settingPage/SettingUser';
import SettingConnectivity from './settingPage/SettingConnectivity';

import axios from 'axios';

import DetailSales from './DetailSales';
import { color1, color2, color3, color4, color5 } from './Color';


class Activity extends Component{

  constructor(props){
    super(props);

    this.state=({
      dataList: [],
      statusPage: 0
    })
  }

  componentDidMount(){

    this.props.testThunk();

  }



  render(){

    let page;

    if(this.state.statusPage == 0){
      //page = <View />
    }



    return(
      <View>
        <View style={{ height: 70, backgroundColor: color3, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 30, fontFamily: 'Roboto', color: 'white', fontWeight:'bold' }}>SETTING</Text>
        </View>
        <Grid>
          <Row>
            <Col size={1} style={{ backgroundColor: '#ffffff', padding: 0, borderRightWidth: 2, borderColor: color3 }}>
              <List>
                <ListItem selected>
                  <Left>
                    <Text>User</Text>
                  </Left>
                </ListItem>
                <ListItem selected>
                  <Left>
                    <Text>Konektivitas</Text>
                  </Left>
                </ListItem>
              </List>
            </Col>
            <Col size={2} style={{ padding: 16, alignItems: 'center' }}>
              {page}
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
              <Col style={{ backgroundColor: color3, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 30, fontFamily: 'Roboto', color: 'white', fontWeight:'bold' }}>BURSASAJADAH</Text>
              </Col>

            </Row>
          </Grid>
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    backgroundColor: color5,
  }
})


export default connect(mapStateToProps,{ testThunk, getDetails })(Activity);

function mapStateToProps(state){
  return{
    dataSales: state.setGetDataSales,
    dataDetail: state.setDataDetail,
  };
}
