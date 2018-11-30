import firebase from 'firebase';
import { CARLIST_FETCH_SUCCESS } from './types';

export const carListfetch = () => {
  return (dispatch) => {
    firebase.database().ref('/carlist')
      .on('value', (snapshot) => {
        dispatch({ type: CARLIST_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
