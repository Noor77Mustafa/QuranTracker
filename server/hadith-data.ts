// Complete Sahih al-Bukhari Hadith Collection
// Based on the attached PDF: The Complete Hadith - Sahih al-Bukhari Volumes 1-9

export interface HadithEntry {
  id: string;
  volume: number;
  book: number;
  bookTitle: string;
  hadithNumber: number;
  arabicText?: string;
  englishText: string;
  narrator: string;
  grade: "Sahih" | "Hasan" | "Da'if";
  collection: "bukhari" | "muslim" | "abudawud" | "tirmidhi" | "nasai" | "ibnmajah" | "nawawi40";
  tags?: string[];
  chapter?: string;
}

// Volume 1 - Books 1-12
export const BUKHARI_VOLUME_1: HadithEntry[] = [
  // Book 1: Revelation (1-6)
  {
    id: "bukhari-1-1-1",
    volume: 1,
    book: 1,
    bookTitle: "Revelation",
    hadithNumber: 1,
    englishText: "I heard Allah's Apostle saying, \"The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended. So whoever emigrated for worldly benefits or for a woman to marry, his emigration was for what he emigrated for.\"",
    narrator: "Umar bin Al-Khattab",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["intention", "niyyah", "emigration", "hijra"],
    chapter: "The beginning of the Divine Revelation"
  },
  {
    id: "bukhari-1-1-2",
    volume: 1,
    book: 1,
    bookTitle: "Revelation",
    hadithNumber: 2,
    englishText: "Al-Harith bin Hisham asked Allah's Apostle \"O Allah's Apostle! How is the Divine Inspiration revealed to you?\" Allah's Apostle replied, \"Sometimes it is (revealed) like the ringing of a bell, this form of Inspiration is the hardest of all and then this state passes off after I have grasped what is inspired. Sometimes the Angel comes in the form of a man and talks to me and I grasp whatever he says.\"",
    narrator: "Aisha",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["revelation", "wahi", "angel", "gabriel"],
    chapter: "How the Divine Inspiration was revealed"
  },
  {
    id: "bukhari-1-1-3",
    volume: 1,
    book: 1,
    bookTitle: "Revelation",
    hadithNumber: 3,
    englishText: "The commencement of the Divine Inspiration to Allah's Apostle was in the form of good dreams which came true like bright day light, and then the love of seclusion was bestowed upon him. He used to go in seclusion in the cave of Hira where he used to worship (Allah alone) continuously for many days before his desire to see his family. The angel came to him and asked him to read. The Prophet replied, \"I do not know how to read.\" The angel caught me (forcefully) and pressed me so hard that I could not bear it any more. He then released me and again asked me to read and I replied, 'I do not know how to read.' Thereupon he caught me again and pressed me a second time till I could not bear it any more. He then released me and again asked me to read but again I replied, 'I do not know how to read (or what shall I read)?' Thereupon he caught me for the third time and pressed me, and then released me and said, 'Read in the name of your Lord, who has created (all that exists) has created man from a clot. Read! And your Lord is the Most Generous.'\"",
    narrator: "Aisha",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["first revelation", "cave hira", "read", "iqra"],
    chapter: "The first revelation in Cave Hira"
  },
  {
    id: "bukhari-1-1-4",
    volume: 1,
    book: 1,
    bookTitle: "Revelation",
    hadithNumber: 4,
    englishText: "Ibn 'Abbas in the explanation of the Statement of Allah. 'Move not your tongue concerning (the Quran) to make haste therewith.' Said \"Allah's Apostle used to bear the revelation with great trouble and used to move his lips (quickly) with the Inspiration.\" Ibn 'Abbas moved his lips saying, \"I am moving my lips in front of you as Allah's Apostle used to move his.\" Said moved his lips saying: \"I am moving my lips, as I saw Ibn 'Abbas moving his.\" Ibn 'Abbas added, \"So Allah revealed 'Move not your tongue concerning (the Qur'an) to make haste therewith. It is for us to collect it and to give you (O Muhammad) the ability to recite it (the Qur'an) which means that Allah will make him (the Prophet) remember the portion of the Qur'an which was revealed at that time by heart and recite it.\"",
    narrator: "Said bin Jubair",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["quran recitation", "revelation process", "memorization"],
    chapter: "How the Prophet received revelation"
  },
  {
    id: "bukhari-1-1-5",
    volume: 1,
    book: 1,
    bookTitle: "Revelation",
    hadithNumber: 5,
    englishText: "Allah's Apostle was the most generous of all the people, and he used to reach the peak in generosity in the month of Ramadan when Gabriel met him. Gabriel used to meet him every night of Ramadan to teach him the Qur'an. Allah's Apostle was the most generous person, even more generous than the strong uncontrollable wind (in readiness and haste to do charitable deeds).",
    narrator: "Ibn Abbas",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["generosity", "ramadan", "gabriel", "quran study"],
    chapter: "The Prophet's generosity during Ramadan"
  },
  {
    id: "bukhari-1-1-6",
    volume: 1,
    book: 1,
    bookTitle: "Revelation",
    hadithNumber: 6,
    englishText: "Abu Sufyan bin Harb informed me that Heraclius had sent a messenger to him while he had been accompanying a caravan from Quraish. They were merchants doing business in Sham (Syria, Palestine, Lebanon and Jordan), at the time when Allah's Apostle had truce with Abu Sufyan and Quraish infidels. So Abu Sufyan and his companions went to Heraclius at Ilya (Jerusalem). Heraclius called them in the court and he had all the senior Roman dignitaries around him. He called for his translator who, translating Heraclius's question said to them, \"Who amongst you is closely related to that man who claims to be a Prophet?\" Abu Sufyan replied, \"I am the nearest relative to him (amongst the group).\"",
    narrator: "Abdullah bin Abbas",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["heraclius", "abu sufyan", "prophecy signs", "byzantium"],
    chapter: "Heraclius and the signs of prophethood"
  },

  // Book 2: Belief (7-55) - Sample entries
  {
    id: "bukhari-1-2-7",
    volume: 1,
    book: 2,
    bookTitle: "Belief",
    hadithNumber: 7,
    englishText: "Ibn 'Umar related that the Prophet said: Islam is based upon five things: testifying that there is no god except Allah and that Muhammad is Allah's Messenger, performing the prayer, paying the Zakat, making the pilgrimage to the House, and fasting in Ramadan.",
    narrator: "Abdullah ibn Umar",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["five pillars", "islam", "shahada", "prayer", "zakat", "hajj", "fasting"],
    chapter: "The five pillars of Islam"
  },
  {
    id: "bukhari-1-2-8",
    volume: 1,
    book: 2,
    bookTitle: "Belief",
    hadithNumber: 8,
    englishText: "The Prophet said, \"Faith (Belief) consists of more than sixty branches (i.e. parts). And Haya (This term \"Haya\" covers a large number of concepts which are to be taken together; amongst them are self respect, modesty, bashfulness, and scruple, etc.) is a part of faith.\"",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["faith", "iman", "haya", "modesty", "branches"],
    chapter: "The branches of faith"
  },

  // Book 3: Knowledge (56-136) - Sample entries
  {
    id: "bukhari-1-3-56",
    volume: 1,
    book: 3,
    bookTitle: "Knowledge",
    hadithNumber: 56,
    englishText: "The Prophet said, \"If Allah wants to do good to somebody, He bestows upon him the understanding of religion (Fiqh).\"",
    narrator: "Muawiya",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["knowledge", "fiqh", "understanding", "religion", "blessing"],
    chapter: "The virtue of religious knowledge"
  },
  {
    id: "bukhari-1-3-57",
    volume: 1,
    book: 3,
    bookTitle: "Knowledge",
    hadithNumber: 57,
    englishText: "The Prophet said, \"Convey (my teachings) to the people even if it were a single sentence, and tell others the stories of Bani Israel (which have been taught to you), for it is not sinful to do so. And whoever tells a lie on me intentionally, will surely take his place in the (Hell) Fire.\"",
    narrator: "Abdullah bin Amr",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["teaching", "conveying knowledge", "lying", "hell fire"],
    chapter: "Teaching and conveying knowledge"
  },

  // Book 4: Ablutions (Wudu') (137-247) - Sample entries
  {
    id: "bukhari-1-4-137",
    volume: 1,
    book: 4,
    bookTitle: "Ablutions (Wudu')",
    hadithNumber: 137,
    englishText: "The Prophet said, \"The prayer of a person who does ritual impurity is not accepted till he performs the ablution.\"",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["ablution", "wudu", "prayer", "purity", "acceptance"],
    chapter: "The necessity of ablution for prayer"
  },

  // Book 5: Bathing (Ghusl) (248-292) - Sample entries
  {
    id: "bukhari-1-5-248",
    volume: 1,
    book: 5,
    bookTitle: "Bathing (Ghusl)",
    hadithNumber: 248,
    englishText: "The Prophet and I used to take a bath from a single pot while we were Junub.",
    narrator: "Aisha",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["ghusl", "bathing", "ritual purity", "janaba"],
    chapter: "Bathing from janaba (ritual impurity)"
  }
];

// This is a sample of Volume 1. In a real implementation, we would have all 9 volumes
// with thousands of hadiths. For now, this provides the structure and some key hadiths.

export const BUKHARI_COLLECTIONS = {
  volume1: BUKHARI_VOLUME_1,
  // Additional volumes would be added here
  // volume2: BUKHARI_VOLUME_2,
  // volume3: BUKHARI_VOLUME_3,
  // etc.
};

// Book titles and structure for all 9 volumes
export const BUKHARI_BOOK_STRUCTURE = {
  volume1: {
    books: [
      { number: 1, title: "Revelation", hadithRange: "1-6" },
      { number: 2, title: "Belief", hadithRange: "7-55" },
      { number: 3, title: "Knowledge", hadithRange: "56-136" },
      { number: 4, title: "Ablutions (Wudu')", hadithRange: "137-247" },
      { number: 5, title: "Bathing (Ghusl)", hadithRange: "248-292" },
      { number: 6, title: "Menstrual Periods", hadithRange: "293-329" },
      { number: 7, title: "Rubbing hands and feet with dust (Tayammum)", hadithRange: "330-344" },
      { number: 8, title: "Prayers (Salat)", hadithRange: "345-471" },
      { number: 9, title: "Virtues of the Prayer Hall (Sutra of the Musalla)", hadithRange: "472-499" },
      { number: 10, title: "Times of the Prayers", hadithRange: "500-576" },
      { number: 11, title: "Call to Prayers (Adhaan)", hadithRange: "577-698" },
      { number: 12, title: "Characteristics of Prayer", hadithRange: "699-832" }
    ]
  },
  volume2: {
    books: [
      { number: 13, title: "Friday Prayer", hadithRange: "1-63" },
      { number: 14, title: "Fear Prayer", hadithRange: "64-68" },
      { number: 15, title: "The Two Festivals (Eids)", hadithRange: "69-104" },
      { number: 16, title: "Witr Prayer", hadithRange: "105-118" },
      { number: 17, title: "Invoking Allah for Rain (Istisqaa)", hadithRange: "119-149" },
      { number: 18, title: "Eclipses", hadithRange: "150-172" },
      { number: 19, title: "Prostration During Recital of Qur'an", hadithRange: "173-185" },
      { number: 20, title: "Shortening the Prayers (At-Taqseer)", hadithRange: "186-220" },
      { number: 21, title: "Prayer at Night (Tahajjud)", hadithRange: "221-288" },
      { number: 22, title: "Actions while Praying", hadithRange: "289-328" },
      { number: 23, title: "Funerals (Al-Janaa'iz)", hadithRange: "329-483" },
      { number: 24, title: "Obligatory Charity Tax (Zakat)", hadithRange: "484-578" },
      { number: 25, title: "Obligatory Charity Tax After Ramadaan (Zakat ul Fitr)", hadithRange: "579-588" },
      { number: 26, title: "Pilgrimmage (Hajj)", hadithRange: "589-823" }
    ]
  },
  volume3: {
    books: [
      { number: 27, title: "Minor Pilgrammage (Umra)", hadithRange: "1-32" },
      { number: 28, title: "Pilgrims Prevented from Completing the Pilgrimage", hadithRange: "33-46" },
      { number: 29, title: "Penalty of Hunting while on Pilgrimmage", hadithRange: "47-90" },
      { number: 30, title: "Virtues of Madinah", hadithRange: "91-114" },
      { number: 31, title: "Fasting", hadithRange: "115-225" },
      { number: 32, title: "Praying at Night in Ramadaan (Taraweeh)", hadithRange: "226-241" },
      { number: 33, title: "Retiring to a Mosque for Remembrance of Allah (I'tikaf)", hadithRange: "242-262" },
      { number: 34, title: "Sales and Trade", hadithRange: "263-440" },
      { number: 35, title: "Sales in which a Price is paid for Goods to be Delivered Later (As-Salam)", hadithRange: "441-460" },
      { number: 36, title: "Hiring", hadithRange: "461-485" },
      { number: 37, title: "Transferance of a Debt from One Person to Another (Al-Hawaala)", hadithRange: "486-495" },
      { number: 38, title: "Representation, Authorization, Business by Proxy", hadithRange: "496-512" },
      { number: 39, title: "Agriculture", hadithRange: "513-540" },
      { number: 40, title: "Distribution of Water", hadithRange: "541-569" },
      { number: 41, title: "Loans, Payment of Loans, Freezing of Property, Bankruptcy", hadithRange: "570-607" },
      { number: 42, title: "Lost Things Picked up by Someone (Luqaata)", hadithRange: "608-619" },
      { number: 43, title: "Oppressions", hadithRange: "620-662" },
      { number: 44, title: "Partnership", hadithRange: "663-684" },
      { number: 45, title: "Mortgaging", hadithRange: "685-692" },
      { number: 46, title: "Manumission of Slaves", hadithRange: "693-739" },
      { number: 47, title: "Gifts", hadithRange: "740-804" },
      { number: 48, title: "Witnesses", hadithRange: "805-854" },
      { number: 49, title: "Peacemaking", hadithRange: "855-873" },
      { number: 50, title: "Conditions", hadithRange: "874-895" }
    ]
  },
  // Continue for volumes 4-9...
};

export default BUKHARI_VOLUME_1;