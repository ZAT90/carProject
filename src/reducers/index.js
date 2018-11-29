import { combineReducers } from 'redux';
import CarListReducer from './CarListReducer';
import ReservationReducer from './ReservationReducer';

export default combineReducers({
  carList: CarListReducer,
  reservelist: ReservationReducer,

});
