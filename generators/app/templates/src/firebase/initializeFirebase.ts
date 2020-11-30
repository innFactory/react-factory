// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app';
// Add the Firebase services that you want to use
import 'firebase/auth';
import { firebaseConfig, isDevOrStaging } from './config';

export function initializeFirebase() {
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig());
	// Set default language Code
	firebase.auth().languageCode = 'de';

	if (isDevOrStaging()) {
		console.info('Firebase-APP created ' + firebase.SDK_VERSION);
	}
}
