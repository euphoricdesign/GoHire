"use client";
import React, { useState } from "react";
import Image from "next/image";
import { GoHeartFill } from "react-icons/go";
import { IUser } from "@/types";

interface TruncateTextParams {
  text: string;
  maxLength: number;
}

const truncateText = ({ text, maxLength }: TruncateTextParams): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
};

const UserCard = ({
  profileImg,
  name,
  lastName,
  country,
  city,
  description,
  professions,
  onClick,
}: IUser & { onClick: () => void }) => {
  const [FavClicked, setFavClicked] = useState(false);

  const handleFavClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setFavClicked(!FavClicked);
  };

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const truncatedDescription = truncateText({ text: description, maxLength: 100 });

  return (
    <div className="cursor-pointer bg-[ghostwhite] mobile:w-full md:w-[25.8rem]" onClick={onClick}>
      <div className="flex items-center justify-between md:w-[25.8rem] flex-col shadow-md transition-all duration-300 border rounded-xl mobile:w-full">
        <div className="w-full border-b border-gray-300">
          <div className="flex justify-between w-full p-5">
            <div className="flex flex-col justify-between">
              <div className="flex items-center">
                <button
                  onClick={handleButtonClick}
                  className="bg-white border mr-2 w-28 text-[#3C65F5] border-slate-300 font-medium py-2 px-4 rounded-xl hover:bg-[#93B4FF] transition-all duration-300">
                  Message
                </button>
                <button
                  onClick={handleButtonClick}
                  className="bg-[#3C65F5] text-white text-center px-5 py-2 rounded-xl mr-2 hover:opacity-80 transition-all duration-300">
                  Hire
                </button>
                {FavClicked ? (
                  <button onClick={handleFavClick} className="transition-all duration-300 mobile:hidden md:block">
                    <GoHeartFill className="text-red-500 bg-white hover:text-red-600 transition-all duration-300 size-10 border-2 p-1 border-red-500 rounded-full" />
                  </button>
                ) : (
                  <button onClick={handleFavClick} className="transition-all duration-300 mobile:hidden md:block">
                    <GoHeartFill className="text-[#3C65F5] bg-white hover:bg-[#D5E2FF] transition-all duration-300 size-10 border-2 p-1 border-[#3C65F5] rounded-full" />
                  </button>
                )}
              </div>
              <div className="">
                <span className="text-lg font-bold">
                  {name} {lastName}
                </span>
                <span>
                  - {city}, {country}
                </span>
              </div>
            </div>
            <div>
              <Image
                className="rounded-full p-[1px] border-2 border-[#3C65F5]"
                src={profileImg}
                alt="perfil"
                width={80}
                height={80}
              />
            </div>
          </div>
          <div className="px-5">
            <p className="text-sm leading-5 mt-1 mb-4">{truncatedDescription}</p>
          </div>
        </div>
        <div className="flex flex-col justify-around p-[10px] font-bold rounded-b-md md:h-[4rem] mobile:h-[6rem] w-full ">
          <div>
            <ul className="list-none text-sm flex flex-wrap">
              {professions.map((profession, index) => (
                <li key={index} className="border border-slate-300 rounded-lg inline-block m-1 p-1">
                  {profession}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 rounded-b-full"></div>
    </div>
  );
};

export default UserCard;
