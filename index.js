require('dotenv').config();

// Import environment variables
const PORT = JSON.parse(process.env.PORT);

// API functions
const { login } = require("./src/login.js");
const { getBugReport } = require('./src/getBugReport.js');

// Init app //
const express = require("express");
const app = express();

// Specify middleware //
app.use(express.text());

// For healthcheck
app.get("/healthcheck", (req, res) => {
    res.status(200).send("OK");
});

// Main functions //
app.post("/test-api/v3/login.awp", async (req, res) => {
    const { identifiant, motdepasse } = JSON.parse(req.body.toString().split("=")[1]);

    const loginResponse = await login({ username: decodeURIComponent(identifiant), password: motdepasse });
    res.status(200).send(loginResponse);
});

app.post("/test-api/v3/eleves/:id/notes.awp", async (req, res) => {
    const { id } = req.params;
    const token = req.header("x-token");
    
    const marksResponse = await getBugReport({ title: "marks", token: decodeURIComponent(token), id: id });
    marksResponse.token = token;
    res.status(200).send(marksResponse); 
});

app.post("/test-api/v3/Eleves/:id/cahierdetexte.awp", async (req, res) => {
    const { id } = req.params;
    const token = req.header("x-token");
    
    const homeworkResponse = await getBugReport({ title: "homework", token: decodeURIComponent(token), id: id });
    homeworkResponse.token = token;
    res.status(200).send(homeworkResponse); 
});

// Launch app //
app.listen(
    PORT,
    () => console.log(`API running at : http://localhost:${PORT}`),
);