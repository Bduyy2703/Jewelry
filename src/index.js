const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // Import file routes
const connectDB = require('./config/db');
const { swaggerDocs, swaggerUi } = require('./config/swagger');
require('dotenv').config({ path: '.env.development' });

// Kết nối DB
connectDB();

const app = express();

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Cấu hình CORS cho phép mọi nguồn gốc
app.use(cors());

// Cấu hình static file
app.use(express.static('public'));

// Middleware để phân tích body JSON
app.use(express.json());

// Đăng ký routes từ 'routes/index.js'
app.use('/api', routes); // Đăng ký router với prefix '/api'

// Middleware xử lý lỗi 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Global exception
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// env environments
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
