import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PenSquare, LayoutDashboard } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <PenSquare className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Blog Editor</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/dashboard'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 mr-1" />
              Dashboard
            </Link>
            <Link
              to="/editor"
              className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <PenSquare className="w-5 h-5 mr-1" />
              New Post
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;