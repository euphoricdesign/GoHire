"use client";
import { useState } from "react";
import UserCard from "../userCard/userCard";
import { IUser } from "@/types";
import Image from "next/image";
import WorkHistoryCard from "../WorkHistoryCard/WorkHistoryCard";
import Link from "next/link";
// icons //
import { BsArrowLeft } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { TfiBolt } from "react-icons/tfi";
import { BsChatDots } from "react-icons/bs";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";
import { FaShareFromSquare } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";

const UsersCards = ({ users }: { users: IUser[] }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [FavClicked, setFavClicked] = useState(false);

  const handleFavClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setFavClicked(!FavClicked);
  };

  const handleDescription = (user: IUser) => {
    setSelectedUser(user);
    setShowDescription(true);
  };

  return (
    <div className="relative flex overflow-x-hidden h-screen">
      {showDescription && (
        <div
          className="fixed inset-0 bg-gray-700 bg-opacity-50 z-[101]"
          onClick={() => setShowDescription(false)}></div>
      )}
      <div className="flex justify-center items-center flex-wrap z-30">
        {users.map((user) => (
          <div
            key={user.id}
            className="scale-90 hover:scale-95 transition-all duration-300 relative"
            onClick={() => handleDescription(user)}>
            <UserCard {...user} onClick={() => handleDescription(user)} />
          </div>
        ))}
      </div>
      <div
        className={`fixed top-0 right-0 w-full md:w-[60rem] h-screen bg-white transition-transform duration-500 z-[102] ${
          showDescription ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionProperty: "transform" }}>
        <div className="h-full w-full">
          <div className="flex items-center justify-between w-full text-sm p-3 mt-3">
            <button onClick={() => setShowDescription(false)}>
              <BsArrowLeft className="size-6" />
            </button>
            {selectedUser && (
              <Link href={`/users/${selectedUser.id}`} rel="noopener noreferrer" target="_blank">
                <button className="flex items-center">
                  <h6>Open profile in a new window</h6>
                  <FaArrowUpRightFromSquare className="ml-2 text-[#3D63DD] text-lg" />
                </button>
              </Link>
            )}
          </div>
          {selectedUser && (
            <div className="flex flex-col mx-5 my-3 border border-gray-300 rounded-3xl h-[90%] overflow-y-auto">
              <div className="border border-b-gray-300">
                <div className="flex items-center">
                  <div className="w-auto m-3 p-1 border border-gray-300 rounded-full">
                    <Image
                      className="rounded-full"
                      src={selectedUser.profileImg}
                      alt="profile image"
                      width={96}
                      height={96}
                    />
                  </div>
                  <div className="w-full p-5 ">
                    <div className="flex justify-between ">
                      <div>
                        <h2 className="text-[32px] font-bold">
                          {selectedUser.name} {selectedUser.lastName}
                        </h2>
                        <div className="flex items-center mb-3">
                          <IoLocationOutline />
                          <h2 className="text-xl">
                            {selectedUser.city} {selectedUser.country}
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
                        <button onClick={handleFavClick} className="transition-all duration-300">
                          <GoHeartFill
                            className={`${
                              FavClicked
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
                            <div className="flex ">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersCards;
