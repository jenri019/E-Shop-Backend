const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./db/config');

const app = express();
dbConnection();

//add cors
app.use(cors())

//parseo del body
app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en puerto: ${process.env.PORT}`);
});
