import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  mapcontainer: {
    height: height / 3,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  activeView: { marginTop: 0, flex: 1 },
  reserveBtnStyle: {
    height: 40, position: 'absolute', bottom: 150, width: width / 1.1, marginLeft: 15
  },
});

module.exports = styles;
