import { useEffect, useState } from "react";

const ThemeButtons = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "ligth" : "dark");
    console.log(theme);
    console.log("pepe");
  };

  return (
    <div className="bg-black text-white p-4 rounded-full">
      {theme === "dark" ? (
        <button aria-label="switch-theme-btn" onClick={toggleTheme}>
          dark
        </button>
      ) : (
        <button aria-label="switch-theme-btn" onClick={toggleTheme}>
          light
        </button>
      )}
    </div>
  );
};

export default ThemeButtons;
