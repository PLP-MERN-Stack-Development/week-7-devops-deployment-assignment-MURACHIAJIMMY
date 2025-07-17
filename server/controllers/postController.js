

import Post from '../models/Post.js';
import Category from '../models/Category.js';

// Utility to handle 404 and ownership
const findPostOrFail = async (id, userId) => {
  const post = await Post.findById(id);
  if (!post) throw new Error('Post not found');
  if (post.author.toString() !== userId) throw new Error('Unauthorized');
  return post;
};

// // Create a new blog post
// export const createPost = async (req, res) => {
//   try {
//     const { title, content, categoryName } = req.body;

//     // ✅ Trim the category name before processing
//     const trimmedCategory = categoryName?.trim();

//     // Check if category exists (case-insensitive), or create it
//     let category = await Category.findOne({ name: new RegExp(`^${trimmedCategory}$`, 'i') });
//     if (!category) {
//       category = await Category.create({ name: trimmedCategory });
//     }

//     const post = await Post.create({
//       title,
//       content,
//       category: category._id,
//       author: req.user.id
//     });

//     res.status(201).json(post);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const createPost = async (req, res) => {
  try {
    const { title, content, categoryName } = req.body;

    let category = await Category.findOne({ name: categoryName.trim() });
    if (!category) {
      category = await Category.create({ name: categoryName.trim() });
    }

    const post = await Post.create({
      title,
      content,
      category: category._id,
      author: req.user.id,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error("Post creation failed:", err);
    res.status(500).json({ error: "Server error" });
  }
};
// Get all blog posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username')
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific blog post
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username')
      .populate('category', 'name');

    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a blog post
export const updatePost = async (req, res) => {
  try {
    const post = await findPostOrFail(req.params.id, req.user.id);
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    const status = err.message === 'Unauthorized' ? 403 : 404;
    res.status(status).json({ error: err.message });
  }
};

// Delete a blog post
export const deletePost = async (req, res) => {
  try {
    const post = await findPostOrFail(req.params.id, req.user.id);
    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    const status = err.message === 'Unauthorized' ? 403 : 404;
    res.status(status).json({ error: err.message });
  }
};
