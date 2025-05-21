import { Link } from "wouter";

export default function QuickNav() {
  const linkStyle = "flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full whitespace-nowrap";

  return (
    <div className="flex overflow-x-auto gap-2 py-2 no-scrollbar mb-6">
      <Link href="/read" className={linkStyle}>
        <span className="material-symbols-rounded mr-1">menu_book</span>
        <span>Navigate Quran</span>
      </Link>
      <Link href="/explore" className={linkStyle}>
        <span className="material-symbols-rounded mr-1">star</span>
        <span>Popular</span>
      </Link>
      <Link href="/learn" className={linkStyle}>
        <span className="material-symbols-rounded mr-1">trending_up</span>
        <span>Learning Plans</span>
      </Link>
      <a href="https://quranreflect.com/" target="_blank" rel="noopener noreferrer" className={linkStyle}>
        <span className="material-symbols-rounded mr-1">people</span>
        <span>Community</span>
      </a>
    </div>
  );
}
