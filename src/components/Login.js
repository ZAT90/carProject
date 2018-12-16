import React, { Component } from 'react';
import { Alert, BackHandler } from 'react-native';
import {
  Card, CardSection, Input, Button,
} from './common';
import styles from './Styles';
import firebase from 'firebase';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      userPassword: '',
    };
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
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

  handleBackPress = () => {
    BackHandler.exitApp(); // works best when the goBack is async
    return true;
  }

  render() {
    return (
      <Card style={styles.loginCard}>
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
