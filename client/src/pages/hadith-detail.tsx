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
import { Share2, BookmarkPlus, Copy, ArrowLeft, User, BookOpen, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useHadithBookmarks } from "@/hooks/use-hadith-bookmarks";
import { Hadith } from "@/types/hadith";

export default function HadithDetail() {
  const [match, params] = useRoute("/hadith/:id");
  const { toast } = useToast();
  const hadithId = params?.id || "";

  // Fetch hadith from API
  const { data: hadith, isLoading, error } = useQuery<Hadith>({
    queryKey: [`/api/hadiths/${hadithId}`],
    enabled: !!hadithId && match,
  });

  useEffect(() => {
    if (hadith) {
      document.title = `Hadith ${hadith.hadithNumber} - ${hadith.collection} - MyQuran`;
    }
  }, [hadith]);

  const handleCopyArabic = () => {
    if (hadith?.arabicText) {
      navigator.clipboard.writeText(hadith.arabicText);
      toast({
        title: "Arabic text copied",
        description: "The Arabic hadith text has been copied to your clipboard.",
      });
    }
  };

  const handleCopyEnglish = () => {
    if (hadith?.englishText) {
      navigator.clipboard.writeText(hadith.englishText);
      toast({
        title: "English text copied",
        description: "The English hadith text has been copied to your clipboard.",
      });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `Hadith ${hadith?.hadithNumber} - ${hadith?.collection}`,
      text: hadith?.englishText || "",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied",
          description: "The hadith link has been copied to your clipboard.",
        });
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const { addBookmark, removeBookmark, isBookmarked, getBookmark } =
    useHadithBookmarks();

  const handleBookmark = () => {
    if (!hadith) return;

    if (isBookmarked(hadithId)) {
      const bookmark = getBookmark(hadithId);
      if (bookmark) {
        removeBookmark(bookmark.id);
        toast({
          title: "Bookmark removed",
          description: "This hadith was removed from your bookmarks.",
        });
      }
    } else {
      addBookmark({
        hadithId,
        collection: hadith.collection,
        englishText: hadith.englishText,
        arabicText: hadith.arabicText,
      });

      toast({
        title: "Bookmarked",
        description: "This hadith has been added to your bookmarks.",
      });
    }
  };

  if (!match) return null;

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Skeleton className="h-10 w-40 mb-4" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </main>
    );
  }

  if (error || !hadith) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
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
            <CardDescription>
              The hadith you are looking for could not be found.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This hadith may have been removed or the ID might be incorrect.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  const collectionName = {
    bukhari: "Sahih al-Bukhari",
    muslim: "Sahih Muslim",
    abudawud: "Sunan Abu Dawud",
    tirmidhi: "Jami' at-Tirmidhi",
    nasai: "Sunan an-Nasa'i",
    ibnmajah: "Sunan Ibn Majah",
    nawawi40: "Imam Nawawi's 40 Hadith"
  }[hadith.collection] || hadith.collection;

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href={`/hadith/collection/${hadith.collection}`}>
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {collectionName}
          </Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">
                Hadith {hadith.hadithNumber}
              </CardTitle>
              <CardDescription className="text-base">
                <span className="font-semibold">{collectionName}</span>
                {hadith.bookTitle && ` • ${hadith.bookTitle}`}
                {hadith.chapter && ` • ${hadith.chapter}`}
              </CardDescription>
            </div>
            <Badge 
              variant={hadith.grade === 'Sahih' ? 'default' : 'secondary'}
              className={hadith.grade === 'Sahih' ? 'bg-green-100 text-green-800' : ''}
            >
              {hadith.grade}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Arabic Text */}
          {hadith.arabicText && (
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Arabic Text</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCopyArabic}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-right font-arabic text-2xl leading-loose">
                {hadith.arabicText}
              </p>
            </div>
          )}

          {/* English Translation */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">English Translation</h3>
              <Button variant="ghost" size="sm" onClick={handleCopyEnglish}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {hadith.englishText}
            </p>
          </div>

          {/* Narrator and Reference */}
          <div className="border-t pt-4 space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="text-sm">
                Narrated by: <span className="font-medium text-foreground">{hadith.narrator}</span>
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm">
                Reference: <span className="font-medium text-foreground">
                  Volume {hadith.volume}, Book {hadith.book}, Hadith {hadith.hadithNumber}
                </span>
              </span>
            </div>

            {hadith.tags && hadith.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {hadith.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button onClick={handleBookmark} variant="outline">
              <BookmarkPlus className="h-4 w-4 mr-2" />
              Bookmark
            </Button>
            <Button onClick={handleShare} variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Related Hadiths - Coming Soon */}
      <Card>
        <CardHeader>
          <CardTitle>Related Hadiths</CardTitle>
          <CardDescription>
            Similar hadiths from this collection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Coming soon - Related hadiths will appear here
          </p>
        </CardContent>
      </Card>
    </main>
  );
}