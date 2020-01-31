import React, {Component} from 'react';
import {View, Text, Modal, Dimensions, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import { Card, Left, Right, Body, CardItem, Form, Picker, Item, Label, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { addSPG } from '../actions';
import { connect } from 'react-redux';

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

class ModalSPG extends Component{
  constructor(props){
    super(props);
    this.state=({
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
          this.setState({ data: res.data.data })
          //console.log(res.data.data);
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

  onSelectSPG = (person, index, data, a) => {
    console.log(person);
    console.log(this.props.indexSPG);
    console.log(data);
    //this.props.changeModalVisibility(false, 7);



    this.props.addSPG(person, this.props.indexSPG, data);
  }

  renderItem(res){
    //console.log(res)
    return(
      <Row style={{ margin: 3 }} key={res.item.email} onPress={ this.onSelectSPG.bind(this,res.item.person, res.index, this.props.dataTransaksi) }>
        <Col style={ styles.colStyle } >
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

                <Text style={{ fontSize: 30, fontFamily:'Roboto' }}>List SPG</Text>

                <TouchableOpacity
                  onPress={this.props.changeModalVisibility}
                  style={{ width: 100 , height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: color2, borderRadius: 5}}>
                  <Text style={{ fontSize: 15, fontFamily: 'Roboto', color: 'white', fontWeight: 'bold'}}>Charge</Text>
                </TouchableOpacity>
            </Row>

            <Row>
              <Col>
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                      <Item floatingLabel>
                        <Label>Nama Customer</Label>
                        <Input onChangeText={text => this.searchFilterFunction(text)}/>
                      </Item>
                </View>

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

export default connect(mapStateToProps, {addSPG})(ModalSPG);
