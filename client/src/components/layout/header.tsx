import { useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/components/ui/theme-provider";

export default function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [location, navigate] = useLocation();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    // Focus the search input when expanded
    if (!isSearchExpanded && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  const handleSettingsClick = () => {
    navigate("/profile");
    setIsMobileMenuOpen(false);
  };

  const handleSignInClick = () => {
    // Navigate to sign in page
    navigate("/profile");
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="mr-3 lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" 
            aria-label="Open menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-rounded">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
          <Link href="/" className="flex items-center cursor-pointer">
            <h1 className="text-xl font-semibold text-primary">MyQuran</h1>
            <span className="text-xs bg-primary text-white px-1 rounded ml-1">3.0</span>
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
            aria-label="Search"
            onClick={toggleSearch}
          >
            <span className="material-symbols-rounded">search</span>
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <span className="material-symbols-rounded">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
            aria-label="Settings"
            onClick={handleSettingsClick}
          >
            <span className="material-symbols-rounded">settings</span>
          </button>
          <button 
            className="hidden md:block bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
            onClick={handleSignInClick}
          >
            Sign In
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`lg:hidden border-t border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="py-3 px-4">
          <ul className="space-y-3">
            <li>
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <span className="flex items-center">
                  <span className="material-symbols-rounded mr-3">home</span>
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link href="/read" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <span className="flex items-center">
                  <span className="material-symbols-rounded mr-3">auto_stories</span>
                  Read Quran
                </span>
              </Link>
            </li>
            <li>
              <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <span className="flex items-center">
                  <span className="material-symbols-rounded mr-3">person</span>
                  Profile
                </span>
              </Link>
            </li>
            <li>
              <Link href="/learn" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <span className="flex items-center">
                  <span className="material-symbols-rounded mr-3">school</span>
                  Learn
                </span>
              </Link>
            </li>
            <li className="md:hidden">
              <button 
                onClick={handleSignInClick} 
                className="w-full text-left block py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="flex items-center">
                  <span className="material-symbols-rounded mr-3">login</span>
                  Sign In
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Search Bar */}
      <div className={`border-t border-gray-100 dark:border-gray-800 px-4 py-2 transition-all duration-300 ease-in-out overflow-hidden ${
        isSearchExpanded ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="relative">
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="Search the Quran..." 
            className="w-full py-2 pl-10 pr-10 bg-gray-100 dark:bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="material-symbols-rounded absolute left-3 top-2 text-gray-400">search</span>
          <button 
            className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            onClick={() => {
              // Handle voice search
              if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                alert('Voice search would be activated here');
              } else {
                alert('Voice recognition is not supported in this browser');
              }
            }}
          >
            <span className="material-symbols-rounded">mic</span>
          </button>
        </div>
      </div>
    </header>
  );
}
