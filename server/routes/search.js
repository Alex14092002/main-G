const router = require("express").Router();
const searchProduct = require('../controllers/search')

router.get('/searchproduct/:searchProduct', searchProduct.searchProduct);

module.exports = router;
