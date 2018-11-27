import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import { createAppContainer } from 'react-navigation';
import Login from './components/Login';
import StackNavigator from './AppNavigator';

const AppContainer = createAppContainer(StackNavigator);

export default class App extends Component {
 
  render() {
    return (
      <AppContainer />

    );
  }
}
