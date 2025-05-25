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

// Mock dua categories
const DUA_CATEGORIES = [
  {
    id: "morning-evening",
    name: "Morning & Evening",
    arabicName: "أذكار الصباح والمساء",
    description: "Supplications to recite in the morning and evening for protection and blessings.",
    count: 18,
    icon: "sunny"
  },
  {
    id: "salah",
    name: "Prayer (Salah)",
    arabicName: "أدعية الصلاة",
    description: "Supplications for before, during, and after prayer.",
    count: 25,
    icon: "prayer_times"
  },
  {
    id: "quran",
    name: "From the Quran",
    arabicName: "أدعية من القرآن",
    description: "Supplications mentioned in the Holy Quran.",
    count: 40,
    icon: "menu_book"
  },
  {
    id: "prophetic",
    name: "Prophetic Duas",
    arabicName: "أدعية النبي",
    description: "Supplications taught by Prophet Muhammad (PBUH).",
    count: 35,
    icon: "history_edu"
  },
  {
    id: "protection",
    name: "Protection & Healing",
    arabicName: "أدعية الحماية والشفاء",
    description: "Supplications for seeking protection and healing.",
    count: 22,
    icon: "health_and_safety"
  },
  {
    id: "forgiveness",
    name: "Forgiveness",
    arabicName: "أدعية الاستغفار",
    description: "Supplications for seeking forgiveness from Allah.",
    count: 15,
    icon: "favorite"
  },
  {
    id: "daily",
    name: "Daily Activities",
    arabicName: "أدعية الحياة اليومية",
    description: "Supplications for various daily activities.",
    count: 30,
    icon: "schedule"
  },
  {
    id: "travel",
    name: "Travel",
    arabicName: "أدعية السفر",
    description: "Supplications for before, during, and after travel.",
    count: 12,
    icon: "flight"
  },
  {
    id: "hardship",
    name: "Hardship & Distress",
    arabicName: "أدعية الشدائد",
    description: "Supplications for times of difficulty and distress.",
    count: 20,
    icon: "sentiment_stressed"
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
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <span className="material-symbols-rounded mr-2">{category.icon}</span>
                        <span>{category.name}</span>
                      </CardTitle>
                      <span className="text-base font-arabic">{category.arabicName}</span>
                    </div>
                    <CardDescription>
                      {category.count} Duas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
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