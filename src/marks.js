// Import firebase for parsing documents
var { firebase } = require('./firebaseUtils.js');

// Main marks function
async function marks({ token, id }) {
  if (!token || !id) {
    console.log("MARKS - Failed, did not receive token or id");
    return {
      "code": 400,
      "message": "Identifiant ou token manquant",
      "token": "",
      "data": {}
  } ;
  }

  const firebaseCollection = token.split("-")[0];
  const firebaseDocument = token.split("-")[1];
  console.log(`MARKS - Parsing firebase data for ${firebaseDocument} in ${firebaseCollection} for ID ${id}...`)

  const firebaseData = await firebase.firestore().collection(firebaseCollection).doc(firebaseDocument).get();

  if (!firebaseData.exists) {
      console.log("MARKS - Failed, firebase data not found");
      return {
        "code": 400,
        "token": "",
        "message": "Identifiant ou mot de passe manquant",
        "data": {}
      };
  }

  const firebaseDataJSON = firebaseData.data();
  var marksLogs = firebaseDataJSON.marksLogs[id];
  marksLogs.token = token;

  console.log(`MARKS - Success, got firebase data for ${firebaseDocument} in ${firebaseCollection} for ID ${id}`);
  return marksLogs;
}

module.exports = { marks };