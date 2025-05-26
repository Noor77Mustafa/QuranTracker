import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { 
  Card, 
  CardContent,
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search } from "lucide-react";

// Sample authentic hadith content from major collections
const COLLECTION_HADITHS = {
  bukhari: [
    {
      id: "bukhari-1",
      hadithNumber: 1,
      bookNumber: 1,
      chapterTitle: "How the Divine Revelation started",
      arabicText: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
      englishText: "Actions are but by intention and every man shall have but that which he intended.",
      narrator: "'Umar ibn al-Khattab",
      grade: "Sahih"
    },
    {
      id: "bukhari-2",
      hadithNumber: 2,
      bookNumber: 1,
      chapterTitle: "How the Divine Revelation started",
      arabicText: "أَحْيَانًا يَأْتِينِي مِثْلَ صَلْصَلَةِ الْجَرَسِ وَهُوَ أَشَدُّهُ عَلَىَّ",
      englishText: "Sometimes it is (revealed) like the ringing of a bell, this form of Inspiration is the hardest of all.",
      narrator: "'Aisha",
      grade: "Sahih"
    },
    {
      id: "bukhari-3",
      hadithNumber: 3,
      bookNumber: 1,
      chapterTitle: "How the Divine Revelation started",
      arabicText: "بُعِثْتُ أَنَا وَالسَّاعَةُ كَهَذِهِ وَأَشَارَ بِإِصْبَعَيْهِ",
      englishText: "I have been sent and the Hour are like these two (fingers).",
      narrator: "Sahl ibn Sa'd",
      grade: "Sahih"
    }
  ],
  muslim: [
    {
      id: "muslim-1",
      hadithNumber: 1,
      bookNumber: 1,
      chapterTitle: "The Book of Faith",
      arabicText: "إِنَّمَا الأَعْمَالُ بِالنِّيَّةِ وَإِنَّمَا لاِمْرِئٍ مَا نَوَى",
      englishText: "Actions are (judged) by motives (niyyah), so each man will have what he intended.",
      narrator: "'Umar ibn al-Khattab",
      grade: "Sahih"
    },
    {
      id: "muslim-2",
      hadithNumber: 16,
      bookNumber: 1,
      chapterTitle: "The Book of Faith",
      arabicText: "الإِسْلاَمُ أَنْ تَشْهَدَ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ",
      englishText: "Islam is to testify that there is no god but Allah and Muhammad is the messenger of Allah.",
      narrator: "Abu Huraira",
      grade: "Sahih"
    }
  ],
  nawawi40: [
    {
      id: "nawawi40-1",
      hadithNumber: 1,
      bookNumber: 1,
      chapterTitle: "On Sincerity",
      arabicText: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
      englishText: "Actions are but by intention and every man shall have but that which he intended.",
      narrator: "'Umar ibn al-Khattab",
      grade: "Sahih"
    },
    {
      id: "nawawi40-2",
      hadithNumber: 2,
      bookNumber: 1,
      chapterTitle: "On Islam, Iman and Ihsan",
      arabicText: "الإِسْلاَمُ أَنْ تَشْهَدَ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ",
      englishText: "Islam is to testify that there is no god but Allah.",
      narrator: "'Umar ibn al-Khattab",
      grade: "Sahih"
    }
  ]
};

const COLLECTION_INFO = {
  bukhari: {
    name: "Sahih al-Bukhari",
    arabicName: "صحيح البخاري",
    description: "The most authentic collection of hadith compiled by Imam Muhammad ibn Ismail al-Bukhari.",
    compiler: "Imam al-Bukhari",
    totalHadiths: 7563,
    books: 97
  },
  muslim: {
    name: "Sahih Muslim",
    arabicName: "صحيح مسلم",
    description: "The second most authentic hadith collection compiled by Imam Muslim ibn al-Hajjaj.",
    compiler: "Imam Muslim",
    totalHadiths: 7563,
    books: 54
  },
  nawawi40: {
    name: "40 Hadith Nawawi",
    arabicName: "الأربعون النووية",
    description: "Collection of 40 fundamental hadiths compiled by Imam Yahya ibn Sharaf al-Nawawi.",
    compiler: "Imam al-Nawawi",
    totalHadiths: 42,
    books: 1
  }
};

export default function HadithCollection() {
  const [, params] = useRoute("/hadith/collection/:collectionId");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [hadiths, setHadiths] = useState<any[]>([]);
  const [collectionInfo, setCollectionInfo] = useState<any>(null);
  
  const collectionId = params?.collectionId || "";
  
  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const info = COLLECTION_INFO[collectionId as keyof typeof COLLECTION_INFO];
        const hadithList = COLLECTION_HADITHS[collectionId as keyof typeof COLLECTION_HADITHS] || [];
        
        if (info) {
          setCollectionInfo(info);
          setHadiths(hadithList);
          document.title = `${info.name} - Hadith Collection - MyQuran`;
        }
      } catch (error) {
        console.error("Error fetching collection:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCollection();
  }, [collectionId]);
  
  // Filter hadiths based on search query
  const filteredHadiths = hadiths.filter(hadith => 
    hadith.englishText.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hadith.arabicText.includes(searchQuery) ||
    hadith.narrator.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hadith.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  if (!collectionInfo && !loading) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/hadiths">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Collections
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Collection Not Found</CardTitle>
            <CardDescription>The hadith collection you are looking for does not exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Please check the URL and try again, or browse our available collections.</p>
          </CardContent>
        </Card>
      </main>
    );
  }
  
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/hadiths">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Collections
          </Button>
        </Link>
        
        {loading ? (
          <div>
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{collectionInfo.name}</h1>
                <h2 className="text-xl font-arabic text-primary mb-2">{collectionInfo.arabicName}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{collectionInfo.description}</p>
              </div>
              <Badge variant="secondary">
                {collectionInfo.totalHadiths} Hadiths
              </Badge>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
              <p><strong>Compiler:</strong> {collectionInfo.compiler}</p>
              <p><strong>Books:</strong> {collectionInfo.books}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search hadiths by text, narrator, or chapter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      {/* Hadiths List */}
      <div className="space-y-6">
        {loading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-1/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full mb-4" />
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))
        ) : filteredHadiths.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery ? "No hadiths found matching your search." : "No hadiths available in this collection."}
              </p>
            </CardContent>
          </Card>
        ) : (
          // Actual hadiths
          filteredHadiths.map(hadith => (
            <Card key={hadith.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Hadith #{hadith.hadithNumber}</CardTitle>
                    <CardDescription>Book {hadith.bookNumber} • {hadith.chapterTitle}</CardDescription>
                  </div>
                  <Badge>{hadith.grade}</Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Arabic text */}
                <div className="mb-4">
                  <p className="text-xl rtl text-right font-arabic leading-loose mb-2">
                    {hadith.arabicText}
                  </p>
                </div>
                
                {/* English translation */}
                <div className="mb-4">
                  <p className="text-base text-gray-700 dark:text-gray-300">
                    {hadith.englishText}
                  </p>
                </div>
                
                {/* Narrator and actions */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Narrated by {hadith.narrator}
                  </span>
                  <Link href={`/hadith/${hadith.id}`}>
                    <Button variant="outline" size="sm">Read More</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      {/* Load more button (for future pagination) */}
      {!loading && filteredHadiths.length > 0 && (
        <div className="mt-8 text-center">
          <Button variant="outline">Load More Hadiths</Button>
        </div>
      )}
    </main>
  );
}