import React, { Component } from 'react';
import {
  View, Text, FlatList, BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import {
  CardSection, Header,
} from '../common';

class CompletedReservations extends Component {
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
  renderListItems(listitem, index) {
    const carItems = listitem.item;
    console.log('item', carItems[0]);
    return (
      <View>
          <CardSection style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color:'#007aff' }}>Start from</Text>
            <Text style={{ color: '#484848', marginLeft: 10 }}>{carItems[1].start_point}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color:'#007aff', marginTop: 5 }}>Going to</Text>
            <Text style={{ color: '#484848', marginLeft: 10 }}>{carItems[1].finish_point}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color:'#007aff', marginTop: 5 }}>Car</Text>
            <Text style={{ color: '#484848', marginLeft: 10 }}>{`${carItems[1].carModel} ${carItems[1].carName}`}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color:'#007aff', marginTop: 5 }}>Manufacture year</Text>
            <Text style={{ color: '#484848', marginLeft: 10 }}>{ carItems[1].mfg_year }</Text>
          </CardSection>
      </View>
    );
  }

  render() {
    const { navigation, complete_reservations } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header onPressBack={() => navigation.navigate('main')} isCarList={false} headerText="Completed Trips" />
        { complete_reservations.length > 0 ? (
          <View style={{ paddingBottom: 100 }}>
          <FlatList
            data={complete_reservations}
            contentContainerStyle={{ paddingBottom: 30}}
            renderItem={(item, index) => this.renderListItems(item, index)}
            keyExtractor={(item, index) => item[0]}
          />
          </View>
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <Text>
          You have not completed any trips yet. Please go to my reservation screen to get started
          </Text>
          </View>
        ) }

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state reserve completed', state.reservelist);
  console.log('state carlist completed', state.carList);
  const mapReservelist = state.reservelist ? state.reservelist : [];
  const RearrangeReserveData = Object.entries(mapReservelist);
  const checkres = RearrangeReserveData.filter(reserveValue => reserveValue[1].isCompleted);

  console.log('it is true', checkres);


  return { complete_reservations: checkres };
};

export default connect(mapStateToProps, null)(CompletedReservations);
