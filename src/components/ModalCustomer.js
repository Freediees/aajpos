import React, {Component} from 'react';
import {View, Text, Modal, Dimensions, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import { Card, Left, Right, Body, CardItem, Form, Picker, Item, Label, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import { connect } from 'react-redux';
import { setDataCustomer } from '../actions';

import axios from 'axios';

import { color1, color2, color3, color4, color5 } from './Color';

const data = [
  {id: 1, nama: 'Ahmad Faris'},
  {id: 2, nama: 'Rani Pebrianti'},
  {id: 3, nama: 'Ferdi Rahman'},
  {id: 4, nama: 'Jason Bourne'},
  {id: 5, nama: 'John Wick'},
  {id: 6, nama: 'Jack Reacher'},
]

class SimpleModal extends Component{
  constructor(props){
    super(props);
    this.state=({
      cari: '',
      lebar: Dimensions.get('window').width - 180,
      tinggi: Dimensions.get('window').height - 180,
      selected: "key1",
      data: [],
    })
  }

  componentDidMount(){
    axios.get("http://mpos-dev.bursasajadah.com/api/v1/customers?api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s")
      .then(
        (res)=>{
          //console.log(res.data.data);
          this.setState({ data: res.data.data })
        }
      )
      .catch((error) => {
          console.log(error);
      });
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  onTextCari(value: string) {
    this.setState({
      cari: value
    });
  }

  onSelectData=(data,a)=>{
    //console.log(data.item);


    this.props.setDataCustomer(data.item);

    var a = this.props.dataTransaksi;
    var totalDiskon = 0;
    //console.log(data.item.group_id);
    if(data.item.customer_group_id == 1){
      totalDiskon = 0;
    }else if(data.item.customer_group_id == 6){
      totalDiskon = 10;
    }

    for(var i = 0; i< a.length; i++){
      //console.log(a[i].subtotal);
      a[i].discount = a[i].subtotal * parseInt(totalDiskon) / 100;
    }

    //console.log(a);


    this.props.changeModalVisibility(false, 7);
  }

  onSearchFunction(){
    const url = `http://mpos-dev.bursasajadah.com/api/v1/customers?name=${this.state.cari}&api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s`;
    console.log(url);
    axios.get(url)
      .then(
        (res)=>{

          this.setState({ data: res.data.data })
        }
      )
      .catch((error) => {
          alert('Data Tidak Ditemukan');
          console.log(error);
      });
  }

  searchFilterFunction = text => {

    //console.log(this.state.data)

    let a  = this.state.data;

    const newData = a.filter(item => {

      //console.log(item);
      const itemData = `${item.person.toUpperCase()}`;

       const textData = text.toUpperCase();

       return itemData.indexOf(textData) > -1;
    });

    this.setState({ data: newData });
  };

  onTambahCustomer(){
    this.props.changeModalVisibility(false, 7);
    this.props.navigation.navigate('AddCustomer');
  }

  renderItem(res){
    //console.log(res);
    //console.log(res.index);
    return(
      <Row style={{ margin: 3 }} key={res.index}>
        <Col style={ styles.colStyle } onPress={this.onSelectData.bind(this,res)}>
          <Text style={ styles.textStyle }>{res.item.person}</Text>
        </Col>
      </Row>
    );
  }

  render(){

    return(
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View style={{ width: this.state.lebar, height: this.state.tinggi, backgroundColor: 'white', borderRadius: 5}}>
          <Grid style={{ flex: 1}}>
            <Row style={{ height: 100, backgroundColor: '#ffffff', padding: 20, justifyContent: 'space-between', borderColor: color1, borderBottomWidth: 1, borderRadius: 5 }}>
                <TouchableOpacity
                  onPress={this.props.changeModalVisibility}
                  style={{ width: 100 , height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor:color1}}>
                  <Text style={{ fontSize: 15, fontFamily: 'Roboto', color: 'white', fontWeight: 'bold'}}>Cancel</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 30, fontFamily:'Roboto' }}>List Customer</Text>

                <TouchableOpacity
                  onPress={this.props.changeModalVisibility}
                  style={{ width: 100 , height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: color2, borderRadius: 5}}>
                  <Text style={{ fontSize: 15, fontFamily: 'Roboto', color: 'white', fontWeight: 'bold'}}>Selesai</Text>
                </TouchableOpacity>
            </Row>

            <Row>
              <Col>
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                      <Item floatingLabel>
                        <Label>Nama Customer</Label>
                        <Input
                          onChangeText={text => this.onTextCari(text)}
                          onSubmitEditing={()=> this.onSearchFunction()}
                          />
                      </Item>
                </View>

                <TouchableOpacity style={{ backgroundColor: color3, height:40, margin: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} onPress={()=>{ this.onTambahCustomer() }}>
                  <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Roboto' }}>Tambah Customer Baru</Text>
                </TouchableOpacity>

                <FlatList
                  data={this.state.data}
                  renderItem={(item)=> this.renderItem(item)}
                />
              </Col>
            </Row>
          </Grid>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    dataTransaksi: state.setDataTransaksi,
    dataLibrary: state.setDataList,
    setTotal: state.setTotal,
  };
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

export default connect(mapStateToProps, {setDataCustomer})(SimpleModal);
