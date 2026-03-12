# 🔌 API Documentation - Sparkle Beat

Complete API reference for Sparkle Beat backend.

## Base URL

```
Local: http://localhost:3000/api
Production: https://yourdomain.vercel.app/api
```

---

## 🔐 Authentication

All write operations (POST, PUT, DELETE) require authentication.

### Authentication Header
```
Authorization: Bearer {ADMIN_PASSWORD}
```

Replace `{ADMIN_PASSWORD}` with the value from your `.env.local`

---

## 📦 Endpoints

### 1. Get All Products

**Request**
```http
GET /api/products
```

**Parameters**
- None required

**Example**
```bash
curl "http://localhost:3000/api/products"
```

**Response** (200 OK)
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Golden Bracelet",
    "price": 1200,
    "image": "https://res.cloudinary.com/...",
    "whatsapp": "+923001234567",
    "description": "Beautiful golden design",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

---

### 2. Create Product

**Request**
```http
POST /api/products
Authorization: Bearer your_admin_password
Content-Type: application/json
```

**Body**
```json
{
  "name": "Golden Bracelet",
  "price": 1200,
  "image": "https://res.cloudinary.com/...",
  "whatsapp": "+923001234567",
  "description": "Beautiful golden design"
}
```

**Required Fields**
- `name` (string) - Product name
- `price` (number) - Price in rupees
- `image` (string) - Cloudinary image URL
- `whatsapp` (string) - WhatsApp number with country code

**Optional Fields**
- `description` (string) - Product description

**Example**
```bash
curl -X POST "http://localhost:3000/api/products" \
  -H "Authorization: Bearer your_admin_password" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Silver Bracelet",
    "price": 800,
    "image": "https://res.cloudinary.com/.../silver.jpg",
    "whatsapp": "+923001234567",
    "description": "Elegant silver design"
  }'
```

**Response** (201 Created)
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Silver Bracelet",
  "price": 800,
  "image": "https://res.cloudinary.com/.../silver.jpg",
  "whatsapp": "+923001234567",
  "description": "Elegant silver design",
  "createdAt": "2024-01-15T10:35:00Z",
  "updatedAt": "2024-01-15T10:35:00Z"
}
```

---

### 3. Update Product

**Request**
```http
PUT /api/products?id={productId}
Authorization: Bearer your_admin_password
Content-Type: application/json
```

**Query Parameters**
- `id` (required) - Product MongoDB ID

**Body** (any of the fields)
```json
{
  "name": "Updated Name",
  "price": 1500,
  "description": "Updated description"
}
```

**Example**
```bash
curl -X PUT "http://localhost:3000/api/products?id=507f1f77bcf86cd799439011" \
  -H "Authorization: Bearer your_admin_password" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1500,
    "description": "Sale price!"
  }'
```

**Response** (200 OK)
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Golden Bracelet",
  "price": 1500,
  "image": "https://res.cloudinary.com/...",
  "whatsapp": "+923001234567",
  "description": "Sale price!",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:45:00Z"
}
```

---

### 4. Delete Product

**Request**
```http
DELETE /api/products?id={productId}
Authorization: Bearer your_admin_password
```

**Query Parameters**
- `id` (required) - Product MongoDB ID

**Example**
```bash
curl -X DELETE "http://localhost:3000/api/products?id=507f1f77bcf86cd799439011" \
  -H "Authorization: Bearer your_admin_password"
```

**Response** (200 OK)
```json
{
  "message": "Product deleted successfully"
}
```

---

## 📊 Data Models

### Product

```typescript
interface IProduct {
  _id: string;                    // MongoDB ID
  name: string;                   // Product name (required)
  price: number;                  // Price in rupees (required, min: 0)
  image: string;                  // Cloudinary URL (required)
  whatsapp: string;              // WhatsApp number (required)
  description?: string;           // Optional description
  createdAt: Date;                // Creation timestamp
  updatedAt: Date;                // Last update timestamp
}
```

---

## 🔄 Image Upload Flow

Images are not uploaded directly to the API. Instead:

1. **Client uploads to Cloudinary** (using ClouDinary's widget)
2. **Get the Image URL** from Cloudinary response
3. **Send URL to API** in the `image` field

### Example Image Upload with JavaScript

```javascript
// Using Cloudinary widget
const cloudinary = window.cloudinary || Cloudinary.new({ cloud_name: 'your_cloud_name' });

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: 'your_cloud_name',
    uploadPreset: 'your_upload_preset'
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      const imageUrl = result.info.secure_url;
      // Send to API
      fetch('/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminPassword}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Product Name',
          price: 1200,
          image: imageUrl,
          whatsapp: '+923001234567'
        })
      });
    }
  }
);

myWidget.open();
```

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "message": "Required field missing or invalid",
  "error": "Validation failed"
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "message": "Product not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Error message",
  "error": "Internal error details"
}
```

---

## 🧪 Testing with cURL

### Get all products
```bash
curl "http://localhost:3000/api/products"
```

### Create product
```bash
curl -X POST "http://localhost:3000/api/products" \
  -H "Authorization: Bearer your_password" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Bracelet",
    "price": 1000,
    "image": "https://example.com/image.jpg",
    "whatsapp": "+923001234567"
  }'
```

### Update product
```bash
curl -X PUT "http://localhost:3000/api/products?id=YOUR_PRODUCT_ID" \
  -H "Authorization: Bearer your_password" \
  -H "Content-Type: application/json" \
  -d '{"price": 1500}'
```

### Delete product
```bash
curl -X DELETE "http://localhost:3000/api/products?id=YOUR_PRODUCT_ID" \
  -H "Authorization: Bearer your_password"
```

---

## 🔐 WhatsApp Integration

The WhatsApp number is used to generate Order links:

```
https://wa.me/{phone_number}?text={message}
```

Example:
```
https://wa.me/923001234567?text=I'm%20interested%20in%20the%20Golden%20Bracelet
```

---

## 📱 Frontend API Usage

### Getting Products (No Auth)

```javascript
const response = await fetch('/api/products');
const products = await response.json();
```

### Creating Product (With Auth)

```javascript
const response = await fetch('/api/products', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${adminPassword}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Test',
    price: 1000,
    image: 'url',
    whatsapp: '+923001234567'
  })
});

const product = await response.json();
```

---

## 📈 Rate Limiting

Currently no rate limiting. Consider adding for production:

```bash
npm install express-rate-limit
```

---

## 🚀 Production Considerations

1. **Add Rate Limiting** - Prevent abuse
2. **Add CORS** - Control API access
3. **Add Logging** - Track API calls
4. **Add Validation** - Enhanced validation
5. **Add Caching** - Improve performance
6. **Use JWT** - Better than password auth

---

## 📚 Resources

- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [MongoDB Operators](https://docs.mongodb.com/manual/reference/operator/)
- [Cloudinary API](https://cloudinary.com/documentation/image_upload_api_reference)

---

**API Version**: 1.0
**Last Updated**: 2024
