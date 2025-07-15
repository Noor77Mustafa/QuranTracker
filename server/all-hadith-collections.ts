import { HadithEntry } from "./hadith-data";
import { ALL_BUKHARI_EXTENDED } from "./hadith-collections/bukhari-extended";
import { MUSLIM_EXTENDED } from "./hadith-collections/muslim-extended";
import { ALL_OTHER_COLLECTIONS_EXTENDED } from "./hadith-collections/other-collections-extended";
import { ALL_COMPREHENSIVE_HADITHS } from "./hadith-collections/comprehensive-hadiths";

// Sahih Muslim Collection
export const SAHIH_MUSLIM_COLLECTION: HadithEntry[] = [
  {
    id: "muslim-1-1-1",
    volume: 1,
    book: 1,
    bookTitle: "The Book of Faith",
    hadithNumber: 1,
    arabicText: "حَدَّثَنِي أَبُو خَيْثَمَةَ، زُهَيْرُ بْنُ حَرْبٍ حَدَّثَنَا وَكِيعٌ، عَنْ كَهْمَسٍ، عَنْ عَبْدِ اللَّهِ بْنِ بُرَيْدَةَ، عَنْ يَحْيَى بْنِ يَعْمَرَ",
    englishText: "It is narrated on the authority of Yahya b. Ya'mur that the first man who discussed qadr (divine decree) in Basra was Ma'bad al-Juhani. I along with Humaid b. 'Abdur-Rahman Himyari set out for pilgrimage or for 'Umrah and said: Should it so happen that we come into contact with one of the Companions of the Messenger of Allah (peace be upon him) we shall ask him about what is talked about regarding qadr (divine decree).",
    narrator: "Yahya bin Ya'mur",
    grade: "Sahih",
    collection: "muslim",
    tags: ["faith", "qadr", "divine decree"],
    chapter: "Chapter: Clarifying faith, Islam, and Ihsan"
  },
  {
    id: "muslim-1-1-2",
    volume: 1,
    book: 1,
    bookTitle: "The Book of Faith",
    hadithNumber: 2,
    englishText: "Umar bin al-Khattab said: One day we were sitting in the company of Allah's Apostle (peace be upon him) when there appeared before us a man dressed in pure white clothes, his hair extraordinarily black. There were no signs of travel on him. None amongst us recognized him.",
    narrator: "Umar ibn al-Khattab",
    grade: "Sahih",
    collection: "muslim",
    tags: ["faith", "Islam", "ihsan", "jibreel"],
    chapter: "Chapter: Clarifying faith, Islam, and Ihsan"
  },
  {
    id: "muslim-1-2-10",
    volume: 1,
    book: 2,
    bookTitle: "The Book of Purification",
    hadithNumber: 10,
    englishText: "Abu Huraira reported: The Messenger of Allah (may peace be upon him) said: When anyone amongst you wakes up from sleep, he must not put his hand in the utensil till he has washed it three times, for he does not know where his hand was during the night.",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "muslim",
    tags: ["purification", "cleanliness", "wudu"],
    chapter: "Chapter: It is disliked to put one's hand in a vessel before washing it three times"
  }
];

// Sunan Abu Dawud Collection
export const ABU_DAWUD_COLLECTION: HadithEntry[] = [
  {
    id: "abudawud-1-1-1",
    volume: 1,
    book: 1,
    bookTitle: "Purification",
    hadithNumber: 1,
    englishText: "Narrated Mughirah ibn Shu'bah: When the Prophet (ﷺ) went to the privy, I carried with him a jug full of water. When he came out, I poured water on his hands and he washed them. Then he wiped over his shoes.",
    narrator: "Mughirah ibn Shu'bah",
    grade: "Sahih",
    collection: "abudawud",
    tags: ["purification", "wudu", "wiping"],
    chapter: "Chapter: Things that make ablution necessary"
  },
  {
    id: "abudawud-1-1-2",
    volume: 1,
    book: 1,
    bookTitle: "Purification",
    hadithNumber: 2,
    englishText: "Narrated Salman al-Farsi: The Prophet (ﷺ) said: When any one of you intends to sleep on his bed, he should dust it off with the inner extremity of his lower garment for he does not know what has come on it since he left it.",
    narrator: "Salman al-Farsi",
    grade: "Sahih",
    collection: "abudawud",
    tags: ["cleanliness", "sleep", "sunnah"],
    chapter: "Chapter: About dusting the bed"
  }
];

// Jami at-Tirmidhi Collection
export const TIRMIDHI_COLLECTION: HadithEntry[] = [
  {
    id: "tirmidhi-1-1-1",
    volume: 1,
    book: 1,
    bookTitle: "The Book on Purification",
    hadithNumber: 1,
    englishText: "Abu Hurairah narrated that: Allah's Messenger said: 'The key to prayer is purification, its beginning is Takbir and its end is Taslim.'",
    narrator: "Abu Hurairah",
    grade: "Sahih",
    collection: "tirmidhi",
    tags: ["prayer", "purification", "salah"],
    chapter: "Chapter: What Has Been Related About 'The Key To Salat Is Purification'"
  },
  {
    id: "tirmidhi-1-1-2",
    volume: 1,
    book: 1,
    bookTitle: "The Book on Purification",
    hadithNumber: 2,
    englishText: "Jabir narrated that: The Prophet said: 'The earth has been made for me a place of prostration and a means of purification.'",
    narrator: "Jabir",
    grade: "Sahih",
    collection: "tirmidhi",
    tags: ["prayer", "earth", "purification"],
    chapter: "Chapter: What Has Been Related About The Earth Being A Means Of Purification"
  }
];

// Sunan an-Nasa'i Collection
export const NASAI_COLLECTION: HadithEntry[] = [
  {
    id: "nasai-1-1-1",
    volume: 1,
    book: 1,
    bookTitle: "The Book of Purification",
    hadithNumber: 1,
    englishText: "It was narrated from Abu Hurairah that the Prophet (ﷺ) said: 'When any one of you wakes from his sleep, let him blow his nose three times, for the Shaitan spends the night in his nostrils.'",
    narrator: "Abu Hurairah",
    grade: "Sahih",
    collection: "nasai",
    tags: ["purification", "sleep", "shaitan"],
    chapter: "Chapter: Blowing the nose when performing ablution"
  },
  {
    id: "nasai-1-1-2",
    volume: 1,
    book: 1,
    bookTitle: "The Book of Purification",
    hadithNumber: 2,
    englishText: "It was narrated that 'Abdullah bin Zaid said: 'I saw the Messenger of Allah (ﷺ) perform ablution. He washed his face three times and his hands twice, and he washed his feet twice.'",
    narrator: "Abdullah bin Zaid",
    grade: "Sahih",
    collection: "nasai",
    tags: ["wudu", "ablution", "purification"],
    chapter: "Chapter: How ablution is to be performed"
  }
];

// Sunan Ibn Majah Collection
export const IBN_MAJAH_COLLECTION: HadithEntry[] = [
  {
    id: "ibnmajah-1-1-1",
    volume: 1,
    book: 1,
    bookTitle: "The Book of Purification",
    hadithNumber: 1,
    englishText: "It was narrated that Abu Hurairah said: 'The Messenger of Allah (ﷺ) said: When anyone of you performs ablution, let him put water in his nose and blow it out.'",
    narrator: "Abu Hurairah",
    grade: "Sahih",
    collection: "ibnmajah",
    tags: ["wudu", "ablution", "nose"],
    chapter: "Chapter: Concerning washing the nose"
  },
  {
    id: "ibnmajah-1-1-2",
    volume: 1,
    book: 1,
    bookTitle: "The Book of Purification",
    hadithNumber: 2,
    englishText: "It was narrated from 'Aishah that the Prophet (ﷺ) used to like to start with the right whenever he could, when purifying himself, when putting on shoes and when combing.",
    narrator: "Aisha",
    grade: "Sahih",
    collection: "ibnmajah",
    tags: ["sunnah", "right side", "purification"],
    chapter: "Chapter: Starting with the right"
  }
];

// Additional Collections
export const AHMAD_COLLECTION: HadithEntry[] = [
  {
    id: "ahmad-1-1-1",
    volume: 1,
    book: 1,
    bookTitle: "Musnad of Abu Bakr as-Siddiq",
    hadithNumber: 1,
    englishText: "Abu Bakr said: 'O Messenger of Allah, teach me a supplication which I may make in my prayer.' He said: 'Say: O Allah, I have wronged myself greatly and none forgives sins except You, so forgive me with forgiveness from You and have mercy on me. Indeed You are the Forgiving, the Merciful.'",
    narrator: "Abu Bakr as-Siddiq",
    grade: "Sahih",
    collection: "ahmad",
    tags: ["dua", "prayer", "forgiveness"],
    chapter: "Hadith of Abu Bakr"
  }
];

export const MALIK_COLLECTION: HadithEntry[] = [
  {
    id: "malik-1-1-1",
    volume: 1,
    book: 1,
    bookTitle: "The Times of Prayer",
    hadithNumber: 1,
    englishText: "Yahya related to me from Malik from Ibn Shihab that Umar ibn Abd al-Aziz delayed the prayer one day and Urwa ibn az-Zubayr came in to him and said, 'Al-Mughira ibn Shu'ba delayed the prayer one day while he was in Kufa and Abu Mas'ud al-Ansari came in to him and said, 'What is this, Mughira? Don't you know that Jibril came down and prayed and the Messenger of Allah, may Allah bless him and grant him peace, prayed.'",
    narrator: "Urwa ibn az-Zubayr",
    grade: "Sahih",
    collection: "malik",
    tags: ["prayer", "timing", "salah"],
    chapter: "Chapter: The Times of Prayer"
  }
];

export const DARIMI_COLLECTION: HadithEntry[] = [
  {
    id: "darimi-1-1-1",
    volume: 1,
    book: 1,
    bookTitle: "Introduction",
    hadithNumber: 1,
    englishText: "Abdullah ibn Mas'ud said: 'Whoever wants to meet Allah tomorrow as a Muslim, let him preserve these five prayers where they are called for, for they are from the ways of guidance, and Allah prescribed the ways of guidance for your Prophet.'",
    narrator: "Abdullah ibn Mas'ud",
    grade: "Sahih",
    collection: "darimi",
    tags: ["prayer", "congregation", "guidance"],
    chapter: "Chapter: The excellence of knowledge"
  }
];

export const TABARANI_COLLECTION: HadithEntry[] = [
  {
    id: "tabarani-1-1-1",
    volume: 1,
    book: 1,
    bookTitle: "Al-Mu'jam al-Kabir",
    hadithNumber: 1,
    englishText: "The Prophet (ﷺ) said: 'The best of you are those who learn the Qur'an and teach it.'",
    narrator: "Uthman ibn Affan",
    grade: "Sahih",
    collection: "tabarani",
    tags: ["quran", "learning", "teaching"],
    chapter: "Chapter: Excellence of learning Quran"
  }
];

export const BAYHAQI_COLLECTION: HadithEntry[] = [
  {
    id: "bayhaqi-1-1-1",
    volume: 1,
    book: 1,
    bookTitle: "The Book of Faith",
    hadithNumber: 1,
    englishText: "The Prophet (ﷺ) said: 'Faith has seventy-odd branches, the highest of which is saying La ilaha illallah (there is no deity but Allah), and the lowest of which is removing something harmful from the road, and modesty is a branch of faith.'",
    narrator: "Abu Hurairah",
    grade: "Sahih",
    collection: "bayhaqi",
    tags: ["faith", "iman", "branches"],
    chapter: "Chapter: The branches of faith"
  }
];

export const HAKIM_COLLECTION: HadithEntry[] = [
  {
    id: "hakim-1-1-1",
    volume: 1,
    book: 1,
    bookTitle: "The Book of Faith",
    hadithNumber: 1,
    englishText: "The Prophet (ﷺ) said: 'Seeking knowledge is obligatory upon every Muslim.'",
    narrator: "Anas ibn Malik",
    grade: "Sahih",
    collection: "hakim",
    tags: ["knowledge", "obligation", "learning"],
    chapter: "Chapter: The obligation of seeking knowledge"
  }
];

// Combine all collections
export const ALL_HADITH_COLLECTIONS: HadithEntry[] = [
  ...ALL_BUKHARI_EXTENDED,
  ...MUSLIM_EXTENDED,
  ...ALL_OTHER_COLLECTIONS_EXTENDED,
  ...ALL_COMPREHENSIVE_HADITHS,
  ...SAHIH_MUSLIM_COLLECTION,
  ...ABU_DAWUD_COLLECTION,
  ...TIRMIDHI_COLLECTION,
  ...NASAI_COLLECTION,
  ...IBN_MAJAH_COLLECTION,
  ...AHMAD_COLLECTION,
  ...MALIK_COLLECTION,
  ...DARIMI_COLLECTION,
  ...TABARANI_COLLECTION,
  ...BAYHAQI_COLLECTION,
  ...HAKIM_COLLECTION
];

// Export collection metadata
export const HADITH_COLLECTION_INFO = {
  muslim: {
    name: "Sahih Muslim",
    author: "Imam Muslim ibn al-Hajjaj",
    totalHadiths: 7563,
    description: "One of the six major hadith collections, considered the most authentic after Sahih Bukhari"
  },
  abudawud: {
    name: "Sunan Abu Dawud", 
    author: "Imam Abu Dawud",
    totalHadiths: 4800,
    description: "One of the six canonical hadith collections, focused on jurisprudential hadiths"
  },
  tirmidhi: {
    name: "Jami' at-Tirmidhi",
    author: "Imam at-Tirmidhi", 
    totalHadiths: 3956,
    description: "Known for including the opinions of jurists and grading of hadiths"
  },
  nasai: {
    name: "Sunan an-Nasa'i",
    author: "Imam an-Nasa'i",
    totalHadiths: 5758,
    description: "Known for its careful selection and authentication of hadiths"
  },
  ibnmajah: {
    name: "Sunan Ibn Majah",
    author: "Imam Ibn Majah",
    totalHadiths: 4341,
    description: "The sixth of the six major hadith collections"
  },
  ahmad: {
    name: "Musnad Ahmad",
    author: "Imam Ahmad ibn Hanbal",
    totalHadiths: 30000,
    description: "One of the largest hadith collections, arranged by narrator"
  },
  malik: {
    name: "Muwatta Malik",
    author: "Imam Malik",
    totalHadiths: 1720,
    description: "One of the earliest hadith collections, includes legal rulings"
  },
  darimi: {
    name: "Sunan ad-Darimi", 
    author: "Imam ad-Darimi",
    totalHadiths: 3503,
    description: "An important early hadith collection"
  },
  tabarani: {
    name: "Al-Mu'jam al-Kabir",
    author: "Imam at-Tabarani",
    totalHadiths: 25000,
    description: "A comprehensive collection arranged alphabetically by companion names"
  },
  bayhaqi: {
    name: "As-Sunan al-Kubra",
    author: "Imam al-Bayhaqi",
    totalHadiths: 21812,
    description: "A comprehensive collection focused on legal hadiths"
  },
  hakim: {
    name: "Al-Mustadrak",
    author: "Imam al-Hakim",
    totalHadiths: 9045,
    description: "Contains hadiths meeting Bukhari and Muslim's criteria but not in their collections"
  }
};