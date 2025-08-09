import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useEffect, useState } from "react";

const FEATURED_HADITHS = [
  {
    id: "bukhari-1-1-1",
    collection: "Sahih al-Bukhari",
    bookNumber: 1,
    hadithNumber: 1,
    chapterTitle: "Revelation",
    arabicText: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    englishText:
      "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended.",
    narrator: "Umar bin Al-Khattab",
    grade: "Sahih",
  },
  {
    id: "nawawi40-5",
    collection: "40 Hadith Nawawi",
    bookNumber: 1,
    hadithNumber: 5,
    chapterTitle: "Rejection of Innovation",
    arabicText: "مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ فِيهِ فَهُوَ رَدٌّ",
    englishText:
      "He who innovates something in this matter of ours that is not part of it will have it rejected.",
    narrator: "Aisha",
    grade: "Sahih",
  },
  {
    id: "muslim-1-1",
    collection: "Sahih Muslim",
    bookNumber: 1,
    hadithNumber: 1,
    chapterTitle: "Concerning Divine Decree",
    arabicText: "إِنَّ أَوَّلَ مَنْ تَكَلَّمَ فِي الْقَدَرِ بِالْبَصْرَةِ مَعْبَدٌ الْجُهَنِيُّ",
    englishText:
      "It is narrated on the authority of Yahya b. Ya'mur about the first discussion on divine decree in Basra.",
    narrator: "Yahya b. Ya'mur",
    grade: "Sahih",
  },
];

export default function FeaturedHadith() {
  const [currentHadithIndex, setCurrentHadithIndex] = useState(0);
  const currentHadith = FEATURED_HADITHS[currentHadithIndex];

  // Rotate through hadiths every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHadithIndex((prev) => (prev + 1) % FEATURED_HADITHS.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <span className="material-symbols-rounded mr-2 text-primary">auto_stories</span>
          Featured Hadith
        </CardTitle>
        <CardDescription>{currentHadith.collection} - Hadith #{currentHadith.hadithNumber}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-xl rtl text-right mb-3 font-amiri leading-loose" dir="rtl" lang="ar">
              {currentHadith.arabicText}
            </p>
            <p className="text-gray-700 dark:text-gray-300">{currentHadith.englishText}</p>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Narrator: {currentHadith.narrator}</span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
              {currentHadith.grade}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {FEATURED_HADITHS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHadithIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentHadithIndex
                      ? 'bg-primary w-6'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to hadith ${index + 1}`}
                />
              ))}
            </div>
            <Link href="/hadiths">
              <Button variant="outline" size="sm">
                View All Hadiths
                <span className="material-symbols-rounded ml-1 text-sm">arrow_forward</span>
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
