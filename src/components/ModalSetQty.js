import React, {Component} from 'react';
import {View, Text, Modal, Dimensions, TouchableOpacity, ScrollView, StyleSheet, FlatList, AsyncStorage } from 'react-native';
import { Card, Left, Right, Body, CardItem, Form, Picker, Item, Label, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { color1, color2, color3, color4, color5 } from './Color';

import { resetData, plusAmount } from '../actions';


class ModalSetQty extends Component{
  constructor(props){
    super(props);
    this.state=({
      lebar: Dimensions.get('window').width - 500,
      tinggi: Dimensions.get('window').height - 400,
      total: 0
    })
  }

  componentDidMount(){
    //this._retreiveData();
    //console.log('hemeh');
    //console.log(this.props.tempBill);
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }


  onSubmit(){

    var group_id = this.props.dataCustomer.customer_group_id;

    this.props.plusAmount(this.props.indexItem, this.props.dataTransaksi, this.state.total, group_id);
    this.props.changeModalVisibility(false, 7);


  }



  render(){

    return(
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View style={{ width: this.state.lebar, height: this.state.tinggi, backgroundColor: 'white', borderRadius: 5}}>
          <Row style={{ height: 100, backgroundColor: '#ffffff', padding: 20, justifyContent: 'center', borderColor: color1, borderBottomWidth: 1, borderRadius: 5 }}>
            <Text style={{ fontSize: 30, fontFamily:'Roboto' }}>Jumlah Item</Text>
          </Row>

          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>

                <Item floatingLabel>
                  <Label>Jumlah Item</Label>
                  <Input
                    onChangeText={(amount)=> { this.setState({total: amount})}}
                    keyboardType="numeric"
                    />
                </Item>

              <TouchableOpacity style={{ backgroundColor: color3, marginTop: 20, borderRadius: 5, padding: 10, width: '100%', marginTop: 40, justifyContent: 'center', alignItems: 'center'}}
              onPress={()=> this.onSubmit() }
              >
                <Text style={styles.textStyle}>Simpan</Text>
              </TouchableOpacity>

          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  colStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 1,
    backgroundColor: color3,
    borderRadius: 5
  },

  textStyle: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 15,
  }
})

function mapStateToProps(state){
  return {
    dataTransaksi: state.setDataTransaksi,
    dataLibrary: state.setDataList,
    setTotal: state.setTotal,
    dataCustomer: state.setDataCustomer,
  };
}

export default connect(mapStateToProps, {resetData, plusAmount})(ModalSetQty);
