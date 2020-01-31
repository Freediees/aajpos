import React, {Component} from 'react';
import {View, Text, Modal, Dimensions, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import { Card, Left, Right, Body, CardItem, Form, Picker, Item, Label, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { addSPG, setGeneral } from '../actions';
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
    return(
      <Card>
        <CardItem>
          <Body style={{ alignItems: 'center'}}>
              <Text>{this.props.diskon}</Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

class ModalDiskon extends Component{
  constructor(props){
    super(props);
    this.state=({
      lebar: Dimensions.get('window').width - 350,
      tinggi: Dimensions.get('window').height - 200,
      selected: "key1",
      data: [],
      discRupiah: 0,
      discPersen: 0,
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


  onRupiahChange(text){
    this.setState({
      discRupiah: text,
      discPersen: '0'
    })

    //console.log(text);
  }

  onPersenChange(text){
    this.setState({
      discRupiah: '0',
      discPersen: text
    })
  }



  onPilihDiskon = (value, a) => {
    //console.log(value);
    this.props.setGeneral(value);
    //this.props.onButtonPress(value);
    this.props.changeModalVisibility(false, 7);
  }

  onSelesai=()=>{
    if(this.state.kodeVoucher == '123456'){
      let total = this.props.setTotal;
      let pjgDiskon = this.props.dataTransaksi.length;
      //console.log(a);

      let diskon = 0;
      let i = 0;
      for(i=0;i<pjgDiskon;i++){
        diskon = diskon + parseInt(this.props.dataTransaksi[i].discount, 10);
      }

      let final1 = total - diskon;

      let final = 0;

      if(this.state.discRupiah == 0){
        final = final1 * parseInt(this.state.discPersen) / 100;
      }else if(this.state.discPersen == 0){
        final = parseInt(this.state.discRupiah);
      }else{
        final = 0;
      }

      //console.log(final);

      this.props.setGeneral(final);

      this.props.changeModalVisibility(false, 7);
    }else{
      alert("Kode Salah");
    }

  }
  render(){

    return(
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View style={{ width: this.state.lebar, height: this.state.tinggi, backgroundColor: 'white', borderRadius: 5}}>
          <Grid style={{ flex: 1, padding: 10 }}>
            <Row style={{ height: 100, backgroundColor: '#ffffff', padding: 20, justifyContent: 'space-between', borderColor: color1, borderBottomWidth: 1, borderRadius: 5 }}>
                <TouchableOpacity
                  onPress={this.props.changeModalVisibility}
                  style={{ width: 100 , height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor:color1}}>
                  <Text style={{ fontSize: 15, fontFamily: 'Roboto', color: 'white', fontWeight: 'bold'}}>Batal</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 30, fontFamily:'Roboto' }}>Diskon</Text>

                <TouchableOpacity
                  onPress={this.onSelesai.bind()}
                  style={{ width: 100 , height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: color2, borderRadius: 5}}>
                  <Text style={{ fontSize: 15, fontFamily: 'Roboto', color: 'white', fontWeight: 'bold'}}>Selesai</Text>
                </TouchableOpacity>
            </Row>

            <Row>
              <Card style={{ flex: 1}}>
                <CardItem header bordered>
                  <Text style={styles.textStyle}>Diskon Rupiah</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Item>
                      <Input placeholder="Rp. 0"
                          value= {this.state.discRupiah}
                          keyboardType='numeric'
                          onChangeText={( text )=> this.onRupiahChange(text) }
                      />
                    </Item>
                  </Body>
                </CardItem>
              </Card>
            </Row>



            <Row>
              <Card style={{ flex: 1}}>
                <CardItem header bordered>
                  <Text style={styles.textStyle}>Kode Pin</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Item>
                      <Input placeholder="Masukan Kode OTP"
                          keyboardType='numeric'
                          onChangeText={( text )=> this.onVoucher(text) }
                      />
                    </Item>
                  </Body>
                </CardItem>
              </Card>
            </Row>


              {


              // <Col>
              //   <View style={{ flex: 1, margin: 10, padding: 10 }}>
              //     <Row>
              //       <Col onPress={ this.onPilihDiskon.bind(this,100) }>
              //         <ButtonDiskon diskon="100%"/>
              //       </Col>
              //       <Col onPress={ this.onPilihDiskon.bind(this,90) }>
              //         <ButtonDiskon diskon="90%"/>
              //       </Col>
              //       <Col onPress={ this.onPilihDiskon.bind(this,80) }>
              //         <ButtonDiskon diskon="80%"/>
              //       </Col>
              //       <Col onPress={ this.onPilihDiskon.bind(this,70) }>
              //         <ButtonDiskon diskon="70%"/>
              //       </Col>
              //       <Col onPress={ this.onPilihDiskon.bind(this,60) }>
              //         <ButtonDiskon diskon="60%"/>
              //       </Col>
              //     </Row>
              //   </View>
              // </Col>

              // <Row>
              //   <Col style={{justifyContent: 'center', paddingLeft: 10, paddingBottom: 10 }} >
              //     <Text style={styles.textStyle}>Kode Voucher</Text>
              //     <Item>
              //       <Input placeholder="Kode"
              //           onChangeText={( text )=> this.onVoucher(text) }
              //       />
              //     </Item>
              //
              //     <Text style={[styles.textStyle, {fontSize: 15, color: color3 }]}>{this.state.textDiskon}</Text>
              //   </Col>
              // </Row>

              }



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
    dataGeneral: state.setGeneral,
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
  },
  rowStyle: {
    backgroundColor: color3,
    height: 70,
    color: 'white',
    fontSize: 20,
    fontFamily: 'Roboto',
    margin: 10,
    borderRadius: 10,
    padding: 10,
  }
})

export default connect(mapStateToProps, {addSPG, setGeneral })(ModalDiskon);
