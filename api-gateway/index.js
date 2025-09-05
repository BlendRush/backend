// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const cors = require("cors");
// const app = express();

// // app.use(cors({
// //     origin: 'https://blendrush.netlify.app',
// //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //     credentials: true
// // }));

// app.use('/api/menu', createProxyMiddleware({ target: 'http://menu-service:3001', changeOrigin: true }));
// app.use('/api/orders', createProxyMiddleware({ target: 'http://order-service:3002', changeOrigin: true }));
// app.use('/api/user', createProxyMiddleware({ target: 'http://user-service:3003', changeOrigin: true }));
// app.use('/api/carts', createProxyMiddleware({ target: 'http://cart-service:3005', changeOrigin: true }));

// app.listen(3000, () => {
//     console.log("API Gateway running on port 3000");
// });


const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors({
    origin: 'https://blendrush.netlify.app', // your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

// Handle preflight requests
// app.options('*', cors({
//     origin: 'https://blendrush.netlify.app',
//     credentials: true
// }));

// Proxy routes
app.use('/api/menu', createProxyMiddleware({ target: 'http://menu-service:3001', changeOrigin: true }));
app.use('/api/orders', createProxyMiddleware({ target: 'http://order-service:3002', changeOrigin: true }));
app.use('/api/user', createProxyMiddleware({ target: 'http://user-service:3003', changeOrigin: true }));
app.use('/api/carts', createProxyMiddleware({ target: 'http://cart-service:3005', changeOrigin: true }));

app.listen(3000, () => console.log("API Gateway running on port 3000"));
