"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft, BsChatDots } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { TfiBolt } from "react-icons/tfi";
import { FaArrowUpRightFromSquare, FaRegStar, FaShareFromSquare } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";
import WorkHistoryCard from "../WorkHistoryCard/WorkHistoryCard";
import { IUser } from "@/types";

const RetractableUserInfo = ({ selectedUser }: { selectedUser: IUser }) => {
  const [isFavClicked, setIsFavClicked] = useState(false);

  const handleFavClicked = () => {
    setIsFavClicked(!isFavClicked);
  };

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between w-full text-sm p-3 mt-3">
        <Link href={`/users/${selectedUser.id}`} rel="noopener noreferrer" target="_blank">
          <button className="flex items-center">
            <h6>Open profile in a new window</h6>
            <FaArrowUpRightFromSquare className="ml-2 text-[#3D63DD] text-lg" />
          </button>
        </Link>
      </div>
      <div className="flex flex-col mx-5 my-3 border border-gray-300 rounded-3xl h-[90%] overflow-y-auto">
        <div className="border border-b-gray-300">
          <div className="flex items-center">
            <div className="w-auto m-3 p-1 border border-gray-300 rounded-full">
              <Image
                className="rounded-full"
                src={selectedUser.profileImg}
                alt={`${selectedUser.name} ${selectedUser.lastName}'s profile image`}
                width={96}
                height={96}
              />
            </div>
            <div className="w-full p-5">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-[32px] font-bold">
                    {selectedUser.name} {selectedUser.lastName}
                  </h2>
                  <div className="flex items-center mb-3">
                    <IoLocationOutline />
                    <h2 className="text-xl">
                      {selectedUser.city}, {selectedUser.country}
                    </h2>
                  </div>
                  <div className="flex items-center border border-[#3D63DD] w-fit px-3 py-1 rounded-xl">
                    <TfiBolt className="text-[#3D63DD] mr-1" />
                    <h2 className="text-[#3D63DD] text-[12px]">Available Now</h2>
                  </div>
                </div>
                <div className="flex h-fit items-center">
                  <button>
                    <BsChatDots className="text-[#3D63DD] border-2 border-[#3D63DD] hover:bg-[#D5E2FF] transition-all duration-300 size-10 p-1 rounded-full" />
                  </button>
                  <button className="bg-[#3D63DD] text-white text-center px-5 py-2 rounded-xl mx-2 hover:bg-[#93B4FF] transition-all duration-300">
                    Hire
                  </button>
                  <button onClick={handleFavClicked} className="transition-all duration-300">
                    <GoHeartFill
                      className={`${
                        isFavClicked
                          ? "text-red-500 border-red-500"
                          : "text-[#3D63DD] border-[#3D63DD]"
                      } hover:bg-[#D5E2FF] transition-all duration-300 size-10 border-2 p-1 rounded-full`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end px-5 pb-14">
            <button className="flex">
              <h2 className="mx-4">Share</h2>
              <div>
                <FaShareFromSquare className="text-[#3D63DD] size-6" />
              </div>
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="float-left w-[30%] h-auto flex flex-col">
            <div className="p-5 py-10 flex items-center justify-center border-b border-gray-300">
              <button className="bg-[#3D63DD] text-white text-center px-5 py-2 rounded-xl mx-2 hover:bg-[#93B4FF] transition-all duration-300">
                Jobs Publications
              </button>
            </div>
            <div className="border-b border-gray-300">
              <h2 className="font-bold m-5">Professions:</h2>
              <div className="">
                <ul className="list-none flex flex-col text-lg pb-4">
                  {selectedUser.professions.map((profession, index) => (
                    <li key={index} className="rounded-lg inline-block m-1 p-2 px-5">
                      {profession}
                      <div className="flex">
                        <h6 className="text-sm mr-2">Rate:</h6>
                        <p className="flex">
                          <FaRegStar />
                          <FaRegStar />
                          <FaRegStar />
                          <FaRegStar />
                          <FaRegStar />
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h2 className="font-bold m-5">Education:</h2>
              {selectedUser.educations.map((education) => (
                <div className="px-5" key={education}>
                  {education}
                </div>
              ))}
            </div>
          </div>
          <div className="float-right w-[70%] h-auto border-l border-gray-300">
            <div className="border-b border-gray-300 p-5">
              <div>
                <h1 className="text-xl font-bold flex">
                  {selectedUser.professions.map((profession) => (
                    <div className="" key={profession}>
                      {profession}
                    </div>
                  ))}
                </h1>
              </div>
              <div className="mt-5">
                <h1>{selectedUser.description}</h1>
              </div>
            </div>
            <div className="p-5">
              <h1 className="text-xl font-bold">Work History</h1>
              {selectedUser.jobs.map((job, index) => (
                <WorkHistoryCard key={index} {...job} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetractableUserInfo;
