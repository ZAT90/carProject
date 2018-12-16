import React, { Component } from 'react';
import { Text , BackHandler} from 'react-native';
import firebase from 'firebase';
import {
  Card, CardSection, Header,
} from './common';
import styles from './Styles';

class User extends Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    BackHandler.exitApp(); // works best when the goBack is async
    return true;
  }
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
