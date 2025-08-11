// const dotenv = require('dotenv');
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 5000;
// const categoryRoute = require('./routes/category');
// const customerRoute = require('./routes/customer');
// const orderRoute = require('./routes/order');
// const orderDetailRoute = require('./routes/orderDetail');
// // const postTransactionDetailRoute = require('./routes/postTransactionDetail');
// const productRoute = require('./routes/product');
// const supplierRoute = require('./routes/supplier');
// const nongstRoute = require ('./routes/Nongst');
// const connectDB = require('./utils/db');
// const errorMiddleware = require('./middlewares/error-middleware');

// dotenv.config();

// // Apply CORS middleware before routes
// app.use(cors({
//   origin: 'http://localhost:8080' || "*", // Allow requests from your frontend origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Specify allowed methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
// }));

// // Parse JSON request bodies
// app.use(express.json());


// // Define routes
// app.use('/api/category', categoryRoute);
// app.use('/api/customer', customerRoute);
// app.use('/api/order', orderRoute);
// app.use('/api/orderDetails', orderDetailRoute);
// // app.use('/api/postTransactionDetail', postTransactionDetailRoute);
// app.use('/api/product', productRoute);
// app.use('/api/supplier', supplierRoute);
// app.use('/api/nongstorder', nongstRoute);

// // Error handling middleware
// app.use(errorMiddleware);
// // Your routes & middleware setup here...

// // Database connection
// connectDB();

// // Error middleware
// app.use(errorMiddleware);

// // Export the Express app for Vercel
// module.exports = app;

// // app.use(connectDB());
// // // Connect to database and start server
// // // connectDB().then(() => {
// // //   // app.listen(port, () => {
// // //   //   console.log(`Example app listening on port ${port}`);
// // //   // });
// // // });

// // module.exports = app;
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const categoryRoute = require('./routes/category');
const customerRoute = require('./routes/customer');
const orderRoute = require('./routes/order');
const orderDetailRoute = require('./routes/orderDetail');
const productRoute = require('./routes/product');
const supplierRoute = require('./routes/supplier');
const nongstRoute = require('./routes/Nongst');
const connectDB = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');

dotenv.config();
const app = express();

// CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// JSON parsing
app.use(express.json());

// Routes
app.use('/api/category', categoryRoute);
app.use('/api/customer', customerRoute);
app.use('/api/order', orderRoute);
app.use('/api/orderDetails', orderDetailRoute);
app.use('/api/product', productRoute);
app.use('/api/supplier', supplierRoute);
app.use('/api/nongstorder', nongstRoute);

// Error handler
app.use(errorMiddleware);

// Connect DB once when deployed
connectDB();

// Export for Vercel
module.exports = app;

// const dotenv = require('dotenv');
// const express = require('express');
// const cors = require('cors');

// const categoryRoute = require('./routes/category');
// const customerRoute = require('./routes/customer');
// const orderRoute = require('./routes/order');
// const orderDetailRoute = require('./routes/orderDetail');
// const productRoute = require('./routes/product');
// const supplierRoute = require('./routes/supplier');
// const nongstRoute = require('./routes/Nongst');

// const connectDB = require('./utils/db');
// const errorMiddleware = require('./middlewares/error-middleware');

// dotenv.config();

// const app = express();

// // Apply CORS middleware
// app.use(cors({
//   origin: process.env.CLIENT_URL || "*", // allow your deployed frontend
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// // Parse JSON request bodies
// app.use(express.json());

// // Root route for testing
// app.get("/", (req, res) => {
//   res.json({ message: "Backend is running on Vercel!" });
// });

// // API routes
// app.use('/api/category', categoryRoute);
// app.use('/api/customer', customerRoute);
// app.use('/api/order', orderRoute);
// app.use('/api/orderDetails', orderDetailRoute);
// app.use('/api/product', productRoute);
// app.use('/api/supplier', supplierRoute);
// app.use('/api/nongstorder', nongstRoute);

// // Error handling middleware
// app.use(errorMiddleware);

// // Connect to the database
// connectDB();

// // Export app for Vercel (no app.listen)
// module.exports = app;
