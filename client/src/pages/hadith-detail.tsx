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

// Import hadith collections data - this matches the structure in hadith-collection.tsx
const COLLECTION_HADITHS = {
  bukhari: [
    {
      id: "bukhari-1",
      hadithNumber: 1,
      bookNumber: 1,
      chapterTitle: "How the Divine Revelation started being revealed to Allah's Messenger",
      arabicText: "حَدَّثَنَا الْحُمَيْدِيُّ عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ، قَالَ حَدَّثَنَا سُفْيَانُ، قَالَ حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ الأَنْصَارِيُّ، قَالَ أَخْبَرَنِي مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ، أَنَّهُ سَمِعَ عَلْقَمَةَ بْنَ وَقَّاصٍ اللَّيْثِيَّ، يَقُولُ سَمِعْتُ عُمَرَ بْنَ الْخَطَّابِ رضى الله عنه عَلَى الْمِنْبَرِ قَالَ سَمِعْتُ رَسُولَ اللَّهِ صلى الله عليه وسلم يَقُولُ ‏\"‏ إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ ‏\"‏",
      englishText: "Narrated 'Umar bin Al-Khattab: I heard Allah's Messenger (ﷺ) saying, \"The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended. So whoever emigrates for worldly benefits or for a woman to marry, his emigration will be for what he emigrated for.\"",
      narrator: "'Umar ibn al-Khattab",
      grade: "Sahih",
      collectionName: "Sahih al-Bukhari"
    },
    {
      id: "bukhari-2",
      hadithNumber: 2,
      bookNumber: 1,
      chapterTitle: "How the Divine Revelation started being revealed to Allah's Messenger",
      arabicText: "حَدَّثَنَا عَبْدُ اللَّهِ بْنُ يُوسُفَ، قَالَ أَخْبَرَنَا مَالِكٌ، عَنْ هِشَامِ بْنِ عُرْوَةَ، عَنْ أَبِيهِ، عَنْ عَائِشَةَ أُمِّ الْمُؤْمِنِينَ ـ رضى الله عنها ـ أَنَّ الْحَارِثَ بْنَ هِشَامٍ ـ رضى الله عنه ـ سَأَلَ رَسُولَ اللَّهِ صلى الله عليه وسلم فَقَالَ يَا رَسُولَ اللَّهِ كَيْفَ يَأْتِيكَ الْوَحْىُ فَقَالَ رَسُولَ اللَّهِ صلى الله عليه وسلم ‏\"‏ أَحْيَانًا يَأْتِينِي مِثْلَ صَلْصَلَةِ الْجَرَسِ وَهُوَ أَشَدُّهُ عَلَىَّ، فَيُفْصَمُ عَنِّي وَقَدْ وَعَيْتُ عَنْهُ مَا قَالَ، وَأَحْيَانًا يَتَمَثَّلُ لِيَ الْمَلَكُ رَجُلاً فَيُكَلِّمُنِي فَأَعِي مَا يَقُولُ ‏\"‏",
      englishText: "Narrated 'Aisha: (the mother of the faithful believers) Al-Harith bin Hisham asked Allah's Messenger \"O Allah's Messenger! How is the Divine Inspiration revealed to you?\" Allah's Messenger replied, \"Sometimes it is (revealed) like the ringing of a bell, this form of Inspiration is the hardest of all and then this state passes off after I have grasped what is inspired. Sometimes the Angel comes in the form of a man and talks to me and I grasp whatever he says.\"",
      narrator: "'Aisha (Mother of the Believers)",
      grade: "Sahih",
      collectionName: "Sahih al-Bukhari"
    },
    {
      id: "bukhari-3",
      hadithNumber: 52,
      bookNumber: 2,
      chapterTitle: "Belief",
      arabicText: "حَدَّثَنَا أَبُو الْيَمَانِ، قَالَ أَخْبَرَنَا شُعَيْبٌ، قَالَ حَدَّثَنَا أَبُو الزِّنَادِ، عَنِ الأَعْرَجِ، عَنْ أَبِي هُرَيْرَةَ ـ رضى الله عنه ـ أَنَّ رَسُولَ اللَّهِ صلى الله عليه وسلم قَالَ ‏\"‏ فَوَالَّذِي نَفْسِي بِيَدِهِ، لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى أَكُونَ أَحَبَّ إِلَيْهِ مِنْ وَالِدِهِ وَوَلَدِهِ ‏\"‏",
      englishText: "Narrated Abu Huraira: Allah's Messenger (ﷺ) said, \"By Him in Whose Hands my life is, none of you will believe unless I am dearer to him than his father and his children.\"",
      narrator: "Abu Huraira",
      grade: "Sahih",
      collectionName: "Sahih al-Bukhari"
    },
    {
      id: "bukhari-4",
      hadithNumber: 15,
      bookNumber: 2,
      chapterTitle: "Belief",
      arabicText: "حَدَّثَنَا قُتَيْبَةُ بْنُ سَعِيدٍ، قَالَ حَدَّثَنَا إِسْمَاعِيلُ بْنُ جَعْفَرٍ، عَنْ عَبْدِ اللَّهِ بْنِ دِينَارٍ، عَنْ عَبْدِ اللَّهِ بْنِ عُمَرَ ـ رضى الله عنهما ـ أَنَّ رَسُولَ اللَّهِ صلى الله عليه وسلم قَالَ ‏\"‏ الْمُسْلِمُ أَخُو الْمُسْلِمِ لاَ يَظْلِمُهُ وَلاَ يُسْلِمُهُ، وَمَنْ كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ، وَمَنْ فَرَّجَ عَنْ مُسْلِمٍ كُرْبَةً فَرَّجَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرُبَاتِ يَوْمِ الْقِيَامَةِ ‏\"‏",
      englishText: "Narrated 'Abdullah bin 'Umar: Allah's Messenger (ﷺ) said, \"A Muslim is a brother of another Muslim, so he should not oppress him, nor should he hand him over to an oppressor. Whoever fulfilled the needs of his brother, Allah will fulfill his needs; whoever brought his (Muslim) brother out of a discomfort, Allah will bring him out of the discomforts of the Day of Resurrection.\"",
      narrator: "'Abdullah bin 'Umar",
      grade: "Sahih",
      collectionName: "Sahih al-Bukhari"
    },
    {
      id: "bukhari-5",
      hadithNumber: 10,
      bookNumber: 2,
      chapterTitle: "Belief",
      arabicText: "حَدَّثَنَا أَبُو الْيَمَانِ، قَالَ أَخْبَرَنَا شُعَيْبٌ، عَنِ الزُّهْرِيِّ، قَالَ أَخْبَرَنِي أَنَسُ بْنُ مَالِكٍ، أَنَّ النَّبِيَّ صلى الله عليه وسلم قَالَ ‏\"‏ لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ ‏\"‏",
      englishText: "Narrated Anas: The Prophet (ﷺ) said, \"None of you will believe until he wishes for his (Muslim) brother what he wishes for himself.\"",
      narrator: "Anas ibn Malik",
      grade: "Sahih",
      collectionName: "Sahih al-Bukhari"
    }
  ],
  muslim: [
    {
      id: "muslim-1",
      hadithNumber: 1,
      bookNumber: 1,
      chapterTitle: "The Book of Faith",
      arabicText: "حَدَّثَنِي يَحْيَى بْنُ يَحْيَى، قَالَ قَرَأْتُ عَلَى مَالِكٍ عَنْ يَحْيَى بْنِ سَعِيدٍ، عَنْ مُحَمَّدِ بْنِ إِبْرَاهِيمَ، عَنْ عَلْقَمَةَ بْنِ وَقَّاصٍ، عَنْ عُمَرَ بْنِ الْخَطَّابِ، قَالَ سَمِعْتُ رَسُولَ اللَّهِ صلى الله عليه وسلم يَقُولُ ‏\"‏ إِنَّمَا الأَعْمَالُ بِالنِّيَّةِ وَإِنَّمَا لاِمْرِئٍ مَا نَوَى فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا أَوِ امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ ‏\"‏",
      englishText: "It is narrated on the authority of 'Umar bin al-Khattab, who said: I heard the Messenger of Allah (ﷺ) say: \"Actions are (judged) by motives (niyyah), so each man will have what he intended. Thus, he whose migration (hijrah) was to Allah and His Messenger, his migration is to Allah and His Messenger; but he whose migration was for some worldly thing he might gain, or for a wife he might marry, his migration is to that for which he migrated.\"",
      narrator: "'Umar ibn al-Khattab",
      grade: "Sahih",
      collectionName: "Sahih Muslim"
    }
  ]
};

export default function HadithDetail() {
  const [, params] = useRoute("/hadith/:id");
  const [loading, setLoading] = useState(true);
  const [hadith, setHadith] = useState<any>(null);
  const [copiedText, setCopiedText] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchHadith = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const hadithId = params?.id || "";
        console.log("Looking for hadith ID:", hadithId);
        console.log("Available collections:", Object.keys(COLLECTION_HADITHS));
        
        // Search through all collections to find the hadith
        let foundHadith = null;
        
        // Check in bukhari collection
        if (COLLECTION_HADITHS.bukhari) {
          console.log("Bukhari hadiths:", COLLECTION_HADITHS.bukhari.map(h => h.id));
          foundHadith = COLLECTION_HADITHS.bukhari.find(h => h.id === hadithId);
          if (foundHadith) console.log("Found in Bukhari:", foundHadith);
        }
        
        // Check in muslim collection if not found
        if (!foundHadith && COLLECTION_HADITHS.muslim) {
          console.log("Muslim hadiths:", COLLECTION_HADITHS.muslim.map(h => h.id));
          foundHadith = COLLECTION_HADITHS.muslim.find(h => h.id === hadithId);
          if (foundHadith) console.log("Found in Muslim:", foundHadith);
        }
        
        if (!foundHadith) {
          console.log("Hadith not found with ID:", hadithId);
        }
        
        if (foundHadith) {
          console.log("Setting hadith state:", foundHadith);
          setHadith(foundHadith);
          document.title = `${foundHadith.collectionName} #${foundHadith.hadithNumber} - MyQuran`;
        } else {
          console.log("No hadith found - setting title to not found");
          document.title = "Hadith Not Found - MyQuran";
        }
      } catch (error) {
        console.error("Error fetching hadith:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHadith();
  }, [params]);
  
  const copyToClipboard = () => {
    if (!hadith) return;
    
    const text = `${hadith.arabicText}\n\n${hadith.englishText}\n\nNarrated by ${hadith.narrator} - ${hadith.collectionName}`;
    
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedText(true);
        toast({
          title: "Copied to clipboard",
          description: "Hadith text has been copied to your clipboard.",
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
  
  console.log("Render state - loading:", loading, "hadith:", hadith);

  if (loading) {
    console.log("Rendering loading state");
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

  if (!hadith) {
    console.log("Rendering not found state");
    return (
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <Link href="/hadiths">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Hadiths
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Hadith Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The requested hadith could not be found.</p>
          </CardContent>
        </Card>
      </main>
    );
  }

  console.log("Rendering hadith content:", hadith);

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <Link href="/hadiths">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hadiths
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{hadith.collectionName}</CardTitle>
              <CardDescription>
                Hadith #{hadith.hadithNumber} • Book {hadith.bookNumber} • {hadith.chapterTitle}
              </CardDescription>
            </div>
            <Badge variant="secondary">{hadith.grade}</Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Arabic text */}
          <div className="border-l-4 border-blue-500 pl-6 py-4 bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl rtl text-right font-arabic leading-loose text-gray-800 dark:text-gray-200">
              {hadith.arabicText}
            </p>
          </div>
          
          {/* English translation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Translation
            </h3>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {hadith.englishText}
            </p>
          </div>
          
          {/* Narrator information */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <span className="font-semibold">Narrated by:</span> {hadith.narrator}
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