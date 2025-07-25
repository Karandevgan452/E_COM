import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

// @desc    Fetch all products
// @route   GET /api/products
export const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const { name, image, description, price, countInStock } = req.body;

  if (!name || !image || price == null) {
    res.status(400);
    throw new Error("Please provide name, image, and price");
  }

  const product = new Product({
    name,
    image,
    description,
    price,
    countInStock,
  });

  const created = await product.save();
  res.status(201).json(created);
});


// @desc    Update an existing product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, description, price, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.image = image || product.image;
    product.description = description || product.description;
    product.price = price ?? product.price;
    product.countInStock = countInStock ?? product.countInStock;

    const updated = await product.save();
    res.json(updated);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});


// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

