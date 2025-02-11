import React, { useState } from 'react';
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export const Layout = ({ children, title }: LayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Show sidebar based on state */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      <div className="md:ml-64">
        <Header title={title} onMenuClick={toggleSidebar} />
        {children}
      </div>
    </div>
  );
}; 