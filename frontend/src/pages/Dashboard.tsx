import React, { useEffect } from 'react';
import { useBlog } from '../context/BlogContext';
import BlogItem from '../components/BlogItem';

const Dashboard: React.FC = () => {
  const { blogs, loading, fetchBlogs } = useBlog();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const drafts = blogs.filter(blog => blog.status === 'draft');
  const published = blogs.filter(blog => blog.status === 'published');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Drafts</h2>
          {drafts.length === 0 ? (
            <p className="text-gray-500">No drafts yet</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {drafts.map(blog => (
                <BlogItem
                  key={blog._id}
                  id={blog._id!}
                  title={blog.title}
                  status={blog.status}
                  updatedAt={blog.updatedAt}
                  tags={blog.tags}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Published</h2>
          {published.length === 0 ? (
            <p className="text-gray-500">No published posts yet</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {published.map(blog => (
                <BlogItem
                  key={blog._id}
                  id={blog._id!}
                  title={blog.title}
                  status={blog.status}
                  updatedAt={blog.updatedAt}
                  tags={blog.tags}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;