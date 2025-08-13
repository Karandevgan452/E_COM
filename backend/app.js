// app.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";


import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
 import orderRoutes from "./routes/orderRoutes.js";
 import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.get("/", (req, res) => {
  res.json("Backend is running...");
});


// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

 // Error handlers
 app.use(notFound);
 app.use(errorHandler);

export default app;
