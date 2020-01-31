import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Card, CardItem, Icon, Left, Body, Right, ListItem, Button, List } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import { color1, color2, color3, color4, color5 } from '../Color';

class SettingUser extends Component {

  constructor(props){
    super(props);

    this.state = {
      wifi: true,
      bluetooth: false,
    }
  }

  render(){

    let bluetooth;
    if(this.state.bluetooth){
      bluetooth = <Text style={ styles.connectStyle}>Connected</Text>
    }else{
      bluetooth = <Text style={ styles.disconnectStyle}>Disconnected</Text>
    }

    let wifi;
    if(this.state.wifi){
      wifi = <Text style={ styles.connectStyle}>Connected</Text>
    }else{
      wifi = <Text style={ styles.disconnectStyle}>Disconnected</Text>
    }

    return(
      <Card style={{ flex: 1, width: '100%', padding: 10, borderRadius: 5 }}>
        <List>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: 'blue' }}>
                <Icon active name="bluetooth" />
              </Button>
            </Left>
            <Body>
              <Text style={ styles.labelStyle }>Bluetooth</Text>
            </Body>
            <Right>
              {bluetooth}
            </Right>
          </ListItem>

          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: 'orange' }}>
                <Icon active name="wifi" />
              </Button>
            </Left>
            <Body>
              <Text style={ styles.labelStyle}>Wifi</Text>
            </Body>
            <Right>
              {wifi}
            </Right>
          </ListItem>

        </List>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'grey'
  },
  connectStyle:{
    fontSize: 18,
    color: color3,
  },
  disconnectStyle:{
    fontSize: 18,
    color: 'red',
  }
});

export default SettingUser;
