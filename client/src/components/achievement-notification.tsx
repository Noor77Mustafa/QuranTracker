import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Islamic Knowledge Badge System - Same as backend for consistency
const ISLAMIC_BADGES = {
  quran_reader: {
    id: "quran_reader",
    name: "First Steps in the Quran",
    arabicName: "الخطوات الأولى في القرآن",
    description: "Read your first ayah from the Holy Quran",
    icon: "📖",
    xpReward: 50,
    category: "quran",
    rarity: "common"
  },
  surah_explorer: {
    id: "surah_explorer",
    name: "Surah Explorer",
    arabicName: "مستكشف السور",
    description: "Read verses from 10 different surahs",
    icon: "🗺️",
    xpReward: 200,
    category: "quran",
    rarity: "uncommon"
  },
  makkah_reader: {
    id: "makkah_reader",
    name: "Meccan Revelation",
    arabicName: "الوحي المكي",
    description: "Complete reading 5 Meccan surahs",
    icon: "🕋",
    xpReward: 500,
    category: "quran",
    rarity: "rare"
  },
  hadith_seeker: {
    id: "hadith_seeker",
    name: "Seeker of Hadith",
    arabicName: "طالب الحديث",
    description: "Read your first authentic hadith",
    icon: "📚",
    xpReward: 50,
    category: "hadith",
    rarity: "common"
  },
  bukhari_student: {
    id: "bukhari_student",
    name: "Student of Al-Bukhari",
    arabicName: "طالب البخاري",
    description: "Read 10 hadiths from Sahih al-Bukhari",
    icon: "📜",
    xpReward: 300,
    category: "hadith",
    rarity: "uncommon"
  },
  dua_beginner: {
    id: "dua_beginner",
    name: "Beginning Supplicant",
    arabicName: "الداعي المبتدئ",
    description: "Learn your first dua",
    icon: "🤲",
    xpReward: 50,
    category: "dua",
    rarity: "common"
  },
  steady_reader: {
    id: "steady_reader",
    name: "Steady Reader",
    arabicName: "القارئ المنتظم",
    description: "Maintain a 7-day reading streak",
    icon: "📅",
    xpReward: 300,
    category: "consistency",
    rarity: "uncommon"
  },
  devoted_student: {
    id: "devoted_student",
    name: "Devoted Student",
    arabicName: "الطالب المخلص",
    description: "Maintain a 30-day reading streak",
    icon: "🔥",
    xpReward: 1000,
    category: "consistency",
    rarity: "epic"
  }
};

const RARITY_COLORS = {
  common: "from-gray-400 to-gray-600",
  uncommon: "from-green-400 to-green-600",
  rare: "from-blue-400 to-blue-600",
  epic: "from-purple-400 to-purple-600",
  legendary: "from-yellow-400 to-yellow-600"
};

const RARITY_GLOW = {
  common: "shadow-gray-400/50",
  uncommon: "shadow-green-400/50",
  rare: "shadow-blue-400/50",
  epic: "shadow-purple-400/50",
  legendary: "shadow-yellow-400/50"
};

interface AchievementNotificationProps {
  achievementIds: string[];
  onClose: () => void;
}

export default function AchievementNotification({ achievementIds, onClose }: AchievementNotificationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const badges = achievementIds
    .map(id => ISLAMIC_BADGES[id as keyof typeof ISLAMIC_BADGES])
    .filter(Boolean);

  const currentBadge = badges[currentIndex];

  useEffect(() => {
    if (badges.length === 0) {
      onClose();
      return;
    }

    // Auto advance through multiple badges
    if (currentIndex < badges.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, badges.length, onClose]);

  const handleNext = () => {
    if (currentIndex < badges.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!currentBadge || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotateY: 180 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20,
            duration: 0.6 
          }}
          onClick={(e) => e.stopPropagation()}
          className="relative"
        >
          <Card className={`w-80 relative overflow-hidden bg-gradient-to-br ${RARITY_COLORS[currentBadge.rarity as keyof typeof RARITY_COLORS]} shadow-2xl ${RARITY_GLOW[currentBadge.rarity as keyof typeof RARITY_GLOW]}`}>
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="absolute top-2 right-2 text-white hover:bg-white/20 z-10"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-white/30 blur-xl"></div>
              <div className="absolute bottom-4 right-4 w-20 h-20 rounded-full bg-white/20 blur-xl"></div>
            </div>

            <CardContent className="p-6 text-center relative z-10">
              {/* Achievement unlocked header */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-4"
              >
                <div className="flex items-center justify-center space-x-2 text-white/90 text-sm font-semibold uppercase tracking-wide">
                  <Trophy className="h-4 w-4" />
                  <span>Achievement Unlocked</span>
                  <Trophy className="h-4 w-4" />
                </div>
              </motion.div>

              {/* Badge icon with animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.5, 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15 
                }}
                className="text-6xl mb-4"
              >
                {currentBadge.icon}
              </motion.div>

              {/* Badge details */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-white"
              >
                <h3 className="text-xl font-bold mb-1">{currentBadge.name}</h3>
                <p className="text-sm font-arabic mb-2 opacity-90">{currentBadge.arabicName}</p>
                <p className="text-sm opacity-80 mb-4">{currentBadge.description}</p>
                
                {/* Rarity and XP */}
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <Badge variant="secondary" className="text-xs capitalize">
                    {currentBadge.rarity}
                  </Badge>
                  <div className="flex items-center space-x-1 text-yellow-200">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-semibold">+{currentBadge.xpReward} XP</span>
                  </div>
                </div>

                {/* Progress indicator for multiple badges */}
                {badges.length > 1 && (
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    {badges.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentIndex ? 'bg-white' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Action button */}
                <Button
                  onClick={handleNext}
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  {currentIndex < badges.length - 1 ? 'Next Achievement' : 'Continue'}
                </Button>
              </motion.div>
            </CardContent>
          </Card>

          {/* Sparkle effects */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 0], 
                  opacity: [0, 1, 0],
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50]
                }}
                transition={{ 
                  delay: 1 + i * 0.1, 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}