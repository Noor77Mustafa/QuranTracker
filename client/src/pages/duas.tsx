import { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

// Comprehensive dua categories based on authentic Islamic sources
const DUA_CATEGORIES = [
  // Core Daily Remembrances
  {
    id: "morning-evening",
    name: "Morning & Evening Adhkar",
    arabicName: "أذكار الصباح والمساء",
    description: "Authentic morning and evening remembrances from Hisnul Muslim for daily protection and blessings.",
    count: 28,
    icon: "sunny",
    source: "Hisnul Muslim, Sahih Bukhari, Sahih Muslim"
  },
  {
    id: "after-salah",
    name: "After Prayer Adhkar",
    arabicName: "أذكار ما بعد الصلاة",
    description: "Recommended supplications to recite after completing the five daily prayers.",
    count: 15,
    icon: "prayer_times",
    source: "Sahih Muslim, Abu Dawud, Tirmidhi"
  },
  {
    id: "before-sleep",
    name: "Before Sleep",
    arabicName: "أذكار النوم",
    description: "Supplications and Quranic verses to recite before going to sleep.",
    count: 12,
    icon: "bedtime",
    source: "Sahih Bukhari, Sahih Muslim"
  },

  // Quranic Supplications
  {
    id: "quran",
    name: "Quranic Duas",
    arabicName: "أدعية من القرآن الكريم",
    description: "Complete collection of supplications directly from the Holy Quran.",
    count: 67,
    icon: "menu_book",
    source: "The Holy Quran"
  },
  {
    id: "prophets-duas",
    name: "Prophets' Supplications",
    arabicName: "أدعية الأنبياء",
    description: "Duas made by various prophets as mentioned in the Quran.",
    count: 23,
    icon: "auto_awesome",
    source: "The Holy Quran"
  },

  // Prophetic Traditions
  {
    id: "prophetic-duas",
    name: "Prophetic Supplications",
    arabicName: "أدعية نبوية",
    description: "Authentic supplications taught by Prophet Muhammad (ﷺ).",
    count: 156,
    icon: "history_edu",
    source: "Sahih Bukhari, Sahih Muslim, Abu Dawud"
  },
  {
    id: "comprehensive-duas",
    name: "Comprehensive Supplications",
    arabicName: "الأدعية الجامعة",
    description: "All-encompassing duas that cover multiple aspects of life and the afterlife.",
    count: 18,
    icon: "all_inclusive",
    source: "Sahih Muslim, Abu Dawud, Tirmidhi"
  },

  // Life Situations
  {
    id: "hardship-distress",
    name: "Hardship & Distress",
    arabicName: "أدعية الكرب والضيق",
    description: "Powerful supplications for times of difficulty, anxiety, and distress.",
    count: 25,
    icon: "healing",
    source: "Sahih Bukhari, Sahih Muslim, Ibn Majah"
  },
  {
    id: "forgiveness-repentance",
    name: "Forgiveness & Inner Peace",
    arabicName: "أدعية الاستغفار والسلام الداخلي",
    description: "Supplications for seeking Allah's forgiveness, inner peace, and spiritual tranquility. Focus on healing the heart and soul.",
    count: 22,
    icon: "favorite",
    source: "Sahih Bukhari, Abu Dawud, Tirmidhi"
  },
  {
    id: "healing",
    name: "Healing & Wellness",
    arabicName: "أدعية الشفاء والعافية",
    description: "Prophetic supplications for physical, mental, emotional and spiritual healing. Includes duas for anxiety, grief, and inner wellness.",
    count: 16,
    icon: "health_and_safety",
    source: "Sahih Bukhari, Sahih Muslim, Tirmidhi"
  },
  {
    id: "protection-refuge",
    name: "Protection & Seeking Refuge",
    arabicName: "أدعية الحماية والاستعاذة",
    description: "Supplications for seeking Allah's protection from all forms of harm.",
    count: 31,
    icon: "shield",
    source: "Sahih Muslim, Abu Dawud, Nasa'i"
  },

  // Health & Healing
  {
    id: "healing-illness",
    name: "Healing & Illness",
    arabicName: "أدعية الشفاء والمرض",
    description: "Supplications for seeking healing and patience during illness.",
    count: 16,
    icon: "health_and_safety",
    source: "Sahih Bukhari, Sahih Muslim, Tirmidhi"
  },
  {
    id: "ruqyah",
    name: "Ruqyah (Spiritual Healing)",
    arabicName: "الرقية الشرعية",
    description: "Quranic verses and prophetic supplications for spiritual healing and protection.",
    count: 19,
    icon: "auto_fix_high",
    source: "The Holy Quran, Sahih Bukhari, Sahih Muslim"
  },

  // Daily Activities
  {
    id: "eating-drinking",
    name: "Eating & Drinking",
    arabicName: "أدعية الطعام والشراب",
    description: "Supplications before and after eating and drinking.",
    count: 8,
    icon: "restaurant",
    source: "Abu Dawud, Tirmidhi, Ibn Majah"
  },
  {
    id: "entering-leaving",
    name: "Entering & Leaving",
    arabicName: "أدعية الدخول والخروج",
    description: "Supplications for entering and leaving home, mosque, and other places.",
    count: 12,
    icon: "door_open",
    source: "Abu Dawud, Tirmidhi, Sahih Muslim"
  },
  {
    id: "travel",
    name: "Travel Supplications",
    arabicName: "أدعية السفر",
    description: "Complete collection of travel-related supplications for safety and blessings.",
    count: 15,
    icon: "flight",
    source: "Sahih Muslim, Abu Dawud, Tirmidhi"
  },

  // Special Occasions
  {
    id: "friday",
    name: "Friday Supplications",
    arabicName: "أدعية يوم الجمعة",
    description: "Special supplications recommended for the blessed day of Friday.",
    count: 9,
    icon: "event",
    source: "Abu Dawud, Tirmidhi, Ibn Majah"
  },
  {
    id: "ramadan",
    name: "Ramadan & Fasting",
    arabicName: "أدعية رمضان والصيام",
    description: "Supplications specific to Ramadan, fasting, and breaking the fast.",
    count: 14,
    icon: "nightlight",
    source: "Abu Dawud, Tirmidhi, Ibn Majah"
  },
  {
    id: "hajj-umrah",
    name: "Hajj & Umrah",
    arabicName: "أدعية الحج والعمرة",
    description: "Supplications for pilgrimage including Talbiyah and various rituals.",
    count: 18,
    icon: "place",
    source: "Sahih Bukhari, Sahih Muslim, Abu Dawud"
  },

  // Family & Relationships
  {
    id: "marriage-family",
    name: "Marriage & Family",
    arabicName: "أدعية الزواج والأسرة",
    description: "Supplications for marriage, family life, and raising children.",
    count: 13,
    icon: "family_restroom",
    source: "Abu Dawud, Tirmidhi, Ibn Majah"
  },
  {
    id: "children-parents",
    name: "For Children & Parents",
    arabicName: "أدعية للأولاد والوالدين",
    description: "Supplications for children's wellbeing and honoring parents.",
    count: 11,
    icon: "child_care",
    source: "The Holy Quran, Abu Dawud, Tirmidhi"
  },

  // Knowledge & Guidance
  {
    id: "knowledge-wisdom",
    name: "Knowledge & Wisdom",
    arabicName: "أدعية العلم والحكمة",
    description: "Supplications for seeking beneficial knowledge and wisdom.",
    count: 10,
    icon: "psychology",
    source: "Abu Dawud, Tirmidhi, Ibn Majah"
  },
  {
    id: "guidance-righteousness",
    name: "Guidance & Righteousness",
    arabicName: "أدعية الهداية والصلاح",
    description: "Supplications for seeking Allah's guidance and remaining on the straight path.",
    count: 17,
    icon: "explore",
    source: "Sahih Muslim, Abu Dawud, Tirmidhi"
  }
];

// Featured duas
const FEATURED_DUAS = [
  {
    id: "protection-1",
    category: "protection",
    name: "Dua for Protection",
    arabicName: "دعاء للحماية",
    arabicText: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i, wa huwas-sami'ul-'aleem",
    translation: "In the name of Allah, with Whose name nothing can cause harm on earth or in the heavens, and He is the All-Hearing, the All-Knowing.",
    reference: "Abu Dawud, Tirmidhi",
    virtue: "Whoever recites this three times in the morning and evening, nothing will harm them."
  },
  {
    id: "morning-1",
    category: "morning-evening",
    name: "Morning Remembrance",
    arabicName: "ذكر الصباح",
    arabicText: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Asbahna wa asbahal-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamd, wa huwa 'ala kulli shay'in qadeer",
    translation: "We have reached the morning and the kingdom belongs to Allah. Praise is to Allah. None has the right to be worshipped except Allah, alone, without partner. To Him belongs the dominion, to Him belongs all praise, and He is over all things Omnipotent.",
    reference: "Abu Dawud, Tirmidhi",
    virtue: "Whoever recites this in the morning has thanked Allah for the day."
  },
  {
    id: "quran-1",
    category: "quran",
    name: "Dua from Surah Al-Baqarah",
    arabicName: "دعاء من سورة البقرة",
    arabicText: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina 'adhaban-nar",
    translation: "Our Lord, give us in this world that which is good and in the Hereafter that which is good, and protect us from the punishment of the Fire.",
    reference: "Quran 2:201",
    virtue: "This was one of the most frequent supplications of the Prophet Muhammad (PBUH)."
  }
];

export default function Duas() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("featured");
  const [loading, setLoading] = useState(false);
  
  // Set page title
  useEffect(() => {
    document.title = "Duas & Supplications - MyQuran";
  }, []);
  
  // Filter categories based on search query
  const filteredCategories = DUA_CATEGORIES.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.arabicName.includes(searchQuery) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <main className="container mx-auto px-4 py-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Duas & Supplications</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore a collection of authentic duas (supplications) from the Quran and Sunnah for various occasions.
        </p>
        
        {/* Search */}
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Search duas by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="featured">Featured Duas</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="featured">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURED_DUAS.map(dua => (
              <Card key={dua.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{dua.name}</CardTitle>
                    <span className="text-lg font-arabic">{dua.arabicName}</span>
                  </div>
                  <CardDescription>
                    <Badge variant="outline">{DUA_CATEGORIES.find(c => c.id === dua.category)?.name}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xl rtl text-right mb-3 font-arabic leading-loose">{dua.arabicText}</p>
                  <p className="text-sm italic mb-2">{dua.transliteration}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{dua.translation}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Source: {dua.reference}</span>
                    <Link href={`/dua/${dua.id}`}>
                      <Button variant="outline" size="sm">Read More</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="categories">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </CardContent>
                </Card>
              ))
            ) : (
              // Actual categories
              filteredCategories.map(category => (
                <Card key={category.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-xs">{category.source}</Badge>
                      <span className="text-sm font-medium text-primary">{category.count} Duas</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <span className="material-symbols-rounded mr-2">{category.icon}</span>
                        <span>{category.name}</span>
                      </CardTitle>
                      <span className="text-base font-arabic">{category.arabicName}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                      {category.description}
                    </p>
                    <Link href={`/dua/category/${category.id}`}>
                      <Button variant="outline" size="sm" className="w-full">Browse Collection</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}