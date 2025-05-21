import { useEffect } from "react";
import { Link } from "wouter";

const exploreCategories = [
  {
    id: "about-quran",
    title: "About The Quran",
    description: "Learn about the history, compilation, and significance of the Quran",
    icon: "menu_book",
  },
  {
    id: "verses-sunnah",
    title: "Verses about the Sunnah",
    description: "Explore Quranic verses that highlight the importance of the Sunnah",
    icon: "history_edu",
  },
  {
    id: "what-is-ramadan",
    title: "What is Ramadan?",
    description: "Understand the significance, practices, and blessings of the holy month",
    icon: "nightlight",
  },
  {
    id: "quran-in-year",
    title: "Quran in a Year",
    description: "A structured plan to complete the Quran over the course of a year",
    icon: "calendar_month",
  },
  {
    id: "tafsir",
    title: "Tafsir Collections",
    description: "Explanations and interpretations of the Quran by scholars",
    icon: "psychology",
  },
  {
    id: "themes",
    title: "Quranic Themes",
    description: "Explore major themes and concepts in the Quran",
    icon: "category",
  },
];

export default function Explore() {
  // Set page title
  useEffect(() => {
    document.title = "Explore - MyQuran";
  }, []);
  
  return (
    <main className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-semibold mb-6">Explore</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exploreCategories.map((category) => (
          <Link key={category.id} href={`/explore/${category.id}`}>
            <a className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition">
              <div className="mb-4 bg-primary/10 dark:bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center">
                <span className="material-symbols-rounded text-primary">{category.icon}</span>
              </div>
              <h2 className="text-lg font-semibold mb-2">{category.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{category.description}</p>
            </a>
          </Link>
        ))}
      </div>
      
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Today's Featured Verse</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <p className="font-amiri text-xl md:text-2xl leading-relaxed text-right mb-4">
            وَإِذَا قُرِئَ الْقُرْآنُ فَاسْتَمِعُوا لَهُ وَأَنصِتُوا لَعَلَّكُمْ تُرْحَمُونَ
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            So when the Qur'an is recited, then listen to it and be silent that you may receive mercy.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Surah Al-A'raf [7:204]</p>
        </div>
      </div>
    </main>
  );
}
