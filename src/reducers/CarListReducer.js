import { CARLIST_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CARLIST_FETCH_SUCCESS:
      console.log('carlist action',action);
      return action.payload;
    default:
      return state;
  }
};