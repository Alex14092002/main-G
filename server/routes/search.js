const router = require("express").Router();
const searchProduct = require('../controllers/search')

router.post('/searchproduct', searchProduct.searchProduct);

module.exports = router;
