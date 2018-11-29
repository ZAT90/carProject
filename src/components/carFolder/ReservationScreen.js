import React, { Component } from 'react';
import { Text, Alert } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import {
  Card, CardSection, Input, Button, Spinner, Header,
} from '../common';

class ReservationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startText: '',
      finishtext: '',
    };
  }


  onPressReserve() {
    const { navigation } = this.props;
    const { currentUser } = firebase.auth();
    const { startText, finishtext } = this.state;
    const carId = navigation.getParam('carId', 'NO-ID');
    const userId = currentUser.uid;
    // this.checkIfAlreadyActivated();
    if (this.checkIfAlreadyActivated()) {
      Alert.alert(
        'Oops!',
        'You already have an active reservation. Please complete it in order to create a new one',
        [{ text: 'OK', onPress: () => console.log('ok pressed') }],

      );
    } else {
      console.log('this is a test gone');
      if (startText != '' && finishtext != '') {
        this.createReservation(carId, startText, finishtext, userId);
      } else {
        Alert.alert(
          'Oops!',
          'Please fill in starting and end point',
          [{ text: 'OK', onPress: () => console.log('ok pressed') }],

        );
      }
    }
  }

  createReservation(carId, startText, finishtext, userId) {
    firebase.database().ref(`/reservations/${userId}`)
      .push({
        carId,
        isActive: true,
        isCompleted: false,
        start_point: startText,
        finish_point: finishtext,
      })
      .then((res) => {
        console.log('response', res);
        Alert.alert(
          'Success!',
          'Please check in Active Reservation Screen',
          [{ text: 'OK', onPress: () => console.log('ok pressed') }],

        );
      });
  }

  checkIfAlreadyActivated() {
    const { currentUser } = firebase.auth();
    const { navigation, reservations } = this.props;
    const checkres = reservations.filter(value => value[1].isActive);
    if (checkres.length > 0) {
      console.log('it is true');
      return true;
    }
    return false;
  }

  render() {
    const { navigation, reservations } = this.props;
    const carId = navigation.getParam('carId', 'NO-ID');
    const carDetails = navigation.getParam('carDetails', 'some default value');
    console.log('reservations render', reservations);
    return (
      <Card>
        <Header onPressBack={() => navigation.goBack()} headerText="Reserve a trip" />
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={{ fontSize: 18 }}>{`${carDetails.carModel} ${carDetails.carName}`}</Text>
          <Text style={{ fontSize: 18, marginTop: 5 }}>
Manufacture year:
            {' '}
            { carDetails.mfg_year }
          </Text>
          <Text style={{ marginTop: 5 }}>
Transmission:
            {' '}
            { carDetails.transmission }
          </Text>
        </CardSection>
        <CardSection>
          <Input
            label="Start From"
            placeholder="Enter Start Location"
            onChangeText={startText => this.setState({ startText })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Go to"
            placeholder="Enter Finish Location"
            onChangeText={finishtext => this.setState({ finishtext })}
          />
        </CardSection>
        <CardSection>
          <Button onPress={this.onPressReserve.bind(this)}>
            Reserve
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state reserve', state.reservelist);
  return { reservations: Object.entries(state.reservelist) };
};

export default connect(mapStateToProps, null)(ReservationScreen);
