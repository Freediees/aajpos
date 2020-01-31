import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Card, CardItem, Icon, Left, Body, Right} from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import { color1, color2, color3, color4, color5 } from '../Color';

class SettingUser extends Component {
  render(){
    return(
      <Card style={{ flex: 1, width: '100%', padding: 10, borderRadius: 5 }}>
        <Grid>
          <Row>
            <Col size={1}>
              <Icon name="user" type="EvilIcons" style={{ fontSize: 150}} />
            </Col>
            <Col size={3} style={{ justifyContent: 'center', paddingTop: 10}}>
              <Row style={{ height: 70}}>
                <Col>
                  <Text style={styles.labelStyle}>Nama Depan</Text>
                  <Text style={styles.textStyle}>Owner</Text>
                </Col>
              </Row>

              <Row style={{ height: 70}}>
                <Col>
                  <Text style={styles.labelStyle}>Nama Belakang</Text>
                  <Text style={styles.textStyle}>Owner</Text>
                </Col>
              </Row>

              <Row style={{ height: 70}}>
                <Col>
                  <Text style={styles.labelStyle}>Perusahaan</Text>
                  <Text style={styles.textStyle}>Stock Manager</Text>
                </Col>
              </Row>

              <Row style={{ height: 70}}>
                <Col>
                  <Text style={styles.labelStyle}>Phone</Text>
                  <Text style={styles.textStyle}>+628577777</Text>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Text style={styles.labelStyle}>Email</Text>
                  <Text style={styles.textStyle}>Owner@aartijaya.com</Text>
                </Col>
              </Row>

            </Col>
          </Row>
        </Grid>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'grey'
  },
  textStyle:{
    fontSize: 16,
    color: color3,
  }
});

export default SettingUser;
