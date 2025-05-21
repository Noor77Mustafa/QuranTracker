import { useEffect } from "react";
import { Link } from "wouter";
import { learningPlans } from "@/lib/learning-plans";

export default function Learning() {
  // Set page title
  useEffect(() => {
    document.title = "Learning Plans - MyQuran";
  }, []);
  
  return (
    <main className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-semibold mb-6">Learning Plans</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningPlans.map((plan) => (
          <div key={plan.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="h-40 bg-gradient-to-br from-primary to-secondary relative flex items-center justify-center">
              <span className="material-symbols-rounded text-6xl text-white">{plan.icon}</span>
              {plan.isNew && (
                <div className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
                  New!
                </div>
              )}
            </div>
            <div className="p-6 flex-grow">
              <h2 className="text-xl font-semibold mb-2">{plan.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{plan.description}</p>
              
              <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">Lessons:</h3>
              <ul className="space-y-2 mb-6">
                {plan.lessons.map((lesson) => (
                  <li key={lesson.id} className="flex justify-between">
                    <span className="text-sm">{lesson.title}</span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {lesson.duration}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-6 pb-6">
              <Link 
                href={`/learn/plan/${plan.id}`}
                className="block w-full bg-primary text-white py-3 rounded-lg text-center font-medium hover:bg-primary/90 transition btn-tap-effect"
              >
                Start Learning
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
