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
import { Share2, BookmarkPlus, Copy, Volume } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import content from collection pages
const COLLECTION_DUAS = {
  "morning-1": {
    id: "morning-1",
    category: "morning-evening",
    categoryName: "Morning & Evening Adhkar",
    name: "Morning Protection",
    arabicName: "دعاء الحماية الصباحية",
    arabicText: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i, wa huwas-sami'ul-'aleem",
    translation: "In the name of Allah, with Whose name nothing can cause harm on earth or in the heavens, and He is the All-Hearing, the All-Knowing.",
    reference: "Abu Dawud, Tirmidhi",
    whenToRecite: "Morning, three times",
    virtue: "Whoever recites this three times in the morning and evening, nothing will harm them.",
    notes: "This dua provides comprehensive protection from all harm by invoking the name of Allah, who has power over all things in the heavens and the earth.",
    wordByWord: [
      { arabic: "بِسْمِ", meaning: "In the name" },
      { arabic: "اللَّهِ", meaning: "of Allah" },
      { arabic: "الَّذِي", meaning: "who" },
      { arabic: "لَا", meaning: "not" },
      { arabic: "يَضُرُّ", meaning: "causes harm" },
      { arabic: "مَعَ", meaning: "with" },
      { arabic: "اسْمِهِ", meaning: "His name" },
      { arabic: "شَيْءٌ", meaning: "anything" },
      { arabic: "فِي", meaning: "in" },
      { arabic: "الْأَرْضِ", meaning: "the earth" },
      { arabic: "وَلَا", meaning: "nor" },
      { arabic: "فِي", meaning: "in" },
      { arabic: "السَّمَاءِ", meaning: "the heaven" },
      { arabic: "وَهُوَ", meaning: "and He is" },
      { arabic: "السَّمِيعُ", meaning: "the All-Hearing" },
      { arabic: "الْعَلِيمُ", meaning: "the All-Knowing" }
    ]
  },
  "morning-2": {
    id: "morning-2",
    category: "morning-evening",
    categoryName: "Morning & Evening Adhkar",
    name: "Morning Gratitude",
    arabicName: "دعاء الشكر الصباحي",
    arabicText: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
    transliteration: "Asbahna wa asbahal-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la shareeka lah",
    translation: "We have reached the morning and the kingdom belongs to Allah. Praise is to Allah. None has the right to be worshipped except Allah, alone, without partner.",
    reference: "Abu Dawud, Tirmidhi",
    whenToRecite: "Once in morning",
    virtue: "Whoever recites this in the morning has thanked Allah for the day.",
    notes: "This supplication acknowledges Allah's sovereignty over all creation and expresses gratitude for the blessings of the new day.",
    wordByWord: [
      { arabic: "أَصْبَحْنَا", meaning: "We have reached the morning" },
      { arabic: "وَأَصْبَحَ", meaning: "and has reached the morning" },
      { arabic: "الْمُلْكُ", meaning: "the dominion" },
      { arabic: "لِلَّهِ", meaning: "to Allah" },
      { arabic: "وَالْحَمْدُ", meaning: "and all praise" },
      { arabic: "لِلَّهِ", meaning: "is for Allah" }
    ]
  },
  "quran-1": {
    id: "quran-1",
    category: "quran",
    categoryName: "Quranic Duas",
    name: "Dua from Surah Al-Baqarah",
    arabicName: "دعاء من سورة البقرة",
    arabicText: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina 'adhaban-nar",
    translation: "Our Lord, give us in this world that which is good and in the Hereafter that which is good, and protect us from the punishment of the Fire.",
    reference: "Quran 2:201",
    whenToRecite: "Anytime, especially after prayers",
    virtue: "This was one of the most frequent supplications of the Prophet Muhammad (PBUH).",
    notes: "This concise yet comprehensive dua asks for good in both worldly matters and the hereafter, as well as protection from punishment.",
    wordByWord: [
      { arabic: "رَبَّنَا", meaning: "Our Lord" },
      { arabic: "آتِنَا", meaning: "grant us" },
      { arabic: "فِي", meaning: "in" },
      { arabic: "الدُّنْيَا", meaning: "this world" },
      { arabic: "حَسَنَةً", meaning: "that which is good" },
      { arabic: "وَفِي", meaning: "and in" },
      { arabic: "الآخِرَةِ", meaning: "the Hereafter" },
      { arabic: "حَسَنَةً", meaning: "that which is good" },
      { arabic: "وَقِنَا", meaning: "and protect us" },
      { arabic: "عَذَابَ", meaning: "from the punishment" },
      { arabic: "النَّارِ", meaning: "of the Fire" }
    ]
  },
  "evening-1": {
    id: "evening-1",
    category: "morning-evening",
    categoryName: "Morning & Evening Adhkar",
    name: "Evening Protection",
    arabicName: "دعاء الحماية المسائية",
    arabicText: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Amsayna wa amsal-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadeer",
    translation: "We have reached the evening and the kingdom belongs to Allah. Praise is to Allah. None has the right to be worshipped except Allah, alone, without partner. To Him belongs the dominion and praise, and He is able to do all things.",
    reference: "Abu Dawud, Tirmidhi",
    whenToRecite: "Once in evening",
    virtue: "Whoever recites this in the evening has thanked Allah for the night and sought His protection.",
    notes: "This evening supplication mirrors the morning one, acknowledging Allah's sovereignty as day transitions to night.",
    wordByWord: [
      { arabic: "أَمْسَيْنَا", meaning: "We have reached the evening" },
      { arabic: "وَأَمْسَى", meaning: "and has reached the evening" },
      { arabic: "الْمُلْكُ", meaning: "the dominion" },
      { arabic: "لِلَّهِ", meaning: "to Allah" }
    ]
  },
  "travel-1": {
    id: "travel-1",
    category: "travel",
    categoryName: "Travel Duas",
    name: "Dua for Beginning Journey",
    arabicName: "دعاء السفر",
    arabicText: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
    transliteration: "Allahu akbar, Allahu akbar, Allahu akbar, subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrineen, wa inna ila rabbina lamunqaliboon",
    translation: "Allah is the Greatest, Allah is the Greatest, Allah is the Greatest. Glory be to Him who has subjected this to us, and we could never have it (by our efforts). And to our Lord, surely, must we return!",
    reference: "Quran 43:13-14, Abu Dawud, Tirmidhi",
    whenToRecite: "When beginning any journey",
    virtue: "This dua ensures Allah's protection during travel and reminds us of our ultimate return to Him.",
    notes: "Based on Quranic verses, this supplication acknowledges that all modes of transport are gifts from Allah.",
    wordByWord: [
      { arabic: "سُبْحَانَ", meaning: "Glory be to" },
      { arabic: "الَّذِي", meaning: "the One who" },
      { arabic: "سَخَّرَ", meaning: "has subjected" },
      { arabic: "لَنَا", meaning: "for us" },
      { arabic: "هَذَا", meaning: "this" }
    ]
  },
  "food-1": {
    id: "food-1",
    category: "food",
    categoryName: "Food & Drink Duas",
    name: "Before Eating",
    arabicName: "دعاء قبل الطعام",
    arabicText: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah",
    translation: "In the name of Allah",
    reference: "Abu Dawud, Tirmidhi",
    whenToRecite: "Before eating any meal",
    virtue: "Mentioning Allah's name before eating brings blessing to the food and protection from harm.",
    notes: "The simplest yet most important dua before eating. If forgotten at the beginning, say 'Bismillahi awwalahu wa akhirahu' (In the name of Allah at its beginning and end).",
    wordByWord: [
      { arabic: "بِسْمِ", meaning: "In the name" },
      { arabic: "اللَّهِ", meaning: "of Allah" }
    ]
  },
  "food-2": {
    id: "food-2",
    category: "food",
    categoryName: "Food & Drink Duas",
    name: "After Eating",
    arabicName: "دعاء بعد الطعام",
    arabicText: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلاَ قُوَّةٍ",
    transliteration: "Alhamdu lillahil-ladhi at'amani hadha wa razaqaneehi min ghayri hawlin minnee wa la quwwah",
    translation: "All praise is due to Allah who has fed me this and provided it for me without any might or power on my part.",
    reference: "Abu Dawud, Tirmidhi",
    whenToRecite: "After finishing any meal",
    virtue: "Whoever recites this dua after eating, their past sins will be forgiven.",
    notes: "This dua acknowledges that all sustenance comes from Allah alone, not from our own efforts or strength.",
    wordByWord: [
      { arabic: "الْحَمْدُ", meaning: "All praise" },
      { arabic: "لِلَّهِ", meaning: "is for Allah" },
      { arabic: "الَّذِي", meaning: "who" },
      { arabic: "أَطْعَمَنِي", meaning: "has fed me" },
      { arabic: "هَذَا", meaning: "this" }
    ]
  },
  "quran-2": {
    id: "quran-2",
    category: "quran",
    categoryName: "Quranic Duas",
    name: "Seeking Guidance",
    arabicName: "دعاء طلب الهداية",
    arabicText: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ",
    transliteration: "Rabbana la tuzigh quloobana ba'da idh hadaytana wa hab lana min ladunka rahmah, innaka antal-wahhab",
    translation: "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.",
    reference: "Quran 3:8",
    whenToRecite: "When seeking steadfastness in faith",
    virtue: "This dua asks Allah to keep our hearts firm on guidance and to grant us His mercy.",
    notes: "This is the prayer of those who are deeply rooted in knowledge, seeking continuous guidance from Allah.",
    wordByWord: [
      { arabic: "رَبَّنَا", meaning: "Our Lord" },
      { arabic: "لَا", meaning: "do not" },
      { arabic: "تُزِغْ", meaning: "deviate" },
      { arabic: "قُلُوبَنَا", meaning: "our hearts" },
      { arabic: "بَعْدَ", meaning: "after" },
      { arabic: "إِذْ", meaning: "when" },
      { arabic: "هَدَيْتَنَا", meaning: "You guided us" }
    ]
  }
};

// Detailed dua data
const DUA_DETAILS = {
  "protection-1": {
    id: "protection-1",
    category: "protection",
    categoryName: "Protection & Healing",
    name: "Dua for Protection",
    arabicName: "دعاء للحماية",
    arabicText: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i, wa huwas-sami'ul-'aleem",
    translation: "In the name of Allah, with Whose name nothing can cause harm on earth or in the heavens, and He is the All-Hearing, the All-Knowing.",
    reference: "Abu Dawud 4/323, Tirmidhi 5/465",
    whenToRecite: "Morning and evening, three times each",
    virtue: "Whoever recites this three times in the morning and evening, nothing will harm them.",
    notes: "This dua provides comprehensive protection from all harm by invoking the name of Allah, who has power over all things in the heavens and the earth.",
    wordByWord: [
      { arabic: "بِسْمِ", meaning: "In the name" },
      { arabic: "اللَّهِ", meaning: "of Allah" },
      { arabic: "الَّذِي", meaning: "who" },
      { arabic: "لَا", meaning: "not" },
      { arabic: "يَضُرُّ", meaning: "causes harm" },
      { arabic: "مَعَ", meaning: "with" },
      { arabic: "اسْمِهِ", meaning: "His name" },
      { arabic: "شَيْءٌ", meaning: "anything" },
      { arabic: "فِي", meaning: "in" },
      { arabic: "الْأَرْضِ", meaning: "the earth" },
      { arabic: "وَلَا", meaning: "nor" },
      { arabic: "فِي", meaning: "in" },
      { arabic: "السَّمَاءِ", meaning: "the heaven" },
      { arabic: "وَهُوَ", meaning: "and He is" },
      { arabic: "السَّمِيعُ", meaning: "the All-Hearing" },
      { arabic: "الْعَلِيمُ", meaning: "the All-Knowing" }
    ]
  },
  "morning-1": {
    id: "morning-1",
    category: "morning-evening",
    categoryName: "Morning & Evening",
    name: "Morning Remembrance",
    arabicName: "ذكر الصباح",
    arabicText: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Asbahna wa asbahal-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamd, wa huwa 'ala kulli shay'in qadeer",
    translation: "We have reached the morning and the kingdom belongs to Allah. Praise is to Allah. None has the right to be worshipped except Allah, alone, without partner. To Him belongs the dominion, to Him belongs all praise, and He is over all things Omnipotent.",
    reference: "Abu Dawud, Tirmidhi",
    whenToRecite: "In the morning, once",
    virtue: "Whoever recites this in the morning has thanked Allah for the day.",
    notes: "This supplication acknowledges Allah's sovereignty over all creation and expresses gratitude for the blessings of the new day. It is a way to begin the day with remembrance of Allah.",
    wordByWord: [
      { arabic: "أَصْبَحْنَا", meaning: "We have reached the morning" },
      { arabic: "وَأَصْبَحَ", meaning: "and has reached the morning" },
      { arabic: "الْمُلْكُ", meaning: "the dominion" },
      { arabic: "لِلَّهِ", meaning: "to Allah" },
      { arabic: "وَالْحَمْدُ", meaning: "and all praise" },
      { arabic: "لِلَّهِ", meaning: "is for Allah" },
      { arabic: "لاَ", meaning: "there is no" },
      { arabic: "إِلَـهَ", meaning: "deity" },
      { arabic: "إِلاَّ", meaning: "except" },
      { arabic: "اللهُ", meaning: "Allah" },
      { arabic: "وَحْدَهُ", meaning: "alone" },
      { arabic: "لاَ", meaning: "no" },
      { arabic: "شَرِيكَ", meaning: "partner" },
      { arabic: "لَهُ", meaning: "for Him" },
      { arabic: "لَهُ", meaning: "to Him" },
      { arabic: "الْمُلْكُ", meaning: "belongs the dominion" },
      { arabic: "وَلَهُ", meaning: "and to Him" },
      { arabic: "الْحَمْدُ", meaning: "belongs all praise" },
      { arabic: "وَهُوَ", meaning: "and He is" },
      { arabic: "عَلَى", meaning: "over" },
      { arabic: "كُلِّ", meaning: "all" },
      { arabic: "شَيْءٍ", meaning: "things" },
      { arabic: "قَدِيرٌ", meaning: "Omnipotent" }
    ]
  },
  "quran-1": {
    id: "quran-1",
    category: "quran",
    categoryName: "From the Quran",
    name: "Dua from Surah Al-Baqarah",
    arabicName: "دعاء من سورة البقرة",
    arabicText: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina 'adhaban-nar",
    translation: "Our Lord, give us in this world that which is good and in the Hereafter that which is good, and protect us from the punishment of the Fire.",
    reference: "Quran 2:201",
    whenToRecite: "Anytime, especially after prayers",
    virtue: "This was one of the most frequent supplications of the Prophet Muhammad (PBUH).",
    notes: "This concise yet comprehensive dua asks for good in both worldly matters and the hereafter, as well as protection from punishment. It encompasses all aspects of a believer's needs.",
    wordByWord: [
      { arabic: "رَبَّنَا", meaning: "Our Lord" },
      { arabic: "آتِنَا", meaning: "grant us" },
      { arabic: "فِي", meaning: "in" },
      { arabic: "الدُّنْيَا", meaning: "this world" },
      { arabic: "حَسَنَةً", meaning: "that which is good" },
      { arabic: "وَفِي", meaning: "and in" },
      { arabic: "الآخِرَةِ", meaning: "the Hereafter" },
      { arabic: "حَسَنَةً", meaning: "that which is good" },
      { arabic: "وَقِنَا", meaning: "and protect us" },
      { arabic: "عَذَابَ", meaning: "from the punishment" },
      { arabic: "النَّارِ", meaning: "of the Fire" }
    ]
  }
};

export default function DuaDetail() {
  const [, params] = useRoute("/dua/:id");
  const [loading, setLoading] = useState(true);
  const [dua, setDua] = useState<any>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [showWordByWord, setShowWordByWord] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, we would fetch the dua data from an API
    const fetchDua = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const duaId = params?.id || "";
        
        // First check in DUA_DETAILS, then in COLLECTION_DUAS
        let duaData = DUA_DETAILS[duaId as keyof typeof DUA_DETAILS];
        
        if (!duaData) {
          duaData = COLLECTION_DUAS[duaId as keyof typeof COLLECTION_DUAS];
        }
        
        if (duaData) {
          setDua(duaData);
          document.title = `${duaData.name} - Dua - MyQuran`;
        } else {
          // Handle dua not found
          document.title = "Dua Not Found - MyQuran";
        }
      } catch (error) {
        console.error("Error fetching dua:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDua();
  }, [params]);
  
  const copyToClipboard = () => {
    if (!dua) return;
    
    const textToCopy = `${dua.arabicText}\n\n${dua.transliteration}\n\n${dua.translation}\n\nReference: ${dua.reference}`;
    
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setCopiedText(true);
        toast({
          title: "Copied to clipboard",
          description: "Dua text has been copied to your clipboard.",
          duration: 3000,
        });
        
        // Reset copy status after 3 seconds
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
  
  // Handle dua not found
  if (!loading && !dua) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Dua Not Found</CardTitle>
            <CardDescription>The dua you are looking for does not exist or has been removed.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Please check the URL and try again, or browse our dua collections.</p>
          </CardContent>
          <CardFooter>
            <Link href="/duas">
              <Button>Back to Duas</Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
    );
  }
  
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      {loading ? (
        // Loading skeleton
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
      ) : (
        // Dua content
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{dua.name}</CardTitle>
                <CardDescription>{dua.arabicName}</CardDescription>
              </div>
              <Badge>{dua.categoryName}</Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Arabic text */}
            <div className="border-b pb-4">
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Arabic Text</h3>
              <p className="text-xl rtl text-right font-arabic leading-loose">{dua.arabicText}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 text-primary hover:text-primary/80"
              >
                <Volume className="h-4 w-4 mr-2" />
                Play Audio
              </Button>
            </div>
            
            {/* Transliteration */}
            <div className="border-b pb-4">
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Transliteration</h3>
              <p className="text-base italic">{dua.transliteration}</p>
            </div>
            
            {/* Translation */}
            <div className="border-b pb-4">
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Translation</h3>
              <p className="text-base">{dua.translation}</p>
            </div>
            
            {/* Word by word */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm text-gray-500 dark:text-gray-400">Word by Word</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowWordByWord(!showWordByWord)}
                >
                  {showWordByWord ? "Hide" : "Show"}
                </Button>
              </div>
              
              {showWordByWord && dua.wordByWord && dua.wordByWord.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {dua.wordByWord.map((word: any, index: number) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 p-2 rounded text-center">
                      <p className="font-arabic text-lg mb-1">{word.arabic}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{word.meaning}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Reference */}
            <div className="border-b pb-4">
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Reference</h3>
              <p>{dua.reference}</p>
            </div>
            
            {/* When to recite */}
            <div className="border-b pb-4">
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">When to Recite</h3>
              <p>{dua.whenToRecite}</p>
            </div>
            
            {/* Virtue */}
            <div className="border-b pb-4">
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Virtue</h3>
              <p>{dua.virtue}</p>
            </div>
            
            {/* Notes */}
            <div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Notes</h3>
              <p className="text-sm">{dua.notes}</p>
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
      )}
    </main>
  );
}