import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import {
  Card, CardSection, Input, Button, Spinner,
} from './common';

class SplashScreen extends Component {
  componentDidMount() {
    const { navigation } = this.props;  
    const config = {
      apiKey: 'AIzaSyC1uqr45dOKKWoE48RRGPo6aBEIFev9qAk',
      authDomain: 'mycarproject-d8673.firebaseapp.com',
      databaseURL: 'https://mycarproject-d8673.firebaseio.com',
      projectId: 'mycarproject-d8673',
      storageBucket: 'mycarproject-d8673.appspot.com',
      messagingSenderId: '840687807394',
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('main');
      } else {
        navigation.navigate('Login');
      }
    });
  }

  render() {
    return (
      <View>
        <Text>This is my Splash Screen</Text>
      </View>
    );
  }
}
export default SplashScreen;
