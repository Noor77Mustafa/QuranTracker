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

// Comprehensive authentic hadith content from major collections
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
      grade: "Sahih"
    },
    {
      id: "bukhari-2",
      hadithNumber: 2,
      bookNumber: 1,
      chapterTitle: "How the Divine Revelation started being revealed to Allah's Messenger",
      arabicText: "حَدَّثَنَا عَبْدُ اللَّهِ بْنُ يُوسُفَ، قَالَ أَخْبَرَنَا مَالِكٌ، عَنْ هِشَامِ بْنِ عُرْوَةَ، عَنْ أَبِيهِ، عَنْ عَائِشَةَ أُمِّ الْمُؤْمِنِينَ ـ رضى الله عنها ـ أَنَّ الْحَارِثَ بْنَ هِشَامٍ ـ رضى الله عنه ـ سَأَلَ رَسُولَ اللَّهِ صلى الله عليه وسلم فَقَالَ يَا رَسُولَ اللَّهِ كَيْفَ يَأْتِيكَ الْوَحْىُ فَقَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏\"‏ أَحْيَانًا يَأْتِينِي مِثْلَ صَلْصَلَةِ الْجَرَسِ وَهُوَ أَشَدُّهُ عَلَىَّ، فَيُفْصَمُ عَنِّي وَقَدْ وَعَيْتُ عَنْهُ مَا قَالَ، وَأَحْيَانًا يَتَمَثَّلُ لِيَ الْمَلَكُ رَجُلاً فَيُكَلِّمُنِي فَأَعِي مَا يَقُولُ ‏\"‏",
      englishText: "Narrated 'Aisha: (the mother of the faithful believers) Al-Harith bin Hisham asked Allah's Messenger \"O Allah's Messenger! How is the Divine Inspiration revealed to you?\" Allah's Messenger replied, \"Sometimes it is (revealed) like the ringing of a bell, this form of Inspiration is the hardest of all and then this state passes off after I have grasped what is inspired. Sometimes the Angel comes in the form of a man and talks to me and I grasp whatever he says.\"",
      narrator: "'Aisha (Mother of the Believers)",
      grade: "Sahih"
    },
    {
      id: "bukhari-3",
      hadithNumber: 52,
      bookNumber: 2,
      chapterTitle: "Belief",
      arabicText: "حَدَّثَنَا أَبُو الْيَمَانِ، قَالَ أَخْبَرَنَا شُعَيْبٌ، قَالَ حَدَّثَنَا أَبُو الزِّنَادِ، عَنِ الأَعْرَجِ، عَنْ أَبِي هُرَيْرَةَ ـ رضى الله عنه ـ أَنَّ رَسُولَ اللَّهِ صلى الله عليه وسلم قَالَ ‏\"‏ فَوَالَّذِي نَفْسِي بِيَدِهِ، لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى أَكُونَ أَحَبَّ إِلَيْهِ مِنْ وَالِدِهِ وَوَلَدِهِ ‏\"‏",
      englishText: "Narrated Abu Huraira: Allah's Messenger (ﷺ) said, \"By Him in Whose Hands my life is, none of you will believe unless I am dearer to him than his father and his children.\"",
      narrator: "Abu Huraira",
      grade: "Sahih"
    },
    {
      id: "bukhari-4",
      hadithNumber: 15,
      bookNumber: 2,
      chapterTitle: "Belief",
      arabicText: "حَدَّثَنَا قُتَيْبَةُ بْنُ سَعِيدٍ، قَالَ حَدَّثَنَا إِسْمَاعِيلُ بْنُ جَعْفَرٍ، عَنْ عَبْدِ اللَّهِ بْنِ دِينَارٍ، عَنْ عَبْدِ اللَّهِ بْنِ عُمَرَ ـ رضى الله عنهما ـ أَنَّ رَسُولَ اللَّهِ صلى الله عليه وسلم قَالَ ‏\"‏ الْمُسْلِمُ أَخُو الْمُسْلِمِ لاَ يَظْلِمُهُ وَلاَ يُسْلِمُهُ، وَمَنْ كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ، وَمَنْ فَرَّجَ عَنْ مُسْلِمٍ كُرْبَةً فَرَّجَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرُبَاتِ يَوْمِ الْقِيَامَةِ ‏\"‏",
      englishText: "Narrated 'Abdullah bin 'Umar: Allah's Messenger (ﷺ) said, \"A Muslim is a brother of another Muslim, so he should not oppress him, nor should he hand him over to an oppressor. Whoever fulfilled the needs of his brother, Allah will fulfill his needs; whoever brought his (Muslim) brother out of a discomfort, Allah will bring him out of the discomforts of the Day of Resurrection.\"",
      narrator: "'Abdullah bin 'Umar",
      grade: "Sahih"
    },
    {
      id: "bukhari-5",
      hadithNumber: 10,
      bookNumber: 2,
      chapterTitle: "Belief",
      arabicText: "حَدَّثَنَا أَبُو الْيَمَانِ، قَالَ أَخْبَرَنَا شُعَيْبٌ، عَنِ الزُّهْرِيِّ، قَالَ أَخْبَرَنِي أَنَسُ بْنُ مَالِكٍ، أَنَّ النَّبِيَّ صلى الله عليه وسلم قَالَ ‏\"‏ لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ ‏\"‏",
      englishText: "Narrated Anas: The Prophet (ﷺ) said, \"None of you will believe until he wishes for his (Muslim) brother what he wishes for himself.\"",
      narrator: "Anas ibn Malik",
      grade: "Sahih"
    }
  ],
  muslim: [
    {
      id: "muslim-1",
      hadithNumber: 1,
      bookNumber: 1,
      chapterTitle: "The Book of Faith",
      arabicText: "حَدَّثَنِي يَحْيَى بْنُ أَيُّوبَ، وَقُتَيْبَةُ بْنُ سَعِيدٍ، وَعَلِيُّ بْنُ حُجْرٍ، قَالُوا حَدَّثَنَا إِسْمَاعِيلُ، عَنِ الْعَلاَءِ، عَنْ أَبِيهِ، عَنْ أَبِي هُرَيْرَةَ، أَنَّ رَسُولَ اللَّهِ صلى الله عليه وسلم قَالَ الإِيمَانُ بِضْعٌ وَسَبْعُونَ شُعْبَةً فَأَفْضَلُهَا قَوْلُ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَدْنَاهَا إِمَاطَةُ الأَذَى عَنِ الطَّرِيقِ وَالْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ",
      englishText: "Narrated Abu Huraira: The Messenger of Allah (ﷺ) said, \"Faith has over seventy branches, the most excellent of which is the declaration that there is no god but Allah, and the humblest of which is the removal of what is injurious from the path: and modesty is a branch of faith.\"",
      narrator: "Abu Huraira",
      grade: "Sahih"
    },
    {
      id: "muslim-2",
      hadithNumber: 16,
      bookNumber: 1,
      chapterTitle: "The Book of Faith", 
      arabicText: "حَدَّثَنَا أَبُو بَكْرِ بْنُ أَبِي شَيْبَةَ، حَدَّثَنَا أَبُو مُعَاوِيَةَ، وَوَكِيعٌ، عَنِ الأَعْمَشِ، عَنْ أَبِي صَالِحٍ، عَنْ أَبِي هُرَيْرَةَ، قَالَ قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ وَالْمُؤْمِنُ مَنْ أَمِنَهُ النَّاسُ عَلَى دِمَائِهِمْ وَأَمْوَالِهِمْ",
      englishText: "Narrated Abu Huraira: The Messenger of Allah (ﷺ) said, \"The Muslim is one from whose tongue and hand the Muslims are safe, and the believer is one whom people trust with their blood and wealth.\"",
      narrator: "Abu Huraira",
      grade: "Sahih"
    },
    {
      id: "muslim-3",
      hadithNumber: 43,
      bookNumber: 1,
      chapterTitle: "The Book of Faith",
      arabicText: "حَدَّثَنَا مُحَمَّدُ بْنُ عَبْدِ اللَّهِ بْنِ نُمَيْرٍ، حَدَّثَنَا أَبِي، حَدَّثَنَا عُبَيْدُ اللَّهِ، عَنْ خُبَيْبِ بْنِ عَبْدِ الرَّحْمَنِ، عَنْ حَفْصِ بْنِ عَاصِمٍ، عَنْ أَبِي هُرَيْرَةَ، قَالَ قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم لاَ يَدْخُلُ الْجَنَّةَ مَنْ لاَ يَأْمَنُ جَارُهُ بَوَائِقَهُ",
      englishText: "Narrated Abu Huraira: The Messenger of Allah (ﷺ) said, \"He will not enter Paradise whose neighbor is not secure from his wrongful conduct.\"",
      narrator: "Abu Huraira", 
      grade: "Sahih"
    }
  ],
  nawawi40: [
    {
      id: "nawawi40-1",
      hadithNumber: 1,
      bookNumber: 1,
      chapterTitle: "Actions are by Intentions",
      arabicText: "عَنْ أَمِيرِ الْمُؤْمِنِينَ أَبِي حَفْصٍ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللهُ عَنْهُ قَالَ: سَمِعْت رَسُولَ اللَّهِ صلى الله عليه و سلم يَقُولُ: إنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا أَوْ امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إلَى مَا هَاجَرَ إلَيْهِ",
      englishText: "On the authority of the Commander of the Faithful, Abu Hafs Umar ibn al-Khattab, who said: I heard the Messenger of Allah say: \"Actions are only by intention, and every person will have only what they intended. So whoever's migration was to Allah and His Messenger, then his migration was to Allah and His Messenger. And whoever's migration was for some worldly benefit or to marry a woman, then his migration was for that which he migrated.\"",
      narrator: "'Umar ibn al-Khattab",
      grade: "Sahih"
    },
    {
      id: "nawawi40-2",
      hadithNumber: 2,
      bookNumber: 1,
      chapterTitle: "On Islam, Iman and Ihsan",
      arabicText: "عَنْ عُمَرَ رَضِيَ اللهُ عَنْهُ أَيْضًا قَالَ: بَيْنَمَا نَحْنُ جُلُوسٌ عِنْدَ رَسُولِ اللَّهِ صلى الله عليه و سلم ذَاتَ يَوْمٍ، إذْ طَلَعَ عَلَيْنَا رَجُلٌ شَدِيدُ بَيَاضِ الثِّيَابِ، شَدِيدُ سَوَادِ الشَّعْرِ، لَا يُرَى عَلَيْهِ أَثَرُ السَّفَرِ، وَلَا يَعْرِفُهُ مِنَّا أَحَدٌ",
      englishText: "On the authority of Umar, who said: One day while we were sitting with the Messenger of Allah there appeared before us a man whose clothes were exceedingly white and whose hair was exceedingly black; no signs of journeying were to be seen on him and none of us knew him.",
      narrator: "'Umar ibn al-Khattab",
      grade: "Sahih"
    },
    {
      id: "nawawi40-3",
      hadithNumber: 3,
      bookNumber: 1,
      chapterTitle: "The Pillars of Islam",
      arabicText: "عَنْ أَبِي عَبْدِ الرَّحْمَنِ عَبْدِ اللَّهِ بْنِ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُمَا قَالَ: سَمِعْت رَسُولَ اللَّهِ صلى الله عليه و سلم يَقُولُ: بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لَا إلَهَ إلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلَاةِ، وَإِيتَاءِ الزَّكَاةِ، وَحَجِّ الْبَيْتِ، وَصَوْمِ رَمَضَانَ",
      englishText: "On the authority of Abdullah ibn Umar, who said: I heard the Messenger of Allah say: \"Islam has been built upon five things: testifying that there is no god but Allah and that Muhammad is the Messenger of Allah, performing the prayers, paying the zakat, making the pilgrimage to the House, and fasting in Ramadan.\"",
      narrator: "'Abdullah ibn 'Umar",
      grade: "Sahih"
    }
  ],
  abudawud: [
    {
      id: "abudawud-1",
      hadithNumber: 13,
      bookNumber: 1,
      chapterTitle: "Purification",
      arabicText: "حَدَّثَنَا مُسَدَّدٌ، حَدَّثَنَا يَحْيَى، عَنْ شُعْبَةَ، حَدَّثَنِي عَطَاءُ بْنُ أَبِي مَيْمُونَةَ، عَنْ أَنَسِ بْنِ مَالِكٍ، قَالَ كَانَ النَّبِيُّ صلى الله عليه وسلم إِذَا دَخَلَ الْخَلاَءَ قَالَ اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
      englishText: "Narrated Anas ibn Malik: When the Prophet (ﷺ) entered the privy, he would say: 'O Allah, I seek refuge in You from male and female devils.'",
      narrator: "Anas ibn Malik",
      grade: "Sahih"
    },
    {
      id: "abudawud-2", 
      hadithNumber: 61,
      bookNumber: 1,
      chapterTitle: "Purification",
      arabicText: "حَدَّثَنَا عُثْمَانُ بْنُ أَبِي شَيْبَةَ، حَدَّثَنَا جَرِيرٌ، عَنْ مَنْصُورٍ، عَنْ إِبْرَاهِيمَ، عَنْ عَلْقَمَةَ، عَنْ عَبْدِ اللَّهِ، قَالَ أَتَى النَّبِيُّ صلى الله عليه وسلم الْغَائِطَ فَأَمَرَنِي أَنْ آتِيَهُ بِثَلاَثَةِ أَحْجَارٍ فَوَجَدْتُ حَجَرَيْنِ وَالْتَمَسْتُ الثَّالِثَ فَلَمْ أَجِدْهُ فَأَخَذْتُ رَوْثَةً فَأَتَيْتُهُ بِهَا فَأَخَذَ الْحَجَرَيْنِ وَأَلْقَى الرَّوْثَةَ وَقَالَ هَذَا رِكْسٌ",
      englishText: "Narrated Abdullah: The Prophet (ﷺ) went to the place for answering the call of nature and asked me to bring three stones. I found two stones and searched for the third, but could not find it. So I took a dried piece of dung and brought it to him. He took the two stones and threw away the dung and said: 'This is an impure thing.'",
      narrator: "'Abdullah ibn Mas'ud",
      grade: "Sahih"
    }
  ],
  tirmidhi: [
    {
      id: "tirmidhi-1",
      hadithNumber: 2616,
      bookNumber: 40,
      chapterTitle: "Supplications",
      arabicText: "حَدَّثَنَا قُتَيْبَةُ، حَدَّثَنَا حَمَّادُ بْنُ زَيْدٍ، عَنْ عَاصِمِ بْنِ بَهْدَلَةَ، عَنْ أَبِي وَائِلٍ، عَنْ عَبْدِ اللَّهِ بْنِ مَسْعُودٍ، قَالَ قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم مَا أَصَابَ أَحَدًا قَطُّ هَمٌّ وَلاَ حَزَنٌ فَقَالَ اللَّهُمَّ إِنِّي عَبْدُكَ وَابْنُ عَبْدِكَ وَابْنُ أَمَتِكَ نَاصِيَتِي بِيَدِكَ مَاضٍ فِيَّ حُكْمُكَ عَدْلٌ فِيَّ قَضَاؤُكَ أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ سَمَّيْتَ بِهِ نَفْسَكَ أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي وَنُورَ صَدْرِي وَجِلاَءَ حُزْنِي وَذَهَابَ هَمِّي إِلاَّ أَذْهَبَ اللَّهُ هَمَّهُ وَحُزْنَهُ وَأَبْدَلَهُ مَكَانَهُ فَرَجًا",
      englishText: "Narrated Abdullah ibn Mas'ud: The Messenger of Allah (ﷺ) said: 'No person suffers any anxiety or grief and says: O Allah, I am Your slave, son of Your slave, son of Your female slave, my forelock is in Your hand, Your command over me is forever executed and Your decree over me is just. I ask You by every name belonging to You which You named Yourself with, or revealed in Your Book, or You taught to any of Your creation, or You have preserved in the knowledge of the unseen with You, that You make the Quran the life of my heart and the light of my breast, and a departure for my sorrow and a release for my anxiety, except that Allah will take away his depression and grief, and give him in their place joy.'",
      narrator: "'Abdullah ibn Mas'ud",
      grade: "Hasan"
    }
  ]
};

const COLLECTION_INFO = {
  bukhari: {
    name: "Sahih al-Bukhari",
    arabicName: "صحيح البخاري",
    description: "The most authentic collection of hadith compiled by Imam Muhammad ibn Ismail al-Bukhari. Contains over 7,000 authentic hadiths.",
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