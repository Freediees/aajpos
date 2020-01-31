import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Card, CardItem, Icon, Left, Body, Right, ListItem, Button, List } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import { color1, color2, color3, color4, color5 } from '../Color';

class SettingAbout extends Component {

  constructor(props){
    super(props);

    this.state = {
      wifi: true,
      bluetooth: false,
    }
  }

  render(){



    return(
      <Card style={{ flex: 1, width: '100%', padding: 30, borderRadius: 5, justifyContent: 'flex-start', alignItems:'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 20}}>AAJ POS</Text>
        <Text style={{ textAlign: 'center'}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
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

export default SettingAbout;
