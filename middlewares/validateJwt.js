const jwt = require('jsonwebtoken');

const validateJwt = (req, res, next) => {
	//x-atk headers

	const token = req.header('x-atk');
	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'No hay token en la peticion',
		});
	}
	try {
		const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
		req.uid = uid;
		req.name = name;
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: 'Token not valid',
		});
	}
	next();
};

module.exports = { validateJwt };
