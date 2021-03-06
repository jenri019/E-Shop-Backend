const mongoose = require('mongoose');
const dbConnection = async () => {
	try {
		mongoose.connect(process.env.DB_CNN, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify:false
		});
		console.log('DB Online');
	} catch (error) {
		console.log(error);
		throw new Error('Error al momento de inicialiar la base de datos');
	}
};

module.exports = { dbConnection };
