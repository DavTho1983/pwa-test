import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
	apiKey: 'AIzaSyAKQK_wDmEHA_MwXzn2RFTvdmLtwivTBFA',
	authDomain: 'clock-it-39ffd.firebaseapp.com',
	databaseURL: 'https://clock-it-39ffd.firebaseio.com',
	projectId: 'clock-it-39ffd',
	storageBucket: 'clock-it-39ffd.appspot.com',
	messagingSenderId: '1059366266500',
	appId: '1:1059366266500:web:50b151fca059068f0044d1',
	measurementId: 'G-55JBL6ZEN8'
};
firebase.initializeApp(firebaseConfig);

export default firebase;
