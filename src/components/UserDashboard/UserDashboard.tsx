"use client";
import React, { useState } from "react";
import UserProfile from "../UserProfile/UserProfile";

const UserDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("My Info");

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  let content;
  switch (selectedOption) {
    case "My Info":
      content = <UserProfile />;
      break;
    case "Messages":
      content = "This is Messages";
      break;
    case "Publications":
      content = "My Publications";
      break;
    case "Notification Settings":
      content = "This is Notification Settings";
      break;
    case "Password And Security":
      content = "This is Password And Security";
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
              selectedOption === "My Info" && "text-[#3C65F5]"
            }`}
            onClick={() => handleOptionClick("My Info")}>
            My Info
          </div>
          <div
            className={`cursor-pointer border-l pb-2 pt-2 pl-4 text-[#05264E] ${
              selectedOption === "Messages" && "text-[#3C65F5]"
            }`}
            onClick={() => handleOptionClick("Messages")}>
            Messages
          </div>
          <div
            className={`cursor-pointer border-l pb-2 pt-2 pl-4 text-[#05264E] ${
              selectedOption === "Publications" && "text-[#3C65F5]"
            }`}
            onClick={() => handleOptionClick("Publications")}>
            Publications
          </div>
          <div
            className={`cursor-pointer border-l pb-2 pt-2 pl-4 text-[#05264E] ${
              selectedOption === "Notification Settings" && "text-[#3C65F5]"
            }`}
            onClick={() => handleOptionClick("Notification Settings")}>
            Notification Settings
          </div>
          <div
            className={`cursor-pointer border-l pb-2 pt-2 pl-4 text-[#05264E] ${
              selectedOption === "Password And Security" && "text-[#3C65F5]"
            }`}
            onClick={() => handleOptionClick("Password And Security")}>
            Password And Security
          </div>
        </div>
      </div>
      <div className="relative float-right w-[70%]">{content}</div>
    </div>
  );
};

export default UserDashboard;
