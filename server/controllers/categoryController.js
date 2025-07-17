
import Category from '../models/Category.js';

// POST /api/categories
export const createCategory = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
