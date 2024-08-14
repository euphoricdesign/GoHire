"use client";
import React, { useState } from "react";
import UserProfile from "../UserProfile/UserProfile";
import UserDashboardPublication from "../UserDashboardPublication/UserDashboardPublication";
import Notifications from "./Notifications";
import Invitations from "./Invitations";
import { useSearchParams } from "next/navigation";

const UserDashboardContent = () => {
  const params = useSearchParams();
  const prefferedTab = params.get("tab");
  const [selectedOption, setSelectedOption] = useState(prefferedTab || "my-info");
  const [selectedNotificationType, setSelectedNotificationType] = useState<string | null>(null);

  const handleOptionClick = (option: string, notificationType?: string) => {
    if (option === "HandleNotification" && notificationType) {
      if (notificationType === "SEND_APPLY_REQUEST") {
        setSelectedOption("publications");
      } else if (notificationType === "OFFER_JOB") {
        setSelectedOption("my-invitations");
      }
      setSelectedNotificationType(null);
    } else {
      setSelectedOption(option);
    }
  };

  let content;
  switch (selectedOption) {
    case "my-info":
      content = <UserProfile />;
      break;
    case "messages":
      content = <div className="text-lg mb-[350px]">You have no messages yet.</div>;
      break;
    case "publications":
      content = <UserDashboardPublication />;
      break;
    case "notifications":
      content = <Notifications handleOptionClick={handleOptionClick} notifications={[]} />;
      break;
    case "my-invitations":
      content = <Invitations />;
      break;
    default:
      content = "No content available";
  }

  return (
    <div className="px-[30px] sm:px-6 md:px-[124px] mt-[100px] sm:mt-12 md:mt-[100px] mb-8 sm:mb-12 md:mb-16 flex flex-col md:flex-row justify-start md:gap-[80px] mobile:gap-0 relative">
      <div className="w-full md:w-1/4 mb-8 md:mb-0">
        <div className="text-2xl sm:text-3xl font-bold text-[#05264E]">User Settings</div>
        <div className="flex flex-row md:flex-col mt-4 md:mt-10 font-bold overflow-x-auto md:overflow-x-visible">
          {/* Opciones de menú */}
          {["my-info", "messages", "publications", "notifications", "my-invitations"].map((option) => (
            <div
              key={option}
              className={`cursor-pointer border-l pb-2 pt-2 pl-4 text-[#05264E] whitespace-nowrap md:whitespace-normal ${
                selectedOption === option ? "text-[#3C65F5]" : ""
              }`}
              onClick={() => handleOptionClick(option)}>
              {option.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-3/4">{content}</div>
    </div>
  );
};

export default UserDashboardContent;
