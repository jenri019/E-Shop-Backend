const { Schema, model } = require('mongoose');
// TODO: checar la oferta
const ProductSchema = Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	offer: {
        type: Boolean,
        required: true
    },
	marca: {
		type: String,
		required: true
	},
	stock: {
		type: Number,
		required: true
	},
});

module.exports = model('Product', ProductSchema);