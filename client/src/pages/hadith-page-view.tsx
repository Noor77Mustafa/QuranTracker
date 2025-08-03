import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

// Mock data structure for hadiths
interface Hadith {
  id: string;
  collection: string;
  bookNumber: number;
  bookTitle: string;
  hadithNumber: number;
  chapterTitle: string;
  arabicText: string;
  englishText: string;
  narrator: string;
  grade: string;
}

// Sample hadith data
const SAMPLE_HADITHS: Hadith[] = [
  {
    id: "bukhari-1",
    collection: "Sahih al-Bukhari",
    bookNumber: 1,
    bookTitle: "Revelation",
    hadithNumber: 1,
    chapterTitle: "How the Divine Revelation started",
    arabicText: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    englishText: "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended.",
    narrator: "Umar bin Al-Khattab",
    grade: "Sahih"
  },
  {
    id: "bukhari-2",
    collection: "Sahih al-Bukhari",
    bookNumber: 1,
    bookTitle: "Revelation",
    hadithNumber: 2,
    chapterTitle: "The commencement of the Divine Revelation",
    arabicText: "كَانَ رَسُولُ اللَّهِ صلى الله عليه وسلم أَجْوَدَ النَّاسِ",
    englishText: "Allah's Messenger was the most generous of all the people.",
    narrator: "Ibn Abbas",
    grade: "Sahih"
  },
  {
    id: "bukhari-3",
    collection: "Sahih al-Bukhari",
    bookNumber: 1,
    bookTitle: "Revelation",
    hadithNumber: 3,
    chapterTitle: "The commencement of the Divine Revelation",
    arabicText: "أَوَّلُ مَا بُدِئَ بِهِ رَسُولُ اللَّهِ صلى الله عليه وسلم مِنَ الْوَحْىِ الرُّؤْيَا الصَّالِحَةُ",
    englishText: "The commencement of the Divine Inspiration to Allah's Messenger was in the form of good dreams which came true like bright daylight.",
    narrator: "Aisha",
    grade: "Sahih"
  }
];

export default function HadithPageView() {
  const [, params] = useRoute("/hadith/:collection/:book");
  const collection = params?.collection || "bukhari";
  const bookNumber = params?.book ? parseInt(params.book) : 1;
  
  const [currentPage, setCurrentPage] = useState(1);
  const hadithsPerPage = 3;
  
  // Set page title
  useEffect(() => {
    document.title = `${collection} - Book ${bookNumber} - MyQuran`;
  }, [collection, bookNumber]);
  
  // Filter hadiths for current collection and book
  const filteredHadiths = SAMPLE_HADITHS.filter(h => 
    h.collection.toLowerCase().includes(collection.toLowerCase()) && 
    h.bookNumber === bookNumber
  );
  
  const totalPages = Math.ceil(filteredHadiths.length / hadithsPerPage);
  const startIndex = (currentPage - 1) * hadithsPerPage;
  const endIndex = startIndex + hadithsPerPage;
  const currentHadiths = filteredHadiths.slice(startIndex, endIndex);
  
  return (
    <main className="container mx-auto px-4 py-4">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
          <Link href="/hadiths" className="hover:text-primary">
            Hadith Collections
          </Link>
          <span>/</span>
          <Link href={`/hadith/${collection}`} className="hover:text-primary capitalize">
            {collection}
          </Link>
          <span>/</span>
          <span>Book {bookNumber}</span>
        </div>
        
        <h1 className="text-2xl font-semibold mb-2">
          {filteredHadiths[0]?.collection || collection} - Book {bookNumber}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {filteredHadiths[0]?.bookTitle || `Book ${bookNumber}`}
        </p>
      </div>
      
      {/* Page Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Page {currentPage} of {totalPages} ({filteredHadiths.length} hadiths)
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <span className="material-symbols-rounded mr-1">chevron_left</span>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
            <span className="material-symbols-rounded ml-1">chevron_right</span>
          </Button>
        </div>
      </div>
      
      {/* Hadiths Display */}
      <div className="space-y-6">
        {currentHadiths.map((hadith) => (
          <Card key={hadith.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Hadith #{hadith.hadithNumber}</CardTitle>
                  <CardDescription>{hadith.chapterTitle}</CardDescription>
                </div>
                <Badge variant={hadith.grade === "Sahih" ? "default" : "secondary"}>
                  {hadith.grade}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xl rtl text-right mb-3 font-amiri leading-loose" dir="rtl" lang="ar">
                  {hadith.arabicText}
                </p>
                <p className="text-gray-700 dark:text-gray-300">{hadith.englishText}</p>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Narrated by: {hadith.narrator}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <span className="material-symbols-rounded text-sm">bookmark_border</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <span className="material-symbols-rounded text-sm">share</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Bottom Page Navigation */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(page)}
            className="w-10"
          >
            {page}
          </Button>
        ))}
      </div>
    </main>
  );
}