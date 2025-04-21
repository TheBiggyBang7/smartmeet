
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { AvatarStatus } from "@/components/ui/avatar-status";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-primary">
            ConnectConverse
          </Link>
          
          {isAuthenticated && (
            <nav className="ml-8 hidden md:flex space-x-4">
              <NavLink to="/dashboard" active={location.pathname === "/dashboard"}>
                Dashboard
              </NavLink>
              <NavLink to="/users" active={location.pathname === "/users"}>
                Users
              </NavLink>
              <NavLink to="/conferences" active={location.pathname === "/conferences"}>
                Conferences
              </NavLink>
            </nav>
          )}
        </div>
        
        <div>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <AvatarStatus
                  src={user?.avatar || ""}
                  alt={user?.name || ""}
                  fallback={user?.name?.charAt(0) || ""}
                  status="online"
                  size="sm"
                />
                <span className="font-medium">{user?.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

function NavLink({ to, active, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`py-2 px-1 border-b-2 ${
        active 
          ? "border-primary text-primary font-medium" 
          : "border-transparent hover:border-gray-300"
      }`}
    >
      {children}
    </Link>
  );
}
