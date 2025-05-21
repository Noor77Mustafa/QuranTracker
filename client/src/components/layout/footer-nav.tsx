import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

export default function FooterNav() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-40 md:hidden shadow-lg"
      aria-label="Mobile navigation"
    >
      <div className="flex justify-around">
        {[
          { path: "/", icon: "home", label: "Home" },
          { path: "/read", icon: "auto_stories", label: "Read" },
          { path: "/learn", icon: "school", label: "Learn" },
          { path: "/explore", icon: "explore", label: "Explore" },
          { path: "/bookmarks", icon: "bookmark", label: "Bookmarks" },
          { path: "/profile", icon: "person", label: "Profile" }
        ].map(item => {
          const active = isActive(item.path);
          return (
            <Link 
              key={item.path}
              href={item.path} 
              className={`nav-item ${active ? "nav-item-active" : "nav-item-inactive"} focus-visible`}
              aria-current={active ? "page" : undefined}
              aria-label={`${item.label} ${active ? '(current page)' : ''}`}
            >
              <motion.span 
                className="material-symbols-rounded"
                initial={{ scale: 1 }}
                animate={{ scale: active ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                {item.icon}
              </motion.span>
              <span className="text-xs mt-1">{item.label}</span>
              {active && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-[1px] left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-t-md"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
