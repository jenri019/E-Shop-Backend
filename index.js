const express = require('express');

const app = express();
require('dotenv').config();
const { dbConnection } = require('./db/config');

dbConnection();

app.listen(4000, () => {
	console.log(`Servidor corriendo en puerto: ${4000}`);
});
