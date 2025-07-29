import { useEffect, useState } from "react";
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
import { Share2, BookmarkPlus, Copy, ArrowLeft, Clock, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Dua } from "@/types/dua";

export default function DuaDetail() {
  const [match, params] = useRoute("/dua/:id");
  const { toast } = useToast();
  const duaId = params?.id || "";
  const { data: dua, isLoading } = useQuery<Dua>({
    queryKey: [`/api/duas/${duaId}`],
    enabled: !!duaId && match,
  });

  const { data: related = [], isLoading: relatedLoading } = useQuery<Dua[]>({
    queryKey: dua ? [`/api/duas?category=${encodeURIComponent(dua.category)}`] : [],
    enabled: !!dua?.category,
  });

  const [copiedText, setCopiedText] = useState(false);

  useEffect(() => {
    if (dua) {
      document.title = `Dua - MyQuran`;
    }
  }, [dua]);

  const copyToClipboard = () => {
    if (!dua) return;
    const text = `${dua.arabic}\n\n${dua.transliteration}\n\n${dua.english}\n\nSource: ${dua.source}`;
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

  if (isLoading) {
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
            <CardTitle className="capitalize">{dua.category} Dua</CardTitle>
            <Badge variant="secondary">{dua.source}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="border-l-4 border-green-500 pl-6 py-4 bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl rtl text-right font-arabic leading-loose text-gray-800 dark:text-gray-200">
              {dua.arabic}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Transliteration</h3>
            <p className="text-base text-gray-600 dark:text-gray-400 italic">{dua.transliteration}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Translation</h3>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{dua.english}</p>
          </div>

          {dua.bestTime && (
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Best Time</p>
                <p className="text-sm text-muted-foreground">{dua.bestTime}</p>
              </div>
            </div>
          )}

          {dua.benefits && (
            <div className="flex items-start gap-2">
              <Star className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Benefits</p>
                <p className="text-sm text-muted-foreground">{dua.benefits}</p>
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

      {related.length > 1 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>More in {dua.category}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {related.filter(d => d.id !== dua.id).map(r => (
              <Link key={r.id} href={`/dua/${r.id}`} className="block">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  {r.english.slice(0, 80)}...
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
