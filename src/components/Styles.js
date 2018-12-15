import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  carnamefont: { fontSize: 18 },
  mfg_yearfont: { fontSize: 18, marginTop: 5 },
  transmissionfont: { marginTop: 5 },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  imgStyle: { height: 400, width: 400 },
  loginCard: { marginTop: 30 },
  splashview: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  mapcontainer: {
    position: 'absolute',
    top: 50,
    height: height - 120,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  calloutView: {
    flexDirection: 'row',
    backgroundColor: 'red',
    borderRadius: 10,
    width: '40%',
    marginLeft: '30%',
    marginRight: '30%',
    marginTop: 20,
  },
  calloutSearch: {
    borderColor: 'transparent',
    marginLeft: 10,
    width: '90%',
    marginRight: 10,
    height: 40,
    backgroundColor:'yellow',
    borderWidth: 0.0,
  },
});

module.exports = styles;
