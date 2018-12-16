import React, { Component } from 'react';
import { View, Image, Platform } from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import firebase from 'firebase';
import styles from './Styles';

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

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (Platform.OS === 'android') {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
          .then((data) => {
            if (user) {
              navigation.navigate('main');
            } else {
              navigation.navigate('Login');
            }
          }).catch((err) => {
          });
      } else {
        if (user) {
          navigation.navigate('main');
        } else {
          navigation.navigate('Login');
        }
      }
    });
  }

  render() {
    return (
      <View style={styles.splashview}>
        <Image resizeMode="cover" source={require('./assets/welcome2.jpeg')} />
      </View>
    );
  }
}
export default SplashScreen;
