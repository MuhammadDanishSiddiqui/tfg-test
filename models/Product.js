const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema(
  {
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    currency_code: {
      type: String,
      required: true,
      default: "USD",
      enum: ["USD", "EUR", "GBP", "CAD"],
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    current_price: {
      type: priceSchema,
      required: true,
    },
    last_updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ product_id: 1 });

module.exports = mongoose.model("Product", productSchema);
