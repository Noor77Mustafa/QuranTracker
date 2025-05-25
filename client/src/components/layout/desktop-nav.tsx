import { useLocation, Link } from "wouter";

export default function DesktopNav() {
  const [location] = useLocation();
  
  const isActive = (path: string) => {
    // Check if current location matches the path
    // For exact matches
    if (path === "/" && location === "/") return true;
    // For section matches (e.g. /read, /read/123)
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };
  
  const navItems = [
    { path: "/", label: "Home", icon: "home" },
    { path: "/read", label: "Quran", icon: "auto_stories" },
    { path: "/hadiths", label: "Hadiths", icon: "history_edu" },
    { path: "/duas", label: "Duas", icon: "volunteer_activism" },
    { path: "/learn", label: "Learn", icon: "school" },
    { path: "/explore", label: "Explore", icon: "explore" },
  ];
  
  return (
    <nav className="hidden lg:block border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto">
        <ul className="flex">
          {navItems.map(item => {
            const active = isActive(item.path);
            return (
              <li key={item.path}>
                <Link 
                  href={item.path}
                  className={`block px-5 py-3 relative ${
                    active 
                      ? "text-primary font-medium" 
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  } transition-colors focus-visible`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="flex items-center justify-center">
                    <span className="material-symbols-rounded mr-2" aria-hidden="true">
                      {item.icon}
                    </span>
                    {item.label}
                  </span>
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" aria-hidden="true" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}