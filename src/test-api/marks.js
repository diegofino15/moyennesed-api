require('dotenv').config();
const fs = require('fs');

const { getRandomPersonName, disciplines, getRandomInt, getRandomItem, getRandomDate } = require("../util");


// Main function used to get all marks of an account
async function getMarks({ accountID, token }) {
  // Missing parameters
  if (!token || !accountID) {
    console.log("MARKS - Failed, did not receive token or id");
    return {
      "code": 400,
      "message": "Identifiant ou token manquant",
      "token": "",
      "data": {}
    };
  }

  // Check if data exists in cache
  if (fs.existsSync(`./accounts/${token}/marks/${accountID}.json`)) {
    console.log(`MARKS - Found existing marks for ID ${accountID}`);
    const marksData = JSON.parse(fs.readFileSync(`./accounts/${token}/marks/${accountID}.json`));
    return {
      "code": 200,
      "token": token,
      "message": "",
      "data": marksData,
    };
  } else { // Create new fake marks
    const marksData = createFakeMarks();

    // Save the marks
    if (!fs.existsSync(`./accounts/${token}`)) { fs.mkdirSync(`./accounts/${token}`) }
    if (!fs.existsSync(`./accounts/${token}/marks`)) { fs.mkdirSync(`./accounts/${token}/marks`) }
    fs.writeFileSync(`./accounts/${token}/marks/${accountID}.json`, JSON.stringify(marksData));

    return {
      "code": 200,
      "token": token,
      "message": "",
      "data": marksData,
    };
  }
}

// Creates a set of fake marks for a given user
function createFakeMarks() {
  const namePP = getRandomPersonName();
  
  function createPeriod(code, cloture) {
      function createSubject(index) {
          const disciplineID = Object.keys(disciplines)[index];
          const coefficient = process.env.GIVE_SUBJECTS_COEFFICIENT ? (getRandomInt(3) + 1) : 0;

          const data = {
              "id": getRandomInt(10000),
              "codeMatiere": disciplineID,
              "codeSousMatiere": "",
              "discipline": disciplines[disciplineID],
              "moyenne": getRandomInt(20).toString(),
              "moyenneClasse": getRandomInt(20).toString(),
              "moyenneMin": getRandomInt(20).toString(),
              "moyenneMax": getRandomInt(20).toString(),
              "coef": coefficient,
              // "effectif": -,
              // "rang": -,
              "groupeMatiere": false,
              "idGroupeMatiere": 0,
              "option": 0,
              "sousMatiere": false,
              // "saisieAppreciationSSMat": -,
              "professeurs": [
                  {
                      "id": getRandomInt(1000),
                      "nom": getRandomPersonName(),
                  }
              ]
          };
          return data;
      }
      
      return {
          "idPeriode": "A00" + code,
          "codePeriode": "A00" + code,
          "periode": code + `e${code == 1 ? "r": ""} Trimestre`,
          "annuel": false,
          "dateDebut": getRandomDate(),
          "dateFin": getRandomDate(),
          // "examenBlanc": -,
          "cloture": cloture,
          // "dateConseil": "-",
          // "heureConseil": "-",
          // "moyNbreJoursApresConseil": -,
          "ensembleMatieres": {
              "dateCalcul": getRandomDate(),
              "moyenneGenerale": getRandomInt(20).toString(),
              "moyenneClasse": getRandomInt(20).toString(),
              "moyenneMin": getRandomInt(20).toString(),
              "moyenneMax": getRandomInt(20).toString(),
              "nomPP": namePP,
              // "nomCE": "",
              // "decisionDuConseil": "",
              "disciplines": Array(Object.keys(disciplines).length).fill(0).map((_, index) => createSubject(index)),
          },
      };
  }

  function createMark() {
      const ID = getRandomInt(100000000);
      const disciplineID = getRandomItem(Object.keys(disciplines));
      const inLetters = Math.random() < 0.1;
      const gradeOn = (Math.random() < 0.2) ? 10 : 20;
      const coefficient = process.env.GIVE_GRADES_COEFFICIENT ? (getRandomInt(3) + 1) : 0;

      return {
          "id": ID,
          "devoir": "Devoir n°" + ID,
          "codePeriode": "A00" + (getRandomInt(3) + 1),
          "codeMatiere": disciplineID,
          "libelleMatiere": disciplines[disciplineID],
          "codeSousMatiere": "",
          "typeDevoir": "",
          "enLettre": inLetters,
          // "commentaire": "",
          // "uncSujet": "",
          // "uncCorrige": "",
          "coef": coefficient.toString(),
          "noteSur": gradeOn.toString(),
          "valeur": ((8 / 20 * gradeOn) + getRandomInt(gradeOn - (8 / 20 * gradeOn))).toString() + ((Math.random() < 0.2) ? ",5" : ""),
          "nonSignificatif": inLetters,
          "date": getRandomDate(),
          "dateSaisie": getRandomDate(),
          // "valeurisee": -,
          "moyenneClasse": ((8 / 20 * gradeOn) + getRandomInt(gradeOn - (8 / 20 * gradeOn))).toString() + ((Math.random() < 0.2) ? ",5" : ""),
          "elementsProgramme": []
      };
  }
  
  return {
      // "foStat": "-",
      "periodes": [
          createPeriod(1, true),
          createPeriod(2, true),
          createPeriod(3, false),
      ],
      "notes": Array(100).fill(0).map(() => createMark()),
      "parametrage": {
          // "couleurEval1": "-",
          // "couleurEval2": "-",
          // "couleurEval3": "-",
          // "couleurEval4": "-",
          // "libelleEval1": "-",
          // "libelleEval2": "-",
          // "libelleEval3": "-",
          // "libelleEval4": "-",
          // "affichageMoyenne": -,
          // "affichageMoyenneDevoir": -,
          // "affichagePositionMatiere": -,
          // "affichageNote": -,
          // "affichageCompetence": -,
          // "affichageEvaluationsComposantes": -,
          // "affichageGraphiquesComposantes": -,
          // "modeCalculGraphiquesComposantes": "-",
          // "affichageCompNum": -,
          // "libelleEvalCompNum1": "-",
          // "libelleEvalCompNum2": "-",
          // "libelleEvalCompNum3": "-",
          // "affichageAppreciation": -,
          // "appreciationsProf": -,
          // "appreciationProfPrinc": -,
          // "affichageMention": -,
          // "affichageAppreciationCE": -,
          // "affichageAppreciationVS": -,
          // "affichageAppreciationCN": -,
          // "affichageAppreciationClasse": -,
          // "affichageAppreciationPeriodeCloturee": -,
          // "moyenneUniquementPeriodeCloture": -,
          // "moyennePeriodeReleve": -,
          // "moyennePeriodeAnnuelle": -,
          // "moyennePeriodeHorsP": -,
          // "moyenneEleveDansNotes": -,
          // "moyenneEleve": -,
          // "moyenneEleveDansMoyenne": -,
          // "moyenneGenerale": -,
          "moyenneCoefMatiere": process.env.GIVE_SUBJECTS_COEFFICIENT,
          // "moyenneClasse": -,
          // "moyenneMin": -,
          // "moyenneMax": -,
          // "moyenneRang": -,
          "moyenneSur": 20,
          // "moyenneGraphique": -,
          // "moyennesSimulation": -,
          "coefficientNote": process.env.GIVE_GRADES_COEFFICIENT,
          // "colonneCoefficientMatiere": -,
          // "noteGrasSousMoyenne": -,
          // "noteGrasAudessusMoyenne": -,
          // "libelleDevoir": -,
          // "dateDevoir": -,
          // "typeDevoir": -,
          // "noteUniquementPeriodeCloture": -,
          // "notePeriodeReleve": -,
          // "notePeriodeAnnuelle": -,
          // "notePeriodeHorsP": -,
          // "libellesAppreciations": [
          //     "Appréciation Matières"
          // ],
          // "appreciationsParametrage": [
          //     {
          //         "code": "-",
          //         "id": 1,
          //         "nbMaxCaractere": 200,
          //         "libelle": "Appréciation Matières"
          //     }
          // ]
      }
  };
}


module.exports = { getMarks };