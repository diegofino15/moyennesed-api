// Load special environment variables
require('dotenv').config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// API functions
const { login } = require("./login.js");
const { marks } = require('./marks.js');

// Init app //
const http = require("http");
const express = require("express");
const app = express();

// Specify middleware //
app.use(express.text());

// Helper functions //
require("./helper.js")();


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

const options = {};

// Create server
const server = http.createServer(app, options);

// Launch app //
server.listen(PORT, HOST, () => {
    console.log(`Server running at https://${HOST}:${PORT}/`);
});
