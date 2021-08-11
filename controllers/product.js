const { request, response } = require('express');
const Product = require('../models/Product');

const getProducts = async (req = request, res = response) => {
	let products = await Product.find({}, 'name price stock');
	res.status(200).json({
		ok: true,
		msg: 'Loading all products...',
		products 
	});
};

const getProduct = async (req = request, res = response) => {
	const pid = req.params.id;
	
	try {
		
		if (pid.length != 24) {
			return res.status(400).json({
				ok: false,
				msg: 'Not valid ID',
			});
		}

		let product = await Product.findById(pid);

		if (!product) {
			return res.status(400).json({
				ok: false,
				msg: 'Not found',
			});
		}
		
		res.status(200).json({
			ok: true,
			msg: "Product founded",
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
	const pid = req.params.id;
	try {
		
		if (pid.length != 24) {
			return res.status(400).json({
				ok: false,
				msg: 'Not valid ID',
			});
		}

		let product = await Product.findById(pid);

		if(!product){
			return res.status(404).json({
				ok: false,
				msg: 'Not found',
			});
		}

		const data = req.body;

		product = await Product.findByIdAndUpdate(pid, data);

		res.status(200).json({
			ok: true,
			id: pid
		});

	} catch (error) {
		console.log(error);
		return res.status(200).json({
			ok: false,
			msg: 'Algo salio mal contacte con el administrador',
		});
	}
};

const deleteProduct = async (req = request, res = response) => {
	const pid = req.params.id;
	try {
		
		if (pid.length != 24) {
			return res.status(400).json({
				ok: false,
				msg: 'Not valid ID',
			});
		}
		
		let product = await Product.findById(pid);

		if(!product){
			return res.status(404).json({
				ok: false,
				msg: 'Not found',
			});
		}

		product = await Product.findByIdAndDelete(pid);

		res.status(200).json({
			ok: true,
			msg: "Product has been removed",
			id: pid
		});

	} catch (error) {
		console.log(error);
		return res.status(200).json({
			ok: false,
			msg: 'Algo salio mal contacte con el administrador',
		});
	}
};



module.exports = {getProducts, getProduct, createProduct, deleteProduct, updateProduct};