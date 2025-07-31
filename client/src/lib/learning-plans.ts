export interface LessonSection {
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  summary?: string;
  sections: LessonSection[];
}

export interface LearningPlan {
  id: string;
  title: string;
  description: string;
  icon: string;
  isNew?: boolean;
  coverImage?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  lessons: Lesson[];
}

export const learningPlans: LearningPlan[] = [
  {
    id: "mindful-fasting",
    title: "Mindful Fasting",
    description:
      "Learn the spiritual dimensions of fasting beyond physical restraint.",
    icon: "self_improvement",
    isNew: true,
    difficulty: "beginner",
    coverImage: "/assets/mindful-fasting.svg",
    lessons: [
      {
        id: "lesson-1",
        title: "Introduction to Fasting in Islam",
        duration: "10 min",
        summary:
          "Learn about the foundational principles of fasting in Islam and its importance in the Muslim faith.",
        sections: [
          {
            title: "What is Fasting in Islam?",
            content:
              "Fasting in Islam, known as 'Sawm' in Arabic, is one of the Five Pillars of Islam. It requires Muslims to abstain from food, drink, smoking, and intimate relations from dawn until sunset during the holy month of Ramadan. Beyond physical restraint, fasting in Islam is a comprehensive spiritual exercise that engages the entire being—body, mind, and soul.\n\nThe Quran mentions fasting in Surah Al-Baqarah, verse 183: 'O you who have believed, fasting has been decreed upon you as it was decreed upon those before you that you may become righteous.'\n\nThis verse highlights that fasting isn't unique to Islam but has been a spiritual practice across many faiths throughout history. The unique aspect of Islamic fasting is its systematic approach and its role as a mandatory practice for all capable Muslims.",
            imageUrl: "/assets/moon.svg",
          },
          {
            title: "Historical Context",
            content:
              "Fasting was prescribed in the second year after the migration to Madinah (Hijrah), making it one of the earliest formal obligations in Islam. Before the specific commandment for Ramadan fasting, Muslims would fast on the day of Ashura (10th of Muharram), following the Jewish tradition of fasting on Yom Kippur.\n\nThe Prophet Muhammad ﷺ emphasized the importance of fasting both through his teachings and his practice. He would not only observe the obligatory fasts during Ramadan but would also keep voluntary fasts throughout the year, demonstrating the spiritual benefits beyond the obligatory period.",
            imageUrl: "/assets/world-map.svg",
          },
          {
            title: "Physical and Psychological Dimensions",
            content:
              "While many focus on the physical aspects of fasting—abstaining from food and drink—Islamic fasting encompasses much more. During the fast, Muslims are encouraged to refrain from negative behaviors such as lying, backbiting, arguing, and other moral transgressions.\n\nThis holistic approach transforms fasting from merely a physical exercise into a comprehensive spiritual regimen. It trains the mind to be conscious of actions, words, and even thoughts throughout the day.\n\nModern science has also begun to recognize the health benefits of intermittent fasting, which aligns with the Islamic practice. These benefits include improved metabolic health, enhanced cellular repair processes, and potential longevity benefits.",
            videoUrl: "https://www.youtube.com/embed/h3Ht0jTCrUw",
          },
        ],
      },
      {
        id: "lesson-2",
        title: "Spiritual Benefits of Fasting",
        duration: "15 min",
        summary:
          "Discover the deep spiritual benefits and personal growth opportunities that come from the practice of fasting.",
        sections: [
          {
            title: "Taqwa: God-Consciousness",
            content:
              "The primary spiritual benefit of fasting, as mentioned in the Quran, is the development of 'taqwa' or God-consciousness. Fasting serves as a shield, a protection against spiritual pitfalls and moral lapses. When fasting, Muslims are constantly reminded of their commitment to God, as they abstain from permissible things for His sake.\n\nThis heightened awareness of the Divine presence helps in establishing a deeper connection with the Creator. It reminds Muslims that if they can abstain from lawful desires for God's sake, they should certainly be able to abstain from unlawful actions at all times.",
            imageUrl: "/assets/shield.svg",
          },
          {
            title: "Empathy and Compassion",
            content:
              "By experiencing hunger and thirst, Muslims develop a more profound empathy for those who face these conditions not by choice but by circumstance. This firsthand experience of deprivation often leads to increased charitable giving during Ramadan.\n\nThe Prophet Muhammad ﷺ was already the most generous of people, but he would increase in generosity during Ramadan. This tradition continues today, with many Muslims amplifying their charitable activities during this month, reflecting the heightened sense of social responsibility that fasting nurtures.",
            imageUrl: "/assets/empathy-illustration.svg",
          },
          {
            title: "Self-Discipline and Willpower",
            content:
              "The consistent daily practice of denying immediate gratification for a higher purpose strengthens one's willpower and self-discipline. This enhanced self-control often extends beyond the month of Ramadan, helping Muslims make better choices in various aspects of life.\n\nThis spiritual training helps overcome harmful habits and inclinations, leading to personal growth and development. Many Muslims report breaking negative habits during Ramadan and establishing positive ones that continue throughout the year.",
            videoUrl: "https://www.youtube.com/embed/dKR9xOQKiYA",
          },
        ],
      },
      {
        id: "lesson-3",
        title: "Mindfulness During Ramadan",
        duration: "12 min",
        summary:
          "Learn practical techniques to enhance mindfulness during the sacred month of Ramadan and beyond.",
        sections: [
          {
            title: "Mindful Eating Practices",
            content:
              "The pre-dawn meal (Suhoor) and the fast-breaking meal (Iftar) present perfect opportunities for mindful eating. Being conscious of what and how we eat not only enhances the physical benefits of fasting but also elevates its spiritual dimension.\n\nMindful eating involves giving full attention to the food—its taste, texture, and the blessing it represents. The Prophet Muhammad ﷺ advised against overeating, stating, 'The son of Adam fills no vessel worse than his stomach.' This guidance aligns with modern mindfulness practices around food consumption.",
            imageUrl: "/assets/utensils.svg",
          },
          {
            title: "Meditation and Dhikr",
            content:
              "Ramadan provides an excellent opportunity to establish or deepen a meditation practice. Islamic meditation, often centered around remembrance of God (dhikr), can help maintain focus and spiritual presence throughout the fast.\n\nSimple practices like setting aside time for quiet contemplation, mindful recitation of the Quran, or engaging in dhikr can significantly enhance the spiritual experience of Ramadan. The quiet hours before dawn (during Tahajjud prayer time) are especially conducive to meditation and deep spiritual connection.",
            imageUrl: "/assets/meditation-illustration.svg",
          },
          {
            title: "Managing Emotions and Responses",
            content:
              "Hunger and thirst can sometimes lead to irritability, making emotional management an essential aspect of mindful fasting. The Prophet Muhammad ﷺ taught that when fasting, if someone tries to argue or fight with you, you should say, 'I am fasting.'\n\nThis simple reminder serves as a pattern interrupt, helping the fasting person maintain composure and mindfulness even in challenging situations. It transforms potential negative interactions into opportunities for spiritual growth and self-control.",
            videoUrl: "https://www.youtube.com/embed/ennXDlHNiBM",
          },
        ],
      },
    ],
  },
  {
    id: "five-lenses",
    title: "Five Lenses to Reflect on the Quran",
    description: "Discover multiple perspectives to deepen your understanding.",
    icon: "visibility",
    difficulty: "intermediate",
    coverImage: "/assets/five-lenses.svg",
    lessons: [
      {
        id: "lesson-1",
        title: "Historical Context",
        duration: "15 min",
        summary:
          "Understanding the historical background behind Quranic revelations.",
        sections: [
          {
            title: "The Importance of Historical Context",
            content:
              "The Quran was revealed over a period of 23 years, during which many historical events occurred. Understanding these events provides crucial context for interpreting the Quranic verses. This approach is known as 'Asbab al-Nuzul' (reasons for revelation) in Islamic scholarship.\n\nKnowing the historical context helps readers avoid misinterpretations that might occur when verses are read in isolation. It shows how the Quran engaged with real-world situations and provided guidance for specific challenges faced by the early Muslim community.",
            imageUrl: "/assets/book.svg",
          },
          {
            title: "Meccan vs. Medinan Revelations",
            content:
              "The Quran's chapters (surahs) are broadly categorized into Meccan (revealed before the migration to Medina) and Medinan (revealed after). These two periods had distinct characteristics that influenced the nature and focus of the revelations.\n\nMeccan revelations typically focus on fundamental beliefs, the oneness of God (tawhid), stories of previous prophets, and establishing core moral values. Medinan revelations, in contrast, contain more detailed legal rulings, guidance for the emerging Muslim society, and instructions regarding interactions with other faith communities.",
            imageUrl: "/assets/calendar.svg",
          },
          {
            title: "Case Study: Surah Al-Asr",
            content:
              "Let's examine Surah Al-Asr (Chapter 103) through a historical lens. This short yet profound surah was revealed in Mecca during a time when the early Muslims faced significant persecution.\n\nThe surah's emphasis on the passage of time, righteous deeds, and mutual encouragement to persevere in truth directly addressed the challenges faced by the small Muslim community. Understanding this context deepens our appreciation of the surah's message about the importance of faith, good deeds, and community support during difficult times.",
            videoUrl: "https://www.youtube.com/embed/aF-gi9kX5FQ",
          },
        ],
      },
      {
        id: "lesson-2",
        title: "Linguistic Analysis",
        duration: "20 min",
        summary:
          "Exploring the linguistic miracles and literary devices in the Quranic text.",
        sections: [
          {
            title: "The Linguistic Miracle",
            content:
              "The Quran's linguistic excellence is considered one of its miraculous aspects. Classical Arabic scholars have extensively documented its rhetorical devices, unique linguistic patterns, and literary coherence.\n\nThe Quran itself challenged its contemporaries to produce a chapter like it, despite addressing an audience renowned for their eloquence and poetic abilities. This linguistic inimitability (I'jaz) remains a central aspect of Quranic studies.",
            imageUrl: "/assets/linguistic-miracle.svg",
          },
          {
            title: "Key Literary Devices",
            content:
              "The Quran employs numerous literary devices including metaphor, simile, parallelism, and rhetorical questions. For example, in Surah Al-Rahman (Chapter 55), the repeated refrain 'So which of the favors of your Lord would you deny?' creates a powerful rhythmic effect while emphasizing divine blessings.\n\nUnderstanding these devices helps readers appreciate the artistry of the text and often reveals deeper layers of meaning that might be missed in translation.",
            imageUrl: "/assets/speech-bubble.svg",
          },
          {
            title: "Word Choice and Precision",
            content:
              "The Quran is known for its precise word choices, where seemingly synonymous terms actually carry subtle but significant differences in meaning. For instance, the Quran uses different words for 'fear' (khawf, khashya, taqwa) each conveying distinct psychological states.\n\nThis precision extends to grammatical structures, verb tenses, and pronoun usage. When analyzed carefully, these linguistic features often reveal insights that enhance our understanding of the text's message.",
            videoUrl: "https://www.youtube.com/embed/Hvu2GWX1WZ0",
          },
        ],
      },
      {
        id: "lesson-3",
        title: "Thematic Connections",
        duration: "18 min",
        summary:
          "Discovering interconnected themes across different chapters of the Quran.",
        sections: [
          {
            title: "Coherence Across Chapters",
            content:
              "Though revealed over 23 years in different contexts, the Quran maintains remarkable thematic coherence. Scholars of 'Nazm al-Quran' (Quranic coherence) have identified intricate connections between adjacent chapters and even between seemingly unrelated passages.\n\nThese connections create a web of meaning that transcends chronological order. Understanding these thematic links helps readers appreciate the Quran as a unified text rather than a collection of isolated revelations.",
            imageUrl: "/assets/bookmark.svg",
          },
          {
            title: "Recurring Themes",
            content:
              "Certain themes recur throughout the Quran, including stories of prophets, descriptions of the natural world as signs of God, ethical teachings, and eschatological narratives about the afterlife.\n\nBy tracking these themes across different chapters, readers can develop a more comprehensive understanding of how the Quran approaches these subjects from multiple angles. This thematic reading reveals nuances that might be missed when passages are read in isolation.",
            imageUrl: "/assets/shuffle.svg",
          },
          {
            title: "Case Study: Justice in the Quran",
            content:
              "The concept of justice appears throughout the Quran, addressed in various contexts including personal conduct, family relations, commerce, and governance. By examining these diverse passages together, we gain a multi-dimensional understanding of the Quranic approach to justice.\n\nThis thematic lens reveals that justice in the Quran is not merely a legal concept but is deeply connected to the qualities of mercy, moderation, and truthfulness. The result is a comprehensive ethical framework that can be applied across different domains of life.",
            videoUrl: "https://www.youtube.com/embed/qqiU9GgEgPY",
          },
        ],
      },
    ],
  },
  {
    id: "iron-healing",
    title: "The Iron Healing",
    description: "Lessons & Reflections from Surah al-Hadid.",
    icon: "psychology",
    difficulty: "intermediate",
    coverImage: "/assets/iron-healing.svg",
    lessons: [
      {
        id: "lesson-1",
        title: "Introduction to Surah al-Hadid",
        duration: "10 min",
        summary:
          "Explore the rich themes and unique characteristics of the 57th chapter of the Quran.",
        sections: [
          {
            title: "Overview of Surah al-Hadid",
            content:
              "Surah al-Hadid (The Iron) is the 57th chapter of the Quran, consisting of 29 verses. It is a Medinan surah, revealed after the Prophet's migration to Medina. The surah derives its name from the mention of iron (hadid) in verse 25, where Allah says: 'And We sent down iron, wherein is mighty power and benefits for mankind.'\n\nThis chapter is known for its profound discussions on faith, charity, and the nature of worldly life. It begins with the glorification of Allah and proceeds to discuss the creation of the heavens and earth, the omniscience of God, and the importance of spending in His cause.",
            imageUrl: "/assets/tools.svg",
          },
          {
            title: "Historical Context",
            content:
              "Surah al-Hadid was revealed in Medina at a time when the Muslim community was being established as a social and political entity. This context is important for understanding its emphasis on spending in the cause of Allah and its reminders about the temporary nature of worldly life.\n\nThe surah addresses both the early converts to Islam, reminding them of their commitment, and those who embraced Islam after the conquest of Mecca, encouraging them to contribute to the community. It was a period of transition from persecution to establishment, which is reflected in the surah's themes.",
            imageUrl: "/assets/building.svg",
          },
          {
            title: "Key Themes",
            content:
              "Several key themes run throughout Surah al-Hadid:\n\n1. Divine Sovereignty: The surah emphasizes Allah's complete control over creation and His perfect knowledge of all things.\n\n2. The Reality of This World: It repeatedly emphasizes the temporary nature of worldly life and the permanence of the Hereafter.\n\n3. Generosity and Sacrifice: The surah strongly encourages believers to spend their wealth in charity and in the cause of Allah.\n\n4. Balance Between Spirituality and Material Progress: The mention of iron highlights the importance of material strength alongside spiritual development.\n\nThese themes create a comprehensive worldview that balances spiritual aspirations with material realities.",
            videoUrl: "https://www.youtube.com/embed/7_vvORv0HAk",
          },
        ],
      },
      {
        id: "lesson-2",
        title: "The Symbolism of Iron",
        duration: "15 min",
        summary:
          "Understand the profound scientific and spiritual significance of iron as mentioned in the Quran.",
        sections: [
          {
            title: "Iron in Verse 25",
            content:
              "The key reference to iron in Surah al-Hadid occurs in verse 25, which states: 'We have certainly sent Our messengers with clear proofs and sent down with them the Scripture and the balance that the people may maintain [their affairs] in justice. And We sent down iron, wherein is mighty power and benefits for mankind...'\n\nThe Arabic phrase used is 'wa anzalna al-hadida' ('We sent down iron'), which has intrigued scholars both for its spiritual significance and its scientific implications. The surah highlights two key qualities of iron: its strength ('mighty power') and its utility ('benefits for mankind').",
            imageUrl: "/assets/pick.svg",
          },
          {
            title: "Scientific Perspectives",
            content:
              "Modern scientific understanding reveals fascinating aspects about iron that give deeper meaning to the Quranic phrase 'sent down' (anzalna). Unlike elements formed on Earth, the iron in our planet's crust and core originated from distant stars. Through supernova explosions, iron was scattered through space and eventually became incorporated into Earth during its formation.\n\nThis scientific fact aligns remarkably with the Quranic description of iron being 'sent down.' Iron plays a crucial role in Earth's magnetic field, which protects life from harmful radiation, and in the hemoglobin of our blood, which transports oxygen—truly embodying 'benefits for mankind' as mentioned in the surah.",
            imageUrl: "/assets/microscope.svg",
          },
          {
            title: "Symbolic Meaning",
            content:
              "Beyond its literal meaning, iron in Surah al-Hadid carries symbolic significance. Iron represents strength, resilience, and the material foundations necessary for human civilization and justice. It symbolizes the balance between spiritual values (represented by the Scripture) and material strength (represented by iron).\n\nJust as iron needs to be heated, beaten, and shaped to become useful, human souls often require trials and challenges to develop moral strength and character. This symbolism reminds believers that spiritual development doesn't mean neglecting material progress and strength—both are necessary for a balanced life and a just society.",
            videoUrl: "https://www.youtube.com/embed/OkNnB5sXEws",
          },
        ],
      },
      {
        id: "lesson-3",
        title: "Practical Applications",
        duration: "12 min",
        summary:
          "Learn how to apply the profound lessons from Surah al-Hadid in your daily life.",
        sections: [
          {
            title: "Balancing Dunya and Akhirah",
            content:
              "Surah al-Hadid teaches us about maintaining balance between worldly concerns (dunya) and spiritual aspirations (akhirah). The surah warns against becoming so absorbed in material pursuits that we neglect our spiritual development, while also emphasizing that material strength (symbolized by iron) has an important place in the divine plan.\n\nPractical application involves regularly assessing how we allocate our time, energy, and resources between material and spiritual pursuits. This might include setting aside time for both work and worship, using wealth for both personal needs and charitable causes, and developing both professional skills and spiritual knowledge.",
            imageUrl: "/assets/scales.svg",
          },
          {
            title: "Cultivating Generosity",
            content:
              "A major theme in Surah al-Hadid is spending in the way of Allah. Verses 10-11 specifically address the importance of charity and its rewards. The surah reminds us that everything ultimately belongs to Allah, and our wealth is a trust that we are expected to use wisely and generously.\n\nPractical steps include:\n\n1. Establishing regular charitable giving beyond obligatory zakat\n2. Being early in responding to calls for charity rather than delaying\n3. Giving with sincerity, seeking only Allah's pleasure rather than recognition\n4. Remembering that loans to the needy are 'loans to Allah' that will be repaid multiplied",
            imageUrl: "/assets/banknote.svg",
          },
          {
            title: "Developing Spiritual Resilience",
            content:
              "Iron's properties of strength and resilience serve as a metaphor for spiritual strength. Just as iron must go through intense heat and pressure to become strong and useful, our spirits often develop through trials and challenges.\n\nPractical applications include:\n\n1. Approaching hardships as opportunities for spiritual growth rather than mere obstacles\n2. Developing regular spiritual practices that strengthen the heart, such as dhikr (remembrance of Allah) and reflection on the Quran\n3. Building communities that support each other during difficulties, sharing both material resources and spiritual strength\n4. Recognizing that spiritual transformation, like the forging of iron, is a process that takes time and consistent effort",
            videoUrl: "https://www.youtube.com/embed/lc2-ZnwdUhI",
          },
        ],
      },
    ],
  },
  {
    id: "post-ramadan",
    title: "Maintaining Your Momentum",
    description: "Avoiding the Post-Ramadan Slump.",
    icon: "trending_up",
    difficulty: "beginner",
    coverImage: "/assets/post-ramadan.svg",
    lessons: [
      {
        id: "lesson-1",
        title: "The Post-Ramadan Challenge",
        duration: "10 min",
        summary:
          "Understanding why spiritual momentum often decreases after Ramadan and how to combat this natural tendency.",
        sections: [
          {
            title: "The Reality of Post-Ramadan Decline",
            content:
              "Many Muslims experience a noticeable decline in their spiritual practice and motivation after Ramadan ends. This phenomenon, sometimes called the 'post-Ramadan slump,' is a common challenge that affects Muslims worldwide.\n\nDuring Ramadan, we benefit from communal support, special prayers, and a focused spiritual atmosphere. When these external motivators disappear, maintaining the same level of worship becomes more challenging. Understanding this pattern is the first step toward addressing it effectively.",
            imageUrl: "/assets/zzz.svg",
          },
          {
            title: "Psychological Perspectives",
            content:
              "From a psychological perspective, the post-Ramadan challenge can be understood through several frameworks:\n\n1. Habit Formation: Research suggests that habits take time to form—typically anywhere from 18 to 254 days, with an average of 66 days. The 29-30 days of Ramadan may not be enough to fully cement new spiritual habits.\n\n2. Social Reinforcement: The communal aspect of Ramadan provides strong social reinforcement that disappears afterward.\n\n3. Goal Setting: After achieving the 'completion' of Ramadan, many people lack clear spiritual goals for the following months.\n\nUnderstanding these psychological factors helps us develop more effective strategies for maintaining momentum.",
            imageUrl: "/assets/brain.svg",
          },
          {
            title: "The Islamic Perspective",
            content:
              "From an Islamic perspective, consistency in worship is highly valued. The Prophet Muhammad ﷺ said, 'The most beloved of deeds to Allah are those that are most consistent, even if they are small.' (Bukhari and Muslim)\n\nThis hadith emphasizes that Allah values consistency over intensity—a principle that directly applies to the post-Ramadan period. Additionally, voluntary fasting throughout the year is encouraged, with specific recommendations for fasting six days in Shawwal (the month after Ramadan), three days during the middle of each lunar month, and on Mondays and Thursdays.\n\nThe Quran also encourages believers to 'maintain their prayers' (Surah Al-Mu'minun 23:9), indicating the importance of consistency in worship beyond special occasions.",
            videoUrl: "https://www.youtube.com/embed/iazyu0foG8E",
          },
        ],
      },
      {
        id: "lesson-2",
        title: "Building Sustainable Habits",
        duration: "12 min",
        summary:
          "Practical strategies for turning Ramadan practices into year-round habits that last.",
        sections: [
          {
            title: "The Science of Habit Formation",
            content:
              "Building sustainable spiritual habits requires understanding how habits form. According to researchers, habits consist of three components:\n\n1. Cue: A trigger that initiates the behavior\n2. Routine: The behavior itself\n3. Reward: The benefit gained from performing the behavior\n\nFor example, a spiritual habit might involve:\n- Cue: Hearing the adhan (call to prayer)\n- Routine: Performing the prayer\n- Reward: Feeling connected to Allah and at peace\n\nBy consciously designing these three elements, we can develop habits that continue long after Ramadan.",
            imageUrl: "/assets/abacus.svg",
          },
          {
            title: "Practical Habit Strategies",
            content:
              "To turn Ramadan practices into lasting habits, consider these practical approaches:\n\n1. Start Small: Rather than trying to maintain all Ramadan practices, choose 1-2 key practices to continue. For example, if you read Quran daily during Ramadan, commit to reading just one page daily after Ramadan.\n\n2. Anchor to Existing Habits: Connect new spiritual habits to already established routines. For example, read Quran after each fajr prayer or before going to bed.\n\n3. Create Environment Triggers: Design your environment to remind and facilitate spiritual practices. Keep a Quran visible in your living space, set prayer reminders on your phone, or display Islamic wall art as visual cues.\n\n4. Track Progress: Use a habit tracker app or journal to monitor consistency. Visual progress tracking provides motivation and accountability.\n\n5. Plan for Obstacles: Identify potential barriers to your spiritual habits and plan specific strategies to overcome them.",
            imageUrl: "/assets/clipboard.svg",
          },
          {
            title: "Developing a Personal Habit Plan",
            content:
              "Create a personalized plan for maintaining your Ramadan momentum by following these steps:\n\n1. Reflect on your Ramadan experience: What practices did you find most meaningful? Which ones would you like to continue?\n\n2. Set specific, measurable goals: Instead of 'read more Quran,' specify 'read 3 pages of Quran daily after fajr prayer.'\n\n3. Start with a 30-day commitment: Commit to your chosen practices for 30 days after Ramadan before evaluating and adjusting.\n\n4. Create accountability: Find a friend or family member to check in with regularly about your spiritual habits.\n\n5. Plan celebrations: Reward yourself in halal ways when you reach milestones (e.g., 30 consecutive days of your practice).\n\nRemember that stumbling in your habits is normal and part of the growth process. The key is to recommit and continue forward.",
            videoUrl: "https://www.youtube.com/embed/XU4gXp9jvhE",
          },
        ],
      },
      {
        id: "lesson-3",
        title: "Weekly Reflection Practices",
        duration: "15 min",
        summary:
          "Systematic methods for regular self-assessment to maintain spiritual awareness and growth.",
        sections: [
          {
            title: "The Importance of Self-Reflection",
            content:
              "Regular self-reflection (muhasabah) is a well-established Islamic practice that helps maintain spiritual momentum after Ramadan. The second Caliph, Umar ibn al-Khattab, said: 'Take account of yourselves before you are taken to account.'\n\nSelf-reflection involves examining our thoughts, actions, and intentions against our spiritual values and goals. This practice helps us recognize patterns, celebrate progress, identify areas for improvement, and renew our intention (niyyah). Without regular reflection, we may drift from our spiritual path without noticing.",
            imageUrl: "/assets/magnifying-glass.svg",
          },
          {
            title: "Structured Weekly Reflection Guide",
            content:
              "Develop a weekly reflection practice using the following structure:\n\n1. Review the week: Set aside 15-30 minutes at the same time each week (Friday evening is traditional in many cultures) to review your spiritual journey over the past seven days.\n\n2. Ask key questions: Reflect on questions such as:\n   - Did I fulfill my obligations (prayers, duties to family, ethical conduct)?\n   - What spiritual practices did I maintain consistently?\n   - Where did I struggle, and what were the circumstances?\n   - What patterns or triggers led to spiritual high points or low points?\n   - How did I treat others this week?\n\n3. Record insights: Keep a journal of your reflections to track patterns over time.\n\n4. Plan improvements: Based on your reflection, set 1-2 specific intentions for the coming week.\n\n5. Make dua (supplication): Conclude with gratitude to Allah for successes and asking for help with challenges.",
            imageUrl: "/assets/memo.svg",
          },
          {
            title: "Communal Reflection Practices",
            content:
              "While individual reflection is valuable, community support enhances sustainability. Consider these approaches to communal reflection:\n\n1. Reflection Circles: Form a small group (halaqah) that meets weekly to discuss spiritual goals, share challenges, and offer mutual support.\n\n2. Accountability Partnerships: Pair up with a trusted friend for weekly check-ins about spiritual practices and goals.\n\n3. Family Reflections: Establish a weekly family meeting where family members share their spiritual experiences and support each other's growth.\n\n4. Community Classes: Attend regular knowledge circles at your local mosque to maintain connection with spiritual learning.\n\nCommunal reflection combines the benefits of personal accountability with social support, making it particularly effective for maintaining momentum after Ramadan.",
            videoUrl: "https://www.youtube.com/embed/Sr97LqjGuUM",
          },
        ],
      },
    ],
  },
];
