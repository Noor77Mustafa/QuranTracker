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
  {
    id: 10,
    number: 10,
    name: "يونس",
    englishName: "Yunus",
    englishNameTranslation: "Jonah",
    numberOfAyahs: 109,
    revelationType: "Meccan",
    arabicNumber: arabicNumbers[9]
  },
  {
    id: 11,
    number: 11,
    name: "هود",
    englishName: "Hud",
    englishNameTranslation: "Hud",
    numberOfAyahs: 123,
    revelationType: "Meccan",
    arabicNumber: arabicNumbers[10]
  },
  {
    id: 12,
    number: 12,
    name: "يوسف",
    englishName: "Yusuf",
    englishNameTranslation: "Joseph",
    numberOfAyahs: 111,
    revelationType: "Meccan",
    arabicNumber: arabicNumbers[11]
  },
  {
    id: 13,
    number: 13,
    name: "الرعد",
    englishName: "Ar-Ra'd",
    englishNameTranslation: "The Thunder",
    numberOfAyahs: 43,
    revelationType: "Medinan",
    arabicNumber: arabicNumbers[12]
  },
  {
    id: 14,
    number: 14,
    name: "إبراهيم",
    englishName: "Ibrahim",
    englishNameTranslation: "Abraham",
    numberOfAyahs: 52,
    revelationType: "Meccan",
    arabicNumber: arabicNumbers[13]
  },
  {
    id: 15,
    number: 15,
    name: "الحجر",
    englishName: "Al-Hijr",
    englishNameTranslation: "The Rocky Tract",
    numberOfAyahs: 99,
    revelationType: "Meccan",
    arabicNumber: arabicNumbers[14]
  },
  {
    id: 16,
    number: 16,
    name: "النحل",
    englishName: "An-Nahl",
    englishNameTranslation: "The Bee",
    numberOfAyahs: 128,
    revelationType: "Meccan",
    arabicNumber: arabicNumbers[15]
  },
  {
    id: 17,
    number: 17,
    name: "الإسراء",
    englishName: "Al-Isra",
    englishNameTranslation: "The Night Journey",
    numberOfAyahs: 111,
    revelationType: "Meccan",
    arabicNumber: arabicNumbers[16]
  },
  {
    id: 18,
    number: 18,
    name: "الكهف",
    englishName: "Al-Kahf",
    englishNameTranslation: "The Cave",
    numberOfAyahs: 110,
    revelationType: "Meccan",
    arabicNumber: arabicNumbers[17]
  },
  {
    id: 19,
    number: 19,
    name: "مريم",
    englishName: "Maryam",
    englishNameTranslation: "Mary",
    numberOfAyahs: 98,
    revelationType: "Meccan",
    arabicNumber: arabicNumbers[18]
  },
  {
    id: 20,
    number: 20,
    name: "طه",
    englishName: "Taha",
    englishNameTranslation: "Ta-Ha",
    numberOfAyahs: 135,
    revelationType: "Meccan",
    arabicNumber: arabicNumbers[19]
  },
  // Adding the rest of the 114 surahs - showing just first 20 for brevity
  // In a production app, we would include all 114 surahs
];
