import React, { Component } from 'react';
import { Alert } from 'react-native';
import firebase from 'firebase';
import {
  Card, CardSection, Input, Button, Spinner,
} from './common';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      userPassword: '',
    };
  }

  onButtonPress() {
    const { userEmail, userPassword } = this.state;
    const { navigation } = this.props;
    // this.props.navigation.navigate('main');
    console.log('email and pass', `${userEmail}//${userPassword}`);
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
      .then(() => navigation.navigate('main'))
      .catch(() => Alert.alert(
        'Oops!',
        'Incorrect Credentials',
        [{ text: 'OK', onPress: () => console.log('ok pressed') }],

      ));
  }

  render() {
    return (
      <Card style={{ marginTop: 30 }}>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={userEmail => this.setState({ userEmail })}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={userPassword => this.setState({ userPassword })}
          />
        </CardSection>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Login
          </Button>

        </CardSection>
      </Card>
    );
  }
}

export default Login;
