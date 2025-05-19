import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileEdit, Clock, Tag, Trash2 } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

interface BlogItemProps {
  id: string;
  title: string;
  status: 'draft' | 'published';
  updatedAt: string;
  tags: string[];
}

const BlogItem: React.FC<BlogItemProps> = ({ id, title, status, updatedAt, tags }) => {
  const navigate = useNavigate();
  const { deleteBlog } = useBlog();
  const [isDeleting, setIsDeleting] = useState(false);
  const formattedDate = new Date(updatedAt).toLocaleDateString();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDeleting) return;

    const confirmed = window.confirm('Are you sure you want to delete this blog post?');
    if (confirmed) {
      setIsDeleting(true);
      try {
        await deleteBlog(id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/editor/${id}`)}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{title || 'Untitled'}</h3>
        <span className={`px-2 py-1 rounded text-sm ${
          status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {status}
        </span>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        {tags.length > 0 && (
          <div className="flex items-center gap-1">
            <Tag className="w-4 h-4" />
            <span>{tags.join(', ')}</span>
          </div>
        )}
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-1 hover:text-blue-600"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/editor/${id}`);
            }}
          >
            <FileEdit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            className="flex items-center gap-1 hover:text-red-600"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;