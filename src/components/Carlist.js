import React, { Component } from 'react';
import {
  View, Text, FlatList, TouchableWithoutFeedback, TextInput, Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { carListfetch } from '../actions';
import {
  CardSection, Spinner, Header, Card, GooglePlacesInput, Menu,
} from './common';
import styles from './Styles';


class Carlist extends Component {
  constructor(props) {
    super(props);
    this.onChooseLocation = this.onChooseLocation.bind(this);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      region: {
        latitude: 0.00,
        longitude: 0.00,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      placename: '',
    };
  }

  componentDidMount() {
    this.props.carListfetch();
    this.watchId = navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('firstlat', position.coords.latitude);
        // GEOCODING API COULD BE USED FOR GETTING THE USER CURRENT LOCATION NAME BUT THE FREE ACCOUNT
        // DOES NOT GIVE THE PLACE NAME PROPERLY, THAT IS WHY putting dummy data BUKIT DAMANSARA FOR THE CURRENT LOCATION
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyCz0hz27EZ27NarOoYbNAM0RPsVW9sx4pA`)
          .then((response) => { console.log('response fetch', response); response.json(); })
          // .then((responseJson) => responseJson.movies)
          .catch((error) => {
            console.error(error);
          });
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          error: null,
          placename: 'Bukit Damansara',
        });
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10,
      },
    );
  }

  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.watchId);
  // }

  componentWillReceiveProps(nextProps) {
    // console.log('check if no props', nextProps.cars);
    const newcars = nextProps.cars.map(car => console.log('map cars', car[1]));
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  onChooseLocation(lat, lng, placename) {
    console.log('onchangelocation', `${lat}//${lng}//${placename}`);
    this.setState({
      latitude: lat,
      longitude: lng,
      region: {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      error: null,
      placename,
    });
  }

  renderListItems(carItems) {
    // console.log('ListItem', `${listitem.item}/${index}`);
    console.log('listitem', carItems);
    // navigation.navigate('Reserve')
    console.log('item', carItems[0]);
    return (
      <View>
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.carnamefont}>{`${carItems[1].carModel} ${carItems[1].carName}`}</Text>
          <Text style={styles.mfg_yearfont}>
Manufacture year:
            {' '}
            { carItems[1].mfg_year }
          </Text>
          <Text style={styles.transmissionfont}>
Transmission:
            {' '}
            { carItems[1].transmission }
          </Text>
        </CardSection>
      </View>
    );
  }


  render() {
    const { cars } = this.props;
    const { navigation } = this.props;
    const {
      latitude, longitude, error, region, placename
    } = this.state;
    console.log('check my states', `${latitude}//${longitude}//${error}//${region}`);
    console.log('this.props.cars', cars);
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.mapcontainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}
          >
            {latitude && longitude && <Marker coordinate={{ latitude, longitude }} />}
            {cars.map(marker => (
              <Marker
                coordinate={marker[1].latlng}
                pinColor="#008000"
              >
                <Callout onPress={() => navigation.navigate('Reserve', { carId: marker[0], carDetails: marker[1], placename })}>
                  {this.renderListItems(marker)}
                </Callout>
              </Marker>
            ))}
          </MapView>
        </View>
        <GooglePlacesInput onChangeLocation={this.onChooseLocation} />
      </View>
    // <Card>
    //   <Header onPressRight={() => navigation.navigate('CompletedRes')} onPressBack={() => navigation.navigate('ActiveRes')} isCarList headerText="List of Cars" />
    //   {cars ? (
    //     <FlatList
    //       data={cars}
    //       renderItem={(item, index) => this.renderListItems(item, index)}
    //       keyExtractor={item => item[0]}
    //     />
    //   ) : <Spinner />}

    // </Card>
    );
  }
}


const mapStateToProps = (state) => {
  console.log('state', state);
  return { cars: Object.entries(state.carList) };
};

export default connect(mapStateToProps, { carListfetch })(Carlist);
