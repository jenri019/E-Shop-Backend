const { request, response } = require('express');

const getProducts = async (req = request, res = response) => {
	res.status(200).json({
		ok: true,
		msg: 'Loading all products...',
	});
};

const getProduct = async (req = request, res = response) => {
	res.status(200).json({
		ok: true,
		msg: 'Loading the product...',
	});
};

module.exports = { getProduct, getProducts };