const { Router } = require('express');
const {
	initSesion,
	registerUser,
	editUser,
	deleteUser,
	renewToken,
} = require('../controllers/auth');
const router = Router();

const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { validateJwt } = require('../middlewares/validateJwt');

router.post(
	'/login',
	[
		check('email', 'El email es obligaotrio').isEmail(),
		check('password', 'El password debe de ser de 6 caracteres').isLength({
			min: 6,
		}),

		validateFields,
	],
	initSesion
);

router.post(
	'/register',
	[
		check('name', 'Error: Name is required').not().isEmpty(),
		check('lastName', 'Error: last name is required').not().isEmpty(),
		check('email', 'Error: Email is required').isEmail(),
		check('password', 'El password debe de ser de 6 caracteres').isLength({
			min: 6,
		}),
		validateFields,
	],
	registerUser
);

router.put(
	'/edit/:id',
	[
		check('name', 'El nombre es obligaotrio').not().isEmpty(),
		check('lastName', 'El nombre es obligaotrio').not().isEmpty(),
		check('email', 'El email es obligaotrio').isEmail(),
		check('password', 'El password debe de ser de 6 caracteres').isLength({
			min: 6,
		}),
		validateFields,
		validateJwt,
	],
	editUser
);

router.delete('/del/:id', deleteUser);

router.get('/renew', validateJwt, renewToken);

module.exports = router;
