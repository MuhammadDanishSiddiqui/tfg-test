const Product = require("../models/Product");
const externalApiService = require("../services/externalApiService");

class ProductController {
  async getProduct(req, res, next) {
    try {
      const productId = parseInt(req.params.id);

      const externalProduct = await externalApiService.getProductById(
        productId
      );

      const localProduct = await Product.findOne({ product_id: productId });

      if (!localProduct) {
        return res.status(404).json({
          error: "Product not found",
          message: "Product pricing data not available",
        });
      }

      const response = {
        id: externalProduct.id,
        title: externalProduct.title,
        current_price: localProduct.current_price,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateProductPrice(req, res, next) {
    try {
      const productId = parseInt(req.params.id);
      const { current_price } = req.body;

      await externalApiService.getProductById(productId);

      const updatedProduct = await Product.findOneAndUpdate(
        { product_id: productId },
        {
          product_id: productId,
          current_price: current_price,
          last_updated: new Date(),
        },
        {
          new: true,
          upsert: true,
        }
      );

      res.json({
        message: "Product price updated successfully",
        product: {
          id: productId,
          current_price: updatedProduct.current_price,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
