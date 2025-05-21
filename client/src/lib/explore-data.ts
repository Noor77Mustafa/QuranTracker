export interface ExploreCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const exploreCategories: ExploreCategory[] = [
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