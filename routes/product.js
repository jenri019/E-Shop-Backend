const { Router } = require('express');
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/product');
const router = Router();

router.get('/', getProduct);

router.post('/', createProduct);
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct);

module.exports = router;