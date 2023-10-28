var firebase = require('firebase-admin');
var serviceAccount = require("../private/serviceAccountKey.json");

if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
  });
}

module.exports = { firebase };