

import Comment from '../models/Comment.js';

export const createComment = async (req, res) => {
  try {
    const content = req.body.content?.trim();

    const comment = await Comment.create({
      post: req.params.postId,
      author: req.user.id,
      content
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
