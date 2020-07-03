export function firebaseConfig() {
	if (
		process.env.NODE_ENV === "development" ||
		window.location.hostname.includes("staging") ||
		window.location.hostname.includes("localhost")
	) {
		return {
			apiKey: "XXX",
			authDomain: "XXX.firebaseapp.com",
			databaseURL: "XXX.firebaseio.com",
			projectId: "XXX",
			storageBucket: "XXX.appspot.com",
		};
	} else {
		return {
			apiKey: "XXX",
			authDomain: "XXX.firebaseapp.com",
			databaseURL: "XXX.firebaseio.com",
			projectId: "XXX",
			storageBucket: "XXX.appspot.com",
		};
	}
}

export function isDevOrStaging() {
	return (
		process.env.NODE_ENV === "development" ||
		window.location.hostname.includes("staging")
	);
}
