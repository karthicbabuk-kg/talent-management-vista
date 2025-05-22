
import React, { useState } from 'react';
import { Bell, Menu, Settings, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  // Mock notification count
  const notificationCount = 3;
  
  // Mock user data
  const user = {
    name: 'John Doe',
    role: 'HR Admin',
    avatar: 'JD'
  };

  return (
    <header className="h-16 bg-background border-b flex items-center justify-between px-4 sticky top-0 z-20">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onMenuClick} 
          className="mr-4"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-medium hidden sm:block">HR Management Portal</h2>
      </div>
      
      <div className="flex items-center space-x-2">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between p-4">
              <h3 className="font-medium">Notifications</h3>
              <Button variant="ghost" size="sm">Mark all as read</Button>
            </div>
            <DropdownMenuSeparator />
            <div className="py-2 px-4 text-sm text-muted-foreground">
              <div className="py-2 border-b">
                <p className="font-medium text-foreground">Leave Request Approved</p>
                <p className="text-xs">Your leave request has been approved by the HR manager</p>
                <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
              </div>
              <div className="py-2 border-b">
                <p className="font-medium text-foreground">New Employee Joined</p>
                <p className="text-xs">Sarah Johnson has joined the Engineering department</p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
              <div className="py-2">
                <p className="font-medium text-foreground">Document Approval</p>
                <p className="text-xs">You have a pending document approval request</p>
                <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Link to="/notifications" className="w-full">
                <Button variant="outline" className="w-full">View All</Button>
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Settings */}
        <Button variant="ghost" size="icon" asChild>
          <Link to="/settings">
            <Settings className="h-5 w-5" />
          </Link>
        </Button>
        
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="overflow-hidden rounded-full">
              <Avatar>
                <AvatarFallback>{user.avatar}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex flex-col p-4">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/login" className="cursor-pointer text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopBar;
