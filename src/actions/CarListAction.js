import firebase from 'firebase';
import { CARLIST_FETCH_SUCCESS } from './types';

export const carListfetch = () => {
  // const { currentUser } = firebase.auth();
  console.log('action is being called',firebase.database().ref('/carlist'));
  return (dispatch) => {
    firebase.database().ref('/carlist')
      .on('value', (snapshot) => {
        console.log('snapshot', snapshot);
        dispatch({ type: CARLIST_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
