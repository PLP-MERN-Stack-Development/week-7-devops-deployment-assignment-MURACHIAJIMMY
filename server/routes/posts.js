import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Middleware to handle validation results
const validatePost = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

router.route('/')
  .post(protect, validatePost, createPost)
  .get(getAllPosts);

router.route('/:id')
  .get(getPostById)
  .put(protect, validatePost, updatePost) // optional validation on update
  .delete(protect, deletePost);

export default router;
