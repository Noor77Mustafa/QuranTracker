export interface LearningPlan {
  id: string;
  title: string;
  description: string;
  icon: string;
  isNew?: boolean;
  lessons: {
    id: string;
    title: string;
    duration: string;
    content?: string;
  }[];
}

export const learningPlans: LearningPlan[] = [
  {
    id: "mindful-fasting",
    title: "Mindful Fasting",
    description: "Learn the spiritual dimensions of fasting beyond physical restraint.",
    icon: "self_improvement",
    isNew: true,
    lessons: [
      {
        id: "lesson-1",
        title: "Introduction to Fasting in Islam",
        duration: "10 min"
      },
      {
        id: "lesson-2",
        title: "Spiritual Benefits of Fasting",
        duration: "15 min"
      },
      {
        id: "lesson-3",
        title: "Mindfulness During Ramadan",
        duration: "12 min"
      }
    ]
  },
  {
    id: "five-lenses",
    title: "Five Lenses to Reflect on the Quran",
    description: "Discover multiple perspectives to deepen your understanding.",
    icon: "visibility",
    lessons: [
      {
        id: "lesson-1",
        title: "Historical Context",
        duration: "15 min"
      },
      {
        id: "lesson-2",
        title: "Linguistic Analysis",
        duration: "20 min"
      },
      {
        id: "lesson-3",
        title: "Thematic Connections",
        duration: "18 min"
      }
    ]
  },
  {
    id: "iron-healing",
    title: "The Iron Healing",
    description: "Lessons & Reflections from Surah al-Hadid.",
    icon: "psychology",
    lessons: [
      {
        id: "lesson-1",
        title: "Introduction to Surah al-Hadid",
        duration: "10 min"
      },
      {
        id: "lesson-2",
        title: "The Symbolism of Iron",
        duration: "15 min"
      },
      {
        id: "lesson-3",
        title: "Practical Applications",
        duration: "12 min"
      }
    ]
  },
  {
    id: "post-ramadan",
    title: "Maintaining Your Momentum",
    description: "Avoiding the Post-Ramadan Slump.",
    icon: "trending_up",
    lessons: [
      {
        id: "lesson-1",
        title: "The Post-Ramadan Challenge",
        duration: "10 min"
      },
      {
        id: "lesson-2",
        title: "Building Sustainable Habits",
        duration: "12 min"
      },
      {
        id: "lesson-3",
        title: "Weekly Reflection Practices",
        duration: "15 min"
      }
    ]
  }
];
