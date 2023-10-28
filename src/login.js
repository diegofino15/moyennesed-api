// Import environment variables
require('dotenv').config();
const PASSWORD = JSON.parse(process.env.PASSWORD);

// Import firebase for parsing documents
var { firebase, firebaseCollections } = require('./firebaseUtils.js');

// Main login function
async function login({ username, password }) {
  if (!username || !password) {
      console.log("LOGIN - Failed, did not receive username or password");
      return {
        "code": 400,
        "token": "",
        "message": "Identifiant ou mot de passe manquant",
        "data": {}
      };
  }

  if (password != PASSWORD) {
      console.log("LOGIN - Failed, wrong password");
      return {
        "code": 505,
        "token": "",
        "message": "Mot de passe invalide !",
        "data": {}
      };
  }

  const firebaseCollectionID = username.split("-")[1] ?? 0;
  const firebaseCollection = firebaseCollections[firebaseCollectionID];

  const firebaseDocument = username.split("-")[2] ?? "---";
  console.log(`LOGIN - Parsing firebase data for ${firebaseDocument} in ${firebaseCollection}...`)

  const firebaseData = await firebase.firestore().collection(firebaseCollection).doc(firebaseDocument).get();

  if (!firebaseData.exists) {
      console.log("LOGIN - Failed, firebase data not found");
      return {
        "code": 400,
        "token": "",
        "message": "Identifiant ou mot de passe manquant",
        "data": {}
      };
  }

  const firebaseDataJSON = firebaseData.data();
  var loginLogs = firebaseDataJSON.loginLogs;
  loginLogs.token = `${firebaseCollection}-${firebaseDocument}`; // Hack to save the firebase document ID as the token (for parsing marks later)

  console.log(`LOGIN - Success, got firebase data for ${firebaseDocument} in ${firebaseCollection}`);
  return loginLogs;
}

module.exports = { login };