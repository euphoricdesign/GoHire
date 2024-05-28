"use client";
import React, { useState } from "react";
import Image from "next/image";
import { GoHeartFill } from "react-icons/go";
import { IUser } from "@/types";

const UserCard = ({ profileImg, name, lastName, country, city, description, skills }: IUser) => {
  const [FavClicked, setFavClicked] = useState(false);

  const handleFavClick = () => {
    setFavClicked(!FavClicked);
  };

  return (
    <div className="flex items-center justify-between w-80 flex-col m-4 shadow-2xl scale-90 hover:scale-95 transition-all duration-300">
      <div className="bg-[#5055C3] rounded-t-md text-slate-100 pt-2 pb-2 relative w-full text-center h-[26rem] flex flex-col justify-around">
        <div className="flex justify-end px-5 mt-2">
          <Image
            className="rounded-full h-52 w-52 p-2 border-2 border-slate-400"
            src={profileImg}
            alt="perfil"
            width={200}
            height={200}
          />
          <span>
            {FavClicked ? (
              <button
                onClick={handleFavClick}
                className="bg-white pt-1 px-1 pb-[2px] rounded-full border-2 border-red-500 hover:border-red-600 transition-all duration-300">
                <GoHeartFill
                  size={30}
                  className="text-red-500 hover:text-red-600 transition-all duration-300"
                />
              </button>
            ) : (
              <button
                onClick={handleFavClick}
                className="bg-white pt-1 px-1 pb-[2px] rounded-full border-2 border-indigo-900 hover:border-indigo-300 transition-all duration-300">
                <GoHeartFill
                  size={30}
                  className="text-indigo-600 hover:text-indigo-600 transition-all duration-300"
                />
              </button>
            )}
          </span>
        </div>
        <h3 className="font-bold text-lg text-white my-1">
          {name} {lastName}
        </h3>
        <h6 className="text-white font-bold">
          {city}, {country}
        </h6>
        <p className="text-sm	leading-5 text-white mt-1 mb-4">{description}</p>
        <div className="">
          <button className="bg-white border mr-2 w-28 text-indigo-600 border-slate-300 font-medium py-2 px-4 rounded hover:bg-[#A1ABFF] transition-all duration-300">
            Message
          </button>
          <button className="bg-transparent border w-28 border-slate-100 font-medium py-2 px-6 rounded text-slate-100 hover:bg-indigo-300 transition-all duration-300">
            Hire
          </button>
        </div>
      </div>
      <div className="bg-[#4347A4] px-4 py-2 font-bold rounded-b-md h-28 w-full text-slate-100 border-t border-slate-100">
        <h6 className="text-center">Skills</h6>
        <div className="overflow-auto h-[5rem]">
          <ul className="list-none m-0 p-0 text-sm flex flex-wrap">
            {skills.map((skill, index) => (
              <li key={index} className="border border-slate-300 rounded-lg inline-block m-1 p-1">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
