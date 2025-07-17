
// export default router;

import express from 'express';
import { createComment, getCommentsByPost } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes like: /api/comments/:postId
router
  .route('/:postId')
  .get(getCommentsByPost)
  .post(protect, createComment);

export default router;
