import { Home, Receipt, Users, PieChart, CreditCard, Wallet, Settings, HelpCircle, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  onClose?: () => void;
}

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Receipt, label: "Statements", path: "/transactions" },
  { icon: Users, label: "Accounts", path: "/accounts" },
  { icon: PieChart, label: "Investments", path: "/investments" },
  // { icon: CreditCard, label: "Credit Cards", path: "/credit-cards" },
  { icon: Wallet, label: "Loans", path: "/loans" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();

  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 z-50">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          {/* <img 
            src="/bank_logo.png"
            alt="Bank Logo"
            className="w-100 h-100 object-contain"
            onClick={handleClick}
          /> */}
          <span className="text-xl font-bold ml-5" style={{ fontFamily: 'sans-serif',color: '#1d1e9c',fontSize: '24px',fontWeight:"700" }}>BankDash</span>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "text-[#1814F3] font-medium"
                    : "text-gray-500 hover:bg-gray-100 hover:text-[#1814F3]"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          
          {/* Logout Button */}
          <button
            onClick={() => {
              handleClick();
              logout();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-red-500 hover:bg-red-50 hover:text-red-600 mt-8"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};