import path from 'path';
import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connection.js';
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from "./routes/productRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import orderRoutes from './routes/orderRoutes.js'


dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
  });
}).catch((error) => {
  console.error('Failed to connect to the database:', error);
});

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes)
const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname + "/uploads")))
