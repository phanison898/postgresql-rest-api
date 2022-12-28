import express from "express";
import {
  getPosts,
  getPostById,
  uploadPost,
  updatePost,
  deletePost,
} from "../controllers/postControl.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", uploadPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
