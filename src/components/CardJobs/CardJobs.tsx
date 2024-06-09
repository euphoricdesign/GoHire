"use client";
import React, { useState } from "react";
import RetractableView from "../RetractableView/RetractableView";
import { JobsData } from "@/types/jobsTypes";

const CardJobs = ({
  id,
  title,
  description,
  image,
  date,
  time,
  timelapse,
  category,
  user,
  onClick,
}: JobsData & { onClick: () => void }) => {
  return (
    <div className="relative bg-[#f2f6fd] rounded-lg">
      <div
        onClick={onClick}
        className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 h-full cursor-pointer">
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
        <div className="sm:flex sm:flex-col sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-bold text-[#05264E] sm:text-xl">{title}</h3>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#05264E] sm:text-xl">{description}</h3>
          </div>
          <div className="flex flex-col-reverse">
            <dd className="text-xs text-gray-500">Posted {timelapse} ago</dd>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-pretty text-sm text-gray-500">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default CardJobs;
