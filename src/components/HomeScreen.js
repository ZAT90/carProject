import React, { Component } from 'react';
import { View, Image, BackHandler } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { reserveListfetch } from '../actions';
import styles from './Styles';

class HomeScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.props.reserveListfetch();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    BackHandler.exitApp(); // works best when the goBack is async
    return true;
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextprop home', nextProps);
  }

  render() {
    return (
      <Swiper autoplay loop>
        <View style={styles.slide}>
          <Image style={styles.imgStyle} resizeMode="cover" source={require('./assets/ferrari.jpg')} />
        </View>
        <View style={styles.slide}>
          <Image style={styles.imgStyle} source={require('./assets/getcar.jpg')} />
        </View>
        <View style={styles.slide}>
          <Image style={styles.imgStyle} resizeMode="stretch" source={require('./assets/klcars.jpg')} />
        </View>
      </Swiper>
    );
  }
}

const mapStateToProps = state => ({ reservations: state.reservelist ? Object.entries(state.reservelist) : [] });
export default connect(mapStateToProps, { reserveListfetch })(HomeScreen);
