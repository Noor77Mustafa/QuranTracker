import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Share2, BookmarkPlus, Copy, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Authentic duas from Islamic sources - matches dua-collection.tsx structure
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
      name: "Rabbana Atina",
      arabicName: "ربنا آتنا",
      arabicText: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      transliteration: "Rabbana atina fi'd-dunya hasanatan wa fi'l-akhirati hasanatan wa qina 'adhab an-nar",
      translation: "Our Lord, grant us good in this world and good in the next world, and save us from the punishment of the Fire.",
      source: "Quran 2:201",
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

export default function DuaDetail() {
  const [, params] = useRoute("/dua/:id");
  const [loading, setLoading] = useState(true);
  const [dua, setDua] = useState<any>(null);
  const [copiedText, setCopiedText] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchDua = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const duaId = params?.id || "";
        console.log("Looking for dua ID:", duaId);
        console.log("Available categories:", Object.keys(CATEGORY_DUAS));
        
        // Search through all dua categories to find the dua
        let foundDua = null;
        
        // Check each category
        for (const [categoryName, categoryDuas] of Object.entries(CATEGORY_DUAS)) {
          console.log(`Checking ${categoryName} category:`, categoryDuas.map(d => d.id));
          foundDua = categoryDuas.find(d => d.id === duaId);
          if (foundDua) {
            console.log("Found dua in category", categoryName, ":", foundDua);
            break;
          }
        }
        
        if (!foundDua) {
          console.log("Dua not found with ID:", duaId);
        }
        
        if (foundDua) {
          console.log("Setting dua state:", foundDua);
          setDua(foundDua);
          setLoading(false);
          document.title = `${foundDua.name} - Dua - MyQuran`;
        } else {
          console.log("No dua found - setting title to not found");
          setLoading(false);
          document.title = "Dua Not Found - MyQuran";
        }
      } catch (error) {
        console.error("Error fetching dua:", error);
        setLoading(false);
      }
    };
    
    fetchDua();
  }, [params]);
  
  const copyToClipboard = () => {
    if (!dua) return;
    
    const text = `${dua.arabicText}\n\n${dua.transliteration}\n\n${dua.translation}\n\nSource: ${dua.source}`;
    
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedText(true);
        toast({
          title: "Copied to clipboard",
          description: "Dua text has been copied to your clipboard.",
          duration: 3000,
        });
        
        setTimeout(() => setCopiedText(false), 3000);
      },
      () => {
        toast({
          title: "Copy failed",
          description: "Could not copy text to clipboard.",
          variant: "destructive",
          duration: 3000,
        });
      }
    );
  };
  
  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full mb-4" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </main>
    );
  }

  if (!dua) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <Link href="/duas">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Duas
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Dua Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The requested dua could not be found.</p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <Link href="/duas">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Duas
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{dua.name}</CardTitle>
              <CardDescription>{dua.arabicName}</CardDescription>
            </div>
            <Badge variant="secondary">{dua.source}</Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Arabic text */}
          <div className="border-l-4 border-green-500 pl-6 py-4 bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl rtl text-right font-arabic leading-loose text-gray-800 dark:text-gray-200">
              {dua.arabicText}
            </p>
          </div>
          
          {/* Transliteration */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Transliteration
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400 italic">
              {dua.transliteration}
            </p>
          </div>
          
          {/* Translation */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Translation
            </h3>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {dua.translation}
            </p>
          </div>
          
          {/* Recitation info */}
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              <span className="font-semibold">When to recite:</span> {dua.recitation}
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="border-t pt-4 flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="h-4 w-4 mr-2" />
              {copiedText ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <BookmarkPlus className="h-4 w-4 mr-2" />
            Save
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}