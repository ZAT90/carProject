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
    height: 40, position: 'absolute', bottom: 150, width: width / 1.1, marginLeft: 15,
  },
  reserveCardSection: { flexDirection: 'column' },
  carfont: { fontSize: 18 },
  placefont: { fontSize: 16, fontWeight: 'bold', marginTop: 3 },
  mfgfont: { fontSize: 18, marginTop: 5 },
  transfont: { marginTop: 5 },
  completefirstText: { fontSize: 16, fontWeight: 'bold', color: '#007aff' },
  complesecondText: { color: '#484848', marginLeft: 10 },
  completefirstText2: {
    fontSize: 16, fontWeight: 'bold', color: '#007aff', marginTop: 5,
  },
});

module.exports = styles;
