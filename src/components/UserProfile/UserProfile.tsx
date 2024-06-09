"use client";
import React, { useState } from "react";

const UserProfile = () => {
  const [selectedOption, setSelectedOption] = useState("My Info");

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  let content;
  switch (selectedOption) {
    case "My Info":
      content = "This is My Info";
      break;
    case "Messages":
      content = "This is Messages";
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
    <div className="md:mx-24 my-5 mt-24 flex relative">
      <div className="relative float-left w-[30%]">
        <div className="text-3xl font-bold">Settings</div>
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

export default UserProfile;
