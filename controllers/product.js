const { request, response } = require('express');
const Product = require('../models/Product');

const getProducts = async (req = request, res = response) => {
	res.status(200).json({
		ok: true,
		msg: 'Loading all products...',
	});
};

const getProduct = async (req = request, res = response) => {
	const { name, marca } = req.body;
	try {
		let product = await Product.findOne({name, marca});
		console.log(product);
		if (!product) {
			return res.status(400).json({
				ok: false,
				msg: 'Not found',
			});
		}
		
		res.status(200).json({
			ok: true,
			name: product.name,
			marca: product.marca
		});

	} catch (error) {
		console.log(error);
		return res.status(200).json({
			ok: false,
			msg: 'Algo salio mal contacte con el administrador',
		});
	}
};

const createProduct = async (req = request, res = response) => {
	const { name, marca } = req.body;
	try {
		let product = await Product.findOne({name, marca});
		if (product) {
			return res.status(400).json({
				ok: false,
				msg: 'Product already exists',
			});
		}

		product = new Product(req.body);

		await product.save();

		return res.status(201).json({
			ok: true,
			pid: product.id,
			msg: 'Product has been created'
		});
	} catch (error) {
		console.log(error);
		return res.status(200).json({
			ok: false,
			msg: 'Algo salio mal contacte con el administrador',
		});
	}
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