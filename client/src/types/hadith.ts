export interface Hadith {
  id: string;
  volume: number;
  book: number;
  bookTitle: string;
  hadithNumber: number;
  arabicText?: string | null;
  englishText: string;
  narrator: string;
  grade: string;
  collection: string;
  tags?: string[] | null;
  chapter?: string | null;
}
