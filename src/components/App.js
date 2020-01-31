import React, { Component } from'react';
import { View, Text } from 'react-native';
import { Root } from 'native-base';
import store from "../store";
import { Provider } from 'react-redux';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';


import Home from "./Home";
import Struk from "./Struk";
import Login from './Login';
import Setting from './Setting';
import Activity from "./Activity";
import Manual from "./Manual";
import Inventory from "./Inventory";
import Favorites from "./Favorites";
import AddCustomer from "./AddCustomer";
import FormKas from "./FormKas";

class Hidden extends React.Component {
  render() {
    return null;
  }
}

export default class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <Root>
          <AppContainer />
        </Root>
      </Provider>
    );
  }
}

const AppNavigator = createDrawerNavigator({
  Login: {screen: Login},
  Library: {screen: Home},
  Inventory: {screen: Inventory},
  Activity: {screen: Activity},
  Setting: {screen: Setting},
});

const AppSwitchNavigator = createDrawerNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      drawerLabel: <Hidden />
    }
  },
  Home: {screen: Home},
  Activity: { screen: Activity },
  AddCustomer: {
    screen: AddCustomer,
    navigationOptions: {
      drawerLabel: <Hidden />
    }
  },
  FormKas: {
    screen: FormKas,
    navigationOptions: {
      drawerLabel: <Hidden />
    }
  },
  Struk: {
    screen: Struk,
    navigationOptions: {
      drawerLabel: <Hidden />
    }
  },
  Inventory: {screen: Inventory},
  Manual: {
    screen: Manual,
    navigationOptions: {
      drawerLabel: <Hidden />
    }
  },
  Favorites: {
    screen: Activity,
    navigationOptions: {
      drawerLabel: <Hidden />
    }
  },
  Setting : {screen: Setting},
});

const AppContainer =  createAppContainer(AppSwitchNavigator);
