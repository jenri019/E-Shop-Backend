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

const createProduct = async (req = request, res = response) => {
	res.status(200).json({
		ok: true,
		msg: 'Product created',
	});
};

const updateProduct = async (req = request, res = response) => {
	res.status(200).json({
		ok: true,
		msg: 'Product updated',
	});
};

const deleteProduct = async (req = request, res = response) => {
	res.status(200).json({
		ok: true,
		msg: 'The product has been removed',
	});
};

module.exports = {getProducts, getProduct, createProduct, deleteProduct, updateProduct};