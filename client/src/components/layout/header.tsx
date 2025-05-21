import { useState } from "react";
import { Link } from "wouter";
import { useTheme } from "@/components/ui/theme-provider";

export default function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button className="mr-3 lg:hidden" aria-label="Open menu">
            <span className="material-symbols-rounded">menu</span>
          </button>
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <h1 className="text-xl font-semibold text-primary">MyQuran</h1>
              <span className="text-xs bg-accent text-white px-1 rounded ml-1">3.0</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" 
            aria-label="Search"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          >
            <span className="material-symbols-rounded">search</span>
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" 
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <span className="material-symbols-rounded">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" 
            aria-label="Settings"
          >
            <span className="material-symbols-rounded">settings</span>
          </button>
          <button className="hidden md:block bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90">
            Sign In
          </button>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-2">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search the Quran..." 
            className="w-full py-2 pl-10 pr-10 bg-gray-100 dark:bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="material-symbols-rounded absolute left-3 top-2 text-gray-400">search</span>
          <span className="material-symbols-rounded absolute right-3 top-2 text-gray-400">mic</span>
        </div>
      </div>
    </header>
  );
}
