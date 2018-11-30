import React, { Component } from 'react';
import {
  View, Text, FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import {
  CardSection, Header,
} from '../common';

class CompletedReservations extends Component {
  renderListItems(listitem, index) {
    const carItems = listitem.item;
    console.log('item', carItems[0]);
    return (
      <View>
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={{ fontSize: 18 }}>
Start from:
            {' '}
            {carItems[1].start_point}
          </Text>
          <Text style={{ fontSize: 18 }}>
Going to:
            {' '}
            {carItems[1].finish_point}
          </Text>
          <Text style={{ fontSize: 18 }}>{`${carItems[1].carModel} ${carItems[1].carName}`}</Text>
          <Text style={{ fontSize: 18, marginTop: 5 }}>
Manufacture year:
            {' '}
            { carItems[1].mfg_year }
          </Text>
          <Text style={{ marginTop: 5 }}>
Transmission:
            {' '}
            { carItems[1].transmission }
          </Text>
        </CardSection>
      </View>
    );
  }

  render() {
    const { navigation, complete_reservations } = this.props;
    return (
      <View>
        <Header onPressBack={() => navigation.navigate('main')} isCarList={false} headerText="Completed Trips" />
        { complete_reservations.length > 0 ? (
          <FlatList
            data={complete_reservations}
            renderItem={(item, index) => this.renderListItems(item, index)}
            keyExtractor={(item, index) => item[0]}
          />
        ) : (
          <Text>
          You have not completed any trips yet. Please go to my reservation screen to get started
          </Text>
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
