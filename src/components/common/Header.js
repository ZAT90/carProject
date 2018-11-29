// Import libraries for making a component
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

// Make a component
const Header = (props) => {
  const {
    textStyle, viewStyle, leftHeader, rightHeader, middleHeader, textblue, textgreen,
  } = styles;

  const backText = 'back';
  const myReservationText = 'Active reservation';
  const completeResText = 'Completed reservations';

  return (
    <View style={viewStyle}>
      <TouchableOpacity
        style={leftHeader}
        onPress={props.onPressBack}
      >
        <Text style={textgreen}>{props.isCarList?myReservationText:backText}</Text>
      </TouchableOpacity>
      <View style={middleHeader}><Text style={textStyle}>{props.headerText}</Text></View>
      <TouchableOpacity
        style={rightHeader}
        onPress={props.onPressRight}
      >
        <Text style={textblue}>{props.isCarList?completeResText:''}</Text>

      </TouchableOpacity>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    flexDirection: 'row',

  },
  textStyle: {
    fontSize: 20,
  },
  textblue: { color: 'blue' },
  textgreen: { color: 'green' },
  leftHeader: { flex: 0.2, alignItems: 'center' },
  rightHeader: { flex: 0.3, alignContent: 'center' },
  middleHeader: { flex: 0.5, alignItems: 'center' },

};

// Make the component available to other parts of the app
export { Header };
