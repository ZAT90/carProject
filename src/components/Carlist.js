import React, { Component } from 'react';
import {
  View, Text, FlatList, TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { carListfetch } from '../actions';
import {
  CardSection, Spinner, Header,Card
} from './common';
import styles from './Styles';

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
      </TouchableWithoutFeedback>
    );
  }


  render() {
    const { cars } = this.props;
    const { navigation } = this.props;
    console.log('this.props.cars', cars);
    return (
      <Card>
        <Header onPressRight={() => navigation.navigate('CompletedRes')} onPressBack={() => navigation.navigate('ActiveRes')} isCarList={true} headerText="List of Cars" />
        {cars ? (
          <FlatList
            data={cars}
            renderItem={(item, index) => this.renderListItems(item, index)}
            keyExtractor={item => item[0]}
          />
        ) : <Spinner />}

      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state', state);
  return { cars: Object.entries(state.carList) };
};

export default connect(mapStateToProps, { carListfetch })(Carlist);
