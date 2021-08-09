const { Router } = require('express');
const Product = require('../controllers/product');
const router = Router();

router.get('/', Product.getProducts);
router.get('/:id', Product.getProduct);

router.post('/', Product.createProduct);
router.put('/:id', Product.updateProduct)
router.delete('/:id', Product.deleteProduct);

module.exports = router;