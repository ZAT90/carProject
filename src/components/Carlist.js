import React, { Component } from 'react';
import {
  View, Text, FlatList, TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { carListfetch } from '../actions';
import {
  CardSection, Spinner, Header,
} from './common';

class Carlist extends Component {
  componentDidMount() {
    this.props.carListfetch();
  }

  componentWillReceiveProps(nextProps) {
    console.log('check if no props', nextProps.cars);
  }

  renderListItems(listitem, index) {
    console.log('ListItem', `${listitem.item}/${index}`);
    const { navigation } = this.props;
    const carItems = listitem.item;
    // navigation.navigate('Reserve')
    console.log('item', carItems[0]);
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Reserve',
        { carId: carItems[0], carDetails: carItems[1] })}
      >
        <View>
          <CardSection style={{ flexDirection: 'column' }}>
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
      </TouchableWithoutFeedback>
    );
  }


  render() {
    const { cars } = this.props;
    const { navigation } = this.props;
    console.log('this.props.cars', cars);
    return (
      <View>
        <Header isCarList onPressRight={() => navigation.navigate('CompletedRes')} headerText="List of Cars" />
        {cars ? (
          <FlatList
            data={cars}
            renderItem={(item, index) => this.renderListItems(item, index)}
            keyExtractor={(item, index) => item[0]}
          />
        ) : <Spinner />}

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state', state);
  return { cars: Object.entries(state.carList) };
};

export default connect(mapStateToProps, { carListfetch })(Carlist);
