import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
import { Item, Label, Input } from 'native-base';
import { connect } from 'react-redux';


import { setDataUser } from '../actions';

import { color1, color2, color3, color4 } from './Color';

import axios from 'axios';

//import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component{


  constructor(props){
    super(props);
    this.state = {
      user:'owner',
      pass: 'Sp4tnick',
      isFetching: false,
    }
  }

  componentDidMount(){
    this._getData();
  }

  _getData = async() => {
    try{
      const data = await AsyncStorage.getItem('dataUser');

      //console.log('jadi: ' + data);

      if(data == null){

      }else{


        const data2 = JSON.parse(data);

        this.props.setDataUser(data2);
        this.props.navigation.navigate("Home");
      }


    }catch(e){
      console.log(e);
    }
  }


  _storeData = async (value) => {
    try {
      await AsyncStorage.setItem('dataUser', JSON.stringify(value));
      this.props.navigation.navigate("FormKas");
      //alert('berhasil');
    } catch (e) {
      console.log(e);
    }
  }


  onButtonSubmit = () => {
    if( this.state.user == "" || this.state.pass == ""){

      alert("Silahkan lengkapi data")

    }else{


      this.setState({
        isFetching: true,
      })

      const user = this.state.user;
      const pass = this.state.pass;

      //const user = 'owner';
      //const pass = 'Sp4tnick';

      let data = {
        identity: user,
      	password: pass,
      }

      const opt = {
        headers: {'Content-Type': 'application/json', 'api-key':'kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s'},
        url: 'https://mpos-dev.bursasajadah.com/api/v1/auth/login',
        data: data,
        method: 'post'
      }

      //console.log(opt);

      axios(opt)
      .then((res) =>
        {
          //console.log(res);
          this.setState({
            isFetching: false,
          })
          if(res.data.status){
            //console.log(res.data.data);

            this._storeData(res.data.data);
            this.props.setDataUser(res.data.data);
            //this.props.navigation.navigate("FormKas");
          }else{
            alert('Username atau Password salah');
          }
        }
      ).catch((error) => {
        console.log(error);

        this.setState({
          isFetching: false,
        })

        alert("Password atau Username salah");
      });


    }
  }

  onUsername(text){
    this.setState({
      user: text,
    })
  }

  onPassword(text){
    this.setState({
      pass: text,
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
          <Text style={styles.textStyle}>Login</Text>
      </TouchableOpacity>
    }



    return(
        <ImageBackground resizeMode={'cover'} source={require('./img/background.jpg')} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Image source={require('./img/logo.png')} style={{ width: 250, height: 250 }} resizeMode={'contain'}/>
          </View>
          <View style={styles.formStyle}>
            <Input placeholder="Username"
                value={this.state.user}
                keyboard-type='email'
                onChangeText={( text )=> this.onUsername(text) }
            />

          </View>
          <View style={styles.formStyle}>
            <Input placeholder="Password"
              value={this.state.pass}
              secureTextEntry={true}
              onChangeText={( text )=> this.onPassword(text) }
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

export default connect(mapStateToProps, {setDataUser})(Login);
