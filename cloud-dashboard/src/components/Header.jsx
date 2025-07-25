import React from 'react';
import { Cloud } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Cloud className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Cloud Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
             
            </div>
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;