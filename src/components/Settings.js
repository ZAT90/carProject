import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import firebase from 'firebase';
import {
  Card, CardSection, Button,
} from './common';
import styles from './Styles';

class Settings extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  }
  onButtonPress() {
    firebase.auth().signOut()
      .then(() => console.log('user signed out'))
      .catch(() => console.log('error signing out'));
  }

  render() {
    return (
      <View style={styles.loginCard}>
        <Card>
          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
           Log Out
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}
export default Settings;
