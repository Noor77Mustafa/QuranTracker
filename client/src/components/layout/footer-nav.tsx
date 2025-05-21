import { Link, useLocation } from "wouter";

export default function FooterNav() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-40 md:hidden">
      <div className="flex justify-around">
        <Link href="/" className={`nav-item ${isActive("/") ? "nav-item-active" : "nav-item-inactive"}`}>
          <span className="material-symbols-rounded">home</span>
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/read" className={`nav-item ${isActive("/read") ? "nav-item-active" : "nav-item-inactive"}`}>
          <span className="material-symbols-rounded">auto_stories</span>
          <span className="text-xs mt-1">Read</span>
        </Link>
        <Link href="/learn" className={`nav-item ${isActive("/learn") ? "nav-item-active" : "nav-item-inactive"}`}>
          <span className="material-symbols-rounded">school</span>
          <span className="text-xs mt-1">Learn</span>
        </Link>
        <Link href="/explore" className={`nav-item ${isActive("/explore") ? "nav-item-active" : "nav-item-inactive"}`}>
          <span className="material-symbols-rounded">explore</span>
          <span className="text-xs mt-1">Explore</span>
        </Link>
        <Link href="/profile" className={`nav-item ${isActive("/profile") ? "nav-item-active" : "nav-item-inactive"}`}>
          <span className="material-symbols-rounded">person</span>
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
