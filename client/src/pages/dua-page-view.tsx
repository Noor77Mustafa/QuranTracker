import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Dua {
  id: string;
  category: string;
  title: string;
  arabicText: string;
  transliteration: string;
  englishTranslation: string;
  reference: string;
  benefits?: string;
  timeToRecite?: string;
}

const DUAS: Dua[] = [
  {
    id: "morning-1",
    category: "Morning",
    title: "Morning Protection",
    arabicText: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillāhil-ladhī lā yaḍurru ma'asmihi shay'un fil-arḍi wa lā fis-samā'i wa huwas-Samī'ul-'Alīm",
    englishTranslation: "In the name of Allah with whose name nothing is harmed on earth nor in the heavens and He is The All-Seeing, The All-Hearing.",
    reference: "Abu Dawud 4/323",
    benefits: "Protection from harm throughout the day",
    timeToRecite: "Three times in the morning"
  },
  {
    id: "morning-2",
    category: "Morning",
    title: "Morning Remembrance",
    arabicText: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
    transliteration: "Aṣbaḥnā wa aṣbaḥal-mulku lillāh, walḥamdulillāh",
    englishTranslation: "We have reached the morning and at this very time all sovereignty belongs to Allah. All praise is for Allah.",
    reference: "Muslim 4/2088",
    timeToRecite: "Once in the morning"
  },
  {
    id: "evening-1",
    category: "Evening",
    title: "Evening Protection",
    arabicText: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    transliteration: "Amsaynā wa amsal-mulku lillāhi Rabbil-'ālamīn",
    englishTranslation: "We have reached the evening and at this very time all sovereignty belongs to Allah, Lord of the worlds.",
    reference: "Ahmad 4/318",
    timeToRecite: "Once in the evening"
  },
  {
    id: "prayer-1",
    category: "Prayer",
    title: "After Prayer Dua",
    arabicText: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    transliteration: "Allāhumma a'innī 'alā dhikrika wa shukrika wa ḥusni 'ibādatik",
    englishTranslation: "O Allah, help me to remember You, to be grateful to You, and to worship You in an excellent manner.",
    reference: "Abu Dawud 2/86",
    timeToRecite: "After every obligatory prayer"
  },
  {
    id: "protection-1",
    category: "Protection",
    title: "Protection from Evil Eye",
    arabicText: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "A'ūdhu bikalimātillāhit-tāmmāti min sharri mā khalaq",
    englishTranslation: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
    reference: "Muslim 4/2080",
    benefits: "Protection from evil and harm"
  },
  {
    id: "forgiveness-1",
    category: "Forgiveness",
    title: "Seeking Forgiveness",
    arabicText: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
    transliteration: "Rabbighfir lī wa tub 'alayya innaka antat-Tawwābur-Raḥīm",
    englishTranslation: "My Lord, forgive me and accept my repentance, You are the Ever-Relenting, the Most Merciful.",
    reference: "Ibn Majah 2/321",
    benefits: "Forgiveness of sins"
  }
];

export default function DuaPageView() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'page'>('page');
  const duasPerPage = 3;
  
  // Set page title
  useEffect(() => {
    document.title = "Duas - MyQuran";
  }, []);
  
  // Filter duas based on category and search
  const filteredDuas = DUAS.filter(dua => {
    const matchesCategory = selectedCategory === "all" || dua.category === selectedCategory;
    const matchesSearch = dua.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dua.englishTranslation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const categories = ["all", ...Array.from(new Set(DUAS.map(d => d.category)))];
  const totalPages = Math.ceil(filteredDuas.length / duasPerPage);
  const startIndex = (currentPage - 1) * duasPerPage;
  const endIndex = startIndex + duasPerPage;
  const currentDuas = filteredDuas.slice(startIndex, endIndex);
  
  return (
    <main className="container mx-auto px-4 py-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Duas & Supplications</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive collection of authentic duas for various occasions and times.
        </p>
        
        {/* Search */}
        <div className="mt-4 flex gap-4 items-center">
          <Input
            type="text"
            placeholder="Search duas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'page' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('page')}
            >
              Page View
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              List View
            </Button>
          </div>
        </div>
      </div>
      
      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
        <TabsList>
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category === 'all' ? 'All Duas' : category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      {viewMode === 'page' ? (
        <>
          {/* Page Navigation */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages} ({filteredDuas.length} duas)
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
          
          {/* Duas Display - Page View */}
          <div className="space-y-6">
            {currentDuas.map((dua) => (
              <Card key={dua.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{dua.title}</CardTitle>
                      <CardDescription>{dua.reference}</CardDescription>
                    </div>
                    <Badge variant="secondary">{dua.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-2xl rtl text-right mb-3 font-amiri leading-loose" dir="rtl" lang="ar">
                      {dua.arabicText}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 italic mb-2">
                      {dua.transliteration}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {dua.englishTranslation}
                    </p>
                  </div>
                  
                  {(dua.benefits || dua.timeToRecite) && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
                      {dua.timeToRecite && (
                        <p className="text-sm">
                          <span className="font-medium">When to recite:</span> {dua.timeToRecite}
                        </p>
                      )}
                      {dua.benefits && (
                        <p className="text-sm">
                          <span className="font-medium">Benefits:</span> {dua.benefits}
                        </p>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <span className="material-symbols-rounded text-sm">bookmark_border</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <span className="material-symbols-rounded text-sm">content_copy</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <span className="material-symbols-rounded text-sm">share</span>
                    </Button>
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
        </>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredDuas.map((dua) => (
            <Card key={dua.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">{dua.title}</CardTitle>
                  <Badge variant="secondary" className="text-xs">{dua.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                  {dua.englishTranslation}
                </p>
                <Button variant="link" size="sm" className="px-0 mt-2">
                  Read More →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}