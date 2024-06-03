"use client";
import React, { useState } from "react";
import { IJobPost } from "@/types";
import { usersPreload } from "@/utils/users";

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

const CardJobs = ({
  title,
  description,
  professions,
  userId,
  readingTime,
  onClick,
}: IJobPost & { onClick: () => void }) => {
  const user = usersPreload.find((user) => user.id === userId);

  const truncatedDescription = truncateText({ text: description, maxLength: 150 });

  return (
    <div className="relative bg-[ghostwhite]" onClick={onClick}>
      <div className="relative block overflow-hidden rounded-lg border border-gray-100 h-full cursor-pointer">
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
        <div className="border-b border-gray-300 md:p-5 p-4">
          <div className="sm:flex sm:flex-col sm:justify-between sm:gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">{title}</h3>
              </div>
              <button className="bg-[#5049e5] text-sm text-white text-center px-3 py-2 rounded-xl mr-2 hover:opacity-80 transition-all duration-300">
                Apply Now
              </button>
            </div>
            <div className="flex flex-col-reverse">
              <dd className="text-xs text-gray-500">
                <p>Posted {readingTime} ago</p>
                <p>
                  by{" "}
                  <span className="font-bold">
                    {user ? `${user.name} ${user.lastName}` : userId}
                  </span>
                </p>
              </dd>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-pretty text-sm text-gray-500">{truncatedDescription}</p>
          </div>
        </div>
        <div className="p-[10px]">
          <div className="text-center font-bold text-sm">
            <p>Looking for:</p>
          </div>
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
  );
};

export default CardJobs;
