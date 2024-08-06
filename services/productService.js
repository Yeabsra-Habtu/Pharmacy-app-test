const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

module.exports = {
    createProduct: async (req) => {
        try {
          const { name, description, price,category } = req.body;
          const productImage = req.file ? req.file.filename : null;
     

          const productBody = {
            name,
            description,
            price,
            category,
            imageUrl: productImage // Adjust as per your file structure
          };
    
          const result = await Product.create(productBody);
          return { status: 201, result }; // 201 for successful creation
        } catch (e) {
          return { status: 500, message: e.message };
        }
      },

  getProducts: async () => {
    try {
      const products = await Product.find();
      return { status: 200, products };
    } catch (e) {
      return { status: 500, message: e.message };
    }
  },

  getProductById: async (id) => {
    try {
      const product = await Product.findById(id);
      if (!product) return { status: 404, message: 'Product not found' };
      return { status: 200, product };
    } catch (e) {
      return { status: 500, message: e.message };
    }
  },

  updateProduct: async (req) => {
    try {
      const { id } = req.params;
      const { name, description, price,category } = req.body;
      const productImage = req.file ? req.file.filename : null;

      const product = await Product.findById(id);
      if (!product) return { status: 404, message: 'Product not found' };

      if (productImage && product.imageUrl) {
        const oldImagePath = path.join(__dirname, '../uploads', product.imageUrl);

        fs.unlink(oldImagePath, (err) => {
          if (err) console.error('Error deleting old image:', err);
        });
      }

      const updateData = { name, description, price,category };
      if (productImage) {
        updateData.imageUrl = productImage;
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedProduct) return { status: 404, message: 'Product not found' };
      return { status: 200, product: updatedProduct };
    } catch (e) {
      return { status: 500, message: e.message };
    }
  },
  deleteProduct: async (id) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (deletedProduct.imageUrl) {
        const imagePath = path.join(__dirname, '../uploads', deletedProduct.imageUrl);
        fs.unlink(imagePath, (err) => {
          if (err) console.error('Error deleting image:', err);
        });
      }
      if (!deletedProduct) return { status: 404, message: 'Product not found' };
      return { status: 200, message: 'Product Deleted' };
    } catch (e) {
      return { status: 500, message: e.message };
    }
  },
};
