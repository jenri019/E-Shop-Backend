const { Router } = require('express');
const {
	iniciarSesion,
	registrarUsuario,
	editarUsuario,
    eliminarUsuario,
} = require('../controllers/auth');
const router = Router();

router.post('/login', iniciarSesion);
router.post('/register', registrarUsuario);
router.put('/edit/:id', editarUsuario);
router.delete('/del/:id', eliminarUsuario);

module.exports = router;
