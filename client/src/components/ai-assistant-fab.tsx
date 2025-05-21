import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AIAssistantFAB() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOpen = () => setIsOpen(!isOpen);
  
  return (
    <div className="fixed right-4 bottom-20 md:bottom-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-4 w-64 md:w-80 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-medium text-lg">Quran Assistant</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">How can I help you today?</p>
            </div>
            <div className="p-4">
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="justify-start text-left">
                  <span className="material-symbols-rounded mr-2">search</span>
                  Find verses about patience
                </Button>
                <Button variant="outline" className="justify-start text-left">
                  <span className="material-symbols-rounded mr-2">menu_book</span>
                  Explain Surah Al-Fatihah
                </Button>
                <Button variant="outline" className="justify-start text-left">
                  <span className="material-symbols-rounded mr-2">psychology</span>
                  Suggest a daily reading plan
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        className="bg-primary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90"
        onClick={toggleOpen}
        whileTap={{ scale: 0.9 }}
      >
        <span className="material-symbols-rounded">
          {isOpen ? "close" : "smart_toy"}
        </span>
      </motion.button>
    </div>
  );
}
