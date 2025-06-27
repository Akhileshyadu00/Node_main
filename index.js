import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { UserRoutes } from './routes/userRoutes.js';
import { productRoutes } from './routes/productRoutes.js'; 
import { cartRoutes } from './routes/cartRoutes.js'; // Adjust path as needed



const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON
app.use(express.json());

// Routes
UserRoutes(app);
productRoutes(app); 
cartRoutes(app);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("DB is connected");
  app.listen(PORT, () => {
    console.log(` Server is running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error(" DB connection failed:", err.message);
});
