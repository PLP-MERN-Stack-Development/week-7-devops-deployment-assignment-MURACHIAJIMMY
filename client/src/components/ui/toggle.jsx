import { useTheme } from "@/hooks/useTheme"; // ← this hook uses your ThemeContext

function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded transition-colors"
      title="Toggle dark mode"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}
export { ModeToggle };
