import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme) || "light";
    setTheme(current);
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    const root = document.documentElement;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      root.classList.add("theme-transition");
      window.setTimeout(() => root.classList.remove("theme-transition"), 320);
    }

    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable */
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted
          ? `Switch to ${theme === "light" ? "dark" : "light"} theme`
          : "Toggle theme"
      }
      className="grid size-11 place-items-center rounded-[var(--radius-sm)] text-muted transition-colors hover:bg-surface-2 hover:text-text focus-visible:ring-2 focus-visible:ring-accent outline-none md:size-10"
    >
      {/* Both icons render always and stack in one grid cell; CSS (keyed on
          html[data-theme]) cross-fades + rotates the active one in. */}
      <Sun className="theme-icon theme-icon-sun size-5" aria-hidden="true" />
      <Moon className="theme-icon theme-icon-moon size-5" aria-hidden="true" />
    </button>
  );
}
