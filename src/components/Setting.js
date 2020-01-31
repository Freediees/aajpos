import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import { Card, Left, Right, Body, CardItem, Container, Icon, List, ListItem } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';


import SettingUser from './settingPage/SettingUser';
import SettingAbout from './settingPage/SettingAbout';
import SettingDiscount from './settingPage/SettingDiscount';
import SettingConnectivity from './settingPage/SettingConnectivity';

import axios from 'axios';

import { color1, color2, color3, color4, color5 } from './Color';


class Setting extends Component {

  constructor(props){
    super(props);

    this.state=({
      dataList: [],
      statusPage: 0
    })
  }

  onSelectMenu(value){
    //console.log(value);
    this.setState({
      statusPage: value,
    })
  }

  onLogout= async() => {
    try{
      await AsyncStorage.setItem('dataUser', '');
      this.props.navigation.navigate('Login');
    }catch(e){
      console.log(e);
    }
  }

  render(){
    console.log(this.props.dataGeneral);
    let page;

    if(this.state.statusPage == 0){
      page = <SettingUser />
    }else if(this.state.statusPage == 1){
      page = <SettingConnectivity />
    }else if(this.state.statusPage == 2){
      page = <SettingAbout />
    }else if(this.state.statusPage == 3){
      page = <SettingDiscount />
    }

    return(
      <Container>
        <View style={{ height: 70, backgroundColor: color3, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 30, fontFamily: 'Roboto', color: 'white', fontWeight:'bold' }}>SETTING</Text>
        </View>
        <Grid>
          <Row>
            <Col size={1} style={{ backgroundColor: '#ffffff', padding: 0, borderRightWidth: 2, borderColor: color3 }}>
              <List>
                <ListItem selected onPress={()=> this.onSelectMenu(0)}>
                  <Left>
                    <Text>User</Text>
                  </Left>
                </ListItem>
                <ListItem selected onPress={()=> this.onSelectMenu(1)}>
                  <Left>
                    <Text>Konektivitas</Text>
                  </Left>
                </ListItem>
                <ListItem selected onPress={()=> this.onSelectMenu(2)}>
                  <Left>
                    <Text>Tentang</Text>
                  </Left>
                </ListItem>
                <ListItem selected onPress={()=> this.onSelectMenu(3)}>
                  <Left>
                    <Text>Member</Text>
                  </Left>
                </ListItem>
                <ListItem selected onPress={()=> this.onLogout()}>
                  <Left>
                    <Text>Logout</Text>
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


      </Container>
    );
  }
}

function mapStateToProps(state){
  return{
    dataGeneral: state.setGeneral,
  };
}

export default Setting;
