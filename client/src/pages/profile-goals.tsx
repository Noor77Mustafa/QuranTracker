import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Target, BookOpen, Clock, Star, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function ProfileGoals() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [pagesPerDay, setPagesPerDay] = useState(1);
  const [minutesPerDay, setMinutesPerDay] = useState(15);
  const [completionTarget, setCompletionTarget] = useState("");

  // Create or update reading goal
  const saveGoal = useMutation({
    mutationFn: async (goalData: { pagesPerDay: number; minutesPerDay: number; completionTarget?: string }) => {
      const response = await fetch("/api/reading-goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(goalData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to save goal");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Goal Saved",
        description: "Your reading goal has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/reading-goals", user?.id] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save your reading goal. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSaveGoal = () => {
    if (!user) return;
    
    saveGoal.mutate({
      pagesPerDay,
      minutesPerDay,
      completionTarget: completionTarget || undefined,
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reading Goals</h1>
          <p className="text-gray-600 dark:text-gray-400">Set and track your Quran reading goals</p>
        </div>
      </div>

      {/* Current Progress Overview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-primary" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">pages today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">day streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">total sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">0</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">total pages</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goal Setting */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-primary" />
            Set Your Reading Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pages">Pages per Day</Label>
              <Input
                id="pages"
                type="number"
                min="1"
                max="50"
                value={pagesPerDay}
                onChange={(e) => setPagesPerDay(parseInt(e.target.value) || 1)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Recommended: 1-5 pages daily for consistent progress
              </p>
            </div>
            
            <div>
              <Label htmlFor="minutes">Minutes per Day</Label>
              <Input
                id="minutes"
                type="number"
                min="5"
                max="120"
                value={minutesPerDay}
                onChange={(e) => setMinutesPerDay(parseInt(e.target.value) || 15)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Recommended: 15-30 minutes daily for meaningful reflection
              </p>
            </div>
          </div>
          
          <div>
            <Label htmlFor="target">Completion Target (Optional)</Label>
            <Input
              id="target"
              placeholder="e.g., Complete Surah Al-Baqarah in 30 days"
              value={completionTarget}
              onChange={(e) => setCompletionTarget(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Set a specific milestone to work towards
            </p>
          </div>
          
          <Button
            onClick={handleSaveGoal}
            disabled={saveGoal.isPending}
            className="w-full"
          >
            {saveGoal.isPending ? "Saving..." : "Save Goal"}
          </Button>
        </CardContent>
      </Card>

      {/* Motivational Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Tips for Success
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Clock className="h-4 w-4 mt-1 text-primary" />
              <div>
                <p className="font-medium">Consistency Over Quantity</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Reading a little each day is better than reading a lot once in a while
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Calendar className="h-4 w-4 mt-1 text-primary" />
              <div>
                <p className="font-medium">Set a Fixed Time</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose a specific time each day for your Quran reading
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Target className="h-4 w-4 mt-1 text-primary" />
              <div>
                <p className="font-medium">Start Small</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Begin with achievable goals and gradually increase your target
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}