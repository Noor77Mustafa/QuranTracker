import { Link } from "wouter";

export default function StartReadingCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold">Start Reading</h2>
        <Link href="/profile" className="text-primary text-sm font-medium flex items-center">
          <span>My Quran</span>
          <span className="material-symbols-rounded text-sm ml-1">chevron_right</span>
        </Link>
      </div>
      <div className="p-4 flex flex-col items-center">
        <div className="text-center mb-4">
          <p className="arabic-text text-5xl mb-2 leading-tight">الفَاتِحَة</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">1. Al-Fatihah (The Opener)</p>
        </div>
        <Link href="/surah/1" className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition">
          Begin
        </Link>
      </div>
    </div>
  );
}
