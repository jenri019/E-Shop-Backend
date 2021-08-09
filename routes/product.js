const { Router } = require('express');
const { getProduct, getProducts } = require('../controllers/product');
const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);

module.exports = router;