const productService = require('../services/productService');

module.exports = {
  createProduct: async (req, res) => {
    try {
      const result = await productService.createProduct(req);
      res.status(result.status).json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  getProducts: async (req, res) => {
    try {
      const result = await productService.getProducts();
      res.status(result.status).json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await productService.getProductById(id);
      res.status(result.status).json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const result = await productService.updateProduct(req);
      res.status(result.status).json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await productService.deleteProduct(id);
      res.status(deletedProduct.status).json(deletedProduct);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};
