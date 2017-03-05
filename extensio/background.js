// TODO(DEVELOPER): Change the values below using values from the initialization snippet: Firebase Console > Overview > Add Firebase to your web app.
// Initialize Firebase
var config = {
    apiKey: "AIzaSyC9N5JbdIrEY1KdrhNNLe5N8DiQOeLnb04",
    databaseURL: "https://ejemploadri-e8450.firebaseio.com",
    storageBucket: "ejemploadri-e8450.appspot.com"
};
firebase.initializeApp(config);

/**
 * initApp handles setting up the Firebase context and registering
 * callbacks for the auth status.
 *
 * The core initialization is in firebase.App - this is the glue class
 * which stores configuration. We provide an app name here to allow
 * distinguishing multiple app instances.
 *
 * This method also registers a listener with firebase.auth().onAuthStateChanged.
 * This listener is called when the user is signed in or out, and that
 * is where we update the UI.
 *
 * When signed in, we also authenticate to the Firebase Realtime Database.
 */
function initApp() {
    // Listen for auth state changes.
}

window.onload = function() {
    initApp();
};
