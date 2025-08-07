import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { currentTheme, setTheme, themes } = useTheme();

  const themeColors = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500', 
    green: 'bg-green-500'
  };

  return (
    <div className="flex items-center space-x-2">
      <Palette className="h-4 w-4 text-muted-foreground" />
      <div className="flex space-x-1">
        {themes.map((theme) => (
          <Button
            key={theme}
            variant={currentTheme === theme ? "default" : "outline"}
            size="sm"
            className={`w-8 h-8 p-0 ${themeColors[theme as keyof typeof themeColors]} hover:scale-110 transition-transform`}
            onClick={() => setTheme(theme)}
          >
            <span className="sr-only">{theme} theme</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ThemeToggle;