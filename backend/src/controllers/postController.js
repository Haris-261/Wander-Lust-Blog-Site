import Post from '../models/Post.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

const parseTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map((t) => String(t).trim()).filter(Boolean);
  return String(tags)
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
};

export const getPublishedPosts = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(24, parseInt(req.query.limit, 10) || 9);
    const skip = (page - 1) * limit;

    const filter = { published: true };

    if (req.query.category) {
      filter.category = new RegExp(`^${req.query.category}$`, 'i');
    }

    if (req.query.search) {
      const q = req.query.search;
      filter.$or = [
        { title: new RegExp(q, 'i') },
        { excerpt: new RegExp(q, 'i') },
        { tags: new RegExp(q, 'i') },
      ];
    }

    const [posts, total] = await Promise.all([
      Post.find(filter)
        .populate('author', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Post.countDocuments(filter),
    ]);

    res.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch posts' });
  }
};

export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({
      slug: req.params.slug,
      published: true,
    }).populate('author', 'name email');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ post });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch post' });
  }
};

export const getCategories = async (_req, res) => {
  try {
    const categories = await Post.distinct('category', { published: true });
    res.json({ categories: categories.sort() });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch categories' });
  }
};

export const getAdminPosts = async (_req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch posts' });
  }
};

export const getAdminPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ post });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch post' });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, excerpt, content, category, tags, published } = req.body;

    if (!title || !excerpt || !content || !category) {
      return res.status(400).json({ message: 'Title, excerpt, content, and category are required' });
    }

    let coverImage = '';
    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file);
      coverImage = uploaded.secure_url;
    }

    const post = await Post.create({
      title,
      excerpt,
      content,
      category,
      tags: parseTags(tags),
      published: published === 'false' || published === false ? false : true,
      coverImage,
      author: req.user._id,
    });

    const populated = await post.populate('author', 'name email');
    res.status(201).json({ post: populated });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to create post' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const { title, excerpt, content, category, tags, published } = req.body;

    if (title !== undefined) post.title = title;
    if (excerpt !== undefined) post.excerpt = excerpt;
    if (content !== undefined) post.content = content;
    if (category !== undefined) post.category = category;
    if (tags !== undefined) post.tags = parseTags(tags);
    if (published !== undefined) {
      post.published = !(published === 'false' || published === false);
    }

    if (req.file) {
      await deleteFromCloudinary(post.coverImage);
      const uploaded = await uploadToCloudinary(req.file);
      post.coverImage = uploaded.secure_url;
    }

    await post.save();
    const populated = await post.populate('author', 'name email');
    res.json({ post: populated });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to update post' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await deleteFromCloudinary(post.coverImage);
    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to delete post' });
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }
    const uploaded = await uploadToCloudinary(req.file);
    res.status(201).json({ url: uploaded.secure_url });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Upload failed' });
  }
};

export const getStats = async (_req, res) => {
  try {
    const [total, published, drafts, categories] = await Promise.all([
      Post.countDocuments(),
      Post.countDocuments({ published: true }),
      Post.countDocuments({ published: false }),
      Post.distinct('category'),
    ]);
    res.json({
      stats: {
        total,
        published,
        drafts,
        categories: categories.length,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to load stats' });
  }
};
