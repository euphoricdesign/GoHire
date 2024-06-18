import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsChatDots } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { TfiBolt } from "react-icons/tfi";
import { FaArrowUpRightFromSquare, FaRegStar, FaShareFromSquare } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";
import { UserData } from "@/types/userTypes";

const RetractableUserInfo = ({ selectedUser }: { selectedUser: UserData }) => {
  const [isFavClicked, setIsFavClicked] = useState(false);

  const handleFavClicked = () => {
    setIsFavClicked(!isFavClicked);
  };

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-end w-full text-sm p-3">
        <Link href={`/users/${selectedUser.id}`} rel="noopener noreferrer" target="_blank">
          <button className="flex items-center">
            <h6 className="text-[#05264E]">Open profile in a new window</h6>
            <FaArrowUpRightFromSquare className="ml-2 text-[#3C65F5] text-lg" />
          </button>
        </Link>
      </div>
      <div className="flex flex-col mx-5 my-3 border border-gray-300 rounded-3xl h-[90%] overflow-y-auto">
        <div className="border border-b-gray-300">
          <div className="flex items-center">
            <div className="w-auto m-3 p-1 border border-gray-300 rounded-full">
              <Image
                className="rounded-full"
                src={selectedUser?.profileImg || "https://i.ibb.co/StS3yL7/Default-Profile-Img.png"}
                alt={`${selectedUser.name} ${selectedUser.lastName}'s profile image`}
                width={96}
                height={96}
              />
            </div>
            <div className="w-full p-5">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-[32px] font-bold text-[#05264E]">
                    {selectedUser.name} {selectedUser.lastName}
                  </h2>
                  <div className="flex items-center mb-3">
                    <IoLocationOutline />
                    <h2 className="text-xl text-[#05264E]">
                      {selectedUser.city}, {selectedUser.country}
                    </h2>
                  </div>
                  <div className="flex items-center border border-[#3C65F5] w-fit px-3 py-1 rounded-xl">
                    <TfiBolt className="text-[#3C65F5] mr-1" />
                    <h2 className="text-[#3C65F5] text-[12px]">Available Now</h2>
                  </div>
                </div>
                <div className="flex h-fit items-center">
                  <button>
                    <BsChatDots className="text-[#3C65F5] border-2 border-[#3C65F5] hover:bg-[#D5E2FF] transition-all duration-300 size-10 p-1 rounded-full" />
                  </button>
                  <button className="bg-[#3C65F5] text-white text-center px-5 py-2 rounded-xl mx-2 hover:bg-[#93B4FF] transition-all duration-300">
                    Hire
                  </button>
                  <button onClick={handleFavClicked} className="transition-all duration-300">
                    <GoHeartFill
                      className={`${
                        isFavClicked
                          ? "text-red-500 border-red-500"
                          : "text-[#3C65F5] border-[#3C65F5]"
                      } hover:bg-[#D5E2FF] transition-all duration-300 size-10 border-2 p-1 rounded-full`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end px-5 pb-14">
            <button className="flex">
              <h2 className="mx-4 text-[#05264E]">Share</h2>
              <div>
                <FaShareFromSquare className="text-[#3C65F5] size-6" />
              </div>
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="float-left w-[30%] h-auto flex flex-col">
            <div className="p-5 py-10 flex items-center justify-center border-b border-gray-300">
              <button className="bg-[#3C65F5] text-white text-center px-5 py-2 rounded-xl mx-2 hover:bg-[#93B4FF] transition-all duration-300">
                Jobs Publications
              </button>
            </div>
            <div className="border-b border-gray-300">
              <h2 className="font-bold mt-5 mx-5 text-[#05264E]">Professions:</h2>
              <div className="">
                <ul className="list-none flex flex-col text-lg pb-4">
                  {selectedUser.profesions &&
                    selectedUser.profesions.map((profession, index) => (
                      <li key={index} className="rounded-lg inline-block m-1 p-2 px-5">
                        {profession.category}
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
              <h2 className="font-bold m-5 text-[#05264E]">Education:</h2>
              <div className="text-[#05264E]">
                {selectedUser.educations &&
                  selectedUser.educations.map((education, index) => (
                    <div key={index} className="px-5">
                      {education.title}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="float-right w-[70%] h-auto border-l border-gray-300">
            <div className="border-b border-gray-300 p-5">
              <div className="font-bold">Sobre {selectedUser.name}</div>
              <div className="mt-2">
                <h1>{selectedUser.bio}</h1>
              </div>
            </div>
            <div className="p-5">
              <h1 className="text-xl font-bold mb-4 text-[#05264E]">Work History</h1>
              <div>
                {selectedUser.experiences &&
                  selectedUser.experiences.map((experience) => (
                    <div key={experience.id} className="border p-4 rounded-md shadow-md mb-4">
                      <div className="font-bold text-lg text-[#05264E]">
                        {experience.title} en {experience.company}
                      </div>
                      <p className="text-sm text-gray-600">
                        since: <span className="italic mr-2 text-[#05264E]">{experience.startDate}</span>- until:{" "}
                        <span className="italic text-[#05264E]">{experience.endDate}</span>
                      </p>
                      <div className="mt-3 text-[#05264E]">
                        <h2 className="font-bold">Feedback:</h2>
                        <p className="mt-2">"{experience.description}"</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetractableUserInfo;
