const { Router } = require('express');
const { iniciarSesion } = require('../controllers/auth');
const router = Router();

router.post('/login', iniciarSesion);

module.exports = router;
