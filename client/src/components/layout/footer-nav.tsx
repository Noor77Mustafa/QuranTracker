import { Link, useLocation } from "wouter";

export default function FooterNav() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-40 md:hidden">
      <div className="flex justify-around">
        <Link href="/">
          <a className={`nav-item ${isActive("/") ? "nav-item-active" : "nav-item-inactive"}`}>
            <span className="material-symbols-rounded">home</span>
            <span className="text-xs mt-1">Home</span>
          </a>
        </Link>
        <Link href="/read">
          <a className={`nav-item ${isActive("/read") ? "nav-item-active" : "nav-item-inactive"}`}>
            <span className="material-symbols-rounded">auto_stories</span>
            <span className="text-xs mt-1">Read</span>
          </a>
        </Link>
        <Link href="/learn">
          <a className={`nav-item ${isActive("/learn") ? "nav-item-active" : "nav-item-inactive"}`}>
            <span className="material-symbols-rounded">school</span>
            <span className="text-xs mt-1">Learn</span>
          </a>
        </Link>
        <Link href="/explore">
          <a className={`nav-item ${isActive("/explore") ? "nav-item-active" : "nav-item-inactive"}`}>
            <span className="material-symbols-rounded">explore</span>
            <span className="text-xs mt-1">Explore</span>
          </a>
        </Link>
        <Link href="/profile">
          <a className={`nav-item ${isActive("/profile") ? "nav-item-active" : "nav-item-inactive"}`}>
            <span className="material-symbols-rounded">person</span>
            <span className="text-xs mt-1">Profile</span>
          </a>
        </Link>
      </div>
    </nav>
  );
}
