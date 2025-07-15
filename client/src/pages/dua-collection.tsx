import { useState } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Search, Volume2, BookOpen, Clock, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Dua {
  id: string;
  arabic: string;
  transliteration: string;
  english: string;
  category: string;
  source: string;
  benefits?: string;
  bestTime?: string;
}

interface DuaCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export default function DuaCollection() {
  const [match, params] = useRoute("/duas/:category?");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDua, setSelectedDua] = useState<Dua | null>(null);
  const category = params?.category;

  // Fetch categories
  const { data: categories, isLoading: categoriesLoading } = useQuery<DuaCategory[]>({
    queryKey: ["/api/duas/categories"],
  });

  // Fetch duas based on category
  const { data: duas, isLoading: duasLoading } = useQuery<Dua[]>({
    queryKey: ["/api/duas", category],
    queryFn: async () => {
      const url = category 
        ? `/api/duas?category=${encodeURIComponent(category)}`
        : "/api/duas";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch duas");
      return response.json();
    },
  });

  // Filter duas based on search
  const filteredDuas = duas?.filter(dua => 
    dua.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dua.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dua.category.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (!match) return null;

  return (
    <div className="container mx-auto px-4 py-6 pb-20">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Dua Collection</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search duas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories Grid - Show when no category selected */}
      {!category && !selectedDua && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoriesLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))
          ) : (
            categories?.map((cat) => (
              <Link key={cat.id} href={`/duas/${cat.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <span className="text-2xl mb-2 block">{cat.icon}</span>
                    <h3 className="font-semibold text-sm">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {cat.count} duas
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      )}

      {/* Duas List - Show when category selected */}
      {category && !selectedDua && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold capitalize">
              {category.replace("-", " ")} Duas
            </h2>
            <Link href="/duas">
              <Button variant="outline" size="sm">
                All Categories
              </Button>
            </Link>
          </div>

          {duasLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))
          ) : (
            <div className="grid gap-4">
              {filteredDuas.map((dua) => (
                <Card 
                  key={dua.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedDua(dua)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">
                        {dua.english.slice(0, 50)}...
                      </CardTitle>
                      {dua.bestTime && (
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {dua.bestTime}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      {dua.transliteration.slice(0, 80)}...
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {dua.source}
                      </Badge>
                      {dua.benefits && (
                        <Badge variant="outline" className="text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          Benefits
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Selected Dua Detail */}
      {selectedDua && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedDua(null)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-semibold">Dua Details</h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{selectedDua.category} Dua</CardTitle>
              <CardDescription>
                Source: {selectedDua.source}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Arabic Text */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Arabic</h3>
                  <Button variant="ghost" size="sm">
                    <Volume2 className="h-4 w-4 mr-1" />
                    Play Audio
                  </Button>
                </div>
                <div className="bg-secondary/20 p-4 rounded-lg">
                  <p className="text-2xl text-right font-arabic leading-loose">
                    {selectedDua.arabic}
                  </p>
                </div>
              </div>

              {/* Transliteration */}
              <div className="space-y-2">
                <h3 className="font-semibold">Transliteration</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {selectedDua.transliteration}
                </p>
              </div>

              {/* Translation */}
              <div className="space-y-2">
                <h3 className="font-semibold">Translation</h3>
                <p className="text-sm leading-relaxed">
                  {selectedDua.english}
                </p>
              </div>

              {/* Additional Info */}
              <div className="grid gap-4 pt-4 border-t">
                {selectedDua.bestTime && (
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Best Time</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedDua.bestTime}
                      </p>
                    </div>
                  </div>
                )}
                
                {selectedDua.benefits && (
                  <div className="flex items-start gap-2">
                    <Star className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Benefits</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedDua.benefits}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-2">
                  <BookOpen className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Source</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedDua.source}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}