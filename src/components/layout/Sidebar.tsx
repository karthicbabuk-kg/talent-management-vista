
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Clock, 
  Calendar, 
  FileText, 
  BarChart, 
  Settings, 
  Folder
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  // Navigation items
  const navItems = [
    { title: 'Dashboard', path: '/dashboard', icon: Home },
    { title: 'Employees', path: '/employees', icon: Users },
    { title: 'Organization', path: '/organization', icon: Folder },
    { title: 'Attendance', path: '/attendance', icon: Clock },
    { title: 'Leave', path: '/leave', icon: Calendar },
    { title: 'Documents', path: '/documents', icon: FileText },
    { title: 'Reports', path: '/reports', icon: BarChart },
    { title: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside 
      className={`bg-sidebar text-sidebar-foreground h-screen ${
        isOpen ? 'w-64' : 'w-16'
      } transition-all duration-300 flex-shrink-0 fixed md:relative z-30 border-r border-sidebar-border`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-sidebar-border">
        <h1 className={`font-bold text-xl transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          HR Portal
        </h1>
        <span className={`text-2xl font-bold transition-all duration-300 ${isOpen ? 'hidden' : 'block'}`}>
          HR
        </span>
      </div>

      {/* Navigation */}
      <nav className="py-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="mb-1 px-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center h-10 px-3 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span className={`ml-3 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                  {item.title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
