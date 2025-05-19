import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// Get all blogs
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ updatedAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single blog
router.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a blog
router.delete('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save or update draft
router.post('/blogs/save-draft', async (req, res) => {
  try {
    const { id, title, content, tags } = req.body;
    let blog;

    if (id) {
      blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      blog.title = title;
      blog.content = content;
      blog.tags = tags;
    } else {
      blog = new Blog({
        title,
        content,
        tags,
        status: 'draft'
      });
    }

    const savedBlog = await blog.save();
    res.json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Publish blog
router.post('/blogs/publish', async (req, res) => {
  try {
    const { id, title, content, tags } = req.body;
    let blog;

    if (id) {
      blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      blog.title = title;
      blog.content = content;
      blog.tags = tags;
    } else {
      blog = new Blog({
        title,
        content,
        tags
      });
    }
    
    blog.status = 'published';
    const publishedBlog = await blog.save();
    res.json(publishedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;