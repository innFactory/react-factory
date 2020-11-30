import cheet from 'cheet.js';
import firebase from 'firebase/app';
import * as React from 'react';
import { isDevOrStaging } from './config';
import { FirebaseDialog } from './FirebaseDialog';

interface Props {}

export function FirebaseHook(props: React.Props<Props>) {
	const [firebaseDialogOpen, setFirebaseDialogOpen] = React.useState(false);

	firebase.auth().onAuthStateChanged(function(user: any) {
		if (user) {
			// User is signed in.
		} else {
			// User is signed out.
		}
	});

	const localhostOrStaging = isDevOrStaging();

	const showFirebaseDialog = () => {
		setFirebaseDialogOpen(true);
	};

	React.useEffect(() => {
		if (localhostOrStaging) {
			cheet('f i r e b a s e', showFirebaseDialog);
		}
	}, []);

	return (
		<>
			{localhostOrStaging && (
				<FirebaseDialog open={firebaseDialogOpen} onClose={() => setFirebaseDialogOpen(false)} />
			)}
			{props.children}
		</>
	);
}
