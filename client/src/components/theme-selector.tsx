import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Palette, Moon, Sun, Heart } from "lucide-react";

interface ThemeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const THEME_OPTIONS = [
  {
    id: "default",
    name: "Default Theme",
    description: "Traditional green and white theme",
    colors: {
      primary: "#16a34a",
      secondary: "#84cc16",
      accent: "#059669",
      background: "#ffffff",
      foreground: "#020817"
    }
  },
  {
    id: "women",
    name: "Rose Theme",
    description: "Soft and elegant rose-themed design",
    colors: {
      primary: "#e11d48",
      secondary: "#f43f5e",
      accent: "#fb7185",
      background: "#fef2f2",
      foreground: "#1f2937"
    }
  },
  {
    id: "purple",
    name: "Lavender Theme",
    description: "Calming purple and lavender tones",
    colors: {
      primary: "#9333ea",
      secondary: "#a855f7",
      accent: "#c084fc",
      background: "#faf5ff",
      foreground: "#1e1b4b"
    }
  },
  {
    id: "ocean",
    name: "Ocean Theme",
    description: "Peaceful blue ocean colors",
    colors: {
      primary: "#0ea5e9",
      secondary: "#38bdf8",
      accent: "#7dd3fc",
      background: "#f0f9ff",
      foreground: "#0c4a6e"
    }
  }
];

export default function ThemeSelector({ open, onOpenChange }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState(() => {
    return localStorage.getItem("app-theme") || "default";
  });

  const applyTheme = (themeId: string) => {
    const theme = THEME_OPTIONS.find(t => t.id === themeId);
    if (!theme) return;
    
    const root = document.documentElement;
    
    // Convert hex to HSL
    const hexToHSL = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;
      
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
          case g: h = ((b - r) / d + 2) / 6; break;
          case b: h = ((r - g) / d + 4) / 6; break;
        }
      }
      
      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };
    
    // Apply theme colors
    root.style.setProperty('--primary', hexToHSL(theme.colors.primary));
    root.style.setProperty('--secondary', hexToHSL(theme.colors.secondary));
    root.style.setProperty('--accent', hexToHSL(theme.colors.accent));
    root.style.setProperty('--background', hexToHSL(theme.colors.background));
    root.style.setProperty('--foreground', hexToHSL(theme.colors.foreground));
    
    // Save to localStorage
    localStorage.setItem("app-theme", themeId);
    setSelectedTheme(themeId);
  };

    const root = document.documentElement;
    
    // Apply theme colors as CSS variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (key === 'primary') {
        // Convert hex to HSL for shadcn compatibility
        const hsl = hexToHSL(value);
        root.style.setProperty('--primary', hsl);
      } else if (key === 'background') {
        const hsl = hexToHSL(value);
        root.style.setProperty('--background', hsl);
      } else if (key === 'foreground') {
        const hsl = hexToHSL(value);
        root.style.setProperty('--foreground', hsl);
      } else if (key === 'accent') {
        const hsl = hexToHSL(value);
        root.style.setProperty('--accent', hsl);
      } else if (key === 'secondary') {
        const hsl = hexToHSL(value);
        root.style.setProperty('--secondary', hsl);
      }
    });

    // Save theme preference
    localStorage.setItem("app-theme", themeId);
    setSelectedTheme(themeId);
  };

  const hexToHSL = (hex: string): string => {
    // Remove the # if present
    hex = hex.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }
    
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Choose Your Theme
          </DialogTitle>
          <DialogDescription>
            Personalize your app experience with a theme that suits you
          </DialogDescription>
        </DialogHeader>
        
        <RadioGroup value={selectedTheme} onValueChange={applyTheme}>
          <div className="space-y-3">
            {THEME_OPTIONS.map((theme) => (
              <div key={theme.id} className="flex items-start space-x-3">
                <RadioGroupItem value={theme.id} id={theme.id} />
                <Label htmlFor={theme.id} className="flex-1 cursor-pointer">
                  <div className="font-medium">{theme.name}</div>
                  <div className="text-sm text-gray-500">{theme.description}</div>
                  <div className="flex gap-2 mt-2">
                    {Object.entries(theme.colors).slice(0, 4).map(([key, color]) => (
                      <div
                        key={key}
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
        
        <div className="mt-4 flex justify-end">
          <Button onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}