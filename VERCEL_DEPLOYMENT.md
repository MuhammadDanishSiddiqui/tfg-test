# Deploy to Vercel - Step by Step Guide

## Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account** - For code repository
3. **MongoDB Atlas Account** - For database (free tier available)

## Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user with read/write permissions
5. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/database`)

## Step 2: Push Code to GitHub

1. **Create a new repository on GitHub**

   - Go to [GitHub](https://github.com)
   - Click "New repository"
   - Name it `mystore-api`
   - Make it public
   - Don't initialize with README

2. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/mystore-api.git
   git push -u origin main
   ```

## Step 3: Deploy via Vercel Dashboard

### 3.1 Create New Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Import your GitHub repository (`mystore-api`)
4. Click **"Import"**

### 3.2 Configure Project Settings

1. **Project Name:** `mystore-products-api` (or your preferred name)
2. **Framework Preset:** Node.js (should auto-detect)
3. **Root Directory:** `./` (leave as default)
4. **Build Command:** Leave empty (not needed for this project)
5. **Output Directory:** Leave empty (not needed for this project)
6. **Install Command:** `npm install` (leave as default)

### 3.3 Set Environment Variables

Click **"Environment Variables"** and add:

| NAME                      | VALUE                                                                  |
| ------------------------- | ---------------------------------------------------------------------- |
| `MONGODB_URI`             | `mongodb+srv://username:password@cluster.mongodb.net/mystore_products` |
| `EXTERNAL_API_BASE_URL`   | `https://fakestoreapi.com`                                             |
| `NODE_ENV`                | `production`                                                           |
| `RATE_LIMIT_WINDOW_MS`    | `900000`                                                               |
| `RATE_LIMIT_MAX_REQUESTS` | `100`                                                                  |

### 3.4 Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 1-2 minutes)
3. You'll see "Ready" when deployment is successful

### 3.5 Get Your App URL

Your app will be available at:

- `https://your-project-name.vercel.app`
- You can also set up a custom domain later

## Step 4: Seed Your Database

After deployment, you need to add data to your database:

### Option A: Using MongoDB Atlas Dashboard

1. Go to your MongoDB Atlas cluster
2. Click **"Browse Collections"**
3. Create a new database called `mystore_products`
4. Create a collection called `products`
5. Add documents manually with this structure:

```json
{
  "product_id": 1,
  "current_price": {
    "value": 12.99,
    "currency_code": "USD"
  },
  "last_updated": "2023-08-15T10:30:00.000Z"
}
```

Repeat for products 1-20 with different prices.

### Option B: Using MongoDB Compass

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect to your Atlas cluster using the connection string
3. Navigate to your database and collection
4. Import the seed data

## Step 5: Test Your API

Your API will be available at:

- `https://your-project-name.vercel.app/products/1`
- `https://your-project-name.vercel.app/health`

### Test with curl:

```bash
# Get product with ID 1
curl https://your-project-name.vercel.app/products/1

# Update product price
curl -X PUT https://your-project-name.vercel.app/products/1 \
  -H "Content-Type: application/json" \
  -d '{"current_price": {"value": 15.99, "currency_code": "USD"}}'

# Health check
curl https://your-project-name.vercel.app/health
```

### Test with browser:

- Open: `https://your-project-name.vercel.app/health`
- Open: `https://your-project-name.vercel.app/products/1`

## Troubleshooting

### If deployment fails:

1. **Check build logs:**

   - Go to your project dashboard
   - Click on the latest deployment
   - Check the build logs for errors

2. **Common issues:**
   - Missing environment variables
   - MongoDB connection string error
   - Node.js version issues

### If app returns 404:

1. **Check vercel.json:**

   - Ensure routes are configured correctly
   - Make sure the build points to the right file

2. **Check environment variables:**
   - Go to Project Settings → Environment Variables
   - Ensure all required variables are set

### If database connection fails:

1. **Check MongoDB Atlas:**
   - Ensure your IP is whitelisted (or use 0.0.0.0/0 for all IPs)
   - Verify database user permissions
   - Check connection string format

## Environment Variables Reference

| Variable                  | Required | Value                      | Description                          |
| ------------------------- | -------- | -------------------------- | ------------------------------------ |
| `MONGODB_URI`             | ✅ Yes   | `mongodb+srv://...`        | Your MongoDB Atlas connection string |
| `EXTERNAL_API_BASE_URL`   | ❌ No    | `https://fakestoreapi.com` | External API base URL                |
| `NODE_ENV`                | ❌ No    | `production`               | Environment                          |
| `RATE_LIMIT_WINDOW_MS`    | ❌ No    | `900000`                   | Rate limiting window (15 minutes)    |
| `RATE_LIMIT_MAX_REQUESTS` | ❌ No    | `100`                      | Max requests per window              |

## API Endpoints

Once deployed, your API will have these endpoints:

- `GET /products/{id}` - Get product with pricing
- `PUT /products/{id}` - Update product pricing
- `GET /health` - Health check

## Free Tier Limitations

- **Requests:** 100 requests per day (free tier)
- **Function execution:** 10 seconds max
- **Database:** Use MongoDB Atlas free tier (512MB)

## Next Steps

1. **Monitor your app:**

   - Go to **"Analytics"** tab to see usage
   - Check **"Functions"** tab for logs

2. **Scale if needed:**

   - Upgrade to Pro plan for more requests
   - Add more serverless functions

3. **Custom domain:**
   - Go to **"Settings"** → **"Domains"**
   - Add your custom domain

## Useful Vercel Commands (CLI)

If you want to use Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add MONGODB_URI
vercel env add EXTERNAL_API_BASE_URL
vercel env add NODE_ENV
```
