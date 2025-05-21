import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import NotFound from "@/pages/not-found";

import Header from "@/components/layout/header";
import FooterNav from "@/components/layout/footer-nav";
import AIAssistantFAB from "@/components/ai-assistant-fab";

// Use React.lazy for code splitting
const Home = lazy(() => import("@/pages/home"));
const Read = lazy(() => import("@/pages/read"));
const SurahDetail = lazy(() => import("@/pages/surah-detail"));
const Learning = lazy(() => import("@/pages/learning"));
const Explore = lazy(() => import("@/pages/explore"));
const Profile = lazy(() => import("@/pages/profile"));
const LearningPlanDetail = lazy(() => import("@/pages/learn-plan-detail"));
const Bookmarks = lazy(() => import("@/pages/bookmarks"));
const ExploreCategory = lazy(() => import("@/pages/explore-category"));

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow pb-16">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full min-h-[50vh]">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2 text-gray-600 dark:text-gray-300">Loading...</span>
          </div>
        }>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/read" component={Read} />
            <Route path="/surah/:id" component={SurahDetail} />
            <Route path="/learn" component={Learning} />
            <Route path="/learn/plan/:id" component={LearningPlanDetail} />
            <Route path="/explore" component={Explore} />
            <Route path="/explore/:id" component={ExploreCategory} />
            <Route path="/profile" component={Profile} />
            <Route path="/bookmarks" component={Bookmarks} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </div>
      <FooterNav />
      <AIAssistantFAB />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="myquran-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
