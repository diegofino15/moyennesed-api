const { login } = require('./test-api/login');
const { getMarks } = require('./test-api/marks');
const { getAllHomework, getSpecificHomework, setHomeworkAsDone } = require('./test-api/homework');


// Functions that defines all the open endpoints of the API
function defineEndpoints(app) {
  // Health check
  app.get("/healthcheck", (_, res) => {
    res.status(200).send("OK");
  });
  
  
  // Login
  app.post("/test-api/v3/login.awp", async (req, res) => {
    const { identifiant, motdepasse } = parseBody(req);

    const response = await login({ username: identifiant, password: motdepasse });
    res.status(200).send(response);
  });

  // Get marks
  app.post("/test-api/v3/eleves/:id/notes.awp", async (req, res) => {
    const { id } = req.params;
    const token = parseToken(req);

    const response = await getMarks({ accountID: id, token: token });
    res.status(200).send(response);
  });

  // Homework //

  // Get all homework
  app.post("/test-api/v3/Eleves/:id/cahierdetexte.awp", async (req, res) => {
    const { id } = req.params;
    const token = parseToken(req);
    const verbe = req.query.verbe;

    if (verbe == "get") {
      const response = await getAllHomework({ accountID: id, token: token });
      res.status(200).send(response);
    } else {
      const { idDevoirsEffectues, idDevoirsNonEffectues } = parseBody(req);
      var homeworkID = null;
      var status = false;
      if (idDevoirsEffectues.length > 0) { homeworkID = idDevoirsEffectues[0]; status = true; }
      else { homeworkID = idDevoirsNonEffectues[0]; }

      const response = await setHomeworkAsDone({ accountID: id, homeworkID: homeworkID, status: status, token: token });
      res.status(200).send(response);
    }
  });
  // Get homework for given day
  app.post("/test-api/v3/Eleves/:id/cahierdetexte/:day.awp", async (req, res) => {
    const { id, day } = req.params;
    const token = parseToken(req);

    const response = await getSpecificHomework({ accountID: id, day: day, token: token });
    res.status(200).send(response);
  });
}

// Helper functions
function parseBody(req) { return JSON.parse(req.body["data"]); }
function parseToken(req) { return req.header("x-token"); }


module.exports = { defineEndpoints };