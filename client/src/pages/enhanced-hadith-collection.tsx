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
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, BookOpen, User, Calendar, Star, Heart, CheckCircle, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Enhanced collection information from the complete hadith database
const COLLECTION_INFO = {
  bukhari: {
    name: "Sahih al-Bukhari",
    arabicName: "صحيح البخاري",
    description: "The most authentic collection of hadith compiled by Imam Muhammad ibn Ismail al-Bukhari (194-256 AH). Contains 7,563 authentic hadiths across 97 books covering all aspects of Islamic life and jurisprudence.",
    compiler: "Imam al-Bukhari",
    totalHadiths: 7563,
    books: 97,
    volumes: 9,
    compilationPeriod: "194-256 AH (810-870 CE)",
    grade: "Sahih (Authentic)",
    status: "Complete"
  },
  muslim: {
    name: "Sahih Muslim",
    arabicName: "صحيح مسلم",
    description: "The second most authentic hadith collection compiled by Imam Muslim ibn al-Hajjaj (204-261 AH). Contains 7,563 authentic hadiths across 54 books.",
    compiler: "Imam Muslim",
    totalHadiths: 7563,
    books: 54,
    volumes: 5,
    compilationPeriod: "204-261 AH (820-875 CE)",
    grade: "Sahih (Authentic)",
    status: "Coming Soon"
  },
  abudawud: {
    name: "Sunan Abu Dawud",
    arabicName: "سنن أبي داود",
    description: "Collection of authentic hadith compiled by Imam Abu Dawud (202-275 AH). Contains 5,274 hadiths across 43 books focusing on Islamic law and jurisprudence.",
    compiler: "Imam Abu Dawud",
    totalHadiths: 5274,
    books: 43,
    volumes: 4,
    compilationPeriod: "202-275 AH (817-889 CE)",
    grade: "Mixed (Sahih, Hasan, Da'if)",
    status: "Coming Soon"
  }
};

export default function EnhancedHadithCollection() {
  const [, params] = useRoute("/hadith/collection/:collectionId");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVolume, setSelectedVolume] = useState<number | null>(null);
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'hadiths' | 'volumes' | 'books'>('hadiths');
  const { toast } = useToast();
  
  const collectionId = params?.collectionId || "";
  const collectionInfo = COLLECTION_INFO[collectionId as keyof typeof COLLECTION_INFO];

  // Fetch hadiths from the database
  const { data: hadiths = [], isLoading: hadithsLoading, error } = useQuery({
    queryKey: [`/api/hadiths/collection/${collectionId}`],
    enabled: !!collectionId,
  });

  // Fetch volumes for Bukhari (available)
  const { data: volumes = [], isLoading: volumesLoading } = useQuery({
    queryKey: [`/api/hadiths/volumes/${collectionId}`],
    enabled: collectionId === 'bukhari',
  });

  useEffect(() => {
    if (collectionInfo) {
      document.title = `${collectionInfo.name} - Hadith Collection - MyQuran`;
    }
  }, [collectionInfo]);

  // Filter hadiths based on search, volume, and book selection
  const filteredHadiths = hadiths.filter((hadith: any) => {
    const matchesSearch = searchQuery === '' || 
      hadith.englishText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hadith.arabicText?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hadith.narrator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hadith.bookTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesVolume = selectedVolume === null || hadith.volume === selectedVolume;
    const matchesBook = selectedBook === null || hadith.book === selectedBook;
    
    return matchesSearch && matchesVolume && matchesBook;
  });

  // Get unique volumes and books from hadiths
  const uniqueVolumes = [...new Set(hadiths.map((h: any) => h.volume))].sort((a, b) => a - b);
  const uniqueBooks = [...new Set(hadiths.map((h: any) => ({ book: h.book, title: h.bookTitle })))];

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
        </Card>
      </main>
    );
  }

  if (error) {
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
            <CardTitle>Error Loading Collection</CardTitle>
            <CardDescription>There was an error loading the hadith collection. Please try again later.</CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <Link href="/hadiths">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Collections
          </Button>
        </Link>
      </div>

      {collectionInfo && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{collectionInfo.name}</CardTitle>
                <CardDescription className="text-lg font-arabic mb-2">{collectionInfo.arabicName}</CardDescription>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{collectionInfo.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {collectionInfo.status === 'Complete' ? (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Complete
                  </Badge>
                ) : (
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    <Clock className="h-3 w-3 mr-1" />
                    Coming Soon
                  </Badge>
                )}
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {collectionInfo.grade}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{collectionInfo.totalHadiths.toLocaleString()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Hadiths</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{collectionInfo.books}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Books</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{collectionInfo.volumes}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Volumes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{hadiths.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Available</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <User className="inline h-4 w-4 mr-1" />
                Compiled by {collectionInfo.compiler}
                <Calendar className="inline h-4 w-4 ml-4 mr-1" />
                {collectionInfo.compilationPeriod}
              </p>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search hadiths by text, narrator, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedVolume || ""}
                onChange={(e) => setSelectedVolume(e.target.value ? parseInt(e.target.value) : null)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="">All Volumes</option>
                {uniqueVolumes.map(volume => (
                  <option key={volume} value={volume}>Volume {volume}</option>
                ))}
              </select>
              <select
                value={selectedBook || ""}
                onChange={(e) => setSelectedBook(e.target.value ? parseInt(e.target.value) : null)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="">All Books</option>
                {uniqueBooks.map(book => (
                  <option key={book.book} value={book.book}>Book {book.book}</option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Hadiths Display */}
      {hadithsLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredHadiths.length > 0 ? (
        <div className="space-y-4">
          {filteredHadiths.map((hadith: any) => (
            <Card key={hadith.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {hadith.bookTitle} - Hadith {hadith.hadithNumber}
                    </CardTitle>
                    <CardDescription>
                      Volume {hadith.volume}, Book {hadith.book}
                      {hadith.chapter && ` • ${hadith.chapter}`}
                    </CardDescription>
                  </div>
                  <Badge className={hadith.grade === 'Sahih' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                    {hadith.grade}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {hadith.arabicText && (
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-right font-arabic text-lg leading-relaxed">
                      {hadith.arabicText}
                    </p>
                  </div>
                )}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {hadith.englishText}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    Narrated by {hadith.narrator}
                  </div>
                  {hadith.tags && hadith.tags.length > 0 && (
                    <div className="flex gap-1">
                      {hadith.tags.slice(0, 3).map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-2">
                  <Link href={`/hadith/${hadith.id}`}>
                    <Button size="sm" variant="outline">
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                  <Button size="sm" variant="outline">
                    <Heart className="h-4 w-4 mr-2" />
                    Bookmark
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {collectionInfo?.status === 'Complete' ? 'No hadiths found matching your criteria' : 'This collection is coming soon'}
            </p>
            {searchQuery && (
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Try adjusting your search terms or filters
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </main>
  );
}