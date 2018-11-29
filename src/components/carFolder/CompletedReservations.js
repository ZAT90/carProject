import React, { Component } from 'react';
import {
  View, Text, FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import {
  CardSection, Spinner, Header,
} from '../common';

class CompletedReservations extends Component {

  render() {
    return (
      <View>
        <Header isCarList={false} headerText="List of Cars" />
        {/* {cars ? (
          <FlatList
            data={cars}
            renderItem={(item, index) => this.renderListItems(item, index)}
            keyExtractor={(item, index) => item[0]}
          />
        ) : <Spinner />} */}

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state reserve', state.reservelist);
  const RearrangeData = Object.entries(state.reservelist);
  const checkres = RearrangeData.filter(value => value[1].isCompleted);
  if (checkres.length > 0) {
    console.log('it is true', checkres);
  }

  return { reservations: Object.entries(state.reservelist) };
};

export default connect(mapStateToProps, null)(CompletedReservations);
