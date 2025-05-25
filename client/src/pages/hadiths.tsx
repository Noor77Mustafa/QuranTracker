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

// Mock hadith collections for initial development
const HADITH_COLLECTIONS = [
  { 
    id: "bukhari", 
    name: "Sahih al-Bukhari", 
    arabicName: "صحيح البخاري",
    description: "Considered the most authentic collection of hadith compiled by Imam Muhammad al-Bukhari.",
    count: 7563,
    books: 97
  },
  { 
    id: "muslim", 
    name: "Sahih Muslim", 
    arabicName: "صحيح مسلم",
    description: "The second most authentic hadith collection compiled by Imam Muslim ibn al-Hajjaj.",
    count: 7563,
    books: 54
  },
  { 
    id: "tirmidhi", 
    name: "Jami at-Tirmidhi", 
    arabicName: "جامع الترمذي",
    description: "Collection by Imam Abu Isa Muhammad at-Tirmidhi with special focus on legal traditions.",
    count: 3956,
    books: 49
  },
  { 
    id: "abudawud", 
    name: "Sunan Abu Dawud", 
    arabicName: "سنن أبي داود",
    description: "Collection focused on legal matters by Imam Abu Dawud Sulayman ibn al-Ash'ath.",
    count: 5274,
    books: 43
  },
  { 
    id: "nasai", 
    name: "Sunan an-Nasa'i", 
    arabicName: "سنن النسائي",
    description: "Collection focused on legal matters by Imam Ahmad ibn Shu'ayb an-Nasa'i.",
    count: 5761,
    books: 52
  },
  { 
    id: "ibnmajah", 
    name: "Sunan Ibn Majah", 
    arabicName: "سنن ابن ماجه",
    description: "Collection by Imam Muhammad ibn Yazid Ibn Majah al-Qazvini.",
    count: 4341,
    books: 37
  },
  { 
    id: "malik", 
    name: "Muwatta Imam Malik", 
    arabicName: "موطأ الإمام مالك",
    description: "The earliest surviving Sunni hadith collection compiled by Imam Malik ibn Anas.",
    count: 1973,
    books: 61
  },
  { 
    id: "nawawi40", 
    name: "40 Hadith Nawawi", 
    arabicName: "الأربعون النووية",
    description: "Collection of 40 important hadiths compiled by Imam Yahya ibn Sharaf al-Nawawi.",
    count: 40,
    books: 1
  }
];

// Featured/popular hadiths for the home page
const FEATURED_HADITHS = [
  {
    id: "bukhari-1",
    collection: "bukhari",
    collectionName: "Sahih al-Bukhari",
    bookNumber: 1,
    hadithNumber: 1,
    chapterTitle: "How the Divine Revelation started being revealed to Allah's Messenger",
    arabicText: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    englishText: "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended.",
    grade: "Sahih"
  },
  {
    id: "nawawi40-13",
    collection: "nawawi40",
    collectionName: "40 Hadith Nawawi",
    bookNumber: 1,
    hadithNumber: 13,
    chapterTitle: "Brotherhood in Faith",
    arabicText: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    englishText: "None of you [truly] believes until he loves for his brother what he loves for himself.",
    grade: "Sahih"
  },
  {
    id: "muslim-2553",
    collection: "muslim",
    collectionName: "Sahih Muslim",
    bookNumber: 32,
    hadithNumber: 2553,
    chapterTitle: "On Virtue, Good Manners and Joining of the Ties of Relationship",
    arabicText: "من نفس عن مؤمن كربة من كرب الدنيا نفس الله عنه كربة من كرب يوم القيامة",
    englishText: "Whoever relieves a believer's distress of the distressful aspects of this world, Allah will rescue him from a difficulty of the difficulties of the Hereafter.",
    grade: "Sahih"
  }
];

export default function Hadiths() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("featured");
  const [loading, setLoading] = useState(false);
  
  // Set page title
  useEffect(() => {
    document.title = "Hadiths - MyQuran";
  }, []);
  
  // Filter collections based on search query
  const filteredCollections = HADITH_COLLECTIONS.filter(collection => 
    collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.arabicName.includes(searchQuery) ||
    collection.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <main className="container mx-auto px-4 py-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Hadith Collections</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore authentic hadith collections from the most reliable sources in Islam.
        </p>
        
        {/* Search */}
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Search hadith collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="featured">Featured Hadiths</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="featured">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURED_HADITHS.map(hadith => (
              <Card key={hadith.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{hadith.collectionName}</CardTitle>
                  <CardDescription>Hadith #{hadith.hadithNumber}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xl rtl text-right mb-3 font-arabic leading-loose">{hadith.arabicText}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{hadith.englishText}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Grade: {hadith.grade}</span>
                    <Link href={`/hadith/${hadith.id}`}>
                      <Button variant="outline" size="sm">Read More</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="collections">
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
              // Actual collections
              filteredCollections.map(collection => (
                <Card key={collection.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <span>{collection.name}</span>
                      <span className="text-lg font-arabic">{collection.arabicName}</span>
                    </CardTitle>
                    <CardDescription>
                      {collection.books} Books • {collection.count} Hadiths
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      {collection.description}
                    </p>
                    <Link href={`/hadith/collection/${collection.id}`}>
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