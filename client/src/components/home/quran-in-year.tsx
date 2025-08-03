import { Link } from "wouter";

export default function QuranInYear() {
  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold">Quran in a Year</h2>
        <Link 
          href="/explore/quran-in-year"
          className="text-primary text-sm font-medium flex items-center"
        >
          <span>Calendar</span>
          <span className="material-symbols-rounded text-sm ml-1">chevron_right</span>
        </Link>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <p className="font-amiri text-2xl mb-3 leading-relaxed text-right">وَإِن تُطِعْ أَكْثَرَ مَن فِى ٱلْأَرْضِ يُضِلُّوكَ عَن سَبِيلِ ٱللَّهِ ۚ إِن يَتَّبِعُونَ إِلَّا ٱلظَّنَّ وَإِنْ هُمْ إِلَّا يَخْرُصُونَ ١١٦</p>
          <p className="text-sm dark:text-gray-300">˹O Prophet!˺ If you were to obey most of those on earth, they would lead you away from Allah's Way. They follow nothing but assumptions and do nothing but lie.</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">— Dr. Mustafa Khattab, The Clear Quran</p>
        </div>
        <Link 
          href="/explore/calendar"
          className="inline-flex items-center text-primary text-sm font-medium"
        >
          <span>This Week's Reading</span>
          <span className="material-symbols-rounded text-sm ml-1">chevron_right</span>
        </Link>
      </div>
    </div>
  );
}
