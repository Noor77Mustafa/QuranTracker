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
import { Share2, BookmarkPlus, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import content from collection pages
const COLLECTION_HADITHS = {
  "bukhari-1": {
    id: "bukhari-1",
    collection: "bukhari",
    collectionName: "Sahih al-Bukhari",
    bookNumber: 1,
    chapterNumber: 1,
    hadithNumber: 1,
    volumeNumber: 1,
    chapterTitle: "How the Divine Revelation started being revealed to Allah's Messenger",
    chapterTitleArabic: "بدء الوحي",
    arabicText: "حَدَّثَنَا الْحُمَيْدِيُّ عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ، قَالَ حَدَّثَنَا سُفْيَانُ، قَالَ حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ الأَنْصَارِيُّ، قَالَ أَخْبَرَنِي مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ، أَنَّهُ سَمِعَ عَلْقَمَةَ بْنَ وَقَّاصٍ اللَّيْثِيَّ، يَقُولُ سَمِعْتُ عُمَرَ بْنَ الْخَطَّابِ رضى الله عنه عَلَى الْمِنْبَرِ قَالَ سَمِعْتُ رَسُولَ اللَّهِ صلى الله عليه وسلم يَقُولُ ‏\"‏ إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ ‏\"‏‏.‏",
    englishText: "Narrated 'Umar bin Al-Khattab: I heard Allah's Messenger (ﷺ) saying, \"The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended. So whoever emigrates for worldly benefits or for a woman to marry, his emigration will be for what he emigrated for.\"",
    grade: "Sahih",
    narrator: "'Umar bin Al-Khattab",
    references: [
      { collection: "Sahih al-Bukhari", volume: 1, book: 1, hadith: 1 },
      { collection: "Sahih Muslim", book: 33, hadith: 222 }
    ],
    topics: ["Intention", "Deeds", "Rewards", "Migration"],
    explanations: [
      {
        scholar: "Ibn Hajar al-Asqalani",
        text: "This hadith emphasizes that the value of actions depends on the intention behind them. It is considered one of the most important hadiths in Islam as it sets the foundation for sincerity in all acts of worship and dealings."
      },
      {
        scholar: "Imam Nawawi",
        text: "This hadith is one-third of Islamic knowledge as all actions fall under three categories: beliefs, actions, and intentions. This hadith covers the entire area of intentions."
      }
    ]
  },
  "bukhari-2": {
    id: "bukhari-2",
    collection: "bukhari",
    collectionName: "Sahih al-Bukhari",
    bookNumber: 1,
    chapterNumber: 1,
    hadithNumber: 2,
    volumeNumber: 1,
    chapterTitle: "How the Divine Revelation started being revealed to Allah's Messenger",
    chapterTitleArabic: "بدء الوحي",
    arabicText: "حَدَّثَنَا عَبْدُ اللَّهِ بْنُ يُوسُفَ، قَالَ أَخْبَرَنَا مَالِكٌ، عَنْ هِشَامِ بْنِ عُرْوَةَ، عَنْ أَبِيهِ، عَنْ عَائِشَةَ أُمِّ الْمُؤْمِنِينَ ـ رضى الله عنها ـ أَنَّ الْحَارِثَ بْنَ هِشَامٍ ـ رضى الله عنه ـ سَأَلَ رَسُولَ اللَّهِ صلى الله عليه وسلم فَقَالَ يَا رَسُولَ اللَّهِ كَيْفَ يَأْتِيكَ الْوَحْىُ فَقَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏\"‏ أَحْيَانًا يَأْتِينِي مِثْلَ صَلْصَلَةِ الْجَرَسِ وَهُوَ�شَدُّهُ عَلَىَّ، فَيُفْصَمُ عَنِّي وَقَدْ وَعَيْتُ عَنْهُ مَا قَالَ، وَأَحْيَانًا يَتَمَثَّلُ لِيَ الْمَلَكُ رَجُلاً فَيُكَلِّمُنِي فَأَعِي مَا يَقُولُ ‏\"‏‏.‏ قَالَتْ عَائِشَةُ ـ رضى الله عنها ـ وَلَقَدْ رَأَيْتُهُ يَنْزِلُ عَلَيْهِ الْوَحْىُ فِي الْيَوْمِ الشَّدِيدِ الْبَرْدِ، فَيَفْصِمُ عَنْهُ وَإِنَّ جَبِينَهُ لَيَتَفَصَّدُ عَرَقًا‏.‏",
    englishText: "Narrated 'Aisha: (the mother of the faithful believers) Al-Harith bin Hisham asked Allah's Messenger \"O Allah's Messenger! How is the Divine Inspiration revealed to you?\" Allah's Messenger replied, \"Sometimes it is (revealed) like the ringing of a bell, this form of Inspiration is the hardest of all and then this state passes off after I have grasped what is inspired. Sometimes the Angel comes in the form of a man and talks to me and I grasp whatever he says.\" 'Aisha added: Verily I saw the Prophet being inspired Divinely on a very cold day and noticed the sweat dropping from his forehead (as the Inspiration was over).",
    grade: "Sahih",
    narrator: "'Aisha (Mother of the Believers)",
    references: [
      { collection: "Sahih al-Bukhari", volume: 1, book: 1, hadith: 2 },
      { collection: "Sahih Muslim", book: 43, hadith: 99 }
    ],
    topics: ["Revelation", "Prophet Muhammad", "Divine Inspiration", "Angel Jibril"],
    explanations: [
      {
        scholar: "Ibn Hajar al-Asqalani",
        text: "This hadith describes the different forms in which revelation came to the Prophet. The ringing of a bell indicates the intensity and difficulty of receiving revelation."
      }
    ]
  },
  "bukhari-3": {
    id: "bukhari-3",
    collection: "bukhari",
    collectionName: "Sahih al-Bukhari",
    bookNumber: 1,
    chapterNumber: 1,
    hadithNumber: 3,
    volumeNumber: 1,
    chapterTitle: "How the Divine Revelation started being revealed to Allah's Messenger",
    chapterTitleArabic: "بدء الوحي",
    arabicText: "حَدَّثَنَا يَحْيَى بْنُ بُكَيْرٍ، قَالَ حَدَّثَنَا اللَّيْثُ، عَنْ عُقَيْلٍ، عَنِ ابْنِ شِهَابٍ، عَنْ عُرْوَةَ بْنِ الزُّبَيْرِ، عَنْ عَائِشَةَ أُمِّ الْمُؤْمِنِينَ، أَنَّهَا قَالَتْ أَوَّلُ مَا بُدِئَ بِهِ رَسُولُ اللَّهِ صلى الله عليه وسلم مِنَ الْوَحْىِ الرُّؤْيَا الصَّالِحَةُ فِي النَّوْمِ، فَكَانَ لاَ يَرَى رُؤْيَا إِلاَّ جَاءَتْ مِثْلَ فَلَقِ الصُّبْحِ",
    englishText: "Narrated 'Aisha: (the mother of the faithful believers) The commencement of the Divine Inspiration to Allah's Messenger was in the form of good dreams which came true like bright daylight.",
    grade: "Sahih",
    narrator: "'Aisha (Mother of the Believers)",
    references: [
      { collection: "Sahih al-Bukhari", volume: 1, book: 1, hadith: 3 }
    ],
    topics: ["Revelation", "Dreams", "Prophet Muhammad", "Divine Inspiration"],
    explanations: [
      {
        scholar: "Ibn Hajar al-Asqalani",
        text: "This hadith explains that revelation to the Prophet began with true dreams, which were a preparation for receiving the Quran."
      }
    ]
  },
  "muslim-1": {
    id: "muslim-1",
    collection: "muslim",
    collectionName: "Sahih Muslim",
    bookNumber: 1,
    chapterNumber: 1,
    hadithNumber: 1,
    volumeNumber: 1,
    chapterTitle: "The Book of Faith",
    chapterTitleArabic: "كتاب الإيمان",
    arabicText: "حَدَّثَنِي يَحْيَى بْنُ أَيُّوبَ، وَقُتَيْبَةُ بْنُ سَعِيدٍ، وَعَلِيُّ بْنُ حُجْرٍ، قَالُوا حَدَّثَنَا إِسْمَاعِيلُ، - وَهُوَ ابْنُ جَعْفَرٍ - عَنِ الْعَلاَءِ، عَنْ أَبِيهِ، عَنْ أَبِي هُرَيْرَةَ، أَنَّ رَسُولَ اللَّهِ صلى الله عليه وسلم قَالَ ‏\"‏ الإِيمَانُ بِضْعٌ وَسَبْعُونَ - أَوْ بِضْعٌ وَسِتُّونَ - شُعْبَةً فَأَفْضَلُهَا قَوْلُ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَدْنَاهَا إِمَاطَةُ الأَذَى عَنِ الطَّرِيقِ وَالْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ ‏\"‏",
    englishText: "Narrated Abu Huraira: The Messenger of Allah (ﷺ) said, \"Faith has over seventy branches or over sixty branches, the most excellent of which is the declaration that there is no god but Allah, and the humblest of which is the removal of what is injurious from the path: and modesty is a branch of faith.\"",
    grade: "Sahih",
    narrator: "Abu Huraira",
    references: [
      { collection: "Sahih Muslim", book: 1, hadith: 63 },
      { collection: "Sahih al-Bukhari", volume: 1, book: 2, hadith: 9 }
    ],
    topics: ["Faith", "Good Deeds", "Modesty", "Islamic Values"],
    explanations: [
      {
        scholar: "Imam Nawawi",
        text: "This hadith shows that faith consists of beliefs, statements, and actions. It encompasses both the highest form of worship (the declaration of monotheism) and simple acts of kindness like removing harmful objects from the road."
      }
    ]
  },
  "muslim-2": {
    id: "muslim-2", 
    collection: "muslim",
    collectionName: "Sahih Muslim",
    bookNumber: 1,
    chapterNumber: 1,
    hadithNumber: 16,
    volumeNumber: 1,
    chapterTitle: "The Book of Faith",
    chapterTitleArabic: "كتاب الإيمان",
    arabicText: "حَدَّثَنَا أَبُو بَكْرِ بْنُ أَبِي شَيْبَةَ، حَدَّثَنَا أَبُو مُعَاوِيَةَ، وَوَكِيعٌ، عَنِ الأَعْمَشِ، عَنْ أَبِي صَالِحٍ، عَنْ أَبِي هُرَيْرَةَ، قَالَ قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏\"‏ الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ وَالْمُؤْمِنُ مَنْ أَمِنَهُ النَّاسُ عَلَى دِمَائِهِمْ وَأَمْوَالِهِمْ ‏\"‏",
    englishText: "Narrated Abu Huraira: The Messenger of Allah (ﷺ) said, \"The Muslim is one from whose tongue and hand the Muslims are safe, and the believer is one whom people trust with their blood and wealth.\"",
    grade: "Sahih",
    narrator: "Abu Huraira",
    references: [
      { collection: "Sahih Muslim", book: 1, hadith: 65 },
      { collection: "Jami` at-Tirmidhi", volume: 5, book: 38, hadith: 2627 }
    ],
    topics: ["Character", "Trust", "Safety", "Community"],
    explanations: [
      {
        scholar: "Ibn Rajab al-Hanbali",
        text: "This hadith defines the true Muslim and believer not just by ritual worship, but by their character and how they treat others. Safety and trust are fundamental to Islamic society."
      }
    ]
  },
  "nawawi40-1": {
    id: "nawawi40-1",
    collection: "nawawi40",
    collectionName: "40 Hadith of Imam Nawawi",
    bookNumber: 1,
    chapterNumber: 1,
    hadithNumber: 1,
    volumeNumber: 1,
    chapterTitle: "Actions are by Intentions",
    chapterTitleArabic: "إنما الأعمال بالنيات",
    arabicText: "عَنْ أَمِيرِ الْمُؤْمِنِينَ أَبِي حَفْصٍ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللهُ عَنْهُ قَالَ: سَمِعْت رَسُولَ اللَّهِ صلى الله عليه و سلم يَقُولُ: ‏\"‏ إنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا أَوْ امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إلَى مَا هَاجَرَ إلَيْهِ ‏\"‏",
    englishText: "On the authority of the Commander of the Faithful, Abu Hafs Umar ibn al-Khattab (may Allah be pleased with him), who said: I heard the Messenger of Allah (ﷺ) say: \"Actions are only by intention, and every person will have only what they intended. So whoever's migration was to Allah and His Messenger, then his migration was to Allah and His Messenger. And whoever's migration was for some worldly benefit or to marry a woman, then his migration was for that which he migrated.\"",
    grade: "Sahih",
    narrator: "Umar ibn al-Khattab",
    references: [
      { collection: "Sahih al-Bukhari", volume: 1, book: 1, hadith: 1 },
      { collection: "Sahih Muslim", book: 33, hadith: 222 }
    ],
    topics: ["Intention", "Sincerity", "Migration", "Purification of Heart"],
    explanations: [
      {
        scholar: "Imam Nawawi",
        text: "This hadith is one of the most important in Islam. The scholars say it is one-third of Islamic knowledge, as it covers the realm of intentions which affect all actions."
      },
      {
        scholar: "Ibn Hajar al-Asqalani",
        text: "Al-Bukhari opened his Sahih with this hadith to emphasize that seeking knowledge and teaching it must be done purely for Allah's sake."
      }
    ]
  }
};

// Detailed hadith data with more fields
const HADITH_DETAILS = {
  "bukhari-1": {
    id: "bukhari-1",
    collection: "bukhari",
    collectionName: "Sahih al-Bukhari",
    bookNumber: 1,
    chapterNumber: 1,
    hadithNumber: 1,
    volumeNumber: 1,
    chapterTitle: "How the Divine Revelation started being revealed to Allah's Messenger",
    chapterTitleArabic: "بدء الوحي",
    arabicText: "حَدَّثَنَا الْحُمَيْدِيُّ عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ، قَالَ حَدَّثَنَا سُفْيَانُ، قَالَ حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ الأَنْصَارِيُّ، قَالَ أَخْبَرَنِي مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ، أَنَّهُ سَمِعَ عَلْقَمَةَ بْنَ وَقَّاصٍ اللَّيْثِيَّ، يَقُولُ سَمِعْتُ عُمَرَ بْنَ الْخَطَّابِ رضى الله عنه عَلَى الْمِنْبَرِ قَالَ سَمِعْتُ رَسُولَ اللَّهِ صلى الله عليه وسلم يَقُولُ ‏\"‏ إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ ‏\"‏‏.‏",
    englishText: "Narrated 'Umar bin Al-Khattab: I heard Allah's Messenger (ﷺ) saying, \"The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended. So whoever emigrates for worldly benefits or for a woman to marry, his emigration will be for what he emigrated for.\"",
    grade: "Sahih",
    narrator: "'Umar bin Al-Khattab",
    references: [
      { collection: "Sahih al-Bukhari", volume: 1, book: 1, hadith: 1 },
      { collection: "Sahih Muslim", book: 33, hadith: 222 }
    ],
    topics: ["Intention", "Deeds", "Rewards", "Migration"],
    explanations: [
      {
        scholar: "Ibn Hajar al-Asqalani",
        text: "This hadith emphasizes that the value of actions depends on the intention behind them. It is considered one of the most important hadiths in Islam as it sets the foundation for sincerity in all acts of worship and dealings."
      },
      {
        scholar: "Imam Nawawi",
        text: "This hadith is one-third of Islamic knowledge as all actions fall under three categories: beliefs, actions, and intentions. This hadith covers the entire area of intentions."
      }
    ]
  },
  "nawawi40-13": {
    id: "nawawi40-13",
    collection: "nawawi40",
    collectionName: "40 Hadith Nawawi",
    bookNumber: 1,
    chapterNumber: 13,
    hadithNumber: 13,
    volumeNumber: 1,
    chapterTitle: "Brotherhood in Faith",
    chapterTitleArabic: "الأخوة في الإيمان",
    arabicText: "عَنْ أَبِي حَمْزَةَ أَنَسِ بْنِ مَالِكٍ رَضِيَ اللهُ عَنْهُ خَادِمِ رَسُولِ اللَّهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ عَنْ النَّبِيِّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ قَالَ: لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    englishText: "On the authority of Abu Hamzah Anas bin Malik (may Allah be pleased with him) - the servant of the Messenger of Allah (peace and blessings of Allah be upon him) - that the Prophet (peace and blessings of Allah be upon him) said: \"None of you [truly] believes until he loves for his brother what he loves for himself.\"",
    grade: "Sahih",
    narrator: "Anas bin Malik",
    references: [
      { collection: "Sahih al-Bukhari", volume: 1, book: 2, hadith: 13 },
      { collection: "Sahih Muslim", book: 1, hadith: 72 }
    ],
    topics: ["Faith", "Brotherhood", "Love", "Compassion"],
    explanations: [
      {
        scholar: "Ibn Rajab",
        text: "This hadith teaches that a believer should wish for others what he wishes for himself of goodness, and dislike for them what he dislikes for himself of hardship."
      },
      {
        scholar: "Ibn Daqiq al-'Id",
        text: "This hadith establishes one of the most important principles of human relationships in Islam - that of genuine care for others."
      }
    ]
  },
  "muslim-2553": {
    id: "muslim-2553",
    collection: "muslim",
    collectionName: "Sahih Muslim",
    bookNumber: 32,
    chapterNumber: 17,
    hadithNumber: 2553,
    volumeNumber: 4,
    chapterTitle: "On Virtue, Good Manners and Joining of the Ties of Relationship",
    chapterTitleArabic: "في البر والصلة والآداب",
    arabicText: "عَنْ أَبِي هُرَيْرَةَ، عَنْ رَسُولِ اللَّهِ صلى الله عليه وسلم قَالَ ‏ \"‏ مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ وَمَنْ يَسَّرَ عَلَى مُعْسِرٍ يَسَّرَ اللَّهُ عَلَيْهِ فِي الدُّنْيَا وَالآخِرَةِ وَمَنْ سَتَرَ مُسْلِمًا سَتَرَهُ اللَّهُ فِي الدُّنْيَا وَالآخِرَةِ وَاللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ ‏\"‏ ‏.‏",
    englishText: "Abu Huraira reported Allah's Messenger (ﷺ) as saying: \"Whoever relieves a believer's distress of the distressful aspects of this world, Allah will rescue him from a difficulty of the difficulties of the Hereafter. Whoever alleviates the situation of one in dire straits who cannot repay his debt, Allah will alleviate his lot in both this world and the Hereafter. Whoever conceals the faults of a Muslim, Allah will conceal his faults in this world and the Hereafter. Allah helps His servant as long as the servant helps his brother.\"",
    grade: "Sahih",
    narrator: "Abu Huraira",
    references: [
      { collection: "Sahih Muslim", book: 32, hadith: 2553 },
      { collection: "Sunan Abu Dawud", book: 31, hadith: 4946 }
    ],
    topics: ["Helping Others", "Relief", "Reward", "Brotherhood"],
    explanations: [
      {
        scholar: "Imam Nawawi",
        text: "This hadith encourages Muslims to assist one another, relieve distress, and conceal faults. These actions have a profound effect on one's standing with Allah."
      },
      {
        scholar: "Ibn Uthaymeen",
        text: "The hadith outlines three major acts of kindness: relieving distress, helping the indebted, and concealing faults. Each brings a corresponding reward."
      }
    ]
  }
};

export default function HadithDetail() {
  const [, params] = useRoute("/hadith/:id");
  const [loading, setLoading] = useState(true);
  const [hadith, setHadith] = useState<any>(null);
  const [copiedText, setCopiedText] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, we would fetch the hadith data from an API
    const fetchHadith = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const hadithId = params?.id || "";
        
        // Search for hadith in COLLECTION_HADITHS
        let hadithData = COLLECTION_HADITHS[hadithId as keyof typeof COLLECTION_HADITHS];
        
        if (hadithData) {
          setHadith(hadithData);
          document.title = `${hadithData.collectionName} #${hadithData.hadithNumber} - MyQuran`;
        } else {
          // Handle hadith not found
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
    
    const textToCopy = `${hadith.englishText}\n\n${hadith.arabicText}\n\nReference: ${hadith.collectionName}, Book ${hadith.bookNumber}, Hadith ${hadith.hadithNumber}`;
    
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setCopiedText(true);
        toast({
          title: "Copied to clipboard",
          description: "Hadith text has been copied to your clipboard.",
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
  
  // Handle hadith not found
  if (!loading && !hadith) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Hadith Not Found</CardTitle>
            <CardDescription>The hadith you are looking for does not exist or has been removed.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Please check the URL and try again, or browse our hadith collections.</p>
          </CardContent>
          <CardFooter>
            <Link href="/hadiths">
              <Button>Back to Hadiths</Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
    );
  }
  
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

  if (!hadith) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-3xl">
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

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{hadith.collectionName}</CardTitle>
                <CardDescription>
                  Book {hadith.bookNumber}, Hadith {hadith.hadithNumber}
                </CardDescription>
              </div>
              <Badge>{hadith.grade}</Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Chapter info */}
            {hadith.chapterTitle && (
              <div className="bg-primary/5 p-3 rounded-md">
                <h3 className="font-semibold mb-1">Chapter: {hadith.chapterTitle}</h3>
                {hadith.chapterTitleArabic && (
                  <p className="text-right font-arabic rtl">{hadith.chapterTitleArabic}</p>
                )}
              </div>
            )}
            
            {/* Arabic text */}
            <div className="border-b pb-4">
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Arabic Text</h3>
              <p className="text-xl rtl text-right font-arabic leading-loose">{hadith.arabicText}</p>
            </div>
            
            {/* English translation */}
            <div className="border-b pb-4">
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">English Translation</h3>
              <p className="text-base">{hadith.englishText}</p>
            </div>
            
            {/* Narrator */}
            <div className="border-b pb-4">
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Narrator</h3>
              <p>{hadith.narrator}</p>
            </div>
            
            {/* Topics */}
            {hadith.topics && hadith.topics.length > 0 && (
              <div className="border-b pb-4">
                <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {hadith.topics.map((topic: string) => (
                    <Badge key={topic} variant="outline">{topic}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* References */}
            {hadith.references && hadith.references.length > 0 && (
              <div className="border-b pb-4">
                <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">References</h3>
                <ul className="list-disc list-inside space-y-1">
                  {hadith.references.map((ref: any, index: number) => (
                    <li key={index}>
                      {ref.collection}, {ref.volume ? `Volume ${ref.volume}, ` : ''}Book {ref.book}, Hadith {ref.hadith}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Explanations */}
            {hadith.explanations && hadith.explanations.length > 0 && (
              <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scholarly Explanations</h3>
                <div className="space-y-4">
                  {hadith.explanations.map((exp: any, index: number) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                      <h4 className="font-medium text-primary">{exp.scholar}</h4>
                      <p className="mt-1 text-sm">{exp.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
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