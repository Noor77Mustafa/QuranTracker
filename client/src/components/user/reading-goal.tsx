import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ReadingGoalProps {
  currentGoal?: {
    id: number;
    userId: number;
    pagesPerDay: number;
    minutesPerDay: number;
    completionTarget?: string;
  };
  onGoalSet: (goal: { pagesPerDay: number; minutesPerDay: number; completionTarget?: string }) => void;
}

export default function ReadingGoal({ currentGoal, onGoalSet }: ReadingGoalProps) {
  const [open, setOpen] = useState(false);
  const [pagesPerDay, setPagesPerDay] = useState(currentGoal?.pagesPerDay || 5);
  const [minutesPerDay, setMinutesPerDay] = useState(currentGoal?.minutesPerDay || 15);
  const [completionTarget, setCompletionTarget] = useState<string>(currentGoal?.completionTarget || "");
  
  const { toast } = useToast();
  
  const handleSaveGoal = () => {
    onGoalSet({
      pagesPerDay,
      minutesPerDay,
      completionTarget: completionTarget || undefined
    });
    
    toast({
      title: "Reading goal saved",
      description: "Your daily reading goal has been updated."
    });
    
    setOpen(false);
  };
  
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Your Reading Goal</h3>
            {currentGoal ? (
              <p className="text-gray-600 dark:text-gray-300">
                {currentGoal.pagesPerDay} pages or {currentGoal.minutesPerDay} minutes daily
                {currentGoal.completionTarget && (
                  <span> · Target completion: {currentGoal.completionTarget}</span>
                )}
              </p>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                No reading goal set yet. Set a goal to track your progress.
              </p>
            )}
          </div>
          
          <Button onClick={() => setOpen(true)}>
            {currentGoal ? "Edit Goal" : "Set Goal"}
          </Button>
        </div>
      </div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentGoal ? "Edit Reading Goal" : "Set Reading Goal"}</DialogTitle>
            <DialogDescription>
              Set daily targets to help you stay consistent with your Quran reading.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="pages-per-day">Pages per day</Label>
              <Input
                id="pages-per-day"
                type="number"
                min="1"
                max="50"
                value={pagesPerDay}
                onChange={(e) => setPagesPerDay(parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="minutes-per-day">Minutes per day</Label>
              <Input
                id="minutes-per-day"
                type="number"
                min="5"
                max="120"
                value={minutesPerDay}
                onChange={(e) => setMinutesPerDay(parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="completion-target">Target completion date (optional)</Label>
              <Select value={completionTarget} onValueChange={setCompletionTarget}>
                <SelectTrigger id="completion-target">
                  <SelectValue placeholder="Select a target" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No specific target</SelectItem>
                  <SelectItem value="Ramadan">By next Ramadan</SelectItem>
                  <SelectItem value="3_months">In 3 months</SelectItem>
                  <SelectItem value="6_months">In 6 months</SelectItem>
                  <SelectItem value="1_year">In 1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveGoal}>
              Save Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}