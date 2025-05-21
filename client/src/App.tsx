import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Header from "@/components/layout/header";
import FooterNav from "@/components/layout/footer-nav";
import AIAssistantFAB from "@/components/ai-assistant-fab";

import Home from "@/pages/home";
import Read from "@/pages/read";
import SurahDetail from "@/pages/surah-detail";
import Learning from "@/pages/learning";
import Explore from "@/pages/explore";
import Profile from "@/pages/profile";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow pb-16">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/read" component={Read} />
          <Route path="/surah/:id" component={SurahDetail} />
          <Route path="/learn" component={Learning} />
          <Route path="/explore" component={Explore} />
          <Route path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <FooterNav />
      <AIAssistantFAB />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
