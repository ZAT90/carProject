import React, { Component } from 'react';
import { Text, Alert, View } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { reserveListfetch } from '../../actions';
import {
  Card, CardSection, Input, Button, Header, GooglePlacesInput,
} from '../common';

class ReservationScreen extends Component {
  constructor(props) {
    super(props);
    this.onChooseLocation = this.onChooseLocation.bind(this);
    this.state = {
      startText: '',
      finishtext: '',
      finishLatlng: { latitude: 0.00, longitude: 0.00 },
    };
  }

  componentDidMount() {
    this.props.reserveListfetch();
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextprop home', nextProps);
  }


  onPressReserve() {
    const { navigation } = this.props;
    const { currentUser } = firebase.auth();
    const { finishtext, finishLatlng } = this.state;
    const startText = navigation.getParam('placename', 'placename');
    const carId = navigation.getParam('carId', 'NO-ID');
    const carDetails = navigation.getParam('carDetails', 'some default value');
    const userId = currentUser.uid;
    console.log('finishLatlng', carDetails);
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
        this.createReservation(carId, startText, finishtext, userId, carDetails, finishLatlng);
      } else {
        Alert.alert(
          'Oops!',
          'Please fill in starting and end point',
          [{ text: 'OK', onPress: () => console.log('ok pressed') }],

        );
      }
    }
  }

  onChooseLocation(lat, lng, placename) {
    console.log('onchangelocation', `${lat}//${lng}//${placename}`);
    this.setState({
      finishLatlng: {
        latitude: lat,
        longitude: lng,
      },
      finishtext: placename,
    });
  }

  createReservation(carId, startText, finishtext, userId, carDetails, finishLatlng) {
    const { navigation } = this.props;
    firebase.database().ref(`/reservations/${userId}`)
      .push({
        carId,
        finishLatlng,
        isActive: true,
        isCompleted: false,
        start_point: startText,
        startLatLng: carDetails.latlng,
        finish_point: finishtext,
        carModel: carDetails.carModel,
        carName: carDetails.carName,
        mfg_year: carDetails.mfg_year,
        transmission: carDetails.transmission,
      })
      .then((res) => {
        console.log('response', res);
        Alert.alert(
          'Success!',
          'Please check in Active Reservation Screen',
          [{ text: 'OK', onPress: () => navigation.navigate('ActiveRes') }],

        );
      });
  }

  checkIfAlreadyActivated() {
    const { reservations } = this.props;
    const checkres = reservations.filter(value => value[1].isActive);
    if (checkres.length > 0) {
      return true;
    }
    return false;
  }

  render() {
    const { navigation, reservations } = this.props;
    const carDetails = navigation.getParam('carDetails', 'some default value');
    const placename = navigation.getParam('placename', 'placename');
    console.log('placename sent', placename);
    console.log('reservations render', reservations);
    return (
      <View style={{ flex: 1 }}>
        <Card>
          <Header onPressBack={() => navigation.navigate('main')} isCarList={false} headerText="Reserve a trip" />
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
          <CardSection style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 18 }}>Start from</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 3 }}>{placename}</Text>
          </CardSection>
          <CardSection>
            <Text style={{ fontSize: 18 }}>Go to</Text>
            <GooglePlacesInput onChangeLocation={this.onChooseLocation} />
          </CardSection>
        </Card>
        <View style={{
          height: 40, position: 'absolute', bottom: 150, width: 400,
        }}
        >
          <Button onPress={this.onPressReserve.bind(this)}>
                Reserve
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state reserve', state.reservelist);
  return { reservations: state.reservelist ? Object.entries(state.reservelist) : [] };
};

export default connect(mapStateToProps, { reserveListfetch })(ReservationScreen);
