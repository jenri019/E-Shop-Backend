const { request, response } = require('express');

const iniciarSesion = async (req = request, res = response) => {
	res.status(200).json({
		ok: true,
		msg: 'loading...',
	});
};

module.exports = { iniciarSesion };
