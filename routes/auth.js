const { Router } = require('express');
const {
	initSesion,
	registerUser,
	editUser,
	deleteUser,
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
router.post('/register', registerUser);
router.put('/edit/:id', editUser);
router.delete('/del/:id', deleteUser);

module.exports = router;
