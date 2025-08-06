const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {
  validateProductId,
  validatePriceUpdate,
} = require("../middleware/validation");

router.get("/:id", validateProductId, productController.getProduct);

router.put(
  "/:id",
  validateProductId,
  validatePriceUpdate,
  productController.updateProductPrice
);

module.exports = router;
