<% if (includeIE11Polyfills) { %>
// polyfills for IE 11
import "fast-text-encoding/text";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
<% } %>
	import * as React from "react";
	import * as ReactDOM from "react-dom";
	import { ReduxRoot } from "./ReduxRoot";
<% if (includeFirebase) { %>
import { initializeFirebase } from "./firebase/initializeFirebase";
<% } %>

<% if (includeFirebase) { %>
try {
	initializeFirebase();
} catch (e) {
	console.log("Error while trying to initialize Firebase. ", e);
	console.log("Try again to initialize Firebase in 1sec...");
	setTimeout(initializeFirebase, 1000);
}
<% } %>

const rootEl = document.getElementById("root");
ReactDOM.render(<ReduxRoot />, rootEl);

<% if (includeServiceWorker) { %>
// comment in for PWA with service worker in production mode
// registerServiceWorker();
<% } %>