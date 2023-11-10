// Import environment variables
require('dotenv').config();
const ALLOWED_PASSWORDS = JSON.parse(process.env.ALLOWED_PASSWORDS);

const fs = require("fs");

// Helper functions //
require("./helper.js")();


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

  if (!ALLOWED_PASSWORDS.includes(password)) {
      console.log("LOGIN - Failed, wrong password");
      return {
        "code": 505,
        "token": "",
        "message": "Mot de passe invalide !",
        "data": {}
      };
  }

  const isParent = password.includes("parent");

  try {
    const loginData = fs.readFileSync(`./cache/login-${password}-${isParent ? "parent" : "student"}.json`);
    console.log(`LOGIN - Found existing account for password ${password}`);
    return JSON.parse(loginData);
  } catch (e) {
    console.log(`LOGIN - Creating new account with password ${password}...`);
    const loginData = createLoginInfo(username, isParent);
    fs.writeFileSync(`./cache/login-${password}-${isParent ? "parent" : "student"}.json`, JSON.stringify(loginData));
    return loginData;
  }
}

// Creator functions //
function createLoginInfo(username, isParent, rec = false) {
  const gender = getRandomItem(["M", "F"]);
  const firstName = getRandomItem(firstNames[gender]);
  const lastName = getRandomItem(lastNames);

  const classLevel = getRandomInt(6);
  const classLevelID = getRandomItem("ABCD");
  
  const responseData = {
      "changementMDP": false,
      "accounts": [
          {
              "idLogin": getRandomInt(10000000),
              "id": getRandomInt(10000),
              "uid": getRandomUUID(),
              "identifiant": username,
              "typeCompte": isParent ? 1 : "E",
              // "codeOgec": "-",
              "main": true,
              // "lastConnexion": "-",
              "civilite": isParent ? (gender == "M" ? "M." : "Mme") : "",
              "sexe": rec ? gender : "",
              "prenom": firstName,
              "particule": "",
              "nom": lastName,
              "email": (firstName + "." + lastName).toLowerCase() + "@gmail.com",
              "anneeScolaireCourante": "2023-2024",
              "nomEtablissement": "EcoleDirecte",
              // "logoEtablissement": "-",
              "couleurAgendaEtablissement": getRandomColor(),
              // "dicoEnLigneLeRobert": -,
              // "socketToken": "-",
              "modules": [],
              "parametresIndividuels": {
                  // "lsuPoilDansLaMainBorne1": "-",
                  // "lsuPoilDansLaMainBorne2": "-",
                  // "lsuPoilDansLaMainBorne3": "-",
                  // "modeCalculLSU": "-",
                  // "isQrcode": -,
                  // "accessibiliteVisuelle": -,
                  // "checkAuthentificationSecure": -,
                  // "checkFetS": -,
                  // "typeSaisieNotesDefaut": "-",
                  // "nbJoursMaxRenduDevoirCDT": "-",
                  // "typeViewCDTDefaut": "-"
              },
              "classe": rec ? { // Only for students
                  "id": getRandomInt(100),
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
                  "telPortable": getRandomPhoneNumber(),
                  // "idReelEtab": "",
                  // "photo": "//doc1.ecoledirecte.com/PhotoEleves/-.jpg",
                  "classe": isParent || rec ? {} : { // Only for students
                      "id": getRandomInt(100),
                      "code": (classLevel + 1).toString() + classLevelID,
                      "libelle": classes[classLevel] + " " + classLevelID,
                      // "estNote": -
                  },
                  "eleves": isParent ? [
                      createLoginInfo("child1", false, true)["accounts"][0],
                      createLoginInfo("child2", false, true)["accounts"][0],
                      createLoginInfo("child3", false, true)["accounts"][0],
                  ] : [],
              }
          }
      ]
  };

  return {
    "code": 200,
    "token": getRandomUUID(),
    "message": "",
    "data": responseData,
  };
}

module.exports = { login };