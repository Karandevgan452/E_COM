import mongoose from "mongoose";
import dotenv from "dotenv";
import { additionalProducts } from "./data/products.js";
import connectDB from "./config/db.js";
import Product from "./models/Product.js"; 

dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await Product.insertMany(additionalProducts); 
    console.log("✅ Product data seeded!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

importData();
