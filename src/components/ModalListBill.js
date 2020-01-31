import React, {Component} from 'react';
import {View, Text, Modal, Dimensions, TouchableOpacity, ScrollView, StyleSheet, FlatList, AsyncStorage } from 'react-native';
import { Card, Left, Right, Body, CardItem, Form, Picker } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';


import { connect } from 'react-redux';

import { setFromBill } from '../actions';

import { color1, color2, color3, color4, color5 } from './Color';

const data = [
  {id: 1, bill: 'Bill 1'},
]

let abc = ""

class SimpleModal extends Component{
  constructor(props){
    super(props);
    this.state=({
      lebar: Dimensions.get('window').width - 480,
      tinggi: Dimensions.get('window').height - 180,
      selected: "key1",
      list: this.props.tempBill
    })
  }

  componentDidMount(){
    abc = this._retreiveData();
  }

  _storeData = async (datax) => {
    try {

      await AsyncStorage.setItem('Data', JSON.stringify(datax));
      //this.props.changeModalVisibility(false, 7);
      alert('Berhasil');


    } catch (error) {
      // Error saving data
    }
  };


  _retreiveData = async () => {
    try {
      const value = await AsyncStorage.getItem('Data');
      if (value !== null) {
        // We have data!!
        let data = JSON.parse(value);
        console.log(data);

        this.setState({list: data});
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  onPressHapus(res){
    let array = [];

    array = this.state.list;
    //let index = array.indexOf(res);

    //console.log(res);


    array.splice(res, 1);

    this.setState({list : array});

    this._storeData(array);
    //console.log(array);
  }

  onPilih = (index, data, id) => {
    //let a = this.state.list;

    this.props.setFromBill(index, data);

    this.onPressHapus(index);

    this.props.changeModalVisibility(false, 7);
    //console.log("kesinin dulu");
  }

  renderItem(res){
    //console.log(this.state.list);
    return(
      <Row style={{ margin: 3, height: 40, borderBottomWidth: 1, borderColor: color4}} key={res.item.id}>
        <Col size={6} style={{  justifyContent: 'center', padding: 5}}>
          <Text>{res.item.billName}</Text>
        </Col>
        <Col size={1} style={{ padding: 3}}>
          <TouchableOpacity style={{ backgroundColor: color1, flex: 1,height: 30, borderRadius: 5 , justifyContent: 'center', alignItems: 'center'}} onPress={ this.onPilih.bind(this, res.index, res.item) }>
          <Text style={[styles.textStyle, {fontSize: 10, color: 'white'}]}>
            Lanjutkan
          </Text>
          </TouchableOpacity>
        </Col>
        <Col size={1} style={{ padding: 3 }}>
          <TouchableOpacity style={{ backgroundColor: color3, flex: 1,height: 30, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} onPress={ () => this.onPressHapus(res.index) }>
            <Text style={[styles.textStyle, {fontSize: 10, color: 'white'}]}>
              Hapus
            </Text>
          </TouchableOpacity>
        </Col>
      </Row>
    );
  }


  render(){

    //this._retreiveData();

    return(
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View style={{ width: this.state.lebar, height: this.state.tinggi, backgroundColor: 'white', borderRadius: 5}}>
          <Row style={{ height: 100, backgroundColor: '#ffffff', padding: 30, justifyContent: 'center', borderColor: color1, borderBottomWidth: 1 , borderRadius: 5}}>
            <Text style={{ fontSize: 30, fontFamily:'Roboto' }}>List Bill</Text>
          </Row>
          <Grid style={{ padding: 20}}>
            <Row >
            <FlatList
              data={this.state.list}
              renderItem={(item)=> this.renderItem(item)}
            />
            </Row>
            <Row style={{ height: 80 }}>
              <TouchableOpacity style={{ backgroundColor: color3, marginTop: 20, borderRadius: 5, padding: 10, width: '100%', marginTop: 40, justifyContent: 'center', alignItems: 'center'}} onPress={()=> this.props.changeModalVisibility(false, 7)}>
                <Text style={[styles.textStyle, {color: 'white'}]}>Selesai</Text>
              </TouchableOpacity>
            </Row>
          </Grid>
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
    margin: 0,
    backgroundColor: color5,
    borderRadius: 5,
    height: 40,
  },

  textStyle: {
    fontFamily: 'Roboto',
    color: color3,
    fontSize: 20,
  }
})

function mapStateToProps(state){
  return {
    dataTransaksi: state.setDataTransaksi,
    dataLibrary: state.setDataList,
    setTotal: state.setTotal,
  };
}

export default connect (mapStateToProps , {setFromBill})(SimpleModal);
