const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const initSesion = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				ok: false,
				msg: 'Acount not found',
			});
		}

		const validPassword = bcryptjs.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'password not match',
			});
		}

		//Generar nuestro JWT
		const token = await generateJWT(user._id, user.name);

		return res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name + ' ' + user.lastName,
			token,
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			msg: 'uppss, contact with admin',
		});
	}
};

const registerUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({
				ok: false,
				msg: 'Error: account not created ',
			});
		}
		user = new User(req.body);

		const salt = bcryptjs.genSaltSync();
		user.password = bcryptjs.hashSync(password, salt);

		await user.save();

		//Generar nuestro JWT
		const token = await generateJWT(user._id, user.name);

		return res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name + ' ' + user.lastName,
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(200).json({
			ok: false,
			msg: 'Algo salio mal contacte con el administrador',
		});
	}
};

const editUser = async (req, res) => {
	const { name, lastName, email, password } = req.body;

	try {
		let usuario = await User.findOne({ email });
		return res.status(200).json({
			ok: true,
			msg: 'ok',
		});
	} catch (error) {}
};

const deleteUser = async (req, res) => {
	return res.status(200).json({
		ok: true,
		msg: 'ok',
	});
};

const renewToken = async (req, res) => {
	const { uid, name } = req;

	const token = await generateJWT(uid, name);

	res.json({
		ok: true,
		token,
		uid,
		name,
	});
};

module.exports = {
	initSesion,
	registerUser,
	editUser,
	deleteUser,
	renewToken,
};
