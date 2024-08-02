require('dotenv').config();
const fs = require('fs');

const { getRandomInt, getRandomUUID, getRandomItem, firstNames, lastNames, classes } = require("../util");


// Main function used to login
async function login({ username, password }) {
  // Missing parameters
  if (!username || !password) {
    console.log("LOGIN - Failed, did not receive username or password");
    return {
      "code": 400,
      "token": "",
      "message": "Identifiant ou mot de passe manquant",
      "data": {}
    };
  }

  // Check if account already exists
  const { createdAccounts } = require("../../accounts/accounts.json");
  if (Object.keys(createdAccounts).includes(username)) {
    // Check if password is correct
    if (createdAccounts[username].password == password) {
      console.log(`LOGIN - Success, user ${username} exists in cache`);
      const accountUUID = createdAccounts[username].uuid;
      const accountData = require(`../../accounts/${accountUUID}/data.json`);
      return {
        "code": 200,
        "token": accountUUID,
        "message": "",
        "data": accountData,
      };
    } else {
      console.log(`LOGIN - Failed, wrong password for ${username}`);
      return {
        "code": 505,
        "token": "",
        "message": "Mot de passe invalide !",
        "data": {}
      };
    }
  } else { // Create new user
    console.log(`LOGIN - Success, creating new user ${username}...`);

    const accountUUID = getRandomUUID();
    const accountData = {
      // "changementMDP": false,
      "accounts": [
        createFakeAccountData({ accountID: getRandomInt(10000), isParent: true }),
        createFakeAccountData({ accountID: getRandomInt(10000) }),
      ],
    };

    // Save the account
    fs.mkdirSync(`./accounts/${accountUUID}`);
    fs.writeFileSync(`./accounts/${accountUUID}/data.json`, JSON.stringify(accountData));
    createdAccounts[username] = { password, uuid: accountUUID };
    fs.writeFileSync("./accounts/accounts.json", JSON.stringify({ createdAccounts }));

    return {
      "code": 200,
      "token": accountUUID,
      "message": "",
      "data": accountData,
    };
  }
}

// Creates a new fake user
function createFakeAccountData({ accountID, isParent=false, _rec=false }) {
  const gender = getRandomItem(["M", "F"]);
  const firstName = getRandomItem(firstNames[gender]);
  const lastName = getRandomItem(lastNames);

  const classLevel = getRandomInt(6);
  const classLevelID = getRandomItem("ABCD");
  
  return {
    // "idLogin": getRandomInt(10000000),
    "id": accountID,
    // "uid": getRandomUUID(),
    // "identifiant": username,
    "typeCompte": isParent ? 1 : "E",
    // "codeOgec": "-",
    // "main": true,
    // "lastConnexion": "-",
    "civilite": isParent ? (gender == "M" ? "M." : "Mme") : "",
    "sexe": _rec ? gender : "",
    "prenom": firstName,
    // "particule": "",
    "nom": lastName,
    // "email": (firstName + "." + lastName).toLowerCase() + "@gmail.com",
    // "anneeScolaireCourante": "2023-2024",
    "nomEtablissement": "EcoleDirecte",
    // "logoEtablissement": "-",
    // "couleurAgendaEtablissement": getRandomColor(),
    // "dicoEnLigneLeRobert": -,
    // "socketToken": "-",
    // "modules": [],
    // "parametresIndividuels": {
    //     "lsuPoilDansLaMainBorne1": "-",
    //     "lsuPoilDansLaMainBorne2": "-",
    //     "lsuPoilDansLaMainBorne3": "-",
    //     "modeCalculLSU": "-",
    //     "isQrcode": -,
    //     "accessibiliteVisuelle": -,
    //     "checkAuthentificationSecure": -,
    //     "checkFetS": -,
    //     "typeSaisieNotesDefaut": "-",
    //     "nbJoursMaxRenduDevoirCDT": "-",
    //     "typeViewCDTDefaut": "-"
    // },
    "classe": _rec ? { // Only for students
        // "id": getRandomInt(100),
        "code": (classLevel + 1).toString() + classLevelID,
        "libelle": classes[classLevel] + " " + classLevelID,
        // "estNote": -
    } : {},
    "profile": {
        "sexe": gender, // Only for students
        // "infoEDT": "-",
        "nomEtablissement": "EcoleDirecte", // Only for students
        // "idEtablissement": "-",
        // "rneEtablissement": "-",
        // "telPortable": getRandomPhoneNumber(),
        // "idReelEtab": "",
        // "photo": "//doc1.ecoledirecte.com/PhotoEleves/-.jpg",
        "classe": isParent || _rec ? {} : { // Only for students
            // "id": getRandomInt(100),
            "code": (classLevel + 1).toString() + classLevelID,
            "libelle": classes[classLevel] + " " + classLevelID,
            // "estNote": -
        },
        "eleves": isParent ? [
            createFakeAccountData({ accountID: getRandomInt(10000), _rec: true }),
            createFakeAccountData({ accountID: getRandomInt(10000), _rec: true }),
            createFakeAccountData({ accountID: getRandomInt(10000), _rec: true }),
        ] : [],
    }
  };
}


module.exports = { login };