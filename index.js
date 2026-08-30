import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import { defineEndpoints } from './src/enpoints.js';

const PORT = process.env.PORT;

// Init app
const app = express();

// Specify middleware
app.use(express.urlencoded({ extended: true }));

// Check if cache folder exists
if (!fs.existsSync("./accounts/")) { fs.mkdirSync("./accounts/"); }
if (!fs.existsSync("./accounts/accounts.json")) { fs.writeFileSync("./accounts/accounts.json", JSON.stringify({"createdAccounts": {}})) }

// Define endpoints
defineEndpoints(app);

// Start server
app.listen(
    PORT,
    () => console.log(`API running at : http://localhost:${PORT}`),
);