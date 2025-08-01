import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';
import { surahs as existingSurahs } from '../client/src/lib/surahs';

// Read juz mapping from downloaded JSON
const juzData = JSON.parse(fs.readFileSync('/tmp/juz.json','utf8'));

// Parse revelation order from Excel
const workbook = XLSX.readFile('/tmp/order.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows: any[][] = XLSX.utils.sheet_to_json(sheet, {header:1});

const revelationMap = new Map<number, number>();
for (const row of rows) {
  const order = Number(row[0]);
  const surah = Number(row[5]); // Standard Egyptian column
  if (order && surah) {
    revelationMap.set(surah, order);
  }
}

// Build Juz map (which Juz a surah starts in)
interface JuzRange {
  index: number;
  startIndex: number;
  startVerse: number;
  endIndex: number;
  endVerse: number;
}

const juzRanges: JuzRange[] = juzData.map((j: any) => ({
  index: Number(j.index),
  startIndex: Number(j.start.index),
  startVerse: Number((j.start.verse as string).split('_')[1]),
  endIndex: Number(j.end.index),
  endVerse: Number((j.end.verse as string).split('_')[1]),
}));

const juzMap = new Map<number, number>();
for (let s = 1; s <= 114; s++) {
  const match = juzRanges.find(j =>
    (s > j.startIndex && s < j.endIndex) ||
    (s === j.startIndex && 1 >= j.startVerse) ||
    (s === j.endIndex && 1 <= j.endVerse)
  );
  if (match) {
    juzMap.set(s, match.index);
  }
}

// Update surahs with juz and revelation order
const updatedSurahs = existingSurahs.map(s => ({
  ...s,
  juzNumber: juzMap.get(s.number),
  revelationOrder: revelationMap.get(s.number)
}));

// Reconstruct TypeScript file
const header = `export interface Surah {
  id: number;
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  arabicNumber: string;
  juzNumber?: number;
  revelationOrder?: number;
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
`;

const body = updatedSurahs.map(s => `  {
    id: ${s.id},
    number: ${s.number},
    name: ${JSON.stringify(s.name)},
    englishName: ${JSON.stringify(s.englishName)},
    englishNameTranslation: ${JSON.stringify(s.englishNameTranslation)},
    numberOfAyahs: ${s.numberOfAyahs},
    revelationType: ${JSON.stringify(s.revelationType)},
    arabicNumber: arabicNumbers[${s.number - 1}],
    juzNumber: ${s.juzNumber},
    revelationOrder: ${s.revelationOrder}
  }`).join(',\n');

const content = `${header}${body}\n];\n`;

fs.writeFileSync(path.join('client','src','lib','surahs.ts'), content);
console.log('Updated surahs.ts with Juz numbers and revelation order.');
