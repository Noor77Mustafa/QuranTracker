export interface Surah {
  id: number;
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  arabicNumber: string;
}

// Arabic numerals for 1-114
const arabicNumbers = [
  '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠',
  '١١', '١٢', '١٣', '١٤', '١٥', '١٦', '١٧', '١٨', '١٩', '٢٠',
  '٢١', '٢٢', '٢٣', '٢٤', '٢٥', '٢٦', '٢٧', '٢٨', '٢٩', '٣٠',
  '٣١', '٣٢', '٣٣', '٣٤', '٣٥', '٣٦', '٣٧', '٣٨', '٣٩', '٤٠',
  '٤١', '٤٢', '٤٣', '٤٤', '٤٥', '٤٦', '٤٧', '٤٨', '٤٩', '٥٠',
  '٥١', '٥٢', '٥٣', '٥٤', '٥٥', '٥٦', '٥٧', '٥٨', '٥٩', '٦٠',
  '٦١', '٦٢', '٦٣', '٦٤', '٦٥', '٦٦', '٦٧', '٦٨', '٦٩', '٧٠',
  '٧١', '٧٢', '٧٣', '٧٤', '٧٥', '٧٦', '٧٧', '٧٨', '٧٩', '٨٠',
  '٨١', '٨٢', '٨٣', '٨٤', '٨٥', '٨٦', '٨٧', '٨٨', '٨٩', '٩٠',
  '٩١', '٩٢', '٩٣', '٩٤', '٩٥', '٩٦', '٩٧', '٩٨', '٩٩', '١٠٠',
  '١٠١', '١٠٢', '١٠٣', '١٠٤', '١٠٥', '١٠٦', '١٠٧', '١٠٨', '١٠٩', '١١٠',
  '١١١', '١١٢', '١١٣', '١١٤'
];

export const surahs: Surah[] = [
  {
    id: 1,
    number: 1,
    name: "الفاتحة",
    englishName: "Al-Fatihah",
    englishNameTranslation: "The Opener",
    numberOfAyahs: 7,
    revelationType: "Meccan",
    arabicNumber: arabicNumbers[0]
  },
  {
    id: 2,
    number: 2,
    name: "البقرة",
    englishName: "Al-Baqarah",
    englishNameTranslation: "The Cow",
    numberOfAyahs: 286,
    revelationType: "Medinan",
    arabicNumber: arabicNumbers[1]
  },
  {
    id: 3,
    number: 3,
    name: "آل عمران",
    englishName: "Ali 'Imran",
    englishNameTranslation: "Family of Imran",
    numberOfAyahs: 200,
    revelationType: "Medinan",
    arabicNumber: arabicNumbers[2]
  },
  {
    id: 4,
    number: 4,
    name: "النساء",
    englishName: "An-Nisa",
    englishNameTranslation: "The Women",
    numberOfAyahs: 176,
    revelationType: "Medinan",
    arabicNumber: arabicNumbers[3]
  },
  {
    id: 5,
    number: 5,
    name: "المائدة",
    englishName: "Al-Ma'idah",
    englishNameTranslation: "The Table Spread",
    numberOfAyahs: 120,
    revelationType: "Medinan",
    arabicNumber: arabicNumbers[4]
  },
  {
    id: 6,
    number: 6,
    name: "الأنعام",
    englishName: "Al-An'am",
    englishNameTranslation: "The Cattle",
    numberOfAyahs: 165,
    revelationType: "Meccan",
    arabicNumber: arabicNumbers[5]
  },
  {
    id: 7,
    number: 7,
    name: "الأعراف",
    englishName: "Al-A'raf",
    englishNameTranslation: "The Heights",
    numberOfAyahs: 206,
    revelationType: "Meccan",
    arabicNumber: arabicNumbers[6]
  },
  {
    id: 8,
    number: 8,
    name: "الأنفال",
    englishName: "Al-Anfal",
    englishNameTranslation: "The Spoils of War",
    numberOfAyahs: 75,
    revelationType: "Medinan",
    arabicNumber: arabicNumbers[7]
  },
  {
    id: 9,
    number: 9,
    name: "التوبة",
    englishName: "At-Tawbah",
    englishNameTranslation: "The Repentance",
    numberOfAyahs: 129,
    revelationType: "Medinan",
    arabicNumber: arabicNumbers[8]
  },
  // First 9 surahs, we'd include all 114 in a real app
];
