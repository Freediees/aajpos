import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Container, Form, Item, Label, Input, Button, Icon, DatePicker, Radio } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import { color1, color2, color3, color4, color5 } from './Color';

import axios from 'axios';

class AddCustomer extends Component {


  constructor(props){
    super(props);

    this.state = ({
      customer_group_id: 1,
    	company: "Bursasajadah",
    	person: "",
    	email: "",
    	phone: "",
    	address: "",
    	city: "",
      birth: "",
      becomeMember: false,
      jenisKelamin: 'male',
    })
  }
  backToHome = () =>{
      this.props.navigation.navigate('Home');
  }


  buttonSubmit = () => {
    //console.log(this.state);

    if( this.state.person == "" || this.state.email == "" || this.state.phone == "" || this.state.address == ""){

      alert("Silahkan lengkapi data")

    }else{

      //console.log(this.state.becomeMember)
      var statusCustomer = 1;
      if(this.state.becomeMember){
        statusCustomer = 6;
      }

      let data = {
        customer_group_id: statusCustomer,
      	company: 'Bursasajadah',
      	person: this.state.person,
      	email: this.state.email,
      	phone: this.state.phone,
      	address: this.state.address,
      	city: this.state.city,
        dob: this.state.birth,
        gender: this.state.jenisKelamin,
        is_member: this.state.becomeMember,
      }

      const opt = {
        headers: {'Content-Type': 'application/json', 'api-key':'kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s'},
        url: 'https://mpos-dev.bursasajadah.com/api/v1/customers',
        data: data,
        method: 'post'
      }


      //console.log(JSON.stringify(data));

      axios(opt)
      .then((res) =>
        {
          //console.log(res);
          alert('Berhasil Menambahkan');
          this.props.navigation.navigate('Home')
        }
      ).catch((error) => {
        alert("Terjadi kesalahan, silahkan coba beberapa saat lagi");
        console.log(error)
      });


    }


  }

  onChangeNama = text => {
    this.setState({
      person: text
    })
  }

  onChangeEmail = text => {
    this.setState({
      email: text
    })
  }

  onChangePhone = text => {
    this.setState({
      phone: text
    })
  }

  onChangeKota = text => {
    this.setState({
      city: text
    })
  }

  onChangeMember(){
    let a = !this.state.becomeMember;
    this.setState({
      becomeMember: a
    })
  }

  onChangeAddress(text){
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var tanggal = date + '/' + month + '/' + year;
    //console.log(tanggal);

    this.setState({
      address: text
    })
  }

  onChangeKota(text){
    this.setState({
      city: text
    })
  }

  onChangeDate(data){
    //console.log(data);

    let dateStr = data.toLocaleDateString("en-GB", {day:"2-digit", month:"2-digit", year:"2-digit"}) // 10/05/19

    let arr = dateStr.split("/")// [ '10', '05', '19' ]
    let d = arr[0]; //e.g. 10
    let m = arr[1]; //e.g. 5
    let y = data.getFullYear(); //e.g. 19

    var tanggal = (y + '-' + m + '-' + d);

    this.setState({ birth: tanggal });
  }


  render(){

    //console.log(this.state.person);

    return(
      <Container>
        <ScrollView>
        <Grid style={{ padding: 0, margin: 0}}>
          <Row style={{ height: 20}}>
            <Col style={{ width: 50, backgroundColor: color3, height: 70, justifyContent: 'center', alignItems: 'center' }} onPress={ this.backToHome }>

              <Icon type="AntDesign" name="left" style={{ color: 'white', fontSize: 30 }}/>

            </Col>
            <Col style={{ backgroundColor: color3, height: 70, justifyContent: 'center', alignItems: 'center' }}>

              <Text style={{ fontSize: 30, fontFamily: 'Roboto', color: 'white', fontWeight:'bold' }}>Add Customer</Text>

            </Col>
          </Row>

          <Row>

            <View style={{flex: 1, padding: 150, paddingTop: 100 }}>
              <Form>
                <Row>
                <Col style={{ padding: 20}}>
                  <Item rounded style={{ margin: 10, paddingLeft: 10}}>
                    <Input placeholder= 'Nama' onChangeText={ text => this.onChangeNama(text) }/>
                  </Item>
                  <Item rounded style={{ margin: 10, paddingLeft: 10}}>
                    <Input
                    placeholder="Email"
                    onChangeText={ text => this.onChangeEmail(text) }/>
                  </Item>
                  <Item rounded style={{ margin: 10, paddingLeft: 10}}>
                    <Input
                      placeholder= "Telepon"
                      keyboardType="numeric"
                      onChangeText = { text => this.onChangePhone(text) }
                    />
                  </Item>
                  <View
                    style={{ paddingLeft: 20, paddingTop: 10, marginTop: 15,marginLeft: 0, borderWidth: 0.5, borderRadius: 30, height: 100, borderColor: 'grey' }}>
                    <Text style={{ fontFamily: 'Roboto', fontSize: 17, color: 'grey'}}>Jenis Kelamin</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                      <Text style={{ fontFamily: 'Roboto', fontSize: 15, color: 'grey', marginRight:10}}>Pria </Text>
                      <Radio
                        style={{ marginRight: 30}}
                        onPress={()=> {this.setState({ jenisKelamin: 'male'})}}
                        selected={this.state.jenisKelamin == 'male'}
                        />
                      <Text style={{ fontFamily: 'Roboto', fontSize: 15, color: 'grey', marginRight: 10}}>Wanita </Text>
                      <Radio
                        onPress={()=> {this.setState({ jenisKelamin: 'female'})}}
                        selected={this.state.jenisKelamin == 'female'}
                      />
                    </View>

                  </View>
                </Col>
                <Col style={{ padding: 20 }}>

                  <Item rounded style={{ margin: 10, paddingLeft: 10}}>
                    <Input placeholder="Kota" onChangeText={ text => this.onChangeKota(text) }/>
                  </Item>
                  <Item rounded style={{ margin: 10, paddingLeft: 10}}>
                    <Input
                      placeholder="Alamat"
                      onChangeText = { text => this.onChangeAddress(text) }
                    />
                  </Item>
                  {
                    <View
                    style={{ padding: 0, marginTop: 15,marginLeft: 0, borderWidth: 0.5, borderRadius: 30, height: 50, borderColor: 'grey', justifyContent: 'center' }}>
                      <DatePicker
                      defaultDate={new Date(2018, 4, 4)}
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText="Tanggal Lahir"
                      textStyle={{ fontFamily: "Roboto", color: 'grey' }}
                      placeHolderTextStyle={{ fontFamily: "Roboto", color: 'grey' }}
                      onDateChange={(data)=>this.onChangeDate(data)}
                      disabled={false}
                      />
                    </View>
                  }

                  <View
                    style={{ paddingLeft: 15, paddingTop: 0, marginTop: 20,marginLeft: 0, borderWidth: 0.5, borderRadius: 30, borderColor: 'grey',justifyContent: 'center', height: 60 }}>

                    <View style={{ flexDirection: 'row', marginTop: 0, alignItems: 'center' }}>
                      <Text style={{ fontFamily: 'Roboto', fontSize: 17, color: 'grey', marginRight:10}}>Registrasi Member </Text>
                      <Radio
                        style={{ marginRight: 30}}
                        onPress={()=> this.onChangeMember()}
                        selected={ this.state.becomeMember }
                        />
                    </View>

                  </View>
                </Col>
                </Row>
              </Form>

              <Button style={{ width: '100%', marginTop: 50, borderRadius: 50, backgroundColor: color1, alignItems:'center', justifyContent: 'center' }} onPress={ this.buttonSubmit.bind(this) }>
                <Text style={{ color: 'white', fontFamily: 'Roboto', fontSize: 15 }}>Tambah</Text>
              </Button>
            </View>
          </Row>
        </Grid>
        </ScrollView>

      </Container>
    );
  }
}


export default AddCustomer;
