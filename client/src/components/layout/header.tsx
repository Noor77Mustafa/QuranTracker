import { useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [location, navigate] = useLocation();

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
      {/* Skip to content link for keyboard users */}
      <a href="#main-content" className="skip-to-content focus-visible">
        Skip to content
      </a>
      
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="mr-3 lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible" 
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-rounded" aria-hidden="true">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
          <Link href="/" className="flex items-center cursor-pointer focus-visible">
            <h1 className="text-xl font-semibold text-primary">MyQuran</h1>
            <span className="text-xs bg-primary text-white px-1 rounded ml-1" aria-hidden="true">3.0</span>
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible" 
            aria-label="Search"
            aria-expanded={isSearchExpanded}
            aria-controls="search-bar"
            onClick={toggleSearch}
          >
            <span className="material-symbols-rounded" aria-hidden="true">search</span>
          </button>
          <ThemeToggle />
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible" 
            aria-label="Settings"
            onClick={handleSettingsClick}
          >
            <span className="material-symbols-rounded" aria-hidden="true">settings</span>
          </button>
          <button 
            className="hidden md:block bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors focus-visible"
            onClick={handleSignInClick}
          >
            Sign In
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
        className={`lg:hidden border-t border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="py-3 px-4">
          <ul className="space-y-3" role="menu">
            <li role="menuitem">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible">
                <span className="flex items-center">
                  <span className="material-symbols-rounded mr-3" aria-hidden="true">home</span>
                  Home
                </span>
              </Link>
            </li>
            <li role="menuitem">
              <Link href="/read" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible">
                <span className="flex items-center">
                  <span className="material-symbols-rounded mr-3" aria-hidden="true">auto_stories</span>
                  Read Quran
                </span>
              </Link>
            </li>
            <li role="menuitem">
              <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible">
                <span className="flex items-center">
                  <span className="material-symbols-rounded mr-3" aria-hidden="true">person</span>
                  Profile
                </span>
              </Link>
            </li>
            <li role="menuitem">
              <Link href="/learn" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible">
                <span className="flex items-center">
                  <span className="material-symbols-rounded mr-3" aria-hidden="true">school</span>
                  Learn
                </span>
              </Link>
            </li>
            <li role="menuitem" className="md:hidden">
              <button 
                onClick={handleSignInClick} 
                className="w-full text-left block py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible"
              >
                <span className="flex items-center">
                  <span className="material-symbols-rounded mr-3" aria-hidden="true">login</span>
                  Sign In
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Search Bar */}
      <div 
        id="search-bar"
        className={`border-t border-gray-100 dark:border-gray-800 px-4 py-2 transition-all duration-300 ease-in-out overflow-hidden ${
          isSearchExpanded ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isSearchExpanded}
      >
        <div className="relative">
          <label htmlFor="quran-search" className="sr-only">Search the Quran</label>
          <input 
            ref={searchInputRef}
            id="quran-search"
            type="text" 
            placeholder="Search the Quran..." 
            className="w-full py-2 pl-10 pr-10 bg-gray-100 dark:bg-gray-800 rounded-full text-sm focus-visible"
            aria-label="Search the Quran"
          />
          <span className="material-symbols-rounded absolute left-3 top-2 text-gray-400" aria-hidden="true">search</span>
          <button 
            className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors focus-visible"
            aria-label="Voice search"
            onClick={() => {
              // Handle voice search
              if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                alert('Voice search would be activated here');
              } else {
                alert('Voice recognition is not supported in this browser');
              }
            }}
          >
            <span className="material-symbols-rounded" aria-hidden="true">mic</span>
          </button>
        </div>
      </div>
    </header>
  );
}
