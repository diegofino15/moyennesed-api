const fs = require('fs');

const { getRandomInt, getRandomItem, disciplines, getRandomPersonName } = require("../util");


// Returns an overview of all the next homeworks to do
async function getAllHomework({ accountID, token }) {
  // Missing parameters
  if (!token || !accountID) {
    console.log("HOMEWORK - Failed, did not receive token or id");
    return {
      "code": 400,
      "message": "Identifiant ou token manquant",
      "token": "",
      "data": {}
    };
  }

  // Check if data exists in cache
  if (fs.existsSync(`./accounts/${token}/homework/${accountID}/all.json`)) {
    console.log(`HOMEWORK - Found existing homework for ID ${accountID}`);
    const homeworkData = JSON.parse(fs.readFileSync(`./accounts/${token}/homework/${accountID}/all.json`));
    return {
      "code": 200,
      "token": token,
      "message": "",
      "data": homeworkData,
    };
  } else { // Create new fake homework
    console.log(`HOMEWORK - Creating new homework for ID ${accountID}...`);

    const homeworkData = createFakeHomework();

    // Save the homework
    if (!fs.existsSync(`./accounts/${token}`)) { fs.mkdirSync(`./accounts/${token}`) }
    if (!fs.existsSync(`./accounts/${token}/homework`)) { fs.mkdirSync(`./accounts/${token}/homework`) }
    if (!fs.existsSync(`./accounts/${token}/homework/${accountID}`)) { fs.mkdirSync(`./accounts/${token}/homework/${accountID}`) }
    fs.writeFileSync(`./accounts/${token}/homework/${accountID}/all.json`, JSON.stringify(homeworkData));

    return {
      "code": 200,
      "token": token,
      "message": "",
      "data": homeworkData,
    };
  }
}
// Creates fake homework
function createFakeHomework() {
  const now = Date.now();
  const nbOfHomeworkDays = 5 + getRandomInt(5);
  const homeworks = {};

  for (let i = 0; i < nbOfHomeworkDays; i++) {
    let homeworkDate = now + i * 24 * 60 * 60 * 1000;
    let stringDate = new Date(homeworkDate).toLocaleDateString("fr-FR").replaceAll("/", "-");
    homeworks[stringDate] = [];
    const nbOfHomeworks = getRandomInt(2) + 1;
    for (let j = 0; j < nbOfHomeworks; j++) {
      let subject = getRandomItem(Object.keys(disciplines));
      let dateGiven = now - getRandomInt(7) * 24 * 60 * 60 * 1000;
      homeworks[stringDate].push({
        "idDevoir": getRandomInt(10000),
        "codeMatiere": subject,
        "matiere": disciplines[subject],
        "effectue": false,
        "donneLe": new Date(dateGiven),
        "interrogation": Math.random() > 0.9, // 1/10 chance
      });
    }
  }

  return homeworks;
}

// Returns the details of the homeworks for a given date
async function getSpecificHomework({ accountID, day, token }) {
  // Missing parameters
  if (!token || !accountID) {
    console.log("HOMEWORK - Failed, did not receive token or id");
    return {
      "code": 400,
      "message": "Identifiant ou token manquant",
      "token": "",
      "data": {}
    };
  }

  // Check if data exists in cache
  if (fs.existsSync(`./accounts/${token}/homework/${accountID}/${day}.json`)) {
    console.log(`SPECIFIC-HOMEWORK - Found existing specific homework for ID ${accountID} for day ${day}`);
    const specificHomeworkData = JSON.parse(fs.readFileSync(`./accounts/${token}/homework/${accountID}/${day}.json`));
    return {
      "code": 200,
      "token": token,
      "message": "",
      "data": specificHomeworkData,
    };
  } else {
    console.log(`SPECIFIC-HOMEWORK - Creating new specific homework for ID ${accountID} for day ${day}...`);

    // Get which homeworks are due
    var homeworks = [];
    const homeworkData = JSON.parse(fs.readFileSync(`./accounts/${token}/homework/${accountID}/all.json`));
    homeworkData[day]?.forEach(homework => {
      homeworks.push({
        "id": homework.idDevoir,
        "nomProf": getRandomPersonName(),
        "aFaire": {
          "contenu": "PHA+Q2VjaSBlc3QgdW4gZXhlbXBsZSBkZSBkZXZvaXI8L3A+",
          "contenuDeSeance": {
            "contenu": "PHA+Q2VjaSBlc3QgdW4gZXhlbXBsZSBkZSBjb250ZW51IGRlIHPDqWFuY2U8L3A+",
          },
          "documents": [
            { "id": getRandomInt(10000), "title": "Fichier attaché n°1.mp4", "taille": "345", "type": "mp4" },
            { "id": getRandomInt(10000), "title": "Résumé du chapitre - WORD DOCUMENT - À ne pas partager.docx", "taille": "7762", "type": "docx" },
          ],
        },
      });
    });

    const specificHomeworkData = {
      date: day,
      matieres: homeworks,
    };

    fs.writeFileSync(`./accounts/${token}/homework/${accountID}/${day}.json`, JSON.stringify(specificHomeworkData));

    return {
      "code": 200,
      "token": token,
      "message": "",
      "data": specificHomeworkData,
    };
  }
}

// Sets the status of a homework
async function setHomeworkAsDone({ accountID, homeworkID, status, token }) {
  // Missing parameters
  if (!token || !accountID) {
    console.log("SET-HOMEWORK-DONE - Failed, did not receive token or id");
    return {
      "code": 400,
      "message": "Identifiant ou token manquant",
      "token": "",
      "data": {}
    };
  }

  console.log(`SET-HOMEWORK-DONE - Changing homework status for ID ${accountID} for homework ${homeworkID} to ${status ? "true" : "false"}...`);
  var homeworkData = JSON.parse(fs.readFileSync(`./accounts/${token}/homework/${accountID}/all.json`));
  Object.keys(homeworkData).forEach(day => {
    homeworkData[day].forEach((homework, index) => {
      if (homework.idDevoir == homeworkID) {
        homeworkData[day][index].effectue = status;
      }
    });
  });
  fs.writeFileSync(`./accounts/${token}/homework/${accountID}/all.json`, JSON.stringify(homeworkData));

  return {
    "code": 200,
    "token": token,
    "message": "",
    "data": {},
  };
}


module.exports = { getAllHomework, getSpecificHomework, setHomeworkAsDone };