import React, { Component} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Container, Header,Content, Footer, FooterTab, Button, Icon } from 'native-base';
import { Row, Col, Grid} from 'react-native-easy-grid';
import { connect } from 'react-redux';
import axios from 'axios';
import { tambahData, tambahLibrary } from '../actions';
import SimpleModal from './SimpleModal';

const data=[
  {key:"Jason1"},
  {key:"Jason2"},
  {key:"Jason3"},
];

import { color1, color2, color3, color4 } from './Color';

class Home extends Component{

  constructor(props){
    super(props)
    link_url = "http://mpos-dev.bursasajadah.com/api/v1/products?api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s";
    this.state= {
      data: [],
      transaksi: [],
      isModalVisible: false,
      nilaiTransaksi: '0',
      idTransaksi: 1,
    }
  }

  componentDidMount(){


    axios.get("http://mpos-dev.bursasajadah.com/api/v1/products?api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s")
      .then(
        (res)=>{
          //console.log(res.data.data);
          //this.setState({ data: res.data.data });

          this.props.dispatch(tambahLibrary(res));


        }
      );
  }

  changeModalVisibility=(bool)=>{
    this.setState({ isModalVisible: bool });
  }

  onClickAngka(value){
    let a = this.state.nilaiTransaksi;
    let b = '';

    if(a == '0'){
      if(value == '00'){
        b = '0';
      }else{
        b = value;
      }
    }else{
      b = a + value;
    }

    this.setState({ nilaiTransaksi: b });
  }

  resetNilai(){
    this.setState({ nilaiTransaksi: '0' });
  }

  onDel(){

    let a = this.state.nilaiTransaksi;
    let b = '';
    if(a.length == 1){
      b = '0';
    }else{
      b = a.substring(0, a.length-1);
    }

    this.setState({ nilaiTransaksi: b });

  }

  onClickItem(data){

    var temp = this.state.transaksi.concat(data);
    this.setState({ transaksi: temp });

  }

  onTambah(){
    let price = this.state.nilaiTransaksi;
    let name = "Barang "+ this.state.idTransaksi.toString();
    let id = this.state.idTransaksi;

    let data = {price: price, name: name, id: id}
    this.setState({ nilaiTransaksi: '0', idTransaksi: this.state.idTransaksi + 1 });

    this.props.dispatch(tambahData(data));

  }



  onTestClickItem(data){
    this.props.dispatch(tambahData(data));
  }

  renderItem(item){
    return(
      <TouchableOpacity style={{ padding: 10, marginBottom: 10, justifyContent: "space-between", flexDirection: "row", borderBottomWidth: 1 }} onPress={()=> {this.onTestClickItem(item.item);}}>
        <Text style={styles.text}>{item.item.name}</Text>
        <Icon type="AntDesign" name="right" style={{ color: "grey"}}/>
      </TouchableOpacity>
    );
  }

  renderTransaksi(item){
    //console.log(item);
    return(
      <TouchableOpacity style={{ padding: 10, marginBottom: 10, justifyContent: "space-between", flexDirection: "row" }}>
        <Text style={styles.text}>{item.item.name}</Text>
        <Text style={styles.text}>Rp. {item.item.price}</Text>
      </TouchableOpacity>
    );
  }

  changeModalVisibility=(bool)=>{
    this.setState({ isModalVisible: bool });
  }


  render(){

    const { col1, col2 } = styles;
    return(
      <Container style={{backgroundColor: '#E9EDEC', paddingTop: 10}}>
        <Grid>
          <Col size={2} style={{margin: 10, paddingLeft: 10, paddingRight: 10}}>
            <Row style={{ flex: 1, backgroundColor: '#FFFFFF', margin: 1 }}>
              <View style={{ flex: 1 , justifyContent: "space-between", alignItems: 'center', flexDirection: 'row', paddingLeft: 16, paddingRight: 16}}>
                <Text style={{ fontSize: 45, fontWeight: "bold" }}>Total:</Text>
                <Text style={{ fontSize: 45, fontWeight: "bold" }}>Rp.{this.state.nilaiTransaksi}</Text>
              </View>
            </Row>
            <Row>

                <Col style={{ margin: 1, backgroundColor:'white'}}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.onClickAngka('1'); }}>
                      <Text style={{fontSize: 35, fontWeight:'100'}}>1</Text>
                  </TouchableOpacity>
                </Col>

                <Col style={{ margin: 1, backgroundColor:'white'}}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.onClickAngka('2'); }}>
                      <Text style={{fontSize: 35, fontWeight:'normal'}}>2</Text>
                  </TouchableOpacity>
                </Col>

                <Col style={{ margin: 1, backgroundColor:'white'}}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.onClickAngka('3'); }}>
                      <Text style={{fontSize: 35, fontWeight:'normal'}}>3</Text>
                  </TouchableOpacity>
                </Col>

                <Col style={{ margin: 1, backgroundColor:'white'}}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.onClickAngka('0'); }}>
                      <Text style={{fontSize: 35, fontWeight:'normal'}}>0</Text>
                  </TouchableOpacity>
                </Col>


            </Row>
            <Row>
              <Col style={{ margin: 1, backgroundColor:'white'}}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.onClickAngka('4'); }}>
                    <Text style={{fontSize: 35, fontWeight:'normal'}}>4</Text>
                </TouchableOpacity>
              </Col>

              <Col style={{ margin: 1, backgroundColor:'white'}}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.onClickAngka('5'); }}>
                    <Text style={{fontSize: 35, fontWeight:'normal'}}>5</Text>
                </TouchableOpacity>
              </Col>

              <Col style={{ margin: 1, backgroundColor:'white'}}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.onClickAngka('6'); }}>
                    <Text style={{fontSize: 35, fontWeight:'normal'}}>6</Text>
                </TouchableOpacity>
              </Col>

              <Col style={{ margin: 1, backgroundColor:'white'}}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.onClickAngka('00'); }}>
                    <Text style={{fontSize: 35, fontWeight:'normal'}}>00</Text>
                </TouchableOpacity>
              </Col>

            </Row>
              <Row size={2}>
                <Col size={3}>
                  <Row>
                    <Col style={{ margin: 1, backgroundColor:'white'}}>
                      <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.onClickAngka('7'); }}>
                          <Text style={{fontSize: 35, fontWeight:'normal'}}>7</Text>
                      </TouchableOpacity>
                    </Col>
                    <Col style={{ margin: 1, backgroundColor:'white'}}>
                      <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.onClickAngka('8'); }}>
                          <Text style={{fontSize: 35, fontWeight:'normal'}}>8</Text>
                      </TouchableOpacity>
                    </Col>
                    <Col style={{ margin: 1, backgroundColor:'white'}}>
                      <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.onClickAngka('9'); }}>
                          <Text style={{fontSize: 35, fontWeight:'normal'}}>9</Text>
                      </TouchableOpacity>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ margin: 1, backgroundColor:'white'}}>
                      <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.resetNilai(); }}>
                          <Text style={{fontSize: 35, fontWeight:'normal'}}>C</Text>
                      </TouchableOpacity>
                    </Col>
                    <Col style={{ margin: 1, backgroundColor:'white'}}>
                      <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.onDel(); }}>
                          <Text style={{fontSize: 35, fontWeight:'normal'}}>Del</Text>
                      </TouchableOpacity>
                    </Col>
                  </Row>

                </Col>
                <Col style={{ margin: 1, backgroundColor:'white'}}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.onTambah(); }}>
                      <Text style={{fontSize: 35, fontWeight:'normal'}}>+</Text>
                  </TouchableOpacity>
                </Col>
            </Row>
          </Col>
          <Col size={1} style={{backgroundColor:'white', borderRadius: 10, margin: 10, marginRight: 20}}>
            <Row style={{height: 80}}>
                <Col size={1} style={{ backgroundColor: color3, borderTopLeftRadius: 10 }}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name="home" style={{ color: '#ffffff' }}/>
                  </View>
                </Col>
                <Col size={3} style={{ backgroundColor: color2, borderTopRightRadius: 10 }}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ fontSize: 25, color: '#ffffff' }}>+Customer</Text>
                  </View>
                </Col>
            </Row>
            <Row>
              <FlatList
                data={this.props.dataTransaksi}
                renderItem={(item)=>this.renderTransaksi(item)}
              />
            </Row>

              <Row style={{ height: 80,}}>
                <Col style={{ backgroundColor: color1, margin: 1 }}>
                  <View style={{ flex: 1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={[styles.text, {color: '#ffffff'}]}>Save Bill</Text>
                  </View>
                </Col>
                <Col style={{ backgroundColor: color1, margin: 1 }}>
                <View style={{ flex: 1, justifyContent:'center', alignItems:'center'}}>
                  <Text style={[styles.text, {color: '#ffffff'}]}>Print Bill</Text>
                </View>
                </Col>
              </Row>
              <Row style = {{ backgroundColor: color3, height: 80, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                <Col>
                  <TouchableOpacity style={{ flex: 1, justifyContent:'center', alignItems:'center'}} onPress={()=> this.changeModalVisibility(true)}>
                    <Text style={{ fontSize: 30, color: '#ffffff' }}>Charge Rp.{this.props.setTotal}</Text>
                  </TouchableOpacity>
                </Col>
              </Row>

          </Col>
        </Grid>


        <View style={{ height: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Grid>
            <Row>
              <Col style={{ backgroundColor: color2, width: 80}}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', paddingLeft: 20 }} onPress={()=> this.props.navigation.openDrawer()}>
                  <Icon type="Entypo" name="menu" style={{ color: 'white', fontSize: 40}} />
                </TouchableOpacity>
              </Col>
              <Col style={{ backgroundColor: color2}}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.props.navigation.navigate('Favorites')} } >
                  <Icon type="Ionicons" name="md-star" style={{ color: 'white', fontSize: 40}} />
                  <Text style={{ fontFamily: "Roboto", fontSize: 15, color: 'white'}}>Transaction</Text>
                </TouchableOpacity>
              </Col>
              <Col style={{ backgroundColor: color2}}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={()=> { this.props.navigation.navigate('Home')} } >
                  <Icon type="Entypo" name="list" style={{ color: 'white', fontSize: 40}}/>
                  <Text style={{ fontFamily: "Roboto", fontSize: 15, color: 'white'}}>Library</Text>
                </TouchableOpacity>
              </Col>
              <Col style={{ backgroundColor: color3 }}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                  <Icon type="Ionicons" name="md-calculator" style={{ color: 'white', fontSize: 40}}/>
                  <Text style={{ fontFamily: "Roboto", fontSize: 15, color: 'white'}}>Manual</Text>
                </TouchableOpacity>
              </Col>
            </Row>
          </Grid>
        </View>

          <Modal animationType="slide" transparent={true} visible={this.state.isModalVisible} onRequestClose={()=> this.setState({ isModalVisible: false })}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <SimpleModal changeModalVisibility={this.changeModalVisibility} />
              </View>
          </Modal>

      </Container>
    );
  }
}

export default connect(mapStateToProps)(Home);

function mapStateToProps(state){
  return {
    dataTransaksi: state.setDataTransaksi,
    dataLibrary: state.setDataList,
    setTotal: state.setTotal,
  };
}

// function mapDispatchToProps(dispatch){
//   return{
//     setDataList: ()=> dispatch({ type: "SET_DATA_LIST" }),
//     setDataTransaksi: ()=> dispatch({ type: "SET_DATA_TRANSAKSI "}),
//   }
// }

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto",
    fontSize: 20,
    color: 'grey'
  },
  col1: {
    flex: 2,
    justifyContent: "center",
    alignItems:"center",
    padding: 10
  },
  col2: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
    padding: 10
  }
});
