import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import {
  CardSection, Card, Header, Button,
} from '../common';
import { reserveListfetch } from '../../actions';

class ActiveReservation extends Component {
  onCompletePress(tripId) {
    const { currentUser } = firebase.auth();
    console.log('tripid', tripId);
    firebase.database().ref(`/reservations/${currentUser.uid}/${tripId}`).update({
      isActive: false,
      isCompleted: true,
    }).then((msg) => {
      console.log('check the message', msg);
      this.props.reserveListfetch();
    });
  }

  renderActiveView(activeDetails) {
    const activeTrip = activeDetails[1];
    const activeId = activeDetails[0];
    return (
      <Card>
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={{ fontSize: 18 }}>
Start from:
            {' '}
            {activeTrip.start_point}
          </Text>
          <Text style={{ fontSize: 18 }}>
Going to:
            {' '}
            {activeTrip.finish_point}
          </Text>
          <Text style={{ fontSize: 18 }}>
Car:
            {' '}
            {`${activeTrip.carModel} ${activeTrip.carName}`}
          </Text>
          <Text style={{ fontSize: 18, marginTop: 5 }}>
Manufacture year:
            {' '}
            { activeTrip.mfg_year }
          </Text>
        </CardSection>
        <CardSection>
          <Button onPress={() => this.onCompletePress(activeId)}>
            Complete Trip
          </Button>

        </CardSection>
      </Card>
    );
  }

  render() {
    console.log('this.props.active', this.props.active_reservation);
    const { navigation, active_reservation } = this.props;
    return (
      <View>
        <Header onPressBack={() => navigation.navigate('main')} isCarList={false} headerText="Active Trip" />
        { active_reservation.length > 0
          ? this.renderActiveView(active_reservation[0])
          : <Text>There are no reservations at the moment</Text> }

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state reserve completed', state.reservelist);
  console.log('state carlist completed', state.carList);
  const mapReservelist = state.reservelist ? state.reservelist : [];
  const RearrangeReserveData = Object.entries(mapReservelist);
  const checkres = RearrangeReserveData.filter(reserveValue => (reserveValue[1].isActive));

  console.log('it is true active', checkres);


  return { active_reservation: checkres };
};

export default connect(mapStateToProps, { reserveListfetch })(ActiveReservation);
