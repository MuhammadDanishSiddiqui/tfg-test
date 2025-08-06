const axios = require("axios");

class ExternalApiService {
  constructor() {
    this.baseURL =
      process.env.EXTERNAL_API_BASE_URL || "https://fakestoreapi.com";
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "myStore-Products-API/1.0",
      },
    });
  }

  async getProductById(id) {
    try {
      const response = await this.client.get(`/products/${id}`);

      if (response.status === 200 && response.data) {
        return {
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          category: response.data.category,
          image: response.data.image,
          rating: response.data.rating,
        };
      }

      throw new Error("Product not found in external API");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error("Product not found");
      }
      throw new Error(`External API error: ${error.message}`);
    }
  }

  async getAllProducts() {
    try {
      const response = await this.client.get("/products");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  }
}

module.exports = new ExternalApiService();
