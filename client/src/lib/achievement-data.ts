export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: {
    type: "pages" | "streak" | "surahs" | "time";
    value: number;
  };
}

export const achievementsList: Achievement[] = [
  {
    id: "first_steps",
    name: "First Steps",
    description: "Read 10 pages of the Quran",
    icon: "auto_stories",
    criteria: {
      type: "pages",
      value: 10
    }
  },
  {
    id: "dedicated_reader",
    name: "Dedicated Reader",
    description: "Read 50 pages of the Quran",
    icon: "menu_book",
    criteria: {
      type: "pages",
      value: 50
    }
  },
  {
    id: "avid_reader",
    name: "Avid Reader",
    description: "Read 100 pages of the Quran",
    icon: "auto_stories",
    criteria: {
      type: "pages",
      value: 100
    }
  },
  {
    id: "consistent_reader",
    name: "Consistent Reader",
    description: "Maintain a 3-day reading streak",
    icon: "local_fire_department",
    criteria: {
      type: "streak",
      value: 3
    }
  },
  {
    id: "week_streak",
    name: "Week Streak",
    description: "Maintain a 7-day reading streak",
    icon: "local_fire_department",
    criteria: {
      type: "streak",
      value: 7
    }
  },
  {
    id: "month_streak",
    name: "Month Streak",
    description: "Maintain a 30-day reading streak",
    icon: "workspace_premium",
    criteria: {
      type: "streak",
      value: 30
    }
  },
  {
    id: "first_surah",
    name: "First Surah",
    description: "Complete reading your first Surah",
    icon: "check_circle",
    criteria: {
      type: "surahs",
      value: 1
    }
  },
  {
    id: "ten_surahs",
    name: "Ten Surahs",
    description: "Complete reading 10 Surahs",
    icon: "verified",
    criteria: {
      type: "surahs",
      value: 10
    }
  },
  {
    id: "completed_quran",
    name: "Completed Quran",
    description: "Complete reading the entire Quran",
    icon: "military_tech",
    criteria: {
      type: "surahs",
      value: 114
    }
  },
  {
    id: "early_bird",
    name: "Early Bird",
    description: "Read Quran before Fajr prayer 5 times",
    icon: "wb_twilight",
    criteria: {
      type: "time",
      value: 5
    }
  },
  {
    id: "night_owl",
    name: "Night Owl",
    description: "Read Quran after Isha prayer 5 times",
    icon: "bedtime",
    criteria: {
      type: "time",
      value: 5
    }
  },
  {
    id: "ramadan_achiever",
    name: "Ramadan Achiever",
    description: "Read Quran every day during Ramadan",
    icon: "emoji_events",
    criteria: {
      type: "streak",
      value: 30
    }
  }
];
