// app.js
import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js"; // empty for now
import userRoutes from "./routes/userRoutes.js"; // empty for now
 import orderRoutes from "./routes/orderRoutes.js"; // empty for now
 import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

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
