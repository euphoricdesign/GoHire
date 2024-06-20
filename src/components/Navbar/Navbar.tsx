"use client";

import { useEffect, useRef, useState } from "react";
import LoginButton from "@/app/api/auth/LoginButton";
import LogOutButton from "@/app/api/auth/LogoutButton";
import {
  MdOutlineLightMode,
  MdKeyboardArrowDown,
  MdOutlineSpaceDashboard,
  MdOutlineLogout,
  MdOutlineLogin,
} from "react-icons/md";
import User from "../../../public/user.svg";
import Image from "next/image";
import Link from "next/link";
import Toastify from "toastify-js";
import { useRouter } from "next/navigation";
import Logo from "../../../public/searchLogo.svg";
import { useAuth } from "@/providers/AuthProvider";
import "../../utils/Navbar.css";
import { IoMdNotifications } from "react-icons/io";
import { useGetNotificationsMeQuery } from "@/lib/services/userApi";

import { useGetUserMeQuery } from "@/lib/services/userApi";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  style?: React.CSSProperties & { "--i"?: number };
}

const Navbar: React.FC = () => {
  const {
    data: notifications,
    isLoading: notificationsLoading,
    isError,
  } = useGetNotificationsMeQuery(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [notificationsModal, setNotificationsModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const currentClickRef = useRef<EventTarget | null>(null);
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const { data, isFetching } = useGetUserMeQuery(null);
  const role = useSelector((state: RootState) => state.user.userDetail?.role)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current?.contains(event.target as Node) && // Operador de aserción de tipo as Node para asegurarnos de que event.target sea un nodo del DOM. Es necesario porque event.target puede ser null
        event.target !== currentClickRef.current
      ) {
        handleCloseModal();
        handleCloseNotifications();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShowNotifications = (event: React.MouseEvent<HTMLElement>) => {
    currentClickRef.current = event.target;
    setNotificationsModal((prevShowNotification) => !prevShowNotification);
  };

  const handleCloseNotifications = () => {
    setNotificationsModal(false);
  };

  const handleShowModal = (event: React.MouseEvent<HTMLElement>) => {
    currentClickRef.current = event.target;
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePostAJob = () => {
    if (!user) {
      // Crear una instancia de notificación
      const myToast = Toastify({
        text: "You must be logged in to make a post",
        className: "toastify",
        position: "left",
        gravity: "bottom",
        duration: 999999999, // Duración muy grande para simular permanencia en pantalla
        close: true,
      });

      // Mostrar la notificación
      myToast.showToast();
    } else {
      router.push("/formJobs");
    }
  };

  const handleOptionClick = (option: string, notificationType?: string) => {
    if (option === "HandleNotification" && notificationType) {
      if (notificationType === "SEND_APPLY_REQUEST") {
        router.push("/dashboard?tab=publications");
        setNotificationsModal(false);
      } else if (notificationType === "OFFER_JOB") {
        router.push("/dashboard?tab=my-invitations");
        setNotificationsModal(false);
      }
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <header
      className={`header py-4 xl:px-[124px] md:px-[60px] mobile:px-[30px] ${
        scrollPosition > 0 ? "scrolled" : ""
      }`}>
      <div className="flex items-center">
        <div className="flex items-center">
          <Image className="w-[40px]" src={Logo} alt="" />
          <a href="/" className="logo mr-10">
            GoHire
          </a>
        </div>
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
            Talents
          </a>
          <a className="text-sm" href="/jobs" style={{ "--i": 3 } as AnchorProps}>
            Jobs
          </a>
          <a className="text-sm" href="/blog" style={{ "--i": 2 } as AnchorProps}>
            Blog
          </a>
          <a className="text-sm" href="/contact" style={{ "--i": 3 } as AnchorProps}>
            Contact
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <div className="hidden md:flex md:items-center active:text-[#3C65F5]">
          {isLoading ||
            (!user && (
              <div className="flex items-center gap-2">
                <MdOutlineLogin className="text-[#05264ebf] text-base font-light" />
                <LoginButton />
              </div>
            ))}
        </div>
        {role === "ADMIN" ? (
          <p></p>
        ): (
          <button
            className="mt-0 mb-5 text-sm border-none w-28 p-2.5 h-10 rounded text-white font-medium bg-[#3C65F5] cursor-pointer transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-80 md:mb-0 md:block hidden"
            onClick={handlePostAJob}>
            Post a job
          </button>
        )}
        {user && (
          <div>
            <div className="flex items-center">
              <Image
                onClick={handleShowModal}
                className="w-[40px] cursor-pointer border border-gray-300 rounded-full"
                src={User}
                alt=""
              />
              <button onClick={handleShowNotifications}>
                <IoMdNotifications
                  size={40}
                  className="text-[#3C65F5] p-[6px] bg-white border border-gray-300 rounded-full ml-2 cursor-pointer"
                />
              </button>
            </div>
            {showModal && (
              <div
                className="absolute top-[3.5rem] w-[16rem] bg-white gap-4 right-[125px] p-5 h-[22rem] rounded shadow-md"
                ref={modalRef}>
                <div>
                  <ul className="flex flex-col gap-3">
                    <li className="flex justify-center">
                      <Image
                        onClick={handleShowModal}
                        className="w-[80px] cursor-pointer"
                        src={User}
                        alt=""
                      />
                    </li>
                    <li className="flex flex-col items-center">
                      <h5 className="text-base font-medium text-[#05264E]">{user.name}</h5>
                      <span className="text-[#66789C]">Freelancer</span>
                    </li>

                    <li className="border-2 border-[#d9d9d9] mb-[10px] rounded-[10rem] flex gap-[1px]">
                      {/* 1px solid #0000 */}
                      <button className="bg-[#3C65F5] text-white border border-[#0000] flex-1 p-[10px] text-center leading-none font-[550] rounded-[10rem] transition-colors duration-300 max-h-[35px]">
                        {" "}
                        Invisible{" "}
                      </button>
                      <button className="border border-[#0000] flex-1 p-[10px] text-center leading-none font-[550] bg-white text-[#3C65F5] rounded-[10rem] transition-colors duration-300 max-h-[35px]">
                        {" "}
                        Online{" "}
                      </button>
                    </li>
                    <li onClick={handleCloseModal} className="flex justify-between">
                      <Link href="" className="text-[#05264E] flex items-center gap-2">
                        <MdOutlineLightMode className="text-base text-[#05264E]" /> Theme: Light
                        mode
                      </Link>
                      <MdKeyboardArrowDown className="text-base text-[#05264E]" />
                    </li>
                    <li onClick={handleCloseModal} className="flex items-center gap-2">
                      <MdOutlineSpaceDashboard className="text-[#05264E] text-base" />
                      <Link href={user ? "/dashboard" : ""} className="text-[#05264E]">
                        {user ? "Dashboard" : "Inicia sesión"}
                      </Link>
                    </li>
                    {user && (
                      <li onClick={handleCloseModal}>
                        <Link href="#" className="flex items-center gap-2">
                          <MdOutlineLogout className="text-[#05264E] text-base" />
                          <LogOutButton />
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
            {notificationsModal && (
              <div
                className="absolute top-[3.5rem] w-[16rem] bg-white gap-4 right-[125px] px-1 h-[22rem] rounded shadow-md"
                ref={modalRef}>
                <div className="flex flex-col items-center">
                  <h5 className="text-base font-medium text-[#05264E] mt-5">Your Notifications</h5>
                  {notifications && (
                    <div className="w-full">
                      <ul>
                        {notifications.map((notification) => (
                          <div
                            onClick={() =>
                              handleOptionClick("HandleNotification", notification.type)
                            }
                            key={notification.id}
                            className="border cursor-pointer border-gray-300 py-4 flex items-center justify-around hover:bg-[#93B4FF] transition-all duration-500">
                            <li>
                              <p>{notification.title}</p>
                              <p>{notification.date}</p>
                            </li>
                          </div>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
