import { Link } from "wouter";
import { learningPlans } from "@/lib/learning-plans";

export default function LearningPlans() {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Learning Plans</h2>
        <Link href="/learn">
          <a className="text-primary text-sm font-medium">See More</a>
        </Link>
      </div>
      
      <div className="overflow-x-auto flex gap-4 pb-4 no-scrollbar">
        {learningPlans.map((plan) => (
          <div key={plan.id} className="min-w-[260px] bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 relative">
              {/* Using placeholder images for demo, in production we would use proper images */}
              <div 
                className="w-full h-full bg-gradient-to-br from-primary to-secondary opacity-60 flex items-center justify-center"
              >
                <span className="material-symbols-rounded text-4xl text-white">{plan.icon}</span>
              </div>
              {plan.isNew && (
                <div className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
                  New!
                </div>
              )}
            </div>
            <div className="p-4 flex-grow">
              <h3 className="font-medium mb-2">{plan.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{plan.description}</p>
            </div>
            <div className="px-4 pb-4">
              <Link href={`/learn/plan/${plan.id}`}>
                <a className="block w-full bg-primary text-white py-2 rounded-lg text-center text-sm font-medium hover:bg-primary/90 transition">
                  Start Learning
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
