const Product = require('../models/product');

const searchProduct = async (req, res) => {
    const searchQuery = req.body.searchProduct; // Lấy giá trị từ body
    try {
        const products = await Product.find({ title: { $regex: searchQuery, $options: 'i' } });
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: 'Lỗi tìm kiếm sản phẩm.' });
    }
  };
  
  module.exports = {
    searchProduct,
  };
