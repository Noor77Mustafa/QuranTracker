import { Link } from "wouter";

const topics = [
  {
    id: 'about-quran',
    title: 'About The Quran',
    path: '/explore/about-quran',
  },
  {
    id: 'verses-sunnah',
    title: 'Verses about the Sunnah',
    path: '/explore/verses-sunnah',
  },
  {
    id: 'what-is-ramadan',
    title: 'What is Ramadan?',
    path: '/explore/what-is-ramadan',
  },
];

export default function ExploreTopics() {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Explore Topics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {topics.map((topic) => (
          <Link key={topic.id} href={topic.path}>
            <a className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition">
              <h3 className="font-medium">{topic.title}</h3>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
