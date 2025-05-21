import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useBookmarks, Bookmark } from "@/hooks/use-bookmarks";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function BookmarksPage() {
  const [, navigate] = useLocation();
  const { bookmarks, removeBookmark, updateBookmark } = useBookmarks();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);
  const [bookmarkNote, setBookmarkNote] = useState("");
  
  // Filter bookmarks based on search term
  const filteredBookmarks = bookmarks.filter(bookmark => {
    if (!searchTerm.trim()) return true;
    
    const term = searchTerm.toLowerCase();
    return (
      bookmark.surahName.toLowerCase().includes(term) ||
      `ayah ${bookmark.ayahNumber}`.includes(term) ||
      (bookmark.notes && bookmark.notes.toLowerCase().includes(term))
    );
  });
  
  // Sort bookmarks by timestamp (newest first)
  const sortedBookmarks = [...filteredBookmarks].sort((a, b) => b.timestamp - a.timestamp);
  
  const handleEditBookmark = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark);
    setBookmarkNote(bookmark.notes || "");
  };
  
  const handleUpdateBookmark = () => {
    if (!editingBookmark) return;
    
    updateBookmark(editingBookmark.id, { notes: bookmarkNote });
    
    toast({
      title: "Bookmark updated",
      description: `Updated notes for ${editingBookmark.surahName} (${editingBookmark.ayahNumber})`,
    });
    
    setEditingBookmark(null);
  };
  
  const handleDeleteBookmark = (id: string, surahName: string, ayahNumber: number) => {
    removeBookmark(id);
    
    toast({
      title: "Bookmark removed",
      description: `Removed bookmark for ${surahName} (${ayahNumber})`,
      variant: "destructive"
    });
  };
  
  return (
    <main id="main-content" className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Bookmarks</h1>
        <Button 
          variant="outline" 
          onClick={() => navigate("/read")}
          className="flex items-center"
        >
          <span className="material-symbols-rounded mr-2">book</span>
          Go to Reading
        </Button>
      </div>
      
      {/* Search */}
      <div className="relative mb-6">
        <Input 
          placeholder="Search bookmarks..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          aria-label="Search bookmarks"
        />
        <span 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 material-symbols-rounded" 
          aria-hidden="true"
        >
          search
        </span>
      </div>
      
      {/* Bookmarks List */}
      {sortedBookmarks.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <span className="material-symbols-rounded text-5xl text-gray-400 mb-4">bookmark</span>
          <h2 className="text-xl font-medium mb-2">No bookmarks yet</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Start adding bookmarks while reading the Quran to save your favorite verses.
          </p>
          <Button onClick={() => navigate("/read")}>
            Start Reading
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedBookmarks.map((bookmark) => (
            <div 
              key={bookmark.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{bookmark.surahName}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Ayah {bookmark.ayahNumber}</p>
                </div>
                <div className="flex space-x-1">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0" 
                    onClick={() => handleEditBookmark(bookmark)}
                    aria-label="Edit bookmark"
                  >
                    <span className="material-symbols-rounded text-gray-500">edit</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0" 
                    onClick={() => handleDeleteBookmark(bookmark.id, bookmark.surahName, bookmark.ayahNumber)}
                    aria-label="Delete bookmark"
                  >
                    <span className="material-symbols-rounded text-gray-500">delete</span>
                  </Button>
                </div>
              </div>
              
              {bookmark.notes && (
                <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded text-sm">
                  {bookmark.notes}
                </div>
              )}
              
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {format(new Date(bookmark.timestamp), "MMM d, yyyy 'at' h:mm a")}
                </span>
                <Button 
                  size="sm" 
                  onClick={() => navigate(`/surah/${bookmark.surahId}?ayah=${bookmark.ayahNumber}`)}
                  className="flex items-center"
                  aria-label={`Go to ${bookmark.surahName} ayah ${bookmark.ayahNumber}`}
                >
                  <span className="material-symbols-rounded mr-1 text-sm">open_in_new</span>
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Edit Bookmark Dialog */}
      <Dialog open={!!editingBookmark} onOpenChange={(open) => !open && setEditingBookmark(null)}>
        {editingBookmark && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Bookmark Notes</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="mb-4">
                <h3 className="font-medium">{editingBookmark.surahName}</h3>
                <p className="text-sm text-gray-500">Ayah {editingBookmark.ayahNumber}</p>
              </div>
              <Textarea
                placeholder="Add your notes or reflections about this ayah..."
                className="h-32"
                value={bookmarkNote}
                onChange={(e) => setBookmarkNote(e.target.value)}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleUpdateBookmark}>Update</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
}