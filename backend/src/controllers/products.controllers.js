import { productsModel } from "../models/products.model.js";
import { ReviewModel } from "../models/reviews.model.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      oldPrice,
      image,
      color,
      rating,
      author,
    } = req.body;

    // Validate required fields
    if (!name || !category || !price || !author) {
      return res.status(400).json({
        message: "Name, price, category and author are required fields.",
      });
    }

    //create a new product instance
    const newProduct = new productsModel({
      name,
      category,
      description,
      price,
      oldPrice,
      image,
      color,
      rating,
      author,
    });

    //save the product to the database
    const savedProduct = await newProduct.save();

    //calculate reviews
    const reviews = await ReviewModel.find({ productId: savedProduct._id });

    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );

      const averageRating = totalRating / reviews.length;

      savedProduct.rating = averageRating;
      await savedProduct.save();
    }

    //respond with create product
    return res.status(201).json({
      message: "Product created successfully.",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "An error occurred while creating the product.",
      error: error.message,
    });
  }
};

//get all products
export const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      color,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    let filter = {};
    if (category && category !== "all") {
      filter.category = category;
    }
    if (color && color !== "all") {
      filter.color = color;
    }
    if (minPrice && maxPrice) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);

      if (!isNaN(min) && !isNaN(max)) {
        filter.price = { $gte: min, $lte: max };
      }
    }

    const skip = parseInt(page - 1) * parseInt(limit);
    const totalProducts = await productsModel.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / parseInt(limit));
    const products = await productsModel
      .find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("author", "email")
      .sort({ createdAt: -1 });

    res.status(200).send({ products, totalPages, totalProducts });
  } catch (error) {
    console.log(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" }); // Respond with a server error
  }
};

//get a single product
export const getSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productsModel
      .findById(productId)
      .populate("author", "email username");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const reviews = await ReviewModel.find({ productId }).populate(
      "userId",
      "username email"
    );
    res.status(200).send({
      product,
      reviews,
    });
  } catch (error) {
    console.log(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" }); // Respond with a server error
  }
};

//update a product
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await productsModel.findByIdAndUpdate(
      productId,
      { ...req.body },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log("Error updating product", error); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" }); // Respond with a server error
  }
};

//delete a product
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await productsModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    //delete reviews related to the product
    await ReviewModel.deleteMany({ productId: productId });

    res.status(200).json({
      success: true,
      message: "Product and reviews deleted",
    });
  } catch (error) {
    console.log("Error deleting product", error); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" }); // Respond with a server error
  }
};

//get related products
export const getRelatedProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    const product = await productsModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const titleRegex = new RegExp(
      product.name
        .split(" ")
        .filter((word) => word.length > 1)
        .join("|"),
      "i"
    );

    const relatedProducts = await productsModel.find({
      _id: { $ne: id },
      $or: [
        {
          name: { $regex: titleRegex },
        },
        {
          category: product.category,
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: "related product found",
      relatedProducts,
    });
  } catch (error) {
    console.log("Error getting related product", error); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" }); // Respond with a server error
  }
};
