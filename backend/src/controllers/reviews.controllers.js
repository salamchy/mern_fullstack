import { productsModel } from "../models/products.model.js";
import { ReviewModel } from "../models/reviews.model.js";

//function to post review
export const createReview = async (req, res) => {
  try {
    const { comment, rating, productId, userId } = req.body;

    if (!comment || !rating || !productId || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const existingReview = await ReviewModel.findOne({ productId, userId });

    if (existingReview) {
      // update reviews
      existingReview.comment = comment;
      existingReview.rating = rating;
      await existingReview.save();
    } else {
      //create new review
      const newReview = new ReviewModel({
        comment,
        rating,
        productId,
        userId,
      });
      await newReview.save();
    }

    //function to calculate the average rating
    const reviews = await ReviewModel.find({ productId });

    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );

      const averageRating = totalRating / reviews.length;

      const product = await productsModel.findById(productId);

      if (product) {
        product.rating = averageRating;
        await product.save({ validateBeforeSave: false });
      } else {
        return res.status(404).json({
          success: false,
          message: "Product not found!",
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Review processed successfully.",
      reviews: reviews,
    });
  } catch (error) {
    console.error("Error processing review:", error); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" }); // Respond with a server error
  }
};

//function to count the review
export const countReview = async (req, res) => {
  try {
    const totalReviews = await ReviewModel.countDocuments({});
    res.status(200).send({
      totalReviews,
    });
  } catch (error) {
    console.log(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" }); // Respond with a server error
  }
};

//function get reviews by userId
export const getReview = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required.",
      });
    }

    // Fetch reviews for the given userId
    const reviews = await ReviewModel.find({ userId })
      .sort({ createdAt: -1 })
      .exec();

    // Handle case where no reviews are found
    if (!reviews.length) {
      return res.status(404).json({
        success: false,
        message: "No reviews found.",
      });
    }

    // Respond with the fetched reviews
    res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully.",
      data: reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error); // Log detailed error for debugging
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews.",
      error: error.message,
    });
  }
};
