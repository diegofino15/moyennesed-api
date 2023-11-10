// Load special environment variables
require('dotenv').config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// API functions
const { login } = require("./src/login.js");
const { marks } = require('./src/marks.js');

// Init app //
const https = require("https");
const express = require("express");
const app = express();

// Specify middleware //
app.use(express.text());

// Helper functions //
require("./src/helper.js")();


// Main functions //
app.post("/test-api/v3/login.awp", async (req, res) => {
    const { identifiant, motdepasse } = JSON.parse(req.body.toString().split("=")[1]);

    const loginResponse = await login({ username: identifiant, password: motdepasse });
    res.status(200).send(loginResponse);
});

app.post("/test-api/v3/eleves/:id/notes.awp", async (req, res) => {
    const { id } = req.params;
    const token = req.header("x-token");

    const loginResponse = await marks({ id: id, token: token });
    res.status(200).send(loginResponse);
});

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/api.moyennesed.my.to/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/api.moyennesed.my.to/fullchain.pem')
};

// Create server
const server = https.createServer(options, app);

// Launch app //
server.listen(PORT, HOST, () => {
    console.log(`Server running at https://${HOST}:${PORT}/`);
});