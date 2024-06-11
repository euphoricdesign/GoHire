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
    <div className="px-[124px] my-[100px] justify-between flex relative">
      <div className="relative float-left w-[20%]">
        <div className="text-3xl font-bold">User Settings</div>
        <div className="flex flex-col mt-10 font-bold">
          <div
            className={`cursor-pointer border-l pb-2 pt-2 pl-4 ${
              selectedOption === "My Info" && "text-blue-500"
            }`}
            onClick={() => handleOptionClick("My Info")}>
            My Info
          </div>
          <div
            className={`cursor-pointer border-l pb-2 pt-2 pl-4 ${
              selectedOption === "Messages" && "text-blue-500"
            }`}
            onClick={() => handleOptionClick("Messages")}>
            Messages
          </div>
          <div
            className={`cursor-pointer border-l pb-2 pt-2 pl-4 ${
              selectedOption === "Publications" && "text-blue-500"
            }`}
            onClick={() => handleOptionClick("Publications")}>
            Publications
          </div>
          <div
            className={`cursor-pointer border-l pb-2 pt-2 pl-4 ${
              selectedOption === "Notification Settings" && "text-blue-500"
            }`}
            onClick={() => handleOptionClick("Notification Settings")}>
            Notification Settings
          </div>
          <div
            className={`cursor-pointer border-l pb-2 pt-2 pl-4 ${
              selectedOption === "Password And Security" && "text-blue-500"
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
