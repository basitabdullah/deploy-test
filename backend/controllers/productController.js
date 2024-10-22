import { Product } from "../models/productModel.js";
import cloudinary from "../lib/cloudinary.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
    });
    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal server error: ${error.message}`,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.image) {
      await cloudinary.uploader.destroy(`products/${product.image}`);
      console.log("Product Image Deleted Successfully!");
    }

    await product.deleteOne();
    res.status(200).json({
      message: "Product deleted successfully!",
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: {
          size: 3,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          image: 1,
          price: 1,
          description: 1,
        },
      },
    ]);
    res.status(201).json(products);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export const toggleFeaturedProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({
        message: "Product not found!",
      });
    }

    product.isFeatured = !product.isFeatured;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true });
    if (!products) {
      res.status(404).json({
        message: "No featured products found!",
      });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export const searchProducts = async (req, res) => {
  const { query, sort, maxPrice, category } = req.query; // Destructure query params

  try {
    let sortOrder = {};

    if (sort === "asc") {
      sortOrder = { price: 1 }; // Ascending order
    } else if (sort === "desc") {
      sortOrder = { price: -1 }; // Descending order
    }

    // Build filters
    let filters = [];

    // Price Filter
    if (maxPrice) {
      filters.push({ price: { $lte: maxPrice } }); // Less than or equal to maxPrice
    }

    // Category Filter
    if (category) {
      filters.push({ category: category.toLowerCase() }); // Normalize category to lowercase
    }

    // Search Filter (only if query is non-empty)
    if (query && query.trim() !== "") {
      filters.push({
        $or: [
          { name: { $regex: query, $options: "i" } }, // Case-insensitive search on 'name'
          { description: { $regex: query, $options: "i" } }, // Case-insensitive search on 'description'
        ],
      });
    }

    // Perform the query with filters combined using $and
    const products = await Product.find({
      $and: filters, // Apply all filters
    }).sort(sortOrder); // Apply sorting

    res.json(products); // Return the found products
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
