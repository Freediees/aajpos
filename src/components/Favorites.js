import React, { Component} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Container, Header,Content, Footer, FooterTab, Button, Icon } from 'native-base';
import { Row, Col, Grid} from 'react-native-easy-grid';
import { connect } from 'react-redux';
import axios from 'axios';
import { tambahData, tambahLibrary, tambahTotal } from '../actions';
import SimpleModal from './SimpleModal';

const data=[
  {key:"Jason1"},
  {key:"Jason2"},
  {key:"Jason3"},
];

let totalNilai = 0;

class Home extends Component{

  constructor(props){
    super(props)
    link_url = "http://mpos-dev.bursasajadah.com/api/v1/products?api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s";
    this.state= {
      data: [],
      transaksi: [],
      isModalVisible: false,
    }
  }

  componentDidMount(){

    //console.log('sini');

    axios.get("http://mpos-dev.bursasajadah.com/api/v1/products?api-key=kc0gcg8ks0kk0ogw4o0k8s88ockgkokgo8okwg8s")
      .then(
        (res)=>{

          //console.log('hemeh');
          //console.log(res.data.data);
          //this.setState({ data: res.data.data });
           //console.log(res);
          this.props.dispatch(tambahLibrary(res));


        }
      )
      .catch((error) => {
          console.log(error);
      });
  }

  onClickItem(data){

    var temp = this.state.transaksi.concat(data);
    this.setState({ transaksi: temp });

  }

  onTestClickItem(data){

    this.props.dispatch(tambahData(data));
    let a = this.hitungTotal();
    console.log(a);
  }

  hitungTotal(){
    let a = this.props.dataTransaksi.length;
    //console.log(a);

    totalNilai = 0;
    let i = 0;
    for(i=0;i<a;i++){
      totalNilai = totalNilai + parseInt(this.props.dataTransaksi[i].price, 10);
    }

    return totalNilai;
  }

  renderItem(item){
    return(
      <TouchableOpacity style={{ padding: 10, marginBottom: 10, justifyContent: "space-between", flexDirection: "row", borderBottomWidth: 1, borderColor: "#E9EDEC" }} onPress={()=> {this.onTestClickItem(item.item);}}>
        <Text style={styles.text}>{item.item.name}</Text>
        <Icon type="AntDesign" name="right" style={{ color: 'grey', fontSize: 20 }}/>
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


  cekButton(){
    let hitung = this.hitungTotal();
    this.props.dispatch(tambahTotal(hitung));
  }

  render(){
    this.cekButton();

    const { col1, col2 } = styles;
    return(
      <Container style={{backgroundColor: '#E9EDEC', paddingTop: 10}}>
        <Grid>
          <Col size={2} style={{margin: 10, paddingLeft: 10, paddingRight: 10}}>
            <Row style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', padding: 10, borderBottomWidth: 1, borderColor: 'grey'}}>
              <Text>Favorite page</Text>
            </Row>
          </Col>
          <Col size={1} style={{backgroundColor:'white', borderRadius: 10, margin: 10, marginRight: 20}}>
            <Row style={{height: 80}}>
                <Col size={1} style={{ backgroundColor: '#d3ed95', borderTopLeftRadius: 10 }}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name="home" style={{ color: 'grey' }}/>
                  </View>
                </Col>
                <Col size={3} style={{ backgroundColor: '#e6ffab', borderTopRightRadius: 10 }}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ fontSize: 25, color: 'grey' }}>+Customer</Text>
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
                <Col style={{ backgroundColor: '#e6ffab', margin: 1 }}>
                  <View style={{ flex: 1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={styles.text}>Save Bill</Text>
                  </View>
                </Col>
                <Col style={{ backgroundColor: '#e6ffab', margin: 1 }}>
                <View style={{ flex: 1, justifyContent:'center', alignItems:'center'}}>
                  <Text style={styles.text}>Print Bill</Text>
                </View>
                </Col>
              </Row>
              <Row style = {{ backgroundColor: '#d3ed95', height: 80, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
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
                <Col style={{ backgroundColor: '#92d66f', width: 80}}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', paddingLeft: 20 }} onPress={()=> this.props.navigation.openDrawer()}>
                    <Icon type="Entypo" name="menu" style={{ color: 'white', fontSize: 40}} />
                  </TouchableOpacity>
                </Col>
                <Col style={{ backgroundColor: '#7ab55c'}}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <Icon type="Ionicons" name="md-star" style={{ color: 'white', fontSize: 40}} />
                    <Text style={{ fontFamily: "Roboto", fontSize: 15, color: 'white'}}>Favorites</Text>
                  </TouchableOpacity>
                </Col>
                <Col style={{ backgroundColor: '#92d66f'}}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.props.navigation.navigate('Home')} }>
                    <Icon type="Entypo" name="list" style={{ color: 'white', fontSize: 40}}/>
                    <Text style={{ fontFamily: "Roboto", fontSize: 15, color: 'white'}}>Library</Text>
                  </TouchableOpacity>
                </Col>
                <Col style={{ backgroundColor: '#92d66f'}}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> { this.props.navigation.navigate('Manual')} }>
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
