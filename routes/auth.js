const { Router } = require('express');
const { iniciarSesion, registrarUsuario } = require('../controllers/auth');
const router = Router();

router.post('/login', iniciarSesion);
router.post('/register', registrarUsuario);

module.exports = router;
