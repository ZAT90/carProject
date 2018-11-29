import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import {
  Card, CardSection, Input, Button, Spinner,
} from './common';

class Settings extends Component {
  onButtonPress() {
    firebase.auth().signOut()
      .then(() => console.log('user signed out'))
      .catch(() => console.log('error signing out'));
  }

  render() {
    return (
      <View style={{ marginTop: 30 }}>
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
