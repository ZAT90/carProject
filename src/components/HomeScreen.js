import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { reserveListfetch } from '../actions';

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
});

class HomeScreen extends Component {
  componentDidMount() {
    this.props.reserveListfetch();
  }

  componentWillReceiveProps(nextProps){
    console.log('nextprop home', nextProps);
  }

  render() {
    return (
      <Swiper autoplay loop>
        <View style={styles.slide1}>
          <Image style={{ height: 400, width: 400 }} resizeMode="cover" source={require('./assets/ferrari.jpg')} />
        </View>
        <View style={styles.slide1}>
          <Image style={{ height: 400, width: 400 }} source={require('./assets/getcar.jpg')} />
        </View>
        <View style={styles.slide1}>
          <Image style={{ height: 400, width: 400 }} resizeMode="stretch" source={require('./assets/klcars.jpg')} />
        </View>
      </Swiper>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state reserve', state.reservelist);
  return { reservations: Object.entries(state.reservelist) };
};

export default connect(mapStateToProps, { reserveListfetch })(HomeScreen);
