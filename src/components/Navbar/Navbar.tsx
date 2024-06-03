"use client";

import { useEffect, useState } from "react";
import "../../utils/Navbar.css";
import { usePathname } from 'next/navigation'


interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  style?: React.CSSProperties & { "--i"?: number };
}

const Navbar: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const pathname = usePathname()
  console.log(pathname !== '/')

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header py-4 md:px-[124px] mobile:px-[30px] ${scrollPosition > 0 ? "scrolled" : ""}`}>
      <div className="flex items-center">
        <a href="#" className="logo mr-10">
          Logo
        </a>

        <input type="checkbox" id="check" />
        <label htmlFor="check" className="icons">
          <i id="menu-icon" className="icon">
            &#9776;
          </i>
          <i id="close-icon" className="icon">
            &#10005;
          </i>
        </label>
        <nav className="navbar">
          <a className="text-sm" href="/" style={{ "--i": 0 }} {...({} as AnchorProps)}>
            Home
          </a>
          <a className="text-sm" href="/users" style={{ "--i": 1 }} {...({} as AnchorProps)}>
            Users
          </a>
          <a className="text-sm" href="/jobs" style={{ "--i": 3 }} {...({} as AnchorProps)}>
            Jobs
          </a>
          <a className="text-sm" href="#" style={{ "--i": 2 }} {...({} as AnchorProps)}>
            Blog
          </a>
          <a className="text-sm" href="#" style={{ "--i": 3 }} {...({} as AnchorProps)}>
            Contact
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <div className="hidden md:flex md:items-center active:text-[#3C65F5]">
          <a className={`text-gray-600`}>Sign in</a>{" "}
          <div
            className={`w-px h-4 bg-gray-600 mx-1.5`}></div>{" "}
          <a className={`text-gray-600`}>Dashboard</a>
        </div>
        <button className="mt-0 mb-5 text-sm border-none w-28 p-2.5 h-10 rounded text-white font-medium bg-[#3C65F5] cursor-pointer transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-80 md:mb-0 md:block hidden" onClick={() => window.location.href = '/formJobs'}>
          Post a job
        </button>
      </div>
    </header>
  );
};

export default Navbar;
