// API parameters //
const PORT = 777;

// Load special environment variables
require('dotenv').config();
const ALLOWED_PASSWORDS = JSON.parse(process.env.ALLOWED_PASSWORDS);

// Init app //
const express = require("express");
const app = express();

// Specify middleware //
app.use(express.text());

// Helper functions //
require("./src/helper.js")();

// Reusable data
var loginInfos = new Map();
var parentInfos = new Map();
var gradesInfos = new Map();

// Creator functions //
function createLoginInfo(username, is_parent, password, rec = false) {
    if (!is_parent) { if (loginInfos.has(password)) { return loginInfos.get(password); } }
    else { if (parentInfos.has(password)) { return parentInfos.get(password); } }

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
                "typeCompte": is_parent ? 1 : "E",
                // "codeOgec": "-",
                "main": true,
                // "lastConnexion": "-",
                "civilite": is_parent ? (gender == "M" ? "M." : "Mme") : "",
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
                "profile": {
                    "sexe": gender, // Only for students
                    // "infoEDT": "-",
                    "nomEtablissement": "EcoleDirecte", // Only for students
                    // "idEtablissement": "-",
                    // "rneEtablissement": "-",
                    "telPortable": getRandomPhoneNumber(),
                    // "idReelEtab": "",
                    // "photo": "//doc1.ecoledirecte.com/PhotoEleves/-.jpg",
                    "classe": is_parent ? {} : { // Only for students
                        "id": getRandomInt(100),
                        "code": (classLevel + 1).toString() + classLevelID,
                        "libelle": classes[classLevel] + " " + classLevelID,
                        // "estNote": -
                    },
                    "eleves": is_parent ? [
                        createLoginInfo("child1", false, "pass1", true)["accounts"][0],
                        createLoginInfo("child2", false, "pass2", true)["accounts"][0],
                        createLoginInfo("child3", false, "pass3", true)["accounts"][0],
                    ] : [],
                }
            }
        ]
    };

    if (!is_parent) { loginInfos.set(password, responseData); }
    else { parentInfos.set(password, responseData); }

    return responseData;
}

function createGrades(accountID) {
    if (gradesInfos.has(accountID)) { return gradesInfos.get(accountID); }
    
    const namePP = getRandomPersonName();
    
    function createPeriod(code, cloture) {
        function createDiscipline(index) {
            const disciplineID = Object.keys(disciplines)[index];
            const coefficient = process.env.AVERAGES_COEFFICIENTS ? (getRandomInt(3) + 1) : 0;

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
                "disciplines": Array(Object.keys(disciplines).length).fill(0).map((_, index) => createDiscipline(index)),
            },
        };
    }

    function createGrade() {
        const ID = getRandomInt(100000000);
        const disciplineID = getRandomItem(Object.keys(disciplines));
        const inLetters = Math.random() < 0.1;
        const gradeOn = (Math.random() < 0.2) ? 10 : 20;
        const coefficient = process.env.GRADE_COEFFICIENTS ? (getRandomInt(3) + 1) : 0;

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
            "moyenneClasse": ((8 / 20 * gradeOn) + getRandomInt(gradeOn - (8 / 20 * gradeOn))).toString() + ((Math.random() < 0.2) ? ",5" : "")
            // "elementsProgramme": []
        };
    }
    
    const responseData = {
        // "foStat": "-",
        "periodes": [
            createPeriod(1),
            createPeriod(2),
            createPeriod(3),
        ],
        "notes": Array(100).fill(0).map(() => createGrade()),
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
            "moyenneCoefMatiere": process.env.AVERAGES_COEFFICIENTS,
            // "moyenneClasse": -,
            // "moyenneMin": -,
            // "moyenneMax": -,
            // "moyenneRang": -,
            "moyenneSur": 20,
            // "moyenneGraphique": -,
            // "moyennesSimulation": -,
            "coefficientNote": process.env.GRADE_COEFFICIENTS,
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

    gradesInfos.set(accountID, responseData);

    return responseData;
}

// Main functions //
app.post("/test-api/v3/login.awp", (req, res) => {
    const { identifiant, motdepasse } = JSON.parse(req.body.toString().split("=")[1]);

    if (!identifiant || !motdepasse) {
        console.log("LOGIN - failed, did not receive username or password");
        return res.status(400).send({
            "code": 400,
            "token": "",
            "message": "Identifiant ou mot de passe manquant",
            "data": {}
        });
    }

    if (!ALLOWED_PASSWORDS.includes(motdepasse)) {
        console.log("LOGIN - failed, wrong password");
        return res.status(200).send({
            "code": 505,
            "token": "",
            "message": "Mot de passe invalide !",
            "data": {}
        });
    }

    console.log("LOGIN - success");
    res.status(200).send({
        "code": 200,
        "token": getRandomUUID(),
        "message": "",
        "data": createLoginInfo(identifiant, identifiant == process.env.PARENT_USERNAME, motdepasse)
    });
});

app.post("/test-api/v3/eleves/:id/notes.awp", (req, res) => {
    const { id } = req.params;
    const token = req.header("x-token");
    
    if (!id || !token) {
        console.log("NOTES - failed");
        return res.status(400).send({
            "code": 400,
            "message": "Identifiant ou token manquant",
            "token": getRandomUUID(),
            "data": {}
        });
    }

    console.log("NOTES - success");
    res.status(200).send({
        "code": 200,
        "token": getRandomUUID(),
        "message": "",
        "data": createGrades(id)
    });
});

// Launch app //
app.listen(
    PORT,
    () => console.log(`API running at : http://localhost:${PORT}`),
);