import React, { useState } from 'react';
import { Menu, X, LogOut, Globe, User, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'Agencies', href: '/agencies' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          
          {/* Logo & Desktop Nav Links */}
          <div className="flex items-center gap-8">
            <span className="text-xl font-black tracking-tight text-blue-600 cursor-pointer">
              FUNTUSH
            </span>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* User Profile Dropdown Menu (Desktop) */}
          <div className="hidden md:flex items-center gap-4 relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-center h-9 w-9 rounded-full bg-blue-100 text-blue-700 font-bold text-sm border border-blue-200 focus:outline-none hover:bg-blue-200 transition-colors"
            >
              SC
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-11 w-48 rounded-md border border-neutral-200 bg-white py-1 shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-100">
                <button 
                  onClick={() => console.log('Profile Settings clicked')}
                  className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                >
                  <User className="h-4 w-4 text-neutral-400" /> Profile Settings
                </button>
                <button 
                  onClick={() => console.log('Logs clicked')}
                  className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                >
                  <Shield className="h-4 w-4 text-neutral-400" /> System Logs
                </button>
                <div className="border-t border-neutral-100 my-1"></div>
                <button 
                  onClick={() => console.log('Logout clicked')}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Collapse Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-inner">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-neutral-50"
            >
              {link.label}
            </a>
          ))}
          <div className="border-t border-neutral-100 pt-4 mt-4 flex items-center gap-3 px-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-700 font-bold border border-blue-200">
              SC
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-800">Sandesh Chaudhary</p>
              <button 
                onClick={() => console.log('Logout clicked')}
                className="text-xs text-red-600 font-medium flex items-center gap-1 mt-0.5"
              >
                <LogOut className="h-3 w-3" /> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};