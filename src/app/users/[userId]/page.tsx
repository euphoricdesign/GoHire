"use client";
import React, { useState } from "react";
import WorkHistoryCard from "@/components/WorkHistoryCard/WorkHistoryCard";
import { FaRegStar, FaShareFromSquare } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";
import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import { TfiBolt } from "react-icons/tfi";
import { BsChatDots } from "react-icons/bs";
import { useGetUserByIdQuery } from "@/lib/services/userApi";

const DetailProfile = ({ params }: { params: { userId: string } }) => {
  const [FavClicked, setFavClicked] = useState(false);
  const handleFavClick = () => {
    setFavClicked(!FavClicked);
  };
  const { data: user, error, isLoading } = useGetUserByIdQuery({ id: params.userId });

  if (isLoading) {
    return (
      <div className="w-full flex flex-row gap-2 justify-center items-center mb-[60px]">
        <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.5s]"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex justify-center mt-24">
        <h2 className="text-[#05264E]">User not found</h2>
      </div>
    );
  }

  console.log(user, "esto es la info de user");

  return (
    <div className="h-full w-full mt-24 rounded-3xl">
      <div className="flex flex-col mx-[124px] my-3 border border-gray-300 rounded-3xl h-[90%] overflow-y-auto">
        <div className="border border-b-gray-300">
          <div className="flex items-center">
            <div className="w-auto m-3 p-1 border border-gray-300 rounded-full">
              <Image
                className="rounded-full"
                src={user?.imgPictureUrl || "https://i.ibb.co/StS3yL7/Default-Profile-Img.png"}
                alt={`${user.name} ${user.lastName}'s profile image`}
                width={96}
                height={96}
              />
            </div>
            <div className="w-full p-5">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-[32px] text-[#05264E] font-bold">
                    {user.name} {user.lastName}
                  </h2>
                  <div className="flex items-center mb-3">
                    <IoLocationOutline />
                    <h2 className="text-xl text-[#05264E]">
                      {user.city}, {user.country}
                    </h2>
                  </div>
                  <div className="flex items-center border border-[#3C65F5] w-fit px-3 py-1 rounded-xl">
                    <TfiBolt className="text-[#3C65F5] mr-1" />
                    <h2 className="text-[#3C65F5] text-[12px]">Available Now</h2>
                  </div>
                </div>
                <div className="flex h-fit items-center">
                  <button>
                    <BsChatDots className="text-[#3C65F5] border-2 border-[#3C65F5] hover:opacity-80 transition-all duration-300 size-10 p-1 rounded-full" />
                  </button>
                  <button className="bg-[#3C65F5] text-white text-center px-5 py-2 rounded-xl mx-2 hover:opacity-80 transition-all duration-300">
                    Hire
                  </button>
                  <button onClick={handleFavClick} className="transition-all duration-300">
                    <GoHeartFill
                      className={`${
                        FavClicked
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
              <button className="bg-[#3C65F5] text-white text-center px-5 py-2 rounded-xl mx-2 hover:opacity-80 transition-all duration-300">
                Jobs Publications
              </button>
            </div>
            <div className="border-b border-gray-300 text-[#05264E]">
              <h2 className="font-bold mt-5 mx-5">Professions:</h2>
              <div className="">
                <ul className="list-none flex flex-col text-lg pb-4">
                  {user.profesions &&
                    user.profesions.map((profession, index) => (
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
            <div className="text-[#05264E]">
              <h2 className="font-bold m-5">Education:</h2>
              <div>
                {user.educations &&
                  user.educations.map((education, index) => (
                    <div key={index} className="px-5">
                      {education.title}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="text-[#05264E] float-right w-[70%] h-auto border-l border-gray-300">
            <div className="text-[#05264E] border-b border-gray-300 p-5">
              <div className="text-[#05264E]">
                <h1 className="text-xl font-bold flex">
                  {user.profesions &&
                    user.profesions.map((profession) => (
                      <div className="" key={profession.id}>
                        {profession.category}
                      </div>
                    ))}
                </h1>
              </div>
              <div className="mt-5 text-[#05264E]">
                <h1>{user.description}</h1>
              </div>
            </div>
            <div className="p-5 text-[#05264E]">
              <h1 className="text-xl font-bold mb-4">Work History</h1>
              <div className="text-[#05264E]">
                {user.experiences &&
                  user.experiences.map((experience) => (
                    <div key={experience.id} className="border p-4 rounded-md shadow-md mb-4">
                      <div className="font-bold text-lg">
                        {experience.title} en {experience.company}
                      </div>
                      <p className="text-sm text-gray-600">
                        since: <span className="italic mr-2">{experience.startDate}</span>- until:{" "}
                        <span className="italic">{experience.endDate}</span>
                      </p>
                      <div className="mt-3">
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

export default DetailProfile;
