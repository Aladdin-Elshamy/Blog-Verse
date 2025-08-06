import express from "express";
import blogController from "../controllers/blogController.js";
const router = express.Router();

router.post('/create', blogController.createBlog);
router.get('/all', blogController.getBlogs);
router.get('/search', blogController.getBlogById);
router.put('/:blogId', blogController.updateBlog);
router.delete('/:blogId', blogController.deleteBlog);

export default router