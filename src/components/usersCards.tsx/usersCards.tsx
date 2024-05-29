"use client";
import { useState } from "react";
import UserCard from "../userCard/userCard";
import { IUser } from "@/types";
import Image from "next/image";
// icons //
import { BsArrowLeft } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { TfiBolt } from "react-icons/tfi";
import { BsChatDots } from "react-icons/bs";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";
import { FaShareFromSquare } from "react-icons/fa6";

const UsersCards = ({ users }: { users: IUser[] }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [FavClicked, setFavClicked] = useState(false);

  const handleFavClick = () => {
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
          className="fixed inset-0 bg-gray-700 bg-opacity-50 z-40"
          onClick={() => setShowDescription(false)}></div>
      )}
      <div className="flex justify-center items-center flex-wrap z-30">
        {users.map((user) => (
          <div
            key={user.id}
            className="scale-90 hover:scale-95 transition-all duration-300 relative">
            <button
              onClick={() => handleDescription(user)}
              className="absolute z-50 bg-white px-2 py-1 border border-indigo-600 hover:bg-[#A1ABFF] hover:border-white mt-5 ml-5 font-bold text-indigo-600 text-md rounded transition-all duration-300">
              View
            </button>
            <UserCard {...user} />
          </div>
        ))}
      </div>
      <div
        className={`fixed top-0 right-0 w-full md:w-[60rem] h-screen bg-white transition-transform duration-500 z-50 ${
          showDescription ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionProperty: "transform" }}>
        <div className="h-full w-full">
          <div className="flex items-center justify-between w-full text-sm p-3 mt-3">
            <button onClick={() => setShowDescription(false)}>
              <BsArrowLeft className="size-6" />
            </button>
            <button className="flex items-center">
              <h6>Open profile in a new window</h6>
              <FaArrowUpRightFromSquare className="ml-2 text-[#3D63DD] text-lg" />
            </button>
          </div>
          {selectedUser && (
            <div className="flex flex-col mx-5 my-3 border border-gray-400 rounded-3xl h-[90%] overflow-y-auto">
              <div className="border border-b-gray-300">
                <div className="flex items-center">
                  <div className="w-auto m-3 p-1 border border-slate-400 rounded-full">
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
                        {FavClicked ? (
                          <button onClick={handleFavClick} className="transition-all duration-300">
                            <GoHeartFill className="text-red-500 hover:text-red-600 transition-all duration-300 size-10 border-2 p-1 border-red-500 rounded-full" />
                          </button>
                        ) : (
                          <button onClick={handleFavClick} className="transition-all duration-300">
                            <GoHeartFill className="text-[#3D63DD] hover:bg-[#D5E2FF] transition-all duration-300 size-10 border-2 p-1 border-[#3D63DD] rounded-full" />
                          </button>
                        )}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersCards;
