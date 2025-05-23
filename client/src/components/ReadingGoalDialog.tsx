import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ReadingGoalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSaveGoal: (goal: {
    pagesPerDay: number;
    minutesPerDay: number;
    completionTarget?: string;
  }) => void;
  currentGoal?: {
    pagesPerDay: number;
    minutesPerDay: number;
    completionTarget?: string;
  };
}

export default function ReadingGoalDialog({ 
  open, 
  setOpen, 
  onSaveGoal, 
  currentGoal 
}: ReadingGoalProps) {
  const [pagesPerDay, setPagesPerDay] = useState<number>(currentGoal?.pagesPerDay || 5);
  const [minutesPerDay, setMinutesPerDay] = useState<number>(currentGoal?.minutesPerDay || 15);
  const [completionTarget, setCompletionTarget] = useState<string>(currentGoal?.completionTarget || "none");
  
  const { toast } = useToast();
  
  const handleSave = () => {
    const goalData = {
      pagesPerDay,
      minutesPerDay,
      completionTarget: completionTarget === "none" ? undefined : completionTarget
    };
    
    onSaveGoal(goalData);
    
    toast({
      title: "Goal saved successfully",
      description: "Your reading goal has been updated"
    });
    
    setOpen(false);
  };
  
  useEffect(() => {
    // Reset form values when dialog opens or currentGoal changes
    if (open) {
      setPagesPerDay(currentGoal?.pagesPerDay || 5);
      setMinutesPerDay(currentGoal?.minutesPerDay || 15);
      setCompletionTarget(currentGoal?.completionTarget || "none");
    }
  }, [open, currentGoal]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Reading Goal</DialogTitle>
          <DialogDescription>
            Set daily targets to help you stay consistent with your Quran reading.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pagesPerDay" className="text-right">
              Pages per day
            </Label>
            <Input
              id="pagesPerDay"
              type="number"
              value={pagesPerDay}
              onChange={(e) => setPagesPerDay(parseInt(e.target.value) || 1)}
              min={1}
              max={50}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="minutesPerDay" className="text-right">
              Minutes per day
            </Label>
            <Input
              id="minutesPerDay"
              type="number"
              value={minutesPerDay}
              onChange={(e) => setMinutesPerDay(parseInt(e.target.value) || 5)}
              min={5}
              max={120}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="completionTarget" className="text-right">
              Target date
            </Label>
            <Select 
              value={completionTarget} 
              onValueChange={setCompletionTarget}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="No specific target" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No specific target</SelectItem>
                <SelectItem value="Ramadan">By next Ramadan</SelectItem>
                <SelectItem value="3_months">In 3 months</SelectItem>
                <SelectItem value="6_months">In 6 months</SelectItem>
                <SelectItem value="1_year">In 1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}