// Load special environment variables
require('dotenv').config();
const PORT = process.env.PORT;

// Init app
const express = require("express");
const app = express();

// Specify middleware
app.use(express.text());

// Check if cache folder exists
const fs = require("fs");
if (!fs.existsSync("./accounts/")) { fs.mkdirSync("./accounts/"); }

// Define endpoints
const { defineEndpoints } = require("./src/enpoints.js");
defineEndpoints(app);

// Start server
app.listen(
    PORT,
    () => console.log(`API running at : http://localhost:${PORT}`),
);