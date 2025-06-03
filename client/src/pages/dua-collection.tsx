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
import { ArrowLeft, Search, Volume } from "lucide-react";

// Authentic duas from Islamic sources
const CATEGORY_DUAS = {
  "morning-evening": [
    {
      id: "morning-1",
      name: "Morning Protection",
      arabicName: "دعاء الحماية الصباحية",
      arabicText: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
      transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i, wa huwas-sami'ul-'aleem",
      translation: "In the name of Allah, with Whose name nothing can cause harm on earth or in the heavens, and He is the All-Hearing, the All-Knowing.",
      source: "Abu Dawud, Tirmidhi",
      recitation: "3 times in morning"
    },
    {
      id: "morning-2",
      name: "Morning Gratitude",
      arabicName: "دعاء الشكر الصباحي",
      arabicText: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
      transliteration: "Asbahna wa asbahal-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la shareeka lah",
      translation: "We have reached the morning and the kingdom belongs to Allah. Praise is to Allah. None has the right to be worshipped except Allah, alone, without partner.",
      source: "Abu Dawud, Tirmidhi",
      recitation: "Once in morning"
    },
    {
      id: "evening-1",
      name: "Evening Protection",
      arabicName: "دعاء الحماية المسائية",
      arabicText: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
      transliteration: "Amsayna wa amsal-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la shareeka lah",
      translation: "We have reached the evening and the kingdom belongs to Allah. Praise is to Allah. None has the right to be worshipped except Allah, alone, without partner.",
      source: "Abu Dawud, Tirmidhi",
      recitation: "Once in evening"
    }
  ],
  "quran": [
    {
      id: "quran-1",
      name: "Dua from Surah Al-Baqarah",
      arabicName: "دعاء من سورة البقرة",
      arabicText: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina 'adhaban-nar",
      translation: "Our Lord, give us in this world that which is good and in the Hereafter that which is good, and protect us from the punishment of the Fire.",
      source: "Quran 2:201",
      recitation: "Anytime, especially after prayers"
    },
    {
      id: "quran-2",
      name: "Dua of Prophet Ibrahim",
      arabicName: "دعاء إبراهيم عليه السلام",
      arabicText: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلاَةِ وَمِن ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاء",
      transliteration: "Rabbi aj'alni muqeem as-salati wa min dhurriyyati, rabbana wa taqabbal du'a",
      translation: "My Lord, make me an establisher of prayer, and [many] from my descendants. Our Lord, and accept my supplication.",
      source: "Quran 14:40",
      recitation: "Anytime"
    }
  ],
  "protection": [
    {
      id: "protection-1",
      name: "Seeking Refuge",
      arabicName: "دعاء الاستعاذة",
      arabicText: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      transliteration: "A'udhu bi kalimatillahi't-tammati min sharri ma khalaq",
      translation: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
      source: "Sahih Muslim",
      recitation: "3 times for protection"
    },
    {
      id: "protection-2", 
      name: "Evening Protection",
      arabicName: "حماية المساء",
      arabicText: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
      transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i, wa huwas-sami'ul-'aleem",
      translation: "In the name of Allah, with Whose name nothing can cause harm on earth or in the heavens, and He is the All-Hearing, the All-Knowing.",
      source: "Abu Dawud, Tirmidhi",
      recitation: "3 times evening and morning"
    }
  ],
  "forgiveness-repentance": [
    {
      id: "forgiveness-1",
      name: "Master of Seeking Forgiveness",
      arabicName: "سيد الاستغفار",
      arabicText: "اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ",
      transliteration: "Allahumma anta rabbi la ilaha illa ant, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mas-tata't",
      translation: "O Allah, You are my Lord, there is no god except You. You created me and I am Your servant, and I am keeping my covenant and promise to You as much as I can.",
      source: "Sahih al-Bukhari",
      recitation: "Morning and evening"
    },
    {
      id: "forgiveness-2",
      name: "Simple Seeking Forgiveness",
      arabicName: "الاستغفار البسيط",
      arabicText: "أَسْتَغْفِرُ اللَّهَ الَّذِي لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
      transliteration: "Astaghfir Allah alladhi la ilaha illa huwal-hayyul-qayyumu wa atubu ilaih",
      translation: "I seek forgiveness from Allah, besides whom there is no god, the Ever-Living, the Sustainer, and I repent to Him.",
      source: "Abu Dawud, Tirmidhi",
      recitation: "Anytime"
    }
  ]
};

const CATEGORY_INFO = {
  "morning-evening": {
    name: "Morning & Evening Adhkar",
    arabicName: "أذكار الصباح والمساء",
    description: "Authentic morning and evening remembrances from Hisnul Muslim for daily protection and blessings.",
    source: "Hisnul Muslim, Sahih Bukhari, Sahih Muslim"
  },
  "quran": {
    name: "Quranic Duas",
    arabicName: "أدعية من القرآن الكريم",
    description: "Complete collection of supplications directly from the Holy Quran.",
    source: "The Holy Quran"
  },
  "forgiveness-repentance": {
    name: "Forgiveness & Repentance",
    arabicName: "أدعية الاستغفار والتوبة",
    description: "Supplications for seeking Allah's forgiveness and guidance towards repentance.",
    source: "Sahih Bukhari, Abu Dawud, Tirmidhi"
  }
};

export default function DuaCollection() {
  const [, params] = useRoute("/dua/category/:categoryId");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [duas, setDuas] = useState<any[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<any>(null);
  
  const categoryId = params?.categoryId || "";
  
  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const info = CATEGORY_INFO[categoryId as keyof typeof CATEGORY_INFO];
        const duaList = CATEGORY_DUAS[categoryId as keyof typeof CATEGORY_DUAS] || [];
        
        if (info) {
          setCategoryInfo(info);
          setDuas(duaList);
          document.title = `${info.name} - Dua Collection - MyQuran`;
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategory();
  }, [categoryId]);
  
  // Filter duas based on search query
  const filteredDuas = duas.filter(dua => 
    dua.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dua.arabicText.includes(searchQuery) ||
    dua.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dua.transliteration.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  if (!categoryInfo && !loading) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/duas">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Category Not Found</CardTitle>
            <CardDescription>The dua category you are looking for does not exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Please check the URL and try again, or browse our available categories.</p>
          </CardContent>
        </Card>
      </main>
    );
  }
  
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/duas">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
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
                <h1 className="text-3xl font-bold mb-2">{categoryInfo.name}</h1>
                <h2 className="text-xl font-arabic text-primary mb-2">{categoryInfo.arabicName}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{categoryInfo.description}</p>
              </div>
              <Badge variant="secondary">
                {duas.length} Duas
              </Badge>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
              <p><strong>Source:</strong> {categoryInfo.source}</p>
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
            placeholder="Search duas by text, name, or transliteration..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      {/* Duas List */}
      <div className="space-y-6">
        {loading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-16 w-full mb-4" />
                <Skeleton className="h-12 w-full mb-4" />
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))
        ) : filteredDuas.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery ? "No duas found matching your search." : "No duas available in this category."}
              </p>
            </CardContent>
          </Card>
        ) : (
          // Actual duas
          filteredDuas.map(dua => (
            <Card key={dua.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{dua.name}</CardTitle>
                    <CardDescription className="font-arabic">{dua.arabicName}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Volume className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Arabic text */}
                <div className="mb-4">
                  <p className="text-xl rtl text-right font-arabic leading-loose mb-2">
                    {dua.arabicText}
                  </p>
                </div>
                
                {/* Transliteration */}
                <div className="mb-4">
                  <p className="text-sm italic text-gray-600 dark:text-gray-400 mb-2">
                    {dua.transliteration}
                  </p>
                </div>
                
                {/* Translation */}
                <div className="mb-4">
                  <p className="text-base text-gray-700 dark:text-gray-300">
                    {dua.translation}
                  </p>
                </div>
                
                {/* Source and recitation info */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <p><strong>Source:</strong> {dua.source}</p>
                    <p><strong>Recitation:</strong> {dua.recitation}</p>
                  </div>
                  <Link href={`/dua/${dua.id}`}>
                    <Button variant="outline" size="sm">Read More</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      {/* Load more button (for future pagination) */}
      {!loading && filteredDuas.length > 0 && (
        <div className="mt-8 text-center">
          <Button variant="outline">Load More Duas</Button>
        </div>
      )}
    </main>
  );
}