import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Blog {
  _id?: string;
  title: string;
  content: string;
  tags: string[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

interface BlogContextType {
  blogs: Blog[];
  loading: boolean;
  fetchBlogs: () => Promise<void>;
  saveDraft: (blog: Partial<Blog>) => Promise<Blog>;
  publishBlog: (blog: Partial<Blog>) => Promise<Blog>;
  getBlog: (id: string) => Promise<Blog>;
  deleteBlog: (id: string) => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(response.data);
    } catch (error) {
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  }, []);

  const saveDraft = useCallback(async (blog: Partial<Blog>): Promise<Blog> => {
    try {
      const response = await axios.post(`${API_URL}/api/blogs/save-draft`, blog);
      toast.success('Draft saved successfully');
      return response.data;
    } catch (error) {
      toast.error('Failed to save draft');
      throw error;
    }
  }, []);

  const publishBlog = useCallback(async (blog: Partial<Blog>): Promise<Blog> => {
    try {
      const response = await axios.post(`${API_URL}/api/blogs/publish`, blog);
      toast.success('Blog published successfully');
      return response.data;
    } catch (error) {
      toast.error('Failed to publish blog');
      throw error;
    }
  }, []);

  const getBlog = useCallback(async (id: string): Promise<Blog> => {
    try {
      const response = await axios.get(`${API_URL}/api/blogs/${id}`);
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch blog');
      throw error;
    }
  }, []);

  const deleteBlog = useCallback(async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/api/blogs/${id}`);
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
      toast.success('Blog deleted successfully');
    } catch (error) {
      toast.error('Failed to delete blog');
      throw error;
    }
  }, []);

  return (
    <BlogContext.Provider value={{ blogs, loading, fetchBlogs, saveDraft, publishBlog, getBlog, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};