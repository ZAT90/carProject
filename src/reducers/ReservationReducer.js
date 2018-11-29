import { RESERVELIST_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESERVELIST_FETCH_SUCCESS:
      console.log('reservelist action', action);
      return action.payload;
    default:
      return state;
  }
};