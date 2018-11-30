import firebase from 'firebase';
import { RESERVELIST_FETCH_SUCCESS } from './types';

export const reserveListfetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/reservations/${currentUser.uid}`)
      .on('value', (snapshot) => {
        dispatch({ type: RESERVELIST_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
