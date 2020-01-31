import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Item, Label, Input } from 'native-base';
import { connect } from 'react-redux';

import { setKas } from '../actions';

import { color1, color2, color3, color4 } from './Color';

import axios from 'axios';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function removeCommas(x){
    return x.toString().replace(",","");
}


class FormKas extends Component{


  constructor(props){
    super(props);
    this.state = {
      uang: 0,
      textUang: 0,
      isFetching: false,
    }
  }
  onButtonSubmit = () => {

    this.props.setKas(this.state.uang);

    this.props.navigation.navigate('Home');
  }

  onUsername(text){

    let b = removeCommas(text);
    let a = numberWithCommas(b);



    this.setState({
      uang: b,
      textUang: a,
    })
  }



  render(){

    let submit;

    if(this.state.isFetching){
      submit =
      <TouchableOpacity style={[styles.formStyle, {justifyContent: 'center', alignItems: 'center', backgroundColor: color1, marginTop: 20 }]}>
          <ActivityIndicator size="large" style={{ color: color2}}/>
      </TouchableOpacity>
    }else{
      submit =
      <TouchableOpacity style={[styles.formStyle, {justifyContent: 'center', alignItems: 'center', backgroundColor: color3, marginTop: 20 }]} onPress={ this.onButtonSubmit.bind(this) }>
          <Text style={styles.textStyle}>Lanjutkan</Text>
      </TouchableOpacity>
    }



    return(
        <ImageBackground resizeMode={'cover'} source={require('./img/background.jpg')} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Image source={require('./img/logo.png')} style={{ width: 250, height: 250 }} resizeMode={'contain'}/>
          </View>

          <Text style={[styles.textStyle, {color: color3}]}>Saldo Awal</Text>
          <View style={styles.formStyle}>
            <Input placeholder='Rp.0'
                value={this.state.textUang}
                keyboard-type='number'
                textStyle={{align: 'center'}}
                clearTextOnFocus={true}
                onChangeText={( text )=> this.onUsername(text)}
            />

          </View>

          {submit}

        </ImageBackground>
    );
  }
}

function mapStateToProps(state){
  return {
    dataTransaksi: state.setDataTransaksi,
    dataLibrary: state.setDataList,
    setTotal: state.setTotal,
    dataCustomer: state.setDataCustomer,
    dataGeneral: state.setGeneral,
  };
}



const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },

  formStyle: {
    width: 350,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 100,
    marginTop: 10,
    paddingLeft: 10
  },

  textStyle: {
    fontFamily: 'Roboto',
    fontSize: 20,
    color: 'white'
  }
})

export default connect(mapStateToProps, {setKas})(FormKas);
