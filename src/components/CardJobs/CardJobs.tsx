"use client";
import React, { useState } from "react";
import RetractableView from "../RetractableView/RetractableView";

interface User {
  name: string;
  jobTitle: string;
  description: string;
  bio: string;
  publishedDate: string;
  readingTime: string;
  imageUrl: string;
}

const CardJobs: React.FC<User> = ({
  name,
  jobTitle,
  description,
  bio,
  publishedDate,
  readingTime,
  imageUrl,
}) => {
  const [detailedView, setDetailedView] = useState(false);

  const handleDetail = () => {
    setDetailedView(!detailedView);
  };

  const handleClose = () => {
    setDetailedView(false);
  };

  return (
    <div className="relative bg-[ghostwhite]">
      <div
        onClick={handleDetail}
        className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 h-full cursor-pointer">
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
        <div className="sm:flex sm:flex-col sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">{description}</h3>
          </div>
          <div className="flex flex-col-reverse">
            <dd className="text-xs text-gray-500">Posted {readingTime} ago</dd>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-pretty text-sm text-gray-500">{bio}</p>
        </div>
      </div>
      <RetractableView show={detailedView} onClose={handleClose}>
        <div>
          <h1>hola</h1>
        </div>
      </RetractableView>
    </div>
  );
};

export default CardJobs;
