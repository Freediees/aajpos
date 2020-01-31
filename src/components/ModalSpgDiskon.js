import React, {Component} from 'react';
import {View, Text, Modal, Dimensions, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import { Card, Left, Right, Body, CardItem, Form, Picker, Item, Label, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { addSPG, addSPGA } from '../actions';
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


class ButtonDiskon extends Component{
  render(){

    //console.log(this.props.idx);
    if(this.props.selected == 1){

      return(
        <TouchableOpacity style={{ backgroundColor: color2, flex: 1, borderColor: color3, borderWidth: 1, padding: 10, margin: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
          onPress={ ()=> this.props.setDiskon(this.props.idx)}
        >
          <Text>{this.props.diskon}</Text>
        </TouchableOpacity>
      );
    }else{
      return(
        <TouchableOpacity style={{ backgroundColor: color1, flex: 1, borderColor: color3, borderWidth: 1, padding: 10, margin: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
          onPress={ ()=> this.props.setDiskon(this.props.idx)}
        >
          <Text>{this.props.diskon}</Text>
        </TouchableOpacity>
      );
    }

  }
}

class ModalSPG extends Component{
  constructor(props){
    super(props);
    this.state=({
      lebar: Dimensions.get('window').width - 100,
      tinggi: Dimensions.get('window').height - 100,
      selected: "key1",
      data: [],
      namaSpg: 'SPG',
      selectedDiskon: [1,0,0,0,0,0],
      kodeVoucher: '',
      textDiskon: '',
      discRupiah: 0,
      discPersen: 0,
    })
  }

  componentDidMount(){
    axios.get("http://mpos-dev.bursasajadah.com/api/v1/users?api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s")
      .then(
        (res)=>{
          this.setState({ data: res.data.data })
          console.log(res.data.data);
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

  onVoucher(text){

    console.log(text);
    if(text == 'KODE10'){
      this.setState({
        kodeVoucher: text,
        textDiskon: 'Diskon 10%'
      })
    }else{
      this.setState({
        kodeVoucher: text
      })
    }

  }

  searchFilterFunction = text => {

    //console.log(this.state.data)

    let a  = this.state.data;

    const newData = a.filter(item => {

      //console.log(item);
      const itemData = `${item.first_name.toUpperCase()} ${item.last_name.toUpperCase()}`;

       const textData = text.toUpperCase();

       return itemData.indexOf(textData) > -1;
    });

    this.setState({ data: newData });
  };



  onSelectSPG = (person, index, data, a) => {

    this.setState({ namaSpg: person });
    //console.log(person);
    //console.log(this.props.indexSPG);
    //console.log(data);
    //this.props.changeModalVisibility(false, 7);



    //this.props.addSPG(person, this.props.indexSPG, data);
  }

  onSelesai = () => {
    this.props.addSPG(this.state.namaSpg, this.props.indexSPG, this.props.dataTransaksi);

    //console.log(this.state.discRupiah);
    //console.log(this.state.discPersen);

    let a;
    if(this.state.discRupiah == 0){
      a = this.props.dataTransaksi[this.props.indexSPG];
      //a.discount = parseInt(parseInt(a.subtotal) * parseInt(this.state.discPersen) /100);
    }else{
      a = this.props.dataTransaksi[this.props.indexSPG];
      //a.discount = parseInt(this.state.discRupiah);
    }

    let b = this.props.dataTransaksi;
    b[this.props.indexSPG] = a

    this.props.addSPGA(b);

    //console.log(a);

    this.props.changeModalVisibility(false, 7);
  }

  renderItem(res){
    //console.log(res)
    return(
      <Row style={{ margin: 3 }} key={res.item.email} onPress={ this.onSelectSPG.bind(this,res.item.first_name, res.index, this.props.dataTransaksi) }>
        <Col style={ styles.colStyle } >
          <Text style={ styles.textStyle }>{res.item.first_name} {res.item.last_name}</Text>
        </Col>
      </Row>
    );
  }

  setDiskon = (idx) => {

    let arr = [0,0,0,0,0,0];
    arr[idx] = 1


    this.setState({
      selectedDiskon: arr
    })

  }

  onRupiahChange(text){
    this.setState({
      discRupiah: text,
      discPersen: 0
    })

    //console.log(text);
  }

  onPersenChange(text){
    this.setState({
      discRupiah: 0,
      discPersen: text
    })
  }

  render(){

    //console.log(this.state.selectedDiskon);

    return(
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View style={{ width: this.state.lebar, height: this.state.tinggi, backgroundColor: 'white', borderRadius: 5}}>
          <Grid style={{ flex: 1}}>
            <Row style={{ height: 100, backgroundColor: '#ffffff', padding: 20, justifyContent: 'space-between', borderColor: color1, borderBottomWidth: 1, borderRadius: 5 }}>
                <TouchableOpacity
                  onPress={this.props.changeModalVisibility}
                  style={{ width: 100 , height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor:color1}}>
                  <Text style={{ fontSize: 15, fontFamily: 'Roboto', color: 'white', fontWeight: 'bold'}}>Batal</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 30, fontFamily:'Roboto' }}>SPG</Text>

                <TouchableOpacity
                  onPress={this.onSelesai.bind(this)}
                  style={{ width: 100 , height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: color2, borderRadius: 5}}>
                  <Text style={{ fontSize: 15, fontFamily: 'Roboto', color: 'white', fontWeight: 'bold'}}>Selesai</Text>
                </TouchableOpacity>
            </Row>

            <Row>
              <Col>
                <View style={{ height: 50, margin: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: color3, borderRadius: 5}}>
                  <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Roboto' }}>{this.state.namaSpg}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    <Item floatingLabel>
                      <Label>Nama SPG</Label>
                      <Input onChangeText={text => this.searchFilterFunction(text)}/>
                    </Item>
                </View>

                <FlatList
                  data={this.state.data}
                  renderItem={(item)=> this.renderItem(item)}
                />
              </Col>
              <Col>
              <Row style={{ height: 150 }}>
                <Card style={{ flex: 1}}>
                  <CardItem header bordered>
                    <Text style={styles.textStyle}>Diskon Rupiah</Text>
                  </CardItem>
                  <CardItem bordered>
                    <Body>
                      <Item>
                        <Input placeholder="Rp. 0"
                        value={this.state.discRupiah}
                        onChangeText={(text)=> this.onRupiahChange(text)}
                        />
                      </Item>
                    </Body>
                  </CardItem>
                </Card>
              </Row>

              <Row style={{ height: 150 }}>
                <Card style={{ flex: 1}}>
                  <CardItem header bordered>
                    <Text style={styles.textStyle}>Diskon Persen</Text>
                  </CardItem>
                  <CardItem bordered>
                    <Body>
                      <Item>
                        <Input placeholder="0%"
                        value={this.state.discPersen}
                        onChangeText={(text)=> this.onPersenChange(text)}
                        />
                      </Item>
                    </Body>
                  </CardItem>
                </Card>
              </Row>
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

export default connect(mapStateToProps, {addSPG, addSPGA})(ModalSPG);
