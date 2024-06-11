"use client";

import { useEffect, useState } from "react";
import "../../utils/Navbar.css";
import { usePathname } from "next/navigation";
import LoginButton from "@/app/api/auth/LoginButton";
import { useUser } from "@auth0/nextjs-auth0/client";
import LogOutButton from "@/app/api/auth/LogoutButton";
import { usePostUserMutation } from "@/lib/services/userApi";
import { userPostData } from "@/types/userTypes";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetail, clearUserDetail, selectUserDetail } from "@/lib/features/slices/userSlice";
import Link from "next/link";
import ThemeButtons from "./ThemeButtons";

interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  style?: React.CSSProperties & { "--i"?: number };
}

const Navbar: React.FC = () => {
  const { user, error, isLoading } = useUser();
  const [postUser] = usePostUserMutation();
  const dispatch = useDispatch();
  const userDetail = useSelector(selectUserDetail);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const postUserData = async () => {
      if (user && !userDetail) {
        console.log("No userDetail found, posting user data");
        const userData: userPostData = {
          name: user.name || "",
          email: user.email || "",
          email_verified: user.email_verified || false,
          nickname: user.nickname || "",
          picture: user.picture || "",
        };

        try {
          const result = await postUser(userData).unwrap();
          console.log("User data posted successfully, result:", result);
          dispatch(setUserDetail(result));
        } catch (error) {
          console.error("Failed to post user data:", error);
        }
      } else if (!user) {
        console.log("User is not logged in, clearing userDetail");
        dispatch(clearUserDetail());
      }
    };

    postUserData();
  }, [user, postUser, dispatch, userDetail]);

  useEffect(() => {
    console.log("Current userDetail:", userDetail);
  }, [userDetail]);

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
    <header
      className={`header py-4 xl:px-[124px] md:px-[60px] mobile:px-[30px] ${
        scrollPosition > 0 ? "scrolled" : ""
      }`}>
      <div className="flex items-center">
        <a href="/" className="logo mr-10">
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
          <a className="text-sm" href="/users" style={{ "--i": 1 } as AnchorProps}>
            Users
          </a>
          <a className="text-sm" href="/jobs" style={{ "--i": 3 } as AnchorProps}>
            Jobs
          </a>
          <a className="text-sm" href="#" style={{ "--i": 2 } as AnchorProps}>
            Blog
          </a>
          <a className="text-sm" href="#" style={{ "--i": 3 } as AnchorProps}>
            Contact
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <div className="hidden md:flex md:items-center active:text-[#3C65F5]">
          {user ? <LogOutButton /> : <LoginButton />}
          <div className={`w-px h-4 bg-[#05264E] mx-1.5`}></div>
          <Link href={"http://localhost:3000/dashboard"}>
            <div className={`text-[#05264E]`}>Dashboard</div>
          </Link>
        </div>
        <button
          className="mt-0 mb-5 text-sm border-none w-28 p-2.5 h-10 rounded text-white font-medium dark:bg-black bg-[#3C65F5] cursor-pointer transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-80 md:mb-0 md:block hidden"
          onClick={() => (window.location.href = "/formJobs")}>
          Post a job
        </button>
      </div>
      <ThemeButtons />
    </header>
  );
};

export default Navbar;
