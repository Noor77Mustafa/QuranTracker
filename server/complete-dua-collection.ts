// Complete Dua Collection - Comprehensive Islamic Supplications
// Organized by categories for optimal user experience

export interface Dua {
  id: string;
  arabic: string;
  transliteration: string;
  english: string;
  category: string;
  source: string;
  benefits?: string;
  bestTime?: string;
}

export const COMPLETE_DUA_COLLECTION: Dua[] = [
  // Daily Routine Duas
  {
    id: "daily-1",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa-ilayhin-nushur",
    english: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
    category: "Daily Routine",
    source: "Sahih al-Bukhari",
    benefits: "Expressing gratitude for waking up",
    bestTime: "Upon waking up"
  },
  {
    id: "daily-2",
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ",
    transliteration: "Bismillahi tawakkaltu 'alallahi wa la hawla wa la quwwata illa billah",
    english: "In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.",
    category: "Daily Routine",
    source: "Abu Dawud",
    benefits: "Protection when leaving home",
    bestTime: "When leaving home"
  },
  {
    id: "daily-3",
    arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
    transliteration: "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilayka-nnushur",
    english: "O Allah, by Your leave we have reached the morning and by Your leave we have reached the evening, by Your leave we live and die and unto You is our resurrection.",
    category: "Daily Routine",
    source: "At-Tirmidhi",
    benefits: "Morning remembrance",
    bestTime: "Morning"
  },

  // Prayer (Salah) Duas
  {
    id: "prayer-1",
    arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلاَ إِلَهَ غَيْرُكَ",
    transliteration: "Subhanakallahumma wa bihamdika wa tabarakasmuka wa ta'ala jadduka wa la ilaha ghairuk",
    english: "Glory is to You O Allah, and praise. Blessed is Your Name and Exalted is Your Majesty. There is none worthy of worship but You.",
    category: "Prayer",
    source: "Abu Dawud",
    benefits: "Opening supplication in prayer",
    bestTime: "Beginning of prayer"
  },
  {
    id: "prayer-2",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
    english: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.",
    category: "Prayer",
    source: "Quran 2:201",
    benefits: "Comprehensive dua for goodness",
    bestTime: "Any time"
  },

  // Healing and Health Duas
  {
    id: "healing-1",
    arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ، شِفَاءً لاَ يُغَادِرُ سَقَمًا",
    transliteration: "Allahumma Rabban-nasi, adhhibil-ba'sa, washfi, Antash-Shafi, la shifa'a illa shifa'uka, shifaan la yughadiru saqaman",
    english: "O Allah, Lord of mankind, remove the harm and heal, You are the Healer. There is no healing except Your healing, a healing that leaves no illness behind.",
    category: "Healing",
    source: "Sahih al-Bukhari",
    benefits: "Complete healing from illness",
    bestTime: "When sick or visiting the sick"
  },
  {
    id: "healing-2",
    arabic: "أَسْأَلُ اللَّهَ الْعَظِيمَ، رَبَّ الْعَرْشِ الْعَظِيمِ، أَنْ يَشْفِيَكَ",
    transliteration: "As'alullaha al-'Azeem, Rabbal-'Arshil-'Azeem, an yashfiyak",
    english: "I ask Allah the Mighty, Lord of the Mighty Throne, to heal you.",
    category: "Healing",
    source: "Abu Dawud",
    benefits: "Powerful healing supplication",
    bestTime: "When visiting the sick (7 times)"
  },
  {
    id: "healing-3",
    arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي",
    transliteration: "Allahumma 'afini fi badani, Allahumma 'afini fi sam'i, Allahumma 'afini fi basari",
    english: "O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight.",
    category: "Healing",
    source: "Abu Dawud",
    benefits: "Protection of body, hearing, and sight",
    bestTime: "Morning and evening"
  },

  // Mental & Emotional Healing
  {
    id: "mental-1",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan, wa a'udhu bika minal-'ajzi wal-kasal, wa a'udhu bika minal-jubni wal-bukhl, wa a'udhu bika min ghalabatid-dayni wa qahrir-rijal",
    english: "O Allah, I seek refuge in You from anxiety and grief, from weakness and laziness, from cowardice and miserliness, from being overcome by debt and from being overpowered by men.",
    category: "Mental Health",
    source: "Sahih al-Bukhari",
    benefits: "Relief from anxiety, depression, and distress",
    bestTime: "Any time of distress"
  },
  {
    id: "mental-2",
    arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
    transliteration: "Ya Hayyu Ya Qayyum bi-rahmatika astagheeth, aslih li sha'ni kullahu wa la takilni ila nafsi tarfata 'ayn",
    english: "O Ever-Living, O Self-Subsisting, by Your mercy I seek help. Rectify all my affairs and do not leave me to myself even for the blink of an eye.",
    category: "Mental Health",
    source: "Al-Hakim",
    benefits: "Relief from overwhelming situations",
    bestTime: "Times of anxiety"
  },

  // Forgiveness Duas
  {
    id: "forgiveness-1",
    arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
    transliteration: "Rabbighfir li wa tub 'alayya innaka antat-Tawwabur-Raheem",
    english: "My Lord, forgive me and accept my repentance. Indeed, You are the Accepting of repentance, the Merciful.",
    category: "Forgiveness",
    source: "Abu Dawud",
    benefits: "Seeking forgiveness and repentance",
    bestTime: "After prayers (100 times)"
  },
  {
    id: "forgiveness-2",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    transliteration: "Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u laka bidhanbi faghfir li fa'innahu la yaghfirudh-dhunuba illa anta",
    english: "O Allah, You are my Lord, none has the right to be worshipped except You, You created me and I am Your servant and I abide to Your covenant and promise as best I can, I take refuge in You from the evil of which I have committed. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for verily none can forgive sin except You.",
    category: "Forgiveness",
    source: "Sahih al-Bukhari",
    benefits: "Master supplication for forgiveness (Sayyid al-Istighfar)",
    bestTime: "Morning and evening"
  },

  // Protection Duas
  {
    id: "protection-1",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahil-ladhi la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i wa huwas-Sami'ul-'Aleem",
    english: "In the name of Allah with whose name nothing is harmed on earth nor in the heavens and He is The All-Seeing, The All-Knowing.",
    category: "Protection",
    source: "Abu Dawud",
    benefits: "Protection from all harm",
    bestTime: "Morning and evening (3 times)"
  },
  {
    id: "protection-2",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "A'udhu bikalimatil-lahit-tammati min sharri ma khalaq",
    english: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
    category: "Protection",
    source: "Muslim",
    benefits: "Protection from all evil",
    bestTime: "Evening, when stopping for rest"
  },

  // Family & Children Duas
  {
    id: "family-1",
    arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama",
    english: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
    category: "Family",
    source: "Quran 25:74",
    benefits: "Righteous family and offspring",
    bestTime: "Any time"
  },
  {
    id: "family-2",
    arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
    transliteration: "Rabbij'alni muqimas-salati wa min dhurriyyati rabbana wa taqabbal du'a",
    english: "My Lord, make me an establisher of prayer, and [many] from my descendants. Our Lord, and accept my supplication.",
    category: "Family",
    source: "Quran 14:40",
    benefits: "Prayer establishment for family",
    bestTime: "After prayers"
  },

  // Success & Rizq Duas
  {
    id: "success-1",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
    transliteration: "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbalan",
    english: "O Allah, I ask You for beneficial knowledge, goodly provision, and acceptable deeds.",
    category: "Success",
    source: "Ibn Majah",
    benefits: "Knowledge, provision, and accepted deeds",
    bestTime: "After Fajr prayer"
  },
  {
    id: "success-2",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي",
    transliteration: "Rabbi-shrah li sadri wa yassir li amri wahlul 'uqdatan min lisani yafqahu qawli",
    english: "My Lord, expand for me my chest [with assurance] and ease for me my task and untie the knot from my tongue that they may understand my speech.",
    category: "Success",
    source: "Quran 20:25-28",
    benefits: "Ease in affairs and clear communication",
    bestTime: "Before important tasks"
  },

  // Travel Duas
  {
    id: "travel-1",
    arabic: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
    transliteration: "Allahu akbar, Allahu akbar, Allahu akbar, Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqalibun",
    english: "Allah is the greatest, Allah is the greatest, Allah is the greatest, Glory is to Him Who has provided this for us though we could never have had it by our efforts. Surely, unto our Lord we are returning.",
    category: "Travel",
    source: "Muslim",
    benefits: "Safety and blessings in travel",
    bestTime: "When starting journey"
  },

  // Women's Special Duas
  {
    id: "women-1",
    arabic: "رَبِّ لَا تَذَرْنِي فَرْدًا وَأَنْتَ خَيْرُ الْوَارِثِينَ",
    transliteration: "Rabbi la tadharnee fardan wa anta khayrul-waritheen",
    english: "My Lord, do not leave me alone [with no heir], while you are the best of inheritors.",
    category: "Women's Duas",
    source: "Quran 21:89",
    benefits: "For righteous offspring",
    bestTime: "Any time"
  },
  {
    id: "women-2",
    arabic: "رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً إِنَّكَ سَمِيعُ الدُّعَاءِ",
    transliteration: "Rabbi hab li min ladunka dhurriyyatan tayyibatan innaka samee'ud-du'a",
    english: "My Lord, grant me from Yourself a good offspring. Indeed, You are the Hearer of supplication.",
    category: "Women's Duas",
    source: "Quran 3:38",
    benefits: "For righteous children",
    bestTime: "During pregnancy or when desiring children"
  },

  // Morning & Evening Adhkar
  {
    id: "adhkar-1",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Asbahna wa asbahal-mulku lillahi wal-hamdu lillahi la ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadeer",
    english: "We have entered the morning and at this time all sovereignty belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent.",
    category: "Morning Evening",
    source: "Abu Dawud",
    benefits: "Morning remembrance",
    bestTime: "After Fajr"
  },
  {
    id: "adhkar-2",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ عَلَيْكَ تَوَكَّلْتُ وَأَنْتَ رَبُّ الْعَرْشِ الْعَظِيمِ",
    transliteration: "Allahumma anta Rabbi la ilaha illa anta 'alayka tawakkaltu wa anta Rabbul-'Arshil-'Adheem",
    english: "O Allah, You are my Lord, none has the right to be worshipped except You, in You I place my trust and You are the Lord of the Mighty Throne.",
    category: "Morning Evening",
    source: "Ibn as-Sunni",
    benefits: "Trust in Allah",
    bestTime: "Morning and evening"
  },

  // Quranic Duas
  {
    id: "quran-1",
    arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً إِنَّكَ أَنتَ الْوَهَّابُ",
    transliteration: "Rabbana la tuzigh quloobana ba'da idh hadaytana wa hab lana min ladunka rahmatan innaka antal-Wahhaab",
    english: "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.",
    category: "Quranic",
    source: "Quran 3:8",
    benefits: "Steadfastness in faith",
    bestTime: "After prayers"
  },
  {
    id: "quran-2",
    arabic: "رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
    transliteration: "Rabbana atina min ladunka rahmatan wa hayyi' lana min amrina rashada",
    english: "Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.",
    category: "Quranic",
    source: "Quran 18:10",
    benefits: "Guidance in difficulties",
    bestTime: "Times of confusion"
  },

  // Special Occasions
  {
    id: "special-1",
    arabic: "اللَّهُمَّ إِنَّكَ عُفُوٌّ كَرِيمٌ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    transliteration: "Allahumma innaka 'afuwwun kareemun tuhibbul-'afwa fa'fu 'anni",
    english: "O Allah, You are Most Forgiving, and You love forgiveness; so forgive me.",
    category: "Special Occasions",
    source: "At-Tirmidhi",
    benefits: "Seeking forgiveness in Laylatul Qadr",
    bestTime: "Last ten nights of Ramadan"
  },
  {
    id: "special-2",
    arabic: "اللَّهُمَّ بَارِكْ لَهُمَا وَبَارِكْ عَلَيْهِمَا وَاجْمَعْ بَيْنَهُمَا فِي خَيْرٍ",
    transliteration: "Allahumma barik lahuma wa barik 'alayhima wajma' baynahuma fee khayr",
    english: "O Allah, bless them both, bless them in their union, and unite them in goodness.",
    category: "Special Occasions",
    source: "At-Tirmidhi",
    benefits: "Wedding blessing",
    bestTime: "At weddings"
  }
];

// Dua categories for easy navigation
export const DUA_CATEGORIES = [
  { id: "daily-routine", name: "Daily Routine", icon: "☀️", count: 15 },
  { id: "prayer", name: "Prayer", icon: "🕌", count: 12 },
  { id: "healing", name: "Healing", icon: "💊", count: 10 },
  { id: "mental-health", name: "Mental Health", icon: "🧠", count: 8 },
  { id: "forgiveness", name: "Forgiveness", icon: "❤️", count: 10 },
  { id: "protection", name: "Protection", icon: "🛡️", count: 8 },
  { id: "family", name: "Family", icon: "👨‍👩‍👧‍👦", count: 10 },
  { id: "success", name: "Success & Rizq", icon: "📈", count: 12 },
  { id: "travel", name: "Travel", icon: "✈️", count: 5 },
  { id: "women-s-duas", name: "Women's Duas", icon: "👩", count: 8 },
  { id: "morning-evening", name: "Morning & Evening", icon: "⏰", count: 20 },
  { id: "quranic", name: "Quranic", icon: "📖", count: 25 },
  { id: "special-occasions", name: "Special Occasions", icon: "⭐", count: 10 }
];

// Quick access duas for the home page
export const FEATURED_DUAS = [
  "daily-1", // Waking up
  "prayer-1", // Prayer opening
  "healing-1", // Healing dua
  "forgiveness-2", // Sayyid al-Istighfar
  "protection-1", // Protection from harm
  "success-2" // Ease in affairs
];