import React, {Component} from 'react';
import {View, Text, Modal, Dimensions, TouchableOpacity, ScrollView, StyleSheet, FlatList, AsyncStorage } from 'react-native';
import { Card, Left, Right, Body, CardItem, Form, Picker, Item, Label, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { color1, color2, color3, color4, color5 } from './Color';

import { resetData } from '../actions';


class SimpleModal extends Component{
  constructor(props){
    super(props);
    this.state=({
      lebar: Dimensions.get('window').width - 500,
      tinggi: Dimensions.get('window').height - 400,
      selected: "key1",
      namaBill: '',
    })
  }

  componentDidMount(){
    //this._retreiveData();
    console.log('hemeh');
    console.log(this.props.tempBill);
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  renderItem(res){

    return(
      <Row style={{ margin: 3 }} key={res.item.id}>
        <Col style={ styles.colStyle } onPress={this.props.changeModalVisibility}>
          <Text style={ styles.textStyle }>{res.item.nama}</Text>
        </Col>
      </Row>
    );
  }

  _storeData = async () => {
    try {

      console.log(this.props.tempBill);

      let datax = []

      let dataSimpan = await { billName: this.state.namaBill, data: this.props.dataTransaksiz }

      console.log(dataSimpan);

      datax = this.props.tempBill;
      datax.push(dataSimpan);

      await AsyncStorage.setItem('Data', JSON.stringify(datax));
      this.props.changeModalVisibility(false, 7);

      this.props.resetData();

      alert('Data Berhasil Disimpan');


    } catch (error) {
      // Error saving data
    }
  };




  render(){

    //console.log('oke');
    //

    return(
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View style={{ width: this.state.lebar, height: this.state.tinggi, backgroundColor: 'white', borderRadius: 5}}>
          <Row style={{ height: 100, backgroundColor: '#ffffff', padding: 20, justifyContent: 'center', borderColor: color1, borderBottomWidth: 1, borderRadius: 5 }}>
            <Text style={{ fontSize: 30, fontFamily:'Roboto' }}>Simpan Bill</Text>
          </Row>

          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>

                <Item floatingLabel>
                  <Label>Nama Bill</Label>
                  <Input onChangeText={(nama)=> { this.setState({namaBill: nama})}}/>
                </Item>

              <TouchableOpacity style={{ backgroundColor: color3, marginTop: 20, borderRadius: 5, padding: 10, width: '100%', marginTop: 40, justifyContent: 'center', alignItems: 'center'}} onPress={this._storeData.bind(this)}>
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
    dataTransaksiz: state.setDataTransaksi,
    dataLibrary: state.setDataList,
    setTotal: state.setTotal,
  };
}

export default connect(mapStateToProps, {resetData})(SimpleModal);
