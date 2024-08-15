// Import firebase for parsing documents
var { firebase } = require('./firebaseUtils.js');

// Parse special data from bug report (by title)
async function getBugReport({ title, token, id }) {
  if (!token || !id) {
    console.log(`${title.toUpperCase()} - Failed, did not receive token or id`);
    return {
      "code": 400,
      "message": "Identifiant ou token manquant",
      "token": "",
      "data": {}
  } ;
  }

  const firebaseDocument = token;
  console.log(`${title.toUpperCase()} - Parsing firebase data for ${firebaseDocument} in bugReports for ID ${id}...`)

  const firebaseData = await firebase.firestore().collection("bugReports").doc(firebaseDocument).get();

  if (!firebaseData.exists) {
      console.log(`${title.toUpperCase()} - Failed, firebase data not found`);
      return {
        "code": 400,
        "token": "",
        "message": "Identifiant ou mot de passe manquant",
        "data": {}
      };
  }

  const firebaseDataJSON = firebaseData.data().logs[title] ?? {};
  const logs = firebaseDataJSON[id] ?? {};

  console.log(`${title.toUpperCase()} - Success, got firebase data for ${firebaseDocument} in bugReports for ID ${id}`);
  return logs;
}

module.exports = { getBugReport };