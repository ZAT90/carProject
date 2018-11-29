import firebase from 'firebase';
import { RESERVELIST_FETCH_SUCCESS } from './types';

export const reserveListfetch = () => {
  const { currentUser } = firebase.auth();
  console.log('action is being called', firebase.database().ref(`/reservations/${currentUser.uid}`));
  return (dispatch) => {
    firebase.database().ref(`/reservations/${currentUser.uid}`)
      .on('value', (snapshot) => {
        console.log('snapshotReserve', snapshot);
        dispatch({ type: RESERVELIST_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
