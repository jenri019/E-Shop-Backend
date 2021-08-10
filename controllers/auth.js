const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');

const initSesion = async (req = request, res = response) => {
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

		return res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name + ' ' + user.lastName,
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			msg: 'uppss, contact with admin',
		});
	}
};

const registerUser = async (req = request, res = response) => {
	const { email, password } = req.body;
	console.log(req.body);
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

		return res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name +' '+ user.lastName,
		});
	} catch (error) {
		console.log(error);
		return res.status(200).json({
			ok: false,
			msg: 'Algo salio mal contacte con el administrador',
		});
	}
};

const editUser = async (req = request, res = response) => {
	const { name, lastName, email, password } = req.body;

	try {
		let usuario = await User.findOne({ email });
		return res.status(200).json({
			ok: true,
			msg: 'ok',
		});
	} catch (error) {}
};

const deleteUser = async (req = request, res = response) => {
	return res.status(200).json({
		ok: true,
		msg: 'ok',
	});
};

module.exports = {
	initSesion,
	registerUser,
	editUser,
	deleteUser,
};
