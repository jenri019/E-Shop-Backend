const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/Usuario');

const iniciarSesion = async (req = request, res = response) => {
	const { email, password } = req.body;
	try {
		const usuario = await Usuario.findOne({ email });
		if (!usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'cuenta no encontrada',
			});
		}

		const validPassword = bcryptjs.compareSync(password, usuario.password);
		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'El password no coincide',
			});
		}

		return res.status(201).json({
			ok: true,
			uid: usuario.id,
			name: usuario.name + ' ' + usuario.lastName,
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			msg: 'Algo salio mal contacte con el administrador',
		});
	}
};
const registrarUsuario = async (req = request, res = response) => {
	const { email, password } = req.body;
	console.log(req.body);
	try {
		let usuario = await Usuario.findOne({ email });
		if (usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'No se pudo crear la cuenta',
			});
		}
		usuario = new Usuario(req.body);

		const salt = bcryptjs.genSaltSync();
		usuario.password = bcryptjs.hashSync(password, salt);

		await usuario.save();

		return res.status(201).json({
			ok: true,
			uid: usuario.id,
			name: usuario.name + usuario.lastName,
		});
	} catch (error) {
		console.log(error);
		return res.status(200).json({
			ok: false,
			msg: 'Algo salio mal contacte con el administrador',
		});
	}
};

module.exports = { iniciarSesion, registrarUsuario };
