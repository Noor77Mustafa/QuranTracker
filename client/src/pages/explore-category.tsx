import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { exploreCategories } from "@/lib/explore-data";

interface Section {
  title: string;
  content: string;
}

interface CategoryContent {
  title: string;
  sections: Section[];
  relatedSurahs: number[];
  customContent?: string;
}

// Simplified surah names for related surahs
const surahNames = [
  "Al-Fatihah", "Al-Baqarah", "Ali 'Imran", "An-Nisa", "Al-Ma'idah", 
  "Al-An'am", "Al-A'raf", "Al-Anfal", "At-Tawbah", "Yunus", 
  "Hud", "Yusuf", "Ar-Ra'd", "Ibrahim", "Al-Hijr", 
  "An-Nahl", "Al-Isra", "Al-Kahf", "Maryam", "Ta-Ha", 
  "Al-Anbiya", "Al-Hajj", "Al-Mu'minun", "An-Nur", "Al-Furqan", 
  "Ash-Shu'ara", "An-Naml", "Al-Qasas", "Al-'Ankabut", "Ar-Rum",
  "Luqman", "As-Sajdah", "Al-Ahzab", "Saba", "Fatir", 
  "Ya-Sin", "As-Saffat", "Sad", "Az-Zumar", "Ghafir", 
  "Fussilat", "Ash-Shuraa", "Az-Zukhruf", "Ad-Dukhan", "Al-Jathiyah",
  "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf", 
  "Adh-Dhariyat", "At-Tur", "An-Najm", "Al-Qamar", "Ar-Rahman", 
  "Al-Waqi'ah", "Al-Hadid", "Al-Mujadilah", "Al-Hashr", "Al-Mumtahanah", 
  "As-Saff", "Al-Jumu'ah", "Al-Munafiqun", "At-Taghabun", "At-Talaq", 
  "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haqqah", "Al-Ma'arij", 
  "Nuh", "Al-Jinn", "Al-Muzzammil", "Al-Muddaththir", "Al-Qiyamah", 
  "Al-Insan", "Al-Mursalat", "An-Naba", "An-Nazi'at", "'Abasa", 
  "At-Takwir", "Al-Infitar", "Al-Mutaffifin", "Al-Inshiqaq", "Al-Buruj", 
  "At-Tariq", "Al-A'la", "Al-Ghashiyah", "Al-Fajr", "Al-Balad", 
  "Ash-Shams", "Al-Layl", "Ad-Duha", "Ash-Sharh", "At-Tin", 
  "Al-'Alaq", "Al-Qadr", "Al-Bayyinah", "Az-Zalzalah", "Al-'Adiyat", 
  "Al-Qari'ah", "At-Takathur", "Al-'Asr", "Al-Humazah", "Al-Fil", 
  "Quraysh", "Al-Ma'un", "Al-Kawthar", "Al-Kafirun", "An-Nasr", 
  "Al-Masad", "Al-Ikhlas", "Al-Falaq", "An-Nas"
];

export default function ExploreCategory() {
  const [, params] = useRoute("/explore/:id");
  const categoryId = params?.id || "";
  const [loading, setLoading] = useState(true);

  // Content for each category
  const categoryContent: Record<string, CategoryContent> = {
    "about-quran": {
      title: "About The Quran",
      sections: [
        {
          title: "What is the Quran?",
          content: "The Quran is the central religious text of Islam, believed by Muslims to be a revelation from God (Allah). It is widely regarded as the finest work in classical Arabic literature. The Quran is divided into chapters (surah) and verses (ayah)."
        },
        {
          title: "Revelation",
          content: "Muslims believe that the Quran was verbally revealed by God to the final prophet, Muhammad, through the archangel Gabriel, gradually over a period of approximately 23 years, beginning on 22 December 609 CE, when Muhammad was 40, and concluding in 632, the year of his death."
        },
        {
          title: "Compilation",
          content: "Shortly after Muhammad's death, the Quran was compiled into a single book by order of the first Caliph Abu Bakr and at the suggestion of his future successor Umar. The codex prepared by Zayd ibn Thabit was used as the foundation of the authoritative text of the Quran that Uthman ibn Affan had disseminated in the Muslim world."
        }
      ],
      relatedSurahs: [1, 96, 2]
    },
    "verses-sunnah": {
      title: "Verses about the Sunnah",
      sections: [
        {
          title: "Importance of Following the Prophet",
          content: "The Quran emphasizes the importance of following the Prophet Muhammad's example (Sunnah) in numerous verses. Muslims are instructed to obey the Prophet alongside obeying Allah."
        },
        {
          title: "Key Verses",
          content: "Surah Al-Hashr (59:7): 'And whatever the Messenger has given you - take; and what he has forbidden you - refrain from.' Surah An-Nisa (4:80): 'He who obeys the Messenger has obeyed Allah.'"
        }
      ],
      relatedSurahs: [4, 59, 33]
    },
    "what-is-ramadan": {
      title: "What is Ramadan?",
      sections: [
        {
          title: "The Month of Fasting",
          content: "Ramadan is the ninth month of the Islamic calendar and is observed by Muslims worldwide as a month of fasting (sawm), prayer, reflection and community."
        },
        {
          title: "Revelation of the Quran",
          content: "Ramadan is commemorated as the month during which the Quran was first revealed to the Prophet Muhammad. The night of this revelation, Laylat al-Qadr (Night of Power), is considered one of the most sacred nights of the year."
        },
        {
          title: "Quranic Verses about Ramadan",
          content: "Surah Al-Baqarah (2:185): 'The month of Ramadan is that in which was revealed the Quran, a guidance for the people and clear proofs of guidance and criterion.'"
        }
      ],
      relatedSurahs: [2, 97, 44]
    },
    "quran-in-year": {
      title: "Quran in a Year",
      sections: [
        {
          title: "Reading Plan",
          content: "Reading the entire Quran in a year requires consistency and dedication. By reading approximately 3-4 pages daily, you can complete the Quran in a year."
        },
        {
          title: "Benefits",
          content: "This structured approach allows for deeper understanding and reflection on each passage, rather than rushing through to completion."
        },
        {
          title: "Monthly Breakdown",
          content: "The Quran has 30 juz (parts). Reading one juz per month allows you to complete the Quran in a systematic way over the course of a year."
        }
      ],
      relatedSurahs: [73, 20, 18],
      customContent: "calendar"
    },
    "tafsir": {
      title: "Tafsir Collections",
      sections: [
        {
          title: "What is Tafsir?",
          content: "Tafsir refers to exegesis or interpretation of the Quran. It aims to provide commentary and explanation of the meanings of Quranic verses."
        },
        {
          title: "Famous Tafsir Works",
          content: "Some renowned tafsir works include Tafsir Ibn Kathir, Tafsir al-Tabari, and Tafsir al-Qurtubi. These scholarly works have helped generations of Muslims understand the deeper meanings of the Quran."
        }
      ],
      relatedSurahs: [3, 12, 18]
    },
    "themes": {
      title: "Quranic Themes",
      sections: [
        {
          title: "Major Themes",
          content: "The Quran addresses numerous themes including monotheism (Tawhid), prophethood, the hereafter, morality, social justice, and spiritual development."
        },
        {
          title: "Stories in the Quran",
          content: "The Quran contains narratives of previous prophets and nations, which serve as moral lessons and guidance for humanity."
        },
        {
          title: "Ethical Teachings",
          content: "The Quran places great emphasis on ethics and moral values, including honesty, patience, kindness, charity, and forgiveness."
        }
      ],
      relatedSurahs: [12, 21, 55]
    }
  };

  // Find the category from the data
  const category = exploreCategories.find(c => c.id === categoryId);
  const content = categoryContent[categoryId as keyof typeof categoryContent];

  useEffect(() => {
    if (category) {
      document.title = `${category.title} - MyQuran Explore`;
      setLoading(false);
    } else {
      document.title = "Category Not Found - MyQuran";
      setLoading(false);
    }
  }, [category, categoryId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading content...</p>
      </div>
    );
  }

  if (!category || !content) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Category Not Found</h2>
          <p>The category you're looking for doesn't exist or has been moved.</p>
          <Link href="/explore">
            <Button variant="outline" className="mt-4">
              Back to Explore
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-4 animate-fadeIn">
      <div className="flex items-center mb-6">
        <Link href="/explore" className="mr-2">
          <Button variant="ghost" size="sm" className="flex items-center">
            <span className="material-symbols-rounded mr-1">arrow_back</span>
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold">{category.title}</h1>
      </div>

      {/* Category icon and description */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-start">
          <div className="mr-4 bg-primary/10 dark:bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center">
            <span className="material-symbols-rounded text-primary text-3xl">{category.icon}</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">{content.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Content sections */}
      {content.sections.map((section, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
          <p className="text-gray-700 dark:text-gray-300">{section.content}</p>
        </div>
      ))}
      
      {/* Custom content for Calendar view */}
      {content.customContent === 'calendar' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Yearly Reading Calendar</h3>
          
          {/* Calendar Progress Overview */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</span>
              <span className="text-sm font-medium">Day {Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24)) + 1} of 365</span>
            </div>
            <Progress value={(Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24)) + 1) / 365 * 100} className="h-2" />
          </div>
          
          {/* Monthly Juz Plan */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {Array.from({ length: 12 }, (_, i) => {
              const month = new Date(new Date().getFullYear(), i, 1);
              const monthName = month.toLocaleString('default', { month: 'short' });
              const currentMonth = new Date().getMonth();
              const isPast = i < currentMonth;
              const isCurrent = i === currentMonth;
              const juzStart = Math.floor(i * 2.5) + 1;
              const juzEnd = Math.min(Math.floor((i + 1) * 2.5), 30);
              
              return (
                <div 
                  key={i}
                  className={`
                    border rounded-lg p-3 text-center transition
                    ${isPast ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600' : ''}
                    ${isCurrent ? 'bg-primary/10 dark:bg-primary/20 border-primary' : 'border-gray-200 dark:border-gray-600'}
                    ${!isPast && !isCurrent ? 'hover:bg-gray-50 dark:hover:bg-gray-700' : ''}
                  `}
                >
                  <div className="font-medium text-sm">{monthName}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Juz {juzStart}{juzEnd > juzStart ? `-${juzEnd}` : ''}
                  </div>
                  {isPast && (
                    <span className="material-symbols-rounded text-green-500 text-sm mt-1">check_circle</span>
                  )}
                  {isCurrent && (
                    <span className="material-symbols-rounded text-primary text-sm mt-1 animate-pulse">radio_button_checked</span>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Today's Reading */}
          <div className="mt-6 bg-primary/5 dark:bg-primary/10 rounded-lg p-4">
            <h4 className="font-medium mb-2 flex items-center">
              <span className="material-symbols-rounded mr-2 text-primary">today</span>
              Today's Reading Goal
            </h4>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <p>Read approximately 2 pages (or ½ juz per month)</p>
              <p className="mt-1">Current Juz: {Math.min(Math.floor(new Date().getMonth() * 2.5) + 1, 30)}</p>
            </div>
            <Link href="/read">
              <Button className="w-full mt-3">Start Reading</Button>
            </Link>
          </div>
        </div>
      )}

      {/* Related Surahs */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Related Surahs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {content.relatedSurahs.map((surahId) => (
            <Link 
              key={surahId}
              href={`/surah/${surahId}`}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 hover:shadow-md transition flex items-center btn-tap-effect"
            >
              <div className="bg-primary/10 dark:bg-primary/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <span className="font-medium">{surahId}</span>
              </div>
              <div>
                <h3 className="font-medium">Surah {surahNames[surahId - 1]}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Read now</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}