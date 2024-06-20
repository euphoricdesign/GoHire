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
  console.log(prefferedTab, "esto es prefferedtab");
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
      content = "This is Messages";
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
    <div className="px-[124px] my-[100px] justify-start gap-[80px] flex relative">
      <div className="relative float-left w-[20%]">
        <div className="text-3xl font-bold text-[#05264E]">User Settings</div>
        <div className="flex flex-col mt-10 font-bold">
          <div
            className={`cursor-pointer border-l pb-2 pt-2 pl-4 text-[#05264E] ${
              selectedOption === "my-info" && "text-[#3C65F5]"
            }`}
            onClick={() => handleOptionClick("my-info")}>
            My Info
          </div>
          <div
            className={`cursor-pointer border-l pb-2 pt-2 pl-4 text-[#05264E] ${
              selectedOption === "messages" && "text-[#3C65F5]"
            }`}
            onClick={() => handleOptionClick("messages")}>
            Messages
          </div>
          <div
            className={`cursor-pointer border-l pb-2 pt-2 pl-4 text-[#05264E] ${
              selectedOption === "publications" && "text-[#3C65F5]"
            }`}
            onClick={() => handleOptionClick("publications")}>
            Publications
          </div>
          <div
            className={`cursor-pointer border-l pb-2 pt-2 pl-4 text-[#05264E] ${
              selectedOption === "notifications" && "text-[#3C65F5]"
            }`}
            onClick={() => handleOptionClick("notifications")}>
            Notifications
          </div>
          <div
            className={`cursor-pointer border-l pb-2 pt-2 pl-4 text-[#05264E] ${
              selectedOption === "my-invitations" && "text-[#3C65F5]"
            }`}
            onClick={() => handleOptionClick("my-invitations")}>
            My Invitations
          </div>
        </div>
      </div>
      <div className="relative float-right w-[70%]">{content}</div>
    </div>
  );
};

export default UserDashboardContent;
