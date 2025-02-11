import React, { useState } from 'react';
import { Search, Menu, X, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  title?: string;
  className?: string;
  onMenuClick?: () => void;
}

export const Header = ({ title, className, onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <header className={`bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6 relative ${className || ''}`}>
      {/* Left side - Title */}
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6 text-gray-500" />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="absolute inset-0 bg-white px-4 flex items-center md:hidden">
          <input
            type="text"
            placeholder="Search for something..."
            className="flex-1 bg-gray-50 px-4 py-2 rounded-lg outline-none"
          />
          <button 
            className="ml-2 text-gray-500"
            onClick={() => setIsSearchOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Desktop Right Side */}
      <div className="hidden md:flex items-center gap-4">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search for something..."
          className="bg-gray-50 px-4 py-2 rounded-lg outline-none"
        />
        <Settings 
          className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" 
          onClick={handleSettingsClick}
        />
        <div className="w-4"></div>
        <LogOut 
          className="w-5 h-5 text-gray-500 cursor-pointer hover:text-red-600" 
          onClick={logout}
        />
      </div>

      {/* Mobile Right Side */}
      <div className="flex md:hidden items-center gap-3">
        <button onClick={() => setIsSearchOpen(true)}>
          <Search className="w-5 h-5 text-gray-500" />
        </button>
        <Settings 
          className="w-5 h-5 text-gray-500 cursor-pointer" 
          onClick={handleSettingsClick}
        />
        <div className="w-3"></div>
        <LogOut 
          className="w-5 h-5 text-gray-500 cursor-pointer" 
          onClick={logout}
        />
      </div>
    </header>
  );
}; 