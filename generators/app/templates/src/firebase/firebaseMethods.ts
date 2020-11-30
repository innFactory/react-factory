import firebase from 'firebase/app';

export function signUpUser(email: string, password: string, onSuccess?: () => void, onError?: (error: any) => void) {
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(function() {
			if (onSuccess) {
				onSuccess();
			}
			// Verification email sent.
		})
		.catch(function(error) {
			if (onError) {
				onError(error);
			}
			// Error occurred. Inspect error.code.
		});
}

export async function getToken() {
	if (firebase) {
		const user = firebase.auth!().currentUser;
		if (user) {
			try {
				const t = await user.getIdToken(true);
				return t.toString();
			} catch (e) {
				throw e;
			}
		}
	}

	return '';
}

export function signInWithGoogle(onSuccess?: () => void) {
	// Using a popup.
	var provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope('profile');
	provider.addScope('email');
	let currentMethod = window.location.protocol;
	let currentHost = window.location.host;
	let subdomain = window.location.host;

	provider.setCustomParameters({
		redirect_url: currentMethod + subdomain ? subdomain + '.' : '' + currentHost + '/auth/signin/provider',
	});
	firebase
		.auth()
		.signInWithPopup(provider)
		.then(function(result) {
			if (result && result.credential) {
				// This gives you a Google Access Token.
				var token = result.credential;
				// The signed-in user info.
				var user = result.user;
				if (onSuccess) {
					onSuccess();
				}
			}
		});
}

export function signInWithApple(onSuccess?: () => void) {
	// Using a popup.
	var provider = new firebase.auth.OAuthProvider('apple.com');
	provider.addScope('email');
	provider.setCustomParameters({
		redirect_url: 'https://staging.laura-ai.de',
	});

	firebase
		.auth()
		.signInWithPopup(provider)
		.then(function(result) {
			if (result && result.credential) {
				// This gives you a Google Access Token.
				var token = result.credential;
				// The signed-in user info.
				var user = result.user;
				if (onSuccess) {
					onSuccess();
				}
			}
		});
}

export function signInUser(email: string, password: string, onSuccess?: () => void, onError?: (error: any) => void) {
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(function() {
			if (onSuccess) {
				onSuccess();
			}
			// Sign In successful
		})
		.catch(function(error) {
			if (onError) {
				onError(error);
			}
			// Error occurred. Inspect error.code.
		});
}

export function signOut(onSuccess?: () => void, onError?: (error: any) => void) {
	firebase
		.auth()
		.signOut()
		.then(function() {
			if (onSuccess) {
				onSuccess();
			}
			//Signed out successfully
		})
		.catch(function(error) {
			if (onError) {
				onError(error);
			}
			// Error occurred. Inspect error.code.
		});
}

/*
Persistence
Persistence: { LOCAL: Persistence; NONE: Persistence; SESSION: Persistence }
An enumeration of the possible persistence mechanism types.

Type declaration
LOCAL: Persistence
Indicates that the state will be persisted even when the browser window is closed or the activity is destroyed in react-native.

NONE: Persistence
Indicates that the state will only be stored in memory and will be cleared when the window or activity is refreshed.

SESSION: Persistence
Indicates that the state will only persist in current session/tab, relevant to web only, and will be cleared when the tab is closed.
*/
export function setPersistenceLevel(
	persistence: firebase.auth.Auth.Persistence,
	onSuccess?: () => void,
	onError?: (error: any) => void,
	debug: boolean = false
) {
	firebase
		.auth()
		.setPersistence(persistence)
		.then(function() {
			if (onSuccess) {
				onSuccess();
			}
			if (debug) {
				console.info('Persistence set to ' + persistence);
			}
			// Verification email sent.
		})
		.catch(function(error) {
			if (onError) {
				onError(error);
			}
			if (debug) {
				console.error(error);
			}
			// Error occurred. Inspect error.code.
		});
}

export function sendVerificationEmail(onSuccess?: () => void, onError?: (error: any) => void, debug: boolean = false) {
	let user: firebase.User | null = firebase.auth().currentUser;

	if (user) {
		let currentMethod = window.location.protocol;
		let currentHost = window.location.host;
		let jetztBaufiURL = 'https://jetzt-baufinanzieren.de/redirect?url=';
		if (currentHost.includes('localhost')) {
			jetztBaufiURL = 'http://localhost:3000/redirect?url=';
		}
		console.log(jetztBaufiURL);
		let redirectURL = currentMethod + '//' + currentHost + '/signup?step=2';
		let base64RedirectURL = btoa(redirectURL);
		var actionCodeSettings = {
			url: jetztBaufiURL + base64RedirectURL,
		};
		console.log(actionCodeSettings);
		user.sendEmailVerification()
			.then(function() {
				if (onSuccess) {
					onSuccess();
				}
				if (debug) {
					console.info('Verification email sent');
				}
				// Verification email sent.
			})
			.catch(function(error) {
				if (onError) {
					onError(error);
				}
				if (debug) {
					console.error(error);
				}
				// Error occurred. Inspect error.code.
			});
	}
}

export function applyVerificationCode(
	code: string,
	onSuccess?: () => void,
	onError?: (error: any) => void,
	debug: boolean = false
) {
	firebase
		.auth()
		.applyActionCode(code)
		.then(function() {
			if (onSuccess) {
				onSuccess();
			}
			if (debug) {
				console.info('Verification code applied successfully');
			}
			// Verification code applied successfully
		})
		.catch(function(error) {
			if (onError) {
				onError(error);
			}
			if (debug) {
				console.error(error);
			}
			// Error occurred. Inspect error.code.
		});
}

export async function uploadProfileImage(
	blob: any,
	onFinished: (downloadUrl: any) => void,
	onError: () => void,
	onProgress?: (value: number) => void
) {
	var user: firebase.User | null = firebase.auth().currentUser;
	if (user) {
		var storageRef = firebase.storage().ref();

		var file = blob;

		// Create the file metadata
		var metadata: firebase.storage.UploadMetadata = {
			contentType: 'image/jpeg',
		};

		console.log(user.uid);
		// Upload file and metadata to the object 'images/mountains.jpg'
		var uploadTask = storageRef.child('users/' + user.uid + '/profilePicture.jpeg').put(file, metadata);

		// Listen for state changes, errors, and completion of the upload.
		uploadTask.on(
			firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
			snapshot => {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');
				if (onProgress) {
					onProgress(progress);
				}
				switch (snapshot.state) {
					case firebase.storage.TaskState.PAUSED: // or 'paused'
						console.log('Upload is paused');
						break;
					case firebase.storage.TaskState.RUNNING: // or 'running'
						console.log('Upload is running');
						break;
				}
			},
			(error: any) => {
				onError();
				// A full list of error codes is available at
				// https://firebase.google.com/docs/storage/web/handle-errors
				console.log(error);
				switch (error.code) {
					case 'storage/unauthorized':
						// User doesn't have permission to access the object
						break;

					case 'storage/canceled':
						// User canceled the upload
						break;

					case 'storage/unknown':
						// Unknown error occurred, inspect error.serverResponse
						break;
				}
			},
			() => {
				// Upload completed successfully, now we can get the download URL
				uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
					onFinished(downloadURL);
					console.log('File available at', downloadURL);
				});
			}
		);
	} else {
		onError();
	}
}
