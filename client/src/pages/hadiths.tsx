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

// Comprehensive hadith collections based on authentic Islamic sources
const HADITH_COLLECTIONS = [
  // The Six Books (Kutub al-Sittah) - Most authentic Sunni collections
  { 
    id: "bukhari", 
    name: "Sahih al-Bukhari", 
    arabicName: "صحيح البخاري",
    description: "The most authentic hadith collection. Compiled by Imam Muhammad ibn Ismail al-Bukhari (194-256 AH).",
    count: 7563,
    books: 97,
    category: "Kutub al-Sittah",
    grade: "Sahih",
    compiler: "Imam al-Bukhari",
    compilationYear: "846-870 CE"
  },
  { 
    id: "muslim", 
    name: "Sahih Muslim", 
    arabicName: "صحيح مسلم",
    description: "Second most authentic collection. Compiled by Imam Muslim ibn al-Hajjaj (204-261 AH).",
    count: 7563,
    books: 54,
    category: "Kutub al-Sittah",
    grade: "Sahih",
    compiler: "Imam Muslim",
    compilationYear: "817-875 CE"
  },
  { 
    id: "abudawud", 
    name: "Sunan Abu Dawud", 
    arabicName: "سنن أبي داود",
    description: "Focused on legal traditions. Compiled by Abu Dawud Sulayman ibn al-Ash'ath (202-275 AH).",
    count: 5274,
    books: 43,
    category: "Kutub al-Sittah",
    grade: "Mixed",
    compiler: "Abu Dawud",
    compilationYear: "817-889 CE"
  },
  { 
    id: "tirmidhi", 
    name: "Jami at-Tirmidhi", 
    arabicName: "جامع الترمذي",
    description: "Known for detailed grading of hadiths. Compiled by Abu Isa Muhammad at-Tirmidhi (209-279 AH).",
    count: 3956,
    books: 49,
    category: "Kutub al-Sittah",
    grade: "Mixed",
    compiler: "At-Tirmidhi",
    compilationYear: "825-892 CE"
  },
  { 
    id: "nasai", 
    name: "Sunan an-Nasa'i", 
    arabicName: "سنن النسائي",
    description: "Known for strict criteria in hadith authentication. By Ahmad ibn Shu'ayb an-Nasa'i (215-303 AH).",
    count: 5761,
    books: 52,
    category: "Kutub al-Sittah",
    grade: "Mixed",
    compiler: "An-Nasa'i",
    compilationYear: "830-915 CE"
  },
  { 
    id: "ibnmajah", 
    name: "Sunan Ibn Majah", 
    arabicName: "سنن ابن ماجه",
    description: "Completes the six books. Compiled by Muhammad ibn Yazid Ibn Majah (209-273 AH).",
    count: 4341,
    books: 37,
    category: "Kutub al-Sittah",
    grade: "Mixed",
    compiler: "Ibn Majah",
    compilationYear: "824-887 CE"
  },

  // Other Major Collections
  { 
    id: "malik", 
    name: "Muwatta Imam Malik", 
    arabicName: "موطأ الإمام مالك",
    description: "The earliest surviving hadith collection. Compiled by Imam Malik ibn Anas (93-179 AH).",
    count: 1973,
    books: 61,
    category: "Early Collections",
    grade: "Sahih/Hasan",
    compiler: "Imam Malik",
    compilationYear: "711-795 CE"
  },
  { 
    id: "ahmad", 
    name: "Musnad Ahmad", 
    arabicName: "مسند أحمد",
    description: "Largest hadith collection arranged by narrator. Compiled by Imam Ahmad ibn Hanbal (164-241 AH).",
    count: 26363,
    books: 1,
    category: "Musnad Collections",
    grade: "Mixed",
    compiler: "Ahmad ibn Hanbal",
    compilationYear: "780-855 CE"
  },
  { 
    id: "darimi", 
    name: "Sunan ad-Darimi", 
    arabicName: "سنن الدارمي",
    description: "Organized by topics with authentic chains. Compiled by Abdullah ibn Abdur Rahman ad-Darimi (181-255 AH).",
    count: 3503,
    books: 23,
    category: "Sunan Collections",
    grade: "Mixed",
    compiler: "Ad-Darimi",
    compilationYear: "797-869 CE"
  },

  // Specialized Collections
  { 
    id: "nawawi40", 
    name: "40 Hadith Nawawi", 
    arabicName: "الأربعون النووية",
    description: "40 fundamental hadiths covering Islamic principles. By Imam Yahya ibn Sharaf al-Nawawi (631-676 AH).",
    count: 42,
    books: 1,
    category: "Specialized",
    grade: "Sahih",
    compiler: "Imam al-Nawawi",
    compilationYear: "1233-1277 CE"
  },
  { 
    id: "riyadussaliheen", 
    name: "Riyad as-Saliheen", 
    arabicName: "رياض الصالحين",
    description: "Collection focusing on good character and conduct. Also compiled by Imam al-Nawawi.",
    count: 1896,
    books: 19,
    category: "Specialized",
    grade: "Mostly Sahih",
    compiler: "Imam al-Nawawi",
    compilationYear: "1233-1277 CE"
  },
  { 
    id: "adabmufrad", 
    name: "Al-Adab al-Mufrad", 
    arabicName: "الأدب المفرد",
    description: "Collection on Islamic manners and etiquette. Compiled by Imam al-Bukhari.",
    count: 1322,
    books: 57,
    category: "Specialized",
    grade: "Mixed",
    compiler: "Imam al-Bukhari",
    compilationYear: "810-870 CE"
  },

  // Additional Important Collections
  { 
    id: "hakim", 
    name: "Al-Mustadrak", 
    arabicName: "المستدرك على الصحيحين",
    description: "Supplement to Bukhari and Muslim with additional authentic hadiths. By Al-Hakim an-Nisaburi (321-405 AH).",
    count: 8803,
    books: 4,
    category: "Mustadrak",
    grade: "Mixed",
    compiler: "Al-Hakim",
    compilationYear: "933-1014 CE"
  },
  { 
    id: "tabarani", 
    name: "Al-Mu'jam al-Kabir", 
    arabicName: "المعجم الكبير",
    description: "Comprehensive collection arranged alphabetically by companions. By At-Tabarani (260-360 AH).",
    count: 25000,
    books: 25,
    category: "Mu'jam Collections",
    grade: "Mixed",
    compiler: "At-Tabarani",
    compilationYear: "873-971 CE"
  },
  { 
    id: "bayhaqi", 
    name: "Sunan al-Kubra", 
    arabicName: "السنن الكبرى",
    description: "Comprehensive collection of legal traditions. By Imam al-Bayhaqi (384-458 AH).",
    count: 21000,
    books: 10,
    category: "Sunan Collections",
    grade: "Mixed",
    compiler: "Al-Bayhaqi",
    compilationYear: "994-1066 CE"
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
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="text-xs">{collection.category}</Badge>
                      <Badge variant={collection.grade === "Sahih" ? "default" : "outline"} className="text-xs">
                        {collection.grade}
                      </Badge>
                    </div>
                    <CardTitle className="flex justify-between items-center">
                      <span className="text-lg">{collection.name}</span>
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
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <p><strong>Compiler:</strong> {collection.compiler}</p>
                      <p><strong>Period:</strong> {collection.compilationYear}</p>
                    </div>
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