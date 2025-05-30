
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  HelpCircle,
  UserCog,
  ChevronDown,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  active: boolean;
  hasSubmenu?: boolean;
  submenuItems?: { text: string; to: string }[];
}

const SidebarItem = ({ icon, text, to, active, hasSubmenu = false, submenuItems = [] }: SidebarItemProps) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = (e: React.MouseEvent) => {
    if (hasSubmenu) {
      e.preventDefault();
      setIsSubmenuOpen(!isSubmenuOpen);
    }
  };

  return (
    <div className="w-full">
      <Link 
        to={hasSubmenu ? '#' : to} 
        className={cn(
          "sidebar-item", 
          active && !hasSubmenu && "active"
        )}
        onClick={toggleSubmenu}
      >
        <div className="sidebar-item-icon">{icon}</div>
        <span className="flex-1">{text}</span>
        {hasSubmenu && (
          isSubmenuOpen ? 
            <ChevronDown className="w-4 h-4" /> : 
            <ChevronRight className="w-4 h-4" />
        )}
      </Link>
      
      {hasSubmenu && isSubmenuOpen && (
        <div className="ml-9 mt-1 space-y-1">
          {submenuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.to} 
              className="sidebar-item py-2 text-sm"
            >
              {item.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  
  const inventorySubmenu = [
    { text: 'All Items', to: '/inventory' }
  ];

  return (
    <aside className={cn(
      "h-screen bg-sidebar fixed left-0 top-0 bottom-0 transition-all duration-300 z-30",
      collapsed ? "w-[70px]" : "w-[240px]"
    )}>
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="px-4 py-5 flex items-center justify-center">
          <img 
            src="/logo/StockView.png" 
            alt="StockView Logo" 
            className="h-8"
          />
        </div>
        
        {/* Navigation */}
        <div className="flex-grow px-2 py-4 flex flex-col space-y-1 overflow-y-auto">
          <SidebarItem
            icon={<LayoutDashboard className="sidebar-item-icon" />}
            text="Dashboard"
            to="/dashboard"
            active={location.pathname === '/dashboard'}
          />
          
          <SidebarItem
            icon={<Package className="sidebar-item-icon" />}
            text="Inventory"
            to="/inventory"
            active={location.pathname.includes('/inventory')}
            hasSubmenu={true}
            submenuItems={inventorySubmenu}
          />
          
          <SidebarItem
            icon={<Users className="sidebar-item-icon" />}
            text="Vendors"
            to="/vendors"
            active={location.pathname === '/vendors'}
          />
          
          <SidebarItem
            icon={<UserCog className="sidebar-item-icon" />}
            text="Manage Roles"
            to="/roles"
            active={location.pathname === '/roles'}
          />
        </div>
        
        {/* Bottom links */}
        <div className="px-2 py-4 space-y-1">
          <SidebarItem
            icon={<HelpCircle className="sidebar-item-icon" />}
            text="Support"
            to="/support"
            active={location.pathname === '/support'}
          />
          
          <SidebarItem
            icon={<Settings className="sidebar-item-icon" />}
            text="Settings"
            to="/settings"
            active={location.pathname === '/settings'}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
