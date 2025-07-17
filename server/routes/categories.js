// routes/categories.js
import express from 'express';
import { body, validationResult } from 'express-validator';
import { createCategory, getCategories } from '../controllers/categoryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCategories);

router.post(
  '/',
  protect,
  body('name').notEmpty().withMessage('Category name is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  createCategory
);

export default router;
