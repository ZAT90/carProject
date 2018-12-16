import React, { Component } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {
  CardSection, Card, Header, Button,
} from '../common';
import { reserveListfetch } from '../../actions';
import styles from './carStyles';

class ActiveReservation extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate('main') // works best when the goBack is async
    return true;
  }
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
      <View style={styles.activeView}>
              <View style={styles.mapcontainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: activeDetails[1].startLatLng.latitude,
              longitude: activeDetails[1].startLatLng.longitude,
              latitudeDelta: 0.2150,
              longitudeDelta: 0.0490,
            }}
          >
            <Marker coordinate={activeDetails[1].startLatLng} pinColor="#008000" title="start point" />
            <Marker coordinate={activeDetails[1].finishLatlng} pinColor="#008000" title="destination" />
            <MapViewDirections
              origin={activeDetails[1].startLatLng}
              destination={activeDetails[1].finishLatlng}
              apikey="AIzaSyCz0hz27EZ27NarOoYbNAM0RPsVW9sx4pA"
              strokeWidth={3}
              strokeColor="#008000"
            />
          </MapView>
        </View>
        <Card>
          <CardSection style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color:'#007aff' }}>Start from</Text>
            <Text style={{ color: '#484848', marginLeft: 10 }}>{activeTrip.start_point}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color:'#007aff', marginTop: 5 }}>Going to</Text>
            <Text style={{ color: '#484848', marginLeft: 10 }}>{activeTrip.finish_point}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color:'#007aff', marginTop: 5 }}>Car</Text>
            <Text style={{ color: '#484848', marginLeft: 10 }}>{`${activeTrip.carModel} ${activeTrip.carName}`}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color:'#007aff', marginTop: 5 }}>Manufacture year</Text>
            <Text style={{ color: '#484848', marginLeft: 10 }}>{ activeTrip.mfg_year }</Text>
          </CardSection>
          <CardSection>
            <Button onPress={() => this.onCompletePress(activeId)}>
            Complete Trip
            </Button>

          </CardSection>
        </Card>
      </View>
    );
  }

  render() {
    console.log('this.props.active', this.props.active_reservation);
    const { navigation, active_reservation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header onPressBack={() => navigation.navigate('main')} isCarList={false} headerText="Active Trip" />
        { active_reservation != undefined && active_reservation.length > 0
          ? this.renderActiveView(active_reservation[0])
          : 
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}><Text>There are no reservations at the moment</Text></View>
           }

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state reserve completed', state.reservelist);
  console.log('state carlist completed', state.carList);
  const mapReservelist = state.reservelist ? state.reservelist : [];
  const RearrangeReserveData = Object.entries(mapReservelist);
  console.log('RearrangeReserveData',RearrangeReserveData);
  const checkres = RearrangeReserveData.filter(reserveValue => (reserveValue[1].isActive));

  console.log('it is true active', checkres);


  return { active_reservation: checkres };
};

export default connect(mapStateToProps, { reserveListfetch })(ActiveReservation);
