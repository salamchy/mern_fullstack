import express from "express";
import {
  countReview,
  createReview,
  getReview,
} from "../controllers/reviews.controllers.js";

const router = express.Router();

router.route("/post-review").post(createReview);
router.route("/total-reviews").get(countReview);
router.route("/:userId").get(getReview);

export default router;
