"use client";
import React from "react";
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
  onEdit, // Prop para la función onEdit
  isEditable = false, // Prop para indicar si el componente es editable, por defecto es false
}: JobsData & { onClick: () => void; onEdit?: () => void; isEditable?: boolean }) => {
  console.log("userJobsCard:", user);

  return (
    <div className="relative bg-[#f2f6fd] rounded-lg">
      <div
        onClick={onClick}
        className="relative block overflow-hidden rounded-lg border border-gray-100 h-full cursor-pointer"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
        <div className="sm:flex sm:flex-col sm:justify-between sm:gap-4 px-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#05264E] sm:text-xl">{title}</h3>
            {isEditable && onEdit && (
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                className="bg-[#ec8d2f] text-white text-center text-sm px-2 py-2 rounded-xl hover:opacity-80 transition-all duration-300"
              >
                Edit
              </button>
            )}
            {!isEditable && !onEdit && (
              <div className="bg-[#3C65F5] text-white text-center text-sm px-2 py-2 rounded-xl hover:opacity-80 transition-all duration-300">
              Apply Now
            </div>
          )}
          </div>
          <div className="flex flex-col text-xs text-gray-500">
            Posted {timelapse}{" "}
            <span>
              by <span className="font-bold">{user?.name}</span>
            </span>
          </div>
          <div>
            <h3 className="text-gray-900 min-h-16">{description}</h3>
          </div>
        </div>
        <div className="border-t border-gray-300 px-4 py-2">
          <h6 className="font-bold text-xs text-[#05264E] text-left">Looking for:</h6>
          <ul className="list-none text-sm text-[#05264E] flex flex-wrap">
            <li className="border border-slate-300 rounded-lg inline-block my-4 p-1">{category}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardJobs;
