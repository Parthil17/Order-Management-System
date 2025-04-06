# Order Management System

A secure REST API for managing orders with robust logging, error handling, authentication, and session management built with Express.js and MongoDB.

## Features

- 🔐 JWT-based Authentication
- 📝 CRUD Operations for Orders
- 📊 Request Logging
- ⚠️ Centralized Error Handling
- 🔒 Session Management with HTTP-only Cookies
- 🛡️ Secure API Endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn package manager

1. Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

2. Start the development server:
```bash
npm run dev
```

3. Follow the testing steps in the collection:
   - Register a new user
   - Login with the created credentials
   - Create an order
   - Get all orders
   - Get a specific order
   - Update an order
   - Delete an order

## Error Handling

The API includes comprehensive error handling for:
- 400: Bad Request (Invalid input)
- 401: Unauthorized (Authentication required)
- 404: Not Found (Resource not found)
- 500: Internal Server Error

## Logging

All API requests are logged to `server.log` with:
- Timestamp
- HTTP method
- URL
- Request details
