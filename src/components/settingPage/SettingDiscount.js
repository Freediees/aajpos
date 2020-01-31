import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import {Card, CardItem, Icon, Left, Body, Right, Form, Picker, Item} from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import { color1, color2, color3, color4, color5 } from '../Color';

class SettingDiscount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      diskonMember: undefined,
      diskonReseller: undefined,
      diskonAgen: undefined,
    };
  }

  onMemberChange(value: string) {
    this.setState({
      diskonMember: value
    });
  }

  onResellerChange(value: string) {
    this.setState({
      diskonReseller: value
    });
  }

  onAgenChange(value: string) {
    this.setState({
      diskonAgen: value
    });
  }

  render(){
    return(
      <Card style={{ flex: 1, width: '100%', padding: 10, borderRadius: 5 }}>
        <CardItem>
          <Left style={{ flex: 2}}>
            <Text style={ styles.textStyle }>Diskon Member</Text>
          </Left>
          <Body style={{ flex: 3}}>

          </Body>
          <Right style={{ flex: 1 }}>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 30 }}
              placeholder="Diskon Member"
              placeholderStyle={styles.textStyle}
              placeholderIconColor="#007aff"
              selectedValue={this.state.diskonMember}
              onValueChange={this.onMemberChange.bind(this)}
            >
              <Picker.Item label="10%" value="key0" />
              <Picker.Item label="20%" value="key1" />
              <Picker.Item label="30%" value="key2" />
              <Picker.Item label="40%" value="key3" />
              <Picker.Item label="50%" value="key4" />
            </Picker>
          </Item>
          </Right>
        </CardItem>



        <CardItem>
          <Left style={{ flex: 2 }}>
            <Text style={ styles.textStyle }>Diskon Reseller</Text>
          </Left>
          <Body style={{ flex: 3 }}>

          </Body>
          <Right style={{ flex: 1}}>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              placeholder="Diskon Reseller"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.diskonReseller}
              onValueChange={this.onResellerChange.bind(this)}
            >
              <Picker.Item label="10%" value="key0" />
              <Picker.Item label="20%" value="key1" />
              <Picker.Item label="30%" value="key2" />
              <Picker.Item label="40%" value="key3" />
              <Picker.Item label="50%" value="key4" />
            </Picker>
          </Item>
          </Right>
        </CardItem>



        <CardItem>
          <Left style={{ flex: 2}}>
            <Text style={ styles.textStyle }>Diskon Agen</Text>
          </Left>
          <Body style={{ flex: 3}}>

          </Body>
          <Right style={{ flex: 1}}>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              placeholder="Diskon Agen"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.diskonAgen}
              onValueChange={this.onAgenChange.bind(this)}
            >
              <Picker.Item label="10%" value="key0" />
              <Picker.Item label="20%" value="key1" />
              <Picker.Item label="30%" value="key2" />
              <Picker.Item label="40%" value="key3" />
              <Picker.Item label="50%" value="key4" />
            </Picker>
          </Item>
          </Right>
        </CardItem>
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
  textStyle:{
    fontSize: 16,
    color: color3,
  }
});

export default SettingDiscount;
