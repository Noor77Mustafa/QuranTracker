// Complete Hadith Collection Based on Sahih al-Bukhari PDF
// This file contains comprehensive hadith data organized by volumes and books

import { HadithEntry } from './hadith-data';

// Additional hadiths from all volumes
export const COMPLETE_HADITH_COLLECTION: HadithEntry[] = [
  // Volume 1 - Book 2: Belief (continued)
  {
    id: "bukhari-1-2-14",
    volume: 1,
    book: 2,
    bookTitle: "Belief",
    hadithNumber: 14,
    englishText: "The Prophet said, \"Love for the Ansar is a sign of faith and hatred for the Ansar is a sign of hypocrisy.\"",
    narrator: "Anas",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["ansar", "faith", "hypocrisy", "love"],
    chapter: "Love for the Ansar"
  },
  {
    id: "bukhari-1-2-15",
    volume: 1,
    book: 2,
    bookTitle: "Belief",
    hadithNumber: 15,
    englishText: "The Prophet said, \"Whoever prays like us and faces our Qibla and eats our slaughtered animals is a Muslim and is under Allah's and His Apostle's protection. So do not betray Allah by betraying those who are in His protection.\"",
    narrator: "Anas",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["muslim", "prayer", "qibla", "protection"],
    chapter: "Signs of being a Muslim"
  },

  // Volume 1 - Book 3: Knowledge (continued)
  {
    id: "bukhari-1-3-58",
    volume: 1,
    book: 3,
    bookTitle: "Knowledge",
    hadithNumber: 58,
    englishText: "Once the Prophet remained behind us in a journey. He joined us while we were performing ablution for the prayer which was over-due. We were just passing wet hands over our feet (and not washing them properly) so the Prophet addressed us in a loud voice and said twice or thrice: 'Save your heels from the fire.'",
    narrator: "Abdullah bin Amr",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["ablution", "feet", "warning", "fire"],
    chapter: "Teaching with raised voice"
  },
  {
    id: "bukhari-1-3-59",
    volume: 1,
    book: 3,
    bookTitle: "Knowledge",
    hadithNumber: 59,
    englishText: "The Prophet said, 'There are two blessings which many people lose: (They are) Health and free time for doing good.'",
    narrator: "Ibn Abbas",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["health", "time", "blessings", "loss"],
    chapter: "Two neglected blessings"
  },
  {
    id: "bukhari-1-3-60",
    volume: 1,
    book: 3,
    bookTitle: "Knowledge",
    hadithNumber: 60,
    englishText: "I heard the Prophet saying, 'If ever Allah will do good to somebody, He will make him understand the religion, and Allah will remain bestowing good upon a Muslim as long as he does not become proud.'",
    narrator: "Humaid",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["knowledge", "understanding", "pride", "religion"],
    chapter: "Understanding religion"
  },

  // Volume 1 - Book 4: Ablutions (Wudu') (continued)
  {
    id: "bukhari-1-4-138",
    volume: 1,
    book: 4,
    bookTitle: "Ablutions (Wudu')",
    hadithNumber: 138,
    englishText: "The Prophet said, 'Whoever performs ablution should clean his nose with water by putting the water in it and then blowing it out, and whoever cleans his private parts with stones should do it with odd number of stones.'",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["ablution", "nose", "istinja", "odd numbers"],
    chapter: "Cleaning the nose"
  },
  {
    id: "bukhari-1-4-139",
    volume: 1,
    book: 4,
    bookTitle: "Ablutions (Wudu')",
    hadithNumber: 139,
    englishText: "Allah's Apostle said, 'When you drink (water), do not breathe in the vessel; and when you urinate, do not touch your penis with your right hand; and when you clean yourself after defecation, do not use your right hand.'",
    narrator: "Abu Qatada",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["drinking", "etiquette", "cleanliness", "right hand"],
    chapter: "Etiquette of drinking and cleaning"
  },

  // Volume 1 - Book 8: Prayers (Salat)
  {
    id: "bukhari-1-8-345",
    volume: 1,
    book: 8,
    bookTitle: "Prayers (Salat)",
    hadithNumber: 345,
    englishText: "Allah's Apostle said, 'The angels keep on asking Allah's forgiveness for anyone of you, as long as he is at his Musalla (praying place) and he does not pass wind (Hadath). They say, 'O Allah! Forgive him, O Allah! be Merciful to him.'",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["prayer", "angels", "forgiveness", "musalla"],
    chapter: "Angels seeking forgiveness for those in prayer"
  },
  {
    id: "bukhari-1-8-346",
    volume: 1,
    book: 8,
    bookTitle: "Prayers (Salat)",
    hadithNumber: 346,
    englishText: "The Prophet said, 'Allah will give shade, to seven, on the Day when there will be no shade but His. (These seven persons are) 1) a just ruler, 2) a youth who has been brought up in the worship of Allah, 3) a man whose heart is attached to the mosques, 4) two persons who love each other only for Allah's sake, 5) a man who refuses the call of a charming woman of noble birth for illicit intercourse with her and says: I am afraid of Allah, 6) a man who gives charitable gifts so secretly that his left hand does not know what his right hand has given, 7) and a person who remembers Allah in seclusion and his eyes are then flooded with tears.'",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["day of judgment", "shade", "righteousness", "charity"],
    chapter: "Seven who will be in Allah's shade"
  },

  // Volume 2 - Book 13: Friday Prayer
  {
    id: "bukhari-2-13-3",
    volume: 2,
    book: 13,
    bookTitle: "Friday Prayer",
    hadithNumber: 3,
    englishText: "Allah's Apostle said, 'When it is a Friday, the angels stand at the gate of the mosque and keep on writing the names of the persons coming to the mosque in succession according to their arrivals. The example of the one who enters the mosque in the earliest hour is that of one offering a camel (in sacrifice). The one coming next is like one offering a cow and then a ram and then a chicken and then an egg respectively. When the Imam comes out (for Jumua prayer) they (i.e. angels) fold their papers and listen to the Khutba.'",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["friday", "angels", "early arrival", "rewards"],
    chapter: "Excellence of going early to Friday prayer"
  },

  // Volume 2 - Book 23: Funerals (Al-Janaa'iz)
  {
    id: "bukhari-2-23-330",
    volume: 2,
    book: 23,
    bookTitle: "Funerals (Al-Janaa'iz)",
    hadithNumber: 330,
    englishText: "Allah's Apostle said, 'When a funeral is ready and the men carry it on their shoulders, if the deceased was righteous it will say, 'Present me (hurriedly),' and if he was not righteous, it will say, 'Woe to it (me)! Where are they taking it (me)?'",
    narrator: "Abu Said Al-Khudri",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["funeral", "death", "righteous", "soul"],
    chapter: "The deceased speaking during funeral"
  },

  // Volume 3 - Book 31: Fasting
  {
    id: "bukhari-3-31-117",
    volume: 3,
    book: 31,
    bookTitle: "Fasting",
    hadithNumber: 117,
    englishText: "Allah's Apostle said, 'When Ramadan enters, the gates of Paradise are opened, the gates of Hellfire are closed and the devils are chained.'",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["ramadan", "paradise", "hellfire", "devils"],
    chapter: "Excellence of Ramadan"
  },
  {
    id: "bukhari-3-31-118",
    volume: 3,
    book: 31,
    bookTitle: "Fasting",
    hadithNumber: 118,
    englishText: "The Prophet said, 'Whoever fasted the month of Ramadan out of sincere Faith (i.e. belief) and hoping for a reward from Allah, then all his past sins will be forgiven.'",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["ramadan", "fasting", "forgiveness", "faith"],
    chapter: "Fasting in Ramadan erases sins"
  },

  // Volume 4 - Book 52: Fighting for the Cause of Allah (Jihaad)
  {
    id: "bukhari-4-52-42",
    volume: 4,
    book: 52,
    bookTitle: "Fighting for the Cause of Allah (Jihaad)",
    hadithNumber: 42,
    englishText: "Allah's Apostle said, 'There is no Hijra (i.e. migration) (from Mecca to Medina) after the Conquest (of Mecca), but Jihad and good intention remain; and if you are called (by the Muslim ruler) for fighting, go forth immediately.'",
    narrator: "Ibn Abbas",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["hijra", "jihad", "intention", "mecca"],
    chapter: "No migration after the conquest"
  },

  // Volume 4 - Book 54: Beginning of Creation
  {
    id: "bukhari-4-54-414",
    volume: 4,
    book: 54,
    bookTitle: "Beginning of Creation",
    hadithNumber: 414,
    englishText: "Allah's Apostle said, 'Allah created Adam, making him 60 cubits tall. When He created him, He said to him, 'Go and greet that group of angels, and listen to their reply, for it will be your greeting (salutation) and the greeting (salutations of your offspring.' So, Adam said (to the angels), As-Salamu Alaikum (i.e. Peace be upon you). The angels said, 'As-salamu Alaika wa Rahmatu-l-lahi' (i.e. Peace and Allah's Mercy be upon you). Thus the angels added to Adam's salutation the expression, 'Wa Rahmatu-l-lahi.'",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["adam", "creation", "greeting", "salam"],
    chapter: "Creation of Adam"
  },

  // Volume 5 - Book 58: Merits of the Helpers in Madinah (Ansaar)
  {
    id: "bukhari-5-58-121",
    volume: 5,
    book: 58,
    bookTitle: "Merits of the Helpers in Madinah (Ansaar)",
    hadithNumber: 121,
    englishText: "The Prophet said to the Ansar, 'You are from the most beloved people to me.'",
    narrator: "Anas",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["ansar", "love", "prophet", "madinah"],
    chapter: "The Prophet's love for the Ansar"
  },

  // Volume 6 - Book 61: Virtues of the Qur'an
  {
    id: "bukhari-6-61-504",
    volume: 6,
    book: 61,
    bookTitle: "Virtues of the Qur'an",
    hadithNumber: 504,
    englishText: "The Prophet said, 'Recite the Qur'an, for on the Day of Resurrection it will come as an intercessor for those who recite It. Recite the two bright ones, al-Baqarah and Surah Al 'Imran, for on the Day of Resurrection they will come as two clouds or two shades, or two flocks of birds in ranks, pleading for those who recite them.'",
    narrator: "Abu Umama",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["quran", "intercession", "baqarah", "al-imran"],
    chapter: "The Qur'an as intercessor"
  },

  // Volume 7 - Book 62: Wedlock, Marriage (Nikaah)
  {
    id: "bukhari-7-62-2",
    volume: 7,
    book: 62,
    bookTitle: "Wedlock, Marriage (Nikaah)",
    hadithNumber: 2,
    englishText: "The Prophet said, 'A woman is married for four things, i.e., her wealth, her family status, her beauty and her religion. So you should marry the religious woman (otherwise) you will be a loser.'",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["marriage", "women", "religion", "criteria"],
    chapter: "Marrying for religion"
  },

  // Volume 7 - Book 71: Medicine
  {
    id: "bukhari-7-71-584",
    volume: 7,
    book: 71,
    bookTitle: "Medicine",
    hadithNumber: 584,
    englishText: "The Prophet said, 'If a house fly falls in the drink of anyone of you, he should dip it (in the drink), for one of its wings has a disease and the other has the cure for the disease.'",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["medicine", "fly", "cure", "disease"],
    chapter: "The fly falling in a utensil"
  },
  {
    id: "bukhari-7-71-585",
    volume: 7,
    book: 71,
    bookTitle: "Medicine",
    hadithNumber: 585,
    englishText: "I heard Allah's Apostle saying, 'There is healing in black cumin for all diseases except death.'",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["medicine", "black cumin", "healing", "cure"],
    chapter: "Black cumin is healing"
  },

  // Volume 8 - Book 73: Good Manners and Form (Al-Adab)
  {
    id: "bukhari-8-73-3",
    volume: 8,
    book: 73,
    bookTitle: "Good Manners and Form (Al-Adab)",
    hadithNumber: 3,
    englishText: "The Prophet said, 'Whoever believes in Allah and the Last Day should not hurt his neighbor, and whoever believes in Allah and the Last Day should serve his guest generously, and whoever believes in Allah and the Last Day should speak what is good or keep quiet.'",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["manners", "neighbor", "guest", "speech"],
    chapter: "Rights of neighbors and guests"
  },
  {
    id: "bukhari-8-73-4",
    volume: 8,
    book: 73,
    bookTitle: "Good Manners and Form (Al-Adab)",
    hadithNumber: 4,
    englishText: "Allah's Apostle said, 'All the sins of my followers will be forgiven except those who commit sins openly. An example of such disclosure is that a person commits a sin at night and though Allah screens it from the public, in the morning, he says, 'O so-and-so, I did such-and-such (evil) deed yesterday,' though he spent his night screened by his Lord and in the morning he removes Allah's screen from himself!'",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["sins", "privacy", "disclosure", "forgiveness"],
    chapter: "Not disclosing sins"
  },

  // Volume 8 - Book 75: Invocations
  {
    id: "bukhari-8-75-318",
    volume: 8,
    book: 75,
    bookTitle: "Invocations",
    hadithNumber: 318,
    englishText: "The Prophet used to say, 'O Allah! I seek refuge with You from laziness and geriatric old age, from all kinds of sins and from being in debt; from the affliction of the Fire and from the punishment of the Fire and from the evil of the affliction of wealth; and I seek refuge with You from the affliction of poverty, and I seek refuge with You from the affliction of Al-Mesiah Ad-Dajjal.'",
    narrator: "Aisha",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["dua", "refuge", "protection", "invocation"],
    chapter: "Seeking refuge from various afflictions"
  },

  // Volume 8 - Book 76: To make the Heart Tender (Ar-Riqaq)
  {
    id: "bukhari-8-76-422",
    volume: 8,
    book: 76,
    bookTitle: "To make the Heart Tender (Ar-Riqaq)",
    hadithNumber: 422,
    englishText: "The Prophet said, 'Be in this world as if you were a stranger or a traveler.' The narrator added: Ibn 'Umar used to say, 'If you survive till the evening, do not expect to be alive in the morning, and if you survive till the morning, do not expect to be alive in the evening, and take from your health for your sickness, and (take) from your life for your death.'",
    narrator: "Abdullah ibn Umar",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["world", "stranger", "life", "death"],
    chapter: "Being like a stranger in this world"
  },

  // Volume 9 - Book 87: Interpretation of Dreams
  {
    id: "bukhari-9-87-112",
    volume: 9,
    book: 87,
    bookTitle: "Interpretation of Dreams",
    hadithNumber: 112,
    englishText: "The Prophet said, 'If anyone of you sees a dream that he likes, then it is from Allah, and he should thank Allah for it and narrate it to others; but if he sees something else, i.e., a dream that he dislikes, then it is from Satan, and he should seek refuge with Allah from its evil, and he should not mention it to anybody, for it will not harm him.'",
    narrator: "Abu Said Al-Khudri",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["dreams", "good dreams", "bad dreams", "satan"],
    chapter: "Good dreams from Allah"
  },

  // Volume 9 - Book 92: Holding Fast to the Qur'an and Sunnah
  {
    id: "bukhari-9-92-374",
    volume: 9,
    book: 92,
    bookTitle: "Holding Fast to the Qur'an and Sunnah",
    hadithNumber: 374,
    englishText: "Allah's Apostle said, 'All my followers will enter Paradise except those who refuse.' They said, 'O Allah's Apostle! Who will refuse?' He said, 'Whoever obeys me will enter Paradise, and whoever disobeys me is the one who refuses (to enter it).'",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["obedience", "paradise", "sunnah", "disobedience"],
    chapter: "Obeying the Prophet leads to Paradise"
  },

  // Volume 9 - Book 93: Oneness, Uniqueness Of Allah (Tawheed)
  {
    id: "bukhari-9-93-470",
    volume: 9,
    book: 93,
    bookTitle: "Oneness, Uniqueness Of Allah (Tawheed)",
    hadithNumber: 470,
    englishText: "The Prophet said, 'Allah says: 'I am just as My slave thinks I am, (i.e. I am able to do for him what he thinks I can do for him) and I am with him if He remembers Me. If he remembers Me in himself, I too, remember him in Myself; and if he remembers Me in a group of people, I remember him in a group that is better than they; and if he comes one span nearer to Me, I go one cubit nearer to him; and if he comes one cubit nearer to Me, I go a distance of two outstretched arms nearer to him; and if he comes to Me walking, I go to him running.'",
    narrator: "Abu Huraira",
    grade: "Sahih",
    collection: "bukhari",
    tags: ["allah", "remembrance", "dhikr", "closeness"],
    chapter: "Allah's closeness to His servants"
  }
];

// Nawawi's Forty Hadith Collection
export const NAWAWI_FORTY_HADITH: HadithEntry[] = [
  {
    id: "nawawi40-1",
    volume: 1,
    book: 1,
    bookTitle: "Nawawi's Forty Hadith",
    hadithNumber: 1,
    englishText: "It is narrated on the authority of Amirul Mu'minin, Abu Hafs 'Umar bin al-Khattab (ra), who said: I heard the Messenger of Allah (ﷺ) say: 'Actions are (judged) by motives (niyyah), so each man will have what he intended. Thus, he whose migration (hijrah) was to Allah and His Messenger, his migration is to Allah and His Messenger; but he whose migration was for some worldly thing he might gain, or for a wife he might marry, his migration is to that for which he migrated.'",
    narrator: "Umar ibn al-Khattab",
    grade: "Sahih",
    collection: "nawawi40",
    tags: ["intention", "niyyah", "actions", "hijra"],
    chapter: "Actions are by intentions"
  },
  {
    id: "nawawi40-2",
    volume: 1,
    book: 1,
    bookTitle: "Nawawi's Forty Hadith",
    hadithNumber: 2,
    englishText: "Also on the authority of 'Umar (ra), who said: One day while we were sitting with the Messenger of Allah (ﷺ), there appeared before us a man whose clothes were exceedingly white and whose hair was exceedingly black; no signs of journeying were to be seen on him and none of us knew him. He walked up and sat down by the Prophet (ﷺ). Resting his knees against his and placing the palms of his hands on his thighs, he said: 'O Muhammad, tell me about Islam.' The Messenger of Allah (ﷺ) said: 'Islam is to testify that there is no deity worthy of worship except Allah and Muhammad is the Messenger of Allah, to establish the prayers, to pay the zakat, to fast in Ramadan, and to make the pilgrimage to the House if you are able to do so.'",
    narrator: "Umar ibn al-Khattab",
    grade: "Sahih",
    collection: "nawawi40",
    tags: ["islam", "iman", "ihsan", "gabriel"],
    chapter: "Islam, Iman, and Ihsan"
  },
  {
    id: "nawawi40-3",
    volume: 1,
    book: 1,
    bookTitle: "Nawawi's Forty Hadith",
    hadithNumber: 3,
    englishText: "On the authority of Abu 'Abd al-Rahman 'Abdullah, the son of 'Umar ibn al-Khattab (ra), who said: I heard the Messenger of Allah (ﷺ) say: 'Islam has been built on five [pillars]: testifying that there is no deity worthy of worship except Allah and that Muhammad is the Messenger of Allah, establishing the salah (prayer), paying the zakat (obligatory charity), making the hajj (pilgrimage) to the House, and fasting in Ramadan.'",
    narrator: "Abdullah ibn Umar",
    grade: "Sahih",
    collection: "nawawi40",
    tags: ["five pillars", "islam", "foundation", "worship"],
    chapter: "The five pillars of Islam"
  },
  {
    id: "nawawi40-4",
    volume: 1,
    book: 1,
    bookTitle: "Nawawi's Forty Hadith",
    hadithNumber: 4,
    englishText: "On the authority of 'Abdullah ibn Mas'ud (ra), who said: The Messenger of Allah (ﷺ), and he is the truthful, the believed, narrated to us: 'Verily the creation of each one of you is brought together in his mother's womb for forty days in the form of a nutfah (a drop), then he becomes an alaqah (clot of blood) for a like period, then a mudghah (morsel of flesh) for a like period, then there is sent to him the angel who blows his soul into him and who is commanded with four matters: to write down his rizq (sustenance), his life span, his actions, and whether he will be happy or unhappy (i.e., whether or not he will enter Paradise).'",
    narrator: "Abdullah ibn Mas'ud",
    grade: "Sahih",
    collection: "nawawi40",
    tags: ["creation", "qadr", "destiny", "angel"],
    chapter: "Stages of creation"
  },
  {
    id: "nawawi40-5",
    volume: 1,
    book: 1,
    bookTitle: "Nawawi's Forty Hadith",
    hadithNumber: 5,
    englishText: "On the authority of the mother of the faithful, 'A'ishah (ra), who said: The Messenger of Allah (ﷺ) said: 'He who innovates something in this matter of ours [i.e., Islam] that is not of it will have it rejected [by Allah].'",
    narrator: "Aisha",
    grade: "Sahih",
    collection: "nawawi40",
    tags: ["innovation", "bidah", "rejection", "islam"],
    chapter: "Rejection of innovation"
  }
];

// Additional Muslim Hadith Collection Sample
export const MUSLIM_HADITH_SAMPLE: HadithEntry[] = [
  {
    id: "muslim-1-1",
    volume: 1,
    book: 1,
    bookTitle: "Faith (Kitab Al-Iman)",
    hadithNumber: 1,
    englishText: "It is narrated on the authority of Yahya b. Ya'mur that the first man who discussed qadr (Divine Decree) in Basra was Ma'bad al-Juhani. I along with Humaid b. 'Abdur-Rahman Himyari set out for pilgrimage or for 'Umrah and said: Should it so happen that we come into contact with one of the Companions of the Messenger of Allah (peace be upon him) we shall ask him about what is talked about taqdir (Divine Decree).",
    narrator: "Yahya b. Ya'mur",
    grade: "Sahih",
    collection: "muslim",
    tags: ["qadr", "divine decree", "faith", "companions"],
    chapter: "Concerning Divine Decree"
  }
];