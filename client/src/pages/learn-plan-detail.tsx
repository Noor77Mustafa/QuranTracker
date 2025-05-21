import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { learningPlans } from "@/lib/learning-plans";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function LearningPlanDetail() {
  const [, params] = useRoute("/learn/plan/:id");
  const planId = params?.id || "";
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("content");
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Find the plan from the data
  const plan = learningPlans.find(p => p.id === planId);

  useEffect(() => {
    if (plan) {
      document.title = `${plan.title} - MyQuran Learning`;
      setLoading(false);
      // Set initial progress for demonstration
      setProgress(10);
    } else {
      document.title = "Learning Plan Not Found - MyQuran";
      setLoading(false);
    }
  }, [plan, planId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading learning plan...</p>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Learning Plan Not Found</h2>
          <p>The learning plan you're looking for doesn't exist or has been moved.</p>
          <Link href="/learn">
            <Button variant="outline" className="mt-4">
              Back to Learning Plans
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentLesson = plan.lessons[currentLessonIndex];

  const nextLesson = () => {
    if (currentLessonIndex < plan.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      // Increase progress for demonstration
      setProgress(Math.min(progress + (100 / plan.lessons.length), 100));
    }
  };

  const prevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  return (
    <main className="container mx-auto px-4 py-4 animate-fadeIn">
      <div className="flex items-center mb-6">
        <Link href="/learn" className="mr-2">
          <Button variant="ghost" size="sm" className="flex items-center">
            <span className="material-symbols-rounded mr-1">arrow_back</span>
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold">{plan.title}</h1>
      </div>

      {/* Plan Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-start">
          <div className="mr-4 bg-primary/10 dark:bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center">
            <span className="material-symbols-rounded text-primary text-3xl">{plan.icon}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">{plan.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{plan.description}</p>
            
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">Your Progress</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 mb-4" />
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">{plan.lessons.length}</span> lessons
              </div>
              
              {plan.isNew && (
                <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                  New!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="content" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="discussion">Discussion</TabsTrigger>
          <TabsTrigger value="notes">My Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="pt-4">
          {/* Current Lesson */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Lesson {currentLessonIndex + 1}: {currentLesson.title}
              </h3>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {currentLesson.duration}
              </span>
            </div>
            
            <div className="prose dark:prose-invert max-w-none mb-6">
              {currentLesson.summary && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                  <h4 className="text-blue-700 dark:text-blue-300 font-medium mb-1">Lesson Summary</h4>
                  <p className="text-blue-800 dark:text-blue-200 m-0">{currentLesson.summary}</p>
                </div>
              )}
              
              {currentLesson.sections && currentLesson.sections.length > 0 ? (
                <div className="space-y-8">
                  {currentLesson.sections.map((section, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 border-b border-gray-100 dark:border-gray-600">
                        <h4 className="font-medium text-lg m-0">{section.title}</h4>
                      </div>
                      
                      <div className="p-4">
                        {section.content.split('\n\n').map((paragraph, pIndex) => (
                          <p key={pIndex} className="mb-4 last:mb-0">{paragraph}</p>
                        ))}
                        
                        <div className="mt-4 rounded-lg overflow-hidden">
                          <img 
                            src={section.imageUrl || "./src/assets/placeholder.svg"} 
                            alt={`Illustration for ${section.title}`}
                            className="w-full h-auto object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = "./src/assets/placeholder.svg";
                            }}
                          />
                        </div>
                        
                        {section.videoUrl && (
                          <div className="mt-4 rounded-lg overflow-hidden relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                            <iframe
                              src={section.videoUrl}
                              title={`Video for ${section.title}`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute top-0 left-0 w-full h-full"
                            ></iframe>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <p>This is a sample lesson content. In an actual implementation, this would contain the full lesson material including text, images, and potentially embedded videos.</p>
                  
                  <h4>Key Points</h4>
                  <ul>
                    <li>Understanding the historical context</li>
                    <li>Learning the proper pronunciation</li>
                    <li>Reflecting on the meaning and application</li>
                  </ul>
                  
                  <p>The Quran encourages us to reflect deeply on its verses, to understand not just the literal meaning but the deeper implications for our lives and societies.</p>
                  
                  <blockquote>
                    <p>"Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding."</p>
                    <footer>Quran 3:190</footer>
                  </blockquote>
                </div>
              )}
            </div>
            
            {/* Lesson Navigation */}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={prevLesson}
                disabled={currentLessonIndex === 0}
                className="flex items-center"
              >
                <span className="material-symbols-rounded mr-1">arrow_back</span>
                Previous
              </Button>
              
              <Button 
                variant="default"
                onClick={nextLesson}
                disabled={currentLessonIndex === plan.lessons.length - 1}
                className="flex items-center"
              >
                Next
                <span className="material-symbols-rounded ml-1">arrow_forward</span>
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="discussion" className="pt-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Discussion</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Join the discussion about this learning plan. Share your insights and questions with other learners.
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                This feature is coming soon. You'll be able to participate in community discussions about each lesson.
              </p>
              
              <Button variant="outline" disabled>Coming Soon</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notes" className="pt-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">My Notes</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Take personal notes as you progress through this learning plan.
            </p>
            
            <textarea 
              className="w-full h-40 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:outline-none resize-none"
              placeholder="Write your notes here..."
            ></textarea>
            
            <Button className="mt-4">Save Notes</Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Lesson List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">All Lessons</h3>
        
        <ul className="space-y-3">
          {plan.lessons.map((lesson, index) => (
            <li 
              key={lesson.id}
              className={`p-3 rounded-lg flex justify-between items-center cursor-pointer ${
                index === currentLessonIndex 
                  ? 'bg-primary/10 dark:bg-primary/20 border-l-4 border-primary' 
                  : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => setCurrentLessonIndex(index)}
            >
              <div className="flex items-center">
                <span className={`material-symbols-rounded mr-3 ${
                  index < currentLessonIndex ? 'text-green-500' : ''
                }`}>
                  {index < currentLessonIndex ? 'check_circle' : 'play_circle'}
                </span>
                <div>
                  <h4 className="font-medium">Lesson {index + 1}: {lesson.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{lesson.duration}</p>
                </div>
              </div>
              
              {index === currentLessonIndex && (
                <span className="text-xs bg-primary text-white px-2 py-1 rounded">
                  Current
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}