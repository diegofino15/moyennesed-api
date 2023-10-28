var firebase = require('firebase-admin');
var serviceAccount = require("../private/serviceAccountKey.json");


if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
  });
}

// Firebase collections
const firebaseCollections = [
  "Coefficients & Averages",
  "Connection",
  "Graphics",
  "Marks",
  "Other"
];

module.exports = { firebase, firebaseCollections };