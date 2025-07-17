import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="outline" onClick={toggle}>
      Switch to {theme === "dark" ? "light" : "dark"} mode
    </Button>
  );
};

export default ThemeToggle;
