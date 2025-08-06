# myStore Products API

A RESTful API service for myStore that aggregates product data from multiple sources and returns it as JSON. This service combines product information from an external API with real-time pricing data stored in MongoDB.

## Features

- **GET /products/{id}** - Retrieve product data with pricing information
- **PUT /products/{id}** - Update product pricing data
- **Production-ready** with security, rate limiting, and error handling
- **MongoDB integration** for real-time pricing data
- **External API integration** with fakestoreapi.com for product information
- **Input validation** and comprehensive error handling
- **Health check endpoint** for monitoring

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mystore-products-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**

   ```bash
   cp env.example .env
   ```

   Edit `.env` file with your configuration:

   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/mystore_products
   EXTERNAL_API_BASE_URL=https://fakestoreapi.com
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or use a cloud instance.

5. **Seed the database** (optional)

   ```bash
   node scripts/seedDatabase.js
   ```

6. **Start the server**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### GET /products/{id}

Retrieves product information combined with pricing data.

**URL Parameters:**

- `id` (number) - Product ID (e.g., 15, 16, 17, 18, 19)

**Response:**

```json
{
  "id": 15,
  "title": "The Big Lebowski (Blu-ray) (Widescreen)",
  "current_price": {
    "value": 13.49,
    "currency_code": "USD"
  }
}
```

**Example:**

```bash
curl http://localhost:3000/products/15
```

### PUT /products/{id}

Updates product pricing information.

**URL Parameters:**

- `id` (number) - Product ID

**Request Body:**

```json
{
  "current_price": {
    "value": 14.99,
    "currency_code": "USD"
  }
}
```

**Response:**

```json
{
  "message": "Product price updated successfully",
  "product": {
    "id": 15,
    "current_price": {
      "value": 14.99,
      "currency_code": "USD"
    }
  }
}
```

**Example:**

```bash
curl -X PUT http://localhost:3000/products/15 \
  -H "Content-Type: application/json" \
  -d '{"current_price": {"value": 14.99, "currency_code": "USD"}}'
```

### GET /health

Health check endpoint for monitoring.

**Response:**

```json
{
  "status": "OK",
  "timestamp": "2023-08-15T10:30:00.000Z",
  "environment": "development",
  "uptime": 123.456
}
```

## Error Responses

The API returns consistent error responses:

```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

Common HTTP status codes:

- `200` - Success
- `400` - Bad Request (validation errors)
- `404` - Product not found
- `429` - Too many requests (rate limited)
- `500` - Internal server error
- `502` - External service unavailable

## Project Structure

```
mystore-products-api/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   └── productController.js  # API logic
├── middleware/
│   ├── errorHandler.js      # Error handling
│   └── validation.js        # Input validation
├── models/
│   └── Product.js           # MongoDB schema
├── routes/
│   └── products.js          # API routes
├── scripts/
│   └── seedDatabase.js      # Database seeding
├── services/
│   └── externalApiService.js # External API integration
├── server.js                # Main application
├── package.json
└── README.md
```

## Production Considerations

### Security Features

- **Helmet.js** for security headers
- **CORS** configuration
- **Rate limiting** to prevent abuse
- **Input validation** with Joi
- **Error handling** without exposing sensitive information

### Performance Features

- **MongoDB indexing** for faster queries
- **Connection pooling** for database efficiency
- **Request/response logging** with Morgan
- **Graceful shutdown** handling

### Monitoring

- **Health check endpoint** for load balancers
- **Structured logging** for production monitoring
- **Error tracking** with detailed error messages

## Development

### Development Mode

```bash
npm run dev
```

### Database Seeding

```bash
node scripts/seedDatabase.js
```

## Example Products

The API works with the following example product IDs from fakestoreapi.com:

- **15** - The Big Lebowski (Blu-ray)
- **16** - Generic Steel Computer
- **17** - Rustic Steel Car
- **18** - Intelligent Steel Pizza
- **19** - Intelligent Steel Soap

## External API Integration

The service integrates with [fakestoreapi.com](https://fakestoreapi.com/) to retrieve product information. This simulates myStore's internal product catalog API.

## Database Schema

The MongoDB collection stores pricing data with the following structure:

```javascript
{
  product_id: Number,        // Product ID from external API
  current_price: {
    value: Number,           // Price value
    currency_code: String    // Currency (USD, EUR, GBP, CAD)
  },
  last_updated: Date,        // Last update timestamp
  createdAt: Date,           // Document creation time
  updatedAt: Date            // Document update time
}
```

## License

MIT License - see LICENSE file for details.
