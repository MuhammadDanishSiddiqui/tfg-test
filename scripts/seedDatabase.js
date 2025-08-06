require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected for seeding");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const seedData = [
  {
    product_id: 1,
    current_price: {
      value: 12.99,
      currency_code: "USD",
    },
  },
  {
    product_id: 2,
    current_price: {
      value: 24.5,
      currency_code: "USD",
    },
  },
  {
    product_id: 3,
    current_price: {
      value: 18.75,
      currency_code: "USD",
    },
  },
  {
    product_id: 4,
    current_price: {
      value: 32.99,
      currency_code: "USD",
    },
  },
  {
    product_id: 5,
    current_price: {
      value: 45.25,
      currency_code: "USD",
    },
  },
  {
    product_id: 6,
    current_price: {
      value: 15.99,
      currency_code: "USD",
    },
  },
  {
    product_id: 7,
    current_price: {
      value: 28.75,
      currency_code: "USD",
    },
  },
  {
    product_id: 8,
    current_price: {
      value: 36.5,
      currency_code: "USD",
    },
  },
  {
    product_id: 9,
    current_price: {
      value: 22.25,
      currency_code: "USD",
    },
  },
  {
    product_id: 10,
    current_price: {
      value: 41.99,
      currency_code: "USD",
    },
  },
  {
    product_id: 11,
    current_price: {
      value: 19.99,
      currency_code: "USD",
    },
  },
  {
    product_id: 12,
    current_price: {
      value: 33.75,
      currency_code: "USD",
    },
  },
  {
    product_id: 13,
    current_price: {
      value: 27.5,
      currency_code: "USD",
    },
  },
  {
    product_id: 14,
    current_price: {
      value: 38.99,
      currency_code: "USD",
    },
  },
  {
    product_id: 15,
    current_price: {
      value: 13.49,
      currency_code: "USD",
    },
  },
  {
    product_id: 16,
    current_price: {
      value: 24.99,
      currency_code: "USD",
    },
  },
  {
    product_id: 17,
    current_price: {
      value: 19.99,
      currency_code: "USD",
    },
  },
  {
    product_id: 18,
    current_price: {
      value: 29.99,
      currency_code: "USD",
    },
  },
  {
    product_id: 19,
    current_price: {
      value: 39.99,
      currency_code: "USD",
    },
  },
  {
    product_id: 20,
    current_price: {
      value: 44.75,
      currency_code: "USD",
    },
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Product.deleteMany({});
    console.log("Cleared existing data");

    const result = await Product.insertMany(seedData);
    console.log(`Seeded ${result.length} products with pricing data`);

    console.log("\nSeeded products:");
    result.forEach((product) => {
      console.log(
        `Product ID: ${product.product_id}, Price: $${product.current_price.value} ${product.current_price.currency_code}`
      );
    });

    console.log("\n✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
