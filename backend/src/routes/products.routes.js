import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getRelatedProduct,
  getSingleProduct,
  updateProduct,
} from "../controllers/products.controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.route("/create-product").post(createProduct);
router.route("/").get(getAllProducts);
router.route("/:id").get(getSingleProduct);
router
  .route("/update-product/:id")
  .patch(verifyToken, verifyAdmin, updateProduct);
router.route("/:id").delete(verifyToken, verifyAdmin, deleteProduct);
router.route("/related/:id").get(getRelatedProduct);

export default router;
