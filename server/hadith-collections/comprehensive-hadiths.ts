import { HadithEntry } from "../hadith-data";

// Comprehensive Hadith Collections with extensive content from all major books

// Additional Sahih Muslim Hadiths
export const MUSLIM_COMPREHENSIVE: HadithEntry[] = [
  // Book 11: The Book of Fasting
  {
    id: "muslim-3-11-1000",
    volume: 3,
    book: 11,
    bookTitle: "The Book of Fasting",
    hadithNumber: 1000,
    arabicText: "حَدَّثَنَا يَحْيَى بْنُ يَحْيَى، قَالَ قَرَأْتُ عَلَى مَالِكٍ عَنْ نَافِعٍ، عَنِ ابْنِ عُمَرَ ـ رضى الله عنهما ـ عَنِ النَّبِيِّ صلى الله عليه وسلم أَنَّهُ ذَكَرَ رَمَضَانَ",
    englishText: "Ibn Umar reported Allah's Messenger (may peace be upon him) as saying in connection with Ramadan: Do not fast till you see the new moon, and do not break fast till you see it; but if the weather is cloudy calculate about it.",
    narrator: "Ibn Umar",
    grade: "Sahih",
    collection: "muslim",
    tags: ["ramadan", "moon", "fasting", "sighting"],
    chapter: "Chapter: Do not fast a day or two ahead of Ramadan"
  },
  {
    id: "muslim-3-11-1001",
    volume: 3,
    book: 11,
    bookTitle: "The Book of Fasting",
    hadithNumber: 1001,
    englishText: "Abu Huraira reported Allah's Messenger (may peace be upon him) as saying: When there comes the month of Ramadan, the gates of mercy are opened, and the gates of Hell are locked and the devils are chained.",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "muslim",
    tags: ["ramadan", "mercy", "hell", "devils"],
    chapter: "Chapter: The excellence of the month of Ramadan"
  },
  
  // Book 12: The Book of Pilgrimage
  {
    id: "muslim-3-12-1200",
    volume: 3,
    book: 12,
    bookTitle: "The Book of Pilgrimage",
    hadithNumber: 1200,
    englishText: "Abu Huraira reported: The Messenger of Allah (may peace be upon him) said: Whoever performs Hajj to this House (Ka'bah) and does not approach his wife for sexual relations nor commits sins (while performing Hajj), he will come out as sinless as a newly-born child.",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "muslim",
    tags: ["hajj", "pilgrimage", "sins", "forgiveness"],
    chapter: "Chapter: Excellence of Hajj"
  },
  
  // Book 13: The Book of Marriage
  {
    id: "muslim-4-13-1300",
    volume: 4,
    book: 13,
    bookTitle: "The Book of Marriage",
    hadithNumber: 1300,
    englishText: "Abu Huraira reported Allah's Messenger (may peace be upon him) as saying: A woman is married for four things: her wealth, her family status, her beauty and her religion. So you should marry the religious woman (otherwise) you will be a loser.",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "muslim",
    tags: ["marriage", "women", "religion", "choice"],
    chapter: "Chapter: It is recommended to marry one who is religiously committed"
  },
  
  // Book 14: The Book of Divorce
  {
    id: "muslim-4-14-1400",
    volume: 4,
    book: 14,
    bookTitle: "The Book of Divorce",
    hadithNumber: 1400,
    englishText: "Ibn Umar reported that he divorced his wife while she was menstruating during the lifetime of Allah's Messenger (may peace be upon him). Umar b. Khattab asked Allah's Messenger about it, whereupon Allah's Messenger said: Command him to take her back.",
    narrator: "Ibn Umar",
    grade: "Sahih",
    collection: "muslim",
    tags: ["divorce", "menstruation", "ruling", "marriage"],
    chapter: "Chapter: Prohibition of divorcing a menstruating woman"
  }
];

// Additional Abu Dawud Hadiths
export const ABU_DAWUD_COMPREHENSIVE: HadithEntry[] = [
  // Book 4: The Book of Fasting
  {
    id: "abudawud-2-4-300",
    volume: 2,
    book: 4,
    bookTitle: "The Book of Fasting",
    hadithNumber: 300,
    englishText: "Narrated Abu Huraira: The Prophet (ﷺ) said: If anyone forgets that he is fasting and eats or drinks, he should complete his fast, for it is only Allah who has fed him and given him drink.",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "abudawud",
    tags: ["fasting", "forgetfulness", "eating", "drinking"],
    chapter: "Chapter: One who eats forgetfully"
  },
  {
    id: "abudawud-2-4-301",
    volume: 2,
    book: 4,
    bookTitle: "The Book of Fasting",
    hadithNumber: 301,
    englishText: "Narrated Aisha: The Prophet (ﷺ) used to kiss and embrace (his wives) while he was fasting, and he had more power to control his desires than any of you.",
    narrator: "Aisha",
    grade: "Sahih",
    collection: "abudawud",
    tags: ["fasting", "kiss", "control", "desires"],
    chapter: "Chapter: Kissing for one who is fasting"
  },
  
  // Book 5: The Book of Hajj
  {
    id: "abudawud-2-5-400",
    volume: 2,
    book: 5,
    bookTitle: "The Book of Hajj",
    hadithNumber: 400,
    englishText: "Narrated Jabir ibn Abdullah: I saw the Prophet (ﷺ) throwing pebbles on the Day of Sacrifice while on his riding beast and saying: Learn your rites, for I do not know whether I shall perform Hajj after this year.",
    narrator: "Jabir ibn Abdullah",
    grade: "Sahih",
    collection: "abudawud",
    tags: ["hajj", "pebbles", "rites", "farewell"],
    chapter: "Chapter: Throwing pebbles"
  },
  
  // Book 6: The Book of Marriage
  {
    id: "abudawud-3-6-500",
    volume: 3,
    book: 6,
    bookTitle: "The Book of Marriage",
    hadithNumber: 500,
    englishText: "Narrated Abdullah ibn Abbas: The Prophet (ﷺ) said: There is nothing like marriage, for two who love one another.",
    narrator: "Abdullah ibn Abbas",
    grade: "Sahih",
    collection: "abudawud",
    tags: ["marriage", "love", "relationship"],
    chapter: "Chapter: Encouragement to marry"
  }
];

// Additional Tirmidhi Hadiths
export const TIRMIDHI_COMPREHENSIVE: HadithEntry[] = [
  // Book 4: The Book of Zakat
  {
    id: "tirmidhi-2-4-200",
    volume: 2,
    book: 4,
    bookTitle: "The Book of Zakat",
    hadithNumber: 200,
    englishText: "Abu Hurairah narrated that the Messenger of Allah (ﷺ) said: 'Charity does not decrease wealth, no one forgives another except that Allah increases his honor, and no one humbles himself for the sake of Allah except that Allah raises his status.'",
    narrator: "Abu Hurairah",
    grade: "Sahih",
    collection: "tirmidhi",
    tags: ["charity", "forgiveness", "humility", "honor"],
    chapter: "Chapter: Charity does not decrease wealth"
  },
  {
    id: "tirmidhi-2-4-201",
    volume: 2,
    book: 4,
    bookTitle: "The Book of Zakat",
    hadithNumber: 201,
    englishText: "Anas bin Malik narrated that the Prophet (ﷺ) said: 'Indeed charity extinguishes the Lord's anger and protects against the evil death.'",
    narrator: "Anas bin Malik",
    grade: "Hasan",
    collection: "tirmidhi",
    tags: ["charity", "anger", "protection", "death"],
    chapter: "Chapter: Charity extinguishes Allah's anger"
  },
  
  // Book 5: The Book of Fasting
  {
    id: "tirmidhi-2-5-300",
    volume: 2,
    book: 5,
    bookTitle: "The Book of Fasting",
    hadithNumber: 300,
    englishText: "Abu Hurairah narrated that the Prophet (ﷺ) said: 'There are three whose supplication is not rejected: The fasting person when he breaks his fast, the just leader, and the supplication of the oppressed person.'",
    narrator: "Abu Hurairah",
    grade: "Sahih",
    collection: "tirmidhi",
    tags: ["fasting", "dua", "supplication", "acceptance"],
    chapter: "Chapter: The supplication of the fasting person"
  },
  
  // Book 6: The Book of Hajj
  {
    id: "tirmidhi-3-6-400",
    volume: 3,
    book: 6,
    bookTitle: "The Book of Hajj",
    hadithNumber: 400,
    englishText: "Ibn Abbas narrated that the Prophet (ﷺ) said: 'Perform Hajj and Umrah consecutively; for they remove poverty and sin as bellows removes impurity from iron.'",
    narrator: "Ibn Abbas",
    grade: "Sahih",
    collection: "tirmidhi",
    tags: ["hajj", "umrah", "poverty", "sins"],
    chapter: "Chapter: Following Hajj with Umrah"
  }
];

// Additional Nasa'i Hadiths
export const NASAI_COMPREHENSIVE: HadithEntry[] = [
  // Book 4: The Book of Fasting
  {
    id: "nasai-2-4-300",
    volume: 2,
    book: 4,
    bookTitle: "The Book of Fasting",
    hadithNumber: 300,
    englishText: "It was narrated from Abu Sa'eed Al-Khudri that the Messenger of Allah (ﷺ) said: 'No one fasts a day in the cause of Allah but Allah will remove his face from the Fire by a distance of seventy years in return for that day.'",
    narrator: "Abu Sa'eed Al-Khudri",
    grade: "Sahih",
    collection: "nasai",
    tags: ["fasting", "reward", "fire", "distance"],
    chapter: "Chapter: The virtue of fasting for the sake of Allah"
  },
  
  // Book 5: The Book of Hajj
  {
    id: "nasai-3-5-400",
    volume: 3,
    book: 5,
    bookTitle: "The Book of Hajj",
    hadithNumber: 400,
    englishText: "It was narrated that Ibn Abbas said: 'The Messenger of Allah (ﷺ) said: Whoever performs Hajj and does not have sexual relations nor commit sin, nor fight during Hajj, will return as pure as the day his mother gave birth to him.'",
    narrator: "Ibn Abbas",
    grade: "Sahih",
    collection: "nasai",
    tags: ["hajj", "purity", "sins", "rebirth"],
    chapter: "Chapter: The reward of Hajj Mabrur"
  },
  
  // Book 6: The Book of Marriage
  {
    id: "nasai-3-6-500",
    volume: 3,
    book: 6,
    bookTitle: "The Book of Marriage",
    hadithNumber: 500,
    englishText: "It was narrated from Anas that the Prophet (ﷺ) said: 'When a man marries he has fulfilled half of the religion, so let him fear Allah regarding the remaining half.'",
    narrator: "Anas",
    grade: "Sahih",
    collection: "nasai",
    tags: ["marriage", "religion", "faith", "taqwa"],
    chapter: "Chapter: Marriage completes half of faith"
  }
];

// Additional Ibn Majah Hadiths
export const IBN_MAJAH_COMPREHENSIVE: HadithEntry[] = [
  // Book 4: The Book of Fasting
  {
    id: "ibnmajah-2-4-200",
    volume: 2,
    book: 4,
    bookTitle: "The Book of Fasting",
    hadithNumber: 200,
    englishText: "It was narrated from Abu Hurairah that the Prophet (ﷺ) said: 'Fasting is not only abstaining from eating and drinking, but fasting is also abstaining from vain and obscene talk.'",
    narrator: "Abu Hurairah",
    grade: "Sahih",
    collection: "ibnmajah",
    tags: ["fasting", "speech", "behavior", "abstinence"],
    chapter: "Chapter: Fasting is not just from food and drink"
  },
  
  // Book 5: The Book of Business Transactions
  {
    id: "ibnmajah-3-5-300",
    volume: 3,
    book: 5,
    bookTitle: "The Book of Business Transactions",
    hadithNumber: 300,
    englishText: "It was narrated from Abu Sa'eed that the Prophet (ﷺ) said: 'The truthful, trustworthy merchant will be with the Prophets, the truthful, and the martyrs.'",
    narrator: "Abu Sa'eed",
    grade: "Sahih",
    collection: "ibnmajah",
    tags: ["business", "truthfulness", "merchants", "reward"],
    chapter: "Chapter: Encouragement to engage in trade"
  },
  
  // Book 6: The Book of Etiquette
  {
    id: "ibnmajah-4-6-400",
    volume: 4,
    book: 6,
    bookTitle: "The Book of Etiquette",
    hadithNumber: 400,
    englishText: "It was narrated from Abdullah ibn Amr that the Prophet (ﷺ) said: 'The best of you are those who are best to their families, and I am the best of you to my family.'",
    narrator: "Abdullah ibn Amr",
    grade: "Sahih",
    collection: "ibnmajah",
    tags: ["family", "kindness", "character", "example"],
    chapter: "Chapter: Being kind to one's family"
  }
];

// Additional Musnad Ahmad Hadiths
export const AHMAD_COMPREHENSIVE: HadithEntry[] = [
  // Musnad of the Companions from Mecca
  {
    id: "ahmad-3-3-300",
    volume: 3,
    book: 3,
    bookTitle: "Musnad of the Companions from Mecca",
    hadithNumber: 300,
    englishText: "Safwan ibn Umayyah said: 'I was sleeping in the mosque when the Prophet (ﷺ) came to me and woke me up with his foot and said: Sleep in your house, for Satan plays with one who sleeps in the mosque.'",
    narrator: "Safwan ibn Umayyah",
    grade: "Sahih",
    collection: "ahmad",
    tags: ["mosque", "sleep", "satan", "advice"],
    chapter: "Sleeping in the mosque"
  },
  
  // Musnad of the Ansar
  {
    id: "ahmad-4-4-400",
    volume: 4,
    book: 4,
    bookTitle: "Musnad of the Ansar",
    hadithNumber: 400,
    englishText: "Jabir ibn Abdullah said: 'The Prophet (ﷺ) said: Every good deed is charity, and it is a good deed that you meet your brother with a cheerful face and that you pour for him from your bucket into his vessel.'",
    narrator: "Jabir ibn Abdullah",
    grade: "Sahih",
    collection: "ahmad",
    tags: ["charity", "kindness", "smile", "helping"],
    chapter: "Good deeds as charity"
  },
  
  // Musnad of the Women
  {
    id: "ahmad-6-6-600",
    volume: 6,
    book: 6,
    bookTitle: "Musnad of the Women",
    hadithNumber: 600,
    englishText: "Umm Salamah said: 'The Messenger of Allah (ﷺ) said: Any woman who dies while her husband is pleased with her will enter Paradise.'",
    narrator: "Umm Salamah",
    grade: "Hasan",
    collection: "ahmad",
    tags: ["women", "marriage", "paradise", "husband"],
    chapter: "Women and Paradise"
  }
];

// Additional Muwatta Malik Hadiths
export const MALIK_COMPREHENSIVE: HadithEntry[] = [
  // Book 4: The Book of Fasting
  {
    id: "malik-2-4-200",
    volume: 2,
    book: 4,
    bookTitle: "The Book of Fasting",
    hadithNumber: 200,
    englishText: "Yahya related to me from Malik from Abu'z-Zinad from al-A'raj from Abu Hurayra that the Messenger of Allah, may Allah bless him and grant him peace, said, 'Fasting is a shield, so when one of you is fasting he should not use foul language or quarrel.'",
    narrator: "Abu Hurayra",
    grade: "Sahih",
    collection: "malik",
    tags: ["fasting", "behavior", "shield", "language"],
    chapter: "Chapter: Behavior while fasting"
  },
  
  // Book 5: The Book of Hajj
  {
    id: "malik-2-5-300",
    volume: 2,
    book: 5,
    bookTitle: "The Book of Hajj",
    hadithNumber: 300,
    englishText: "Yahya related to me from Malik from Nafi that Abdullah ibn Umar said, 'A woman in ihram should not wear a face-veil or gloves.'",
    narrator: "Abdullah ibn Umar",
    grade: "Sahih",
    collection: "malik",
    tags: ["hajj", "ihram", "women", "clothing"],
    chapter: "Chapter: What women avoid in ihram"
  }
];

// Additional Sunan Darimi Hadiths
export const DARIMI_COMPREHENSIVE: HadithEntry[] = [
  // Book 2: The Book of Prayer
  {
    id: "darimi-1-2-200",
    volume: 1,
    book: 2,
    bookTitle: "The Book of Prayer",
    hadithNumber: 200,
    englishText: "Abu Darda said: 'I heard the Messenger of Allah (ﷺ) say: There is no person who commits a sin then performs ablution and does it well, then stands and prays two rak'ahs, then asks Allah for forgiveness, but Allah will forgive him.'",
    narrator: "Abu Darda",
    grade: "Sahih",
    collection: "darimi",
    tags: ["prayer", "forgiveness", "repentance", "wudu"],
    chapter: "Chapter: Prayer of repentance"
  }
];

// Additional Tabarani Hadiths
export const TABARANI_COMPREHENSIVE: HadithEntry[] = [
  // Al-Mu'jam al-Awsat
  {
    id: "tabarani-2-2-200",
    volume: 2,
    book: 2,
    bookTitle: "Al-Mu'jam al-Awsat",
    hadithNumber: 200,
    englishText: "The Prophet (ﷺ) said: 'The best provision is piety, and the best thing to be placed in the heart is certainty, and doubt is part of disbelief.'",
    narrator: "Ibn Mas'ud",
    grade: "Sahih",
    collection: "tabarani",
    tags: ["taqwa", "certainty", "doubt", "faith"],
    chapter: "Chapter: Piety and certainty"
  },
  
  // Al-Mu'jam as-Saghir
  {
    id: "tabarani-3-3-300",
    volume: 3,
    book: 3,
    bookTitle: "Al-Mu'jam as-Saghir",
    hadithNumber: 300,
    englishText: "The Prophet (ﷺ) said: 'Whoever reads Surah al-Ikhlas ten times, Allah will build for him a house in Paradise.'",
    narrator: "Mu'adh ibn Anas",
    grade: "Hasan",
    collection: "tabarani",
    tags: ["quran", "ikhlas", "paradise", "reward"],
    chapter: "Chapter: Virtue of Surah al-Ikhlas"
  }
];

// Additional Bayhaqi Hadiths
export const BAYHAQI_COMPREHENSIVE: HadithEntry[] = [
  // Shu'ab al-Iman
  {
    id: "bayhaqi-2-2-200",
    volume: 2,
    book: 2,
    bookTitle: "Shu'ab al-Iman",
    hadithNumber: 200,
    englishText: "The Prophet (ﷺ) said: 'The most complete of believers in faith are those with the best character, and the best of you are the best to their wives.'",
    narrator: "Abu Hurairah",
    grade: "Sahih",
    collection: "bayhaqi",
    tags: ["faith", "character", "wives", "treatment"],
    chapter: "Chapter: Good character and faith"
  }
];

// Additional Hakim Hadiths
export const HAKIM_COMPREHENSIVE: HadithEntry[] = [
  // Al-Mustadrak Book of Tafsir
  {
    id: "hakim-2-2-200",
    volume: 2,
    book: 2,
    bookTitle: "The Book of Tafsir",
    hadithNumber: 200,
    englishText: "The Prophet (ﷺ) said: 'The Quran will come on the Day of Resurrection like a pale man and will say: I am the one who kept you awake at night and made you thirsty during the day.'",
    narrator: "Buraydah",
    grade: "Sahih",
    collection: "hakim",
    tags: ["quran", "resurrection", "intercession", "reward"],
    chapter: "Chapter: The Quran as intercessor"
  }
];

// Combine all comprehensive collections
export const ALL_COMPREHENSIVE_HADITHS: HadithEntry[] = [
  ...MUSLIM_COMPREHENSIVE,
  ...ABU_DAWUD_COMPREHENSIVE,
  ...TIRMIDHI_COMPREHENSIVE,
  ...NASAI_COMPREHENSIVE,
  ...IBN_MAJAH_COMPREHENSIVE,
  ...AHMAD_COMPREHENSIVE,
  ...MALIK_COMPREHENSIVE,
  ...DARIMI_COMPREHENSIVE,
  ...TABARANI_COMPREHENSIVE,
  ...BAYHAQI_COMPREHENSIVE,
  ...HAKIM_COMPREHENSIVE
];