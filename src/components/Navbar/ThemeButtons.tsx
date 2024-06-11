import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const ThemeButtons = () => {
  const [theme, setTheme] = useState<string>("light");
  const iconRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) setTheme(storedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    theme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "ligth" : "dark");
  };

  const toggleEfect = () => {
    if (theme === "dark") {
      buttonRef.current!.style.animation =
        "activating-dark-mode 300ms linear 1 forwards";
      iconRef.current!.style.animation =
        "moon-effect-icon 290ms linear infinite";
      setTimeout(() => {
        toggleTheme();
      }, 320);
    } else {
      buttonRef.current!.style.animation =
        "desactivating-dark-mode 300ms linear 1 forwards";
      iconRef.current!.style.animation =
        "sun-effect-icon 800ms linear infinite";
      setTimeout(() => {
        toggleTheme();
      }, 320);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2">
      {theme === "dark" ? (
        <div className="pr-[0.1em] py-[1.1rem] bg-theme_dark-box-second border-2 border-theme_dark-sup-pink flex justify-between items-center w-20 h-8 rounded-full overflow-hidden">
          <Image
            className="relative left-1 top-[0.15em] z-10"
            ref={iconRef}
            width={30}
            height={30}
            src={"/moon-icon.svg"}
            alt="dark-theme-icon"
          />
          <button
            aria-label="switch-theme-btn"
            onClick={toggleEfect}
            ref={buttonRef}
            className="duration-400 bg-[#3C65F5] hover:bg-[#4d4dff73] hover:duration-200 m-[1px] rounded-full  h-7 w-7 z-20"
          ></button>
        </div>
      ) : (
        <div className="border-2 border-[#4d4dffbf] pr-[0.1em] py-[1rem] bg-[#ececec2d] flex justify-between items-center w-20  h-7 rounded-full overflow-hidden">
          <button
            aria-label="switch-theme-btn"
            onClick={toggleEfect}
            ref={buttonRef}
            className="duration-400 hover:duration-200 bg-[#3C65F5] hover:bg-[#4d4dff73] rounded-full h-7 w-7 m-[2px] z-20"
          ></button>
          <Image
            width={30}
            height={30}
            ref={iconRef}
            src={"/sun-icon.svg"}
            alt="light-theme-icon"
          />
        </div>
      )}
    </div>
  );
};

export default ThemeButtons;
