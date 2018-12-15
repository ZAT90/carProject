import React from 'react';
import { View, Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } } };
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } } };

const GooglePlacesInput = (props) => {
  console.log('props places', props);
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
    // minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType="search" // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed="false" // true/false/undefined
      fetchDetails
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        console.log(data, details);
        console.log('lat', details.geometry.location.lat);
        console.log('lng', details.geometry.location.lng);
        console.log('formatted_address', details.formatted_address);
        props.onChangeLocation(details.geometry.location.lat, details.geometry.location.lng, details.formatted_address);
      }}
      enablePoweredByContainer={false}
      getDefaultValue={() => ''}

      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyBKydYtMkz9jW4RxwA9A4y-lvJYtzCy3YQ',
        language: 'en', // language of the results
        type: 'establishment', // default: 'geocode'
      }}

      styles={{
        textInputContainer: {
          width: '100%',
        },
        description: {
          fontWeight: 'bold',
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
        listView: {
          position: 'absolute',
          zIndex: 9999,
          top: 40,
          elevation: 1,
          backgroundColor: 'white',
        },
      }}

      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        types: 'food',
      }}

    // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

      debounce={200}
    />
  );
};

export { GooglePlacesInput };
