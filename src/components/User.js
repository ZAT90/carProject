import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import {
  Card, CardSection, Header,
} from './common';
import styles from './Styles';

class User extends Component {
  render() {
    const { currentUser } = firebase.auth();
    console.log('USer current', currentUser);
    return (
      <Card>
        <Header isCarList={false} headerText="Your profile" />
        <CardSection>
          <Text style={styles.carnamefont}>
Email:
            {' '}
            {currentUser.email}
          </Text>
        </CardSection>
      </Card>
    );
  }
}
export default User;
