import Link from "next/link";
import React from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";
import { JobsData } from "@/types/jobsTypes";
import { useGetUserByIdQuery } from "@/lib/services/userApi";

const RetractableJobInfo = ({ selectedJob }: { selectedJob: JobsData }) => {
  const { data: user } = useGetUserByIdQuery({ id: selectedJob.user.id });
  return (
    <div className="h-full w-full text-[#05264E]">
      <div className="flex items-center justify-end w-full text-sm p-3 text-[#05264E]">
        <Link href={``} rel="noopener noreferrer" target="_blank">
          <button className="flex items-center">
            <h6 className="text-[#05264E]">Open job in a new window</h6>
            <FaArrowUpRightFromSquare className="ml-2 text-[#3C65F5] text-lg" />
          </button>
        </Link>
      </div>
      <div className="flex flex-col mx-5 my-3 border border-gray-300 rounded-3xl h-[90%] overflow-y-auto text-[#05264E]">
        <div>
          <div className="float-left w-[70%] h-full flex flex-col border-r border-gray-300 text-[#05264E]">
            <div className="">
              <div className="p-5 border-b border-gray-300">
                <div className="text-[32px] font-bold text-[#05264E]">{selectedJob.title}</div>
                <div className="flex items-center text-[#05264E]">
                  Posted {selectedJob.timelapse}
                  <span className="ml-1 flex items-center text-[#05264E]">
                    - <IoLocationOutline /> {selectedJob.location}
                  </span>
                </div>
              </div>
              <div className="border-b border-gray-300 p-5 text-[#05264E]">
                {selectedJob.description}
              </div>
              <div className="p-5">
                <div className="text-lg font-bold text-[#05264E]">Professions needed:</div>
                <div className="mt-2 text-[#05264E]">{selectedJob.category}</div>
              </div>
            </div>
          </div>
          <div className="float-right w-[30%] h-full flex flex-col">
            <div className="border-b border-gray-300 p-5">
              <div className="text-lg font-bold text-[#05264E]">About the client:</div>
              {user ? (
                <div className="flex flex-col items-start">
                  <div className="m-3 p-1 border border-gray-300 rounded-full">
                    <Image
                      className="rounded-full"
                      src={user.imgPictureUrl || "https://i.ibb.co/StS3yL7/Default-Profile-Img.png"}
                      alt="profile img"
                      width={96}
                      height={96}
                    />
                  </div>
                  <h2 className="text-[16px] font-bold text-[#05264E]">
                    {user.name} {user.lastName}
                  </h2>
                  <div className="flex items-center">
                    <IoLocationOutline />
                    <h2 className="text-[16px] text-[#05264E]">
                      {user.city}, {user.country}
                    </h2>
                  </div>
                </div>
              ) : (
                <div className="text-red-500">User not found</div>
              )}
            </div>
            {user && (
              <>
                <div className="flex items-center justify-center w-full text-sm p-5 border-b border-gray-300">
                  <Link href={`/users/${user.id}`} rel="noopener noreferrer" target="_blank">
                    <button className="flex items-center">
                      <h6 className="text-[#3C65F5] font-bold border-b-2 border-transparent hover:border-solid hover:border-[#3C65F5]">
                        View Profile
                      </h6>
                      <FaArrowUpRightFromSquare className="ml-2 text-[#3C65F5] text-lg" />
                    </button>
                  </Link>
                </div>
                <div className="p-5 flex items-center justify-around">
                  <div>
                    <button className="bg-white text-sm border w-24 text-[#3C65F5] border-slate-300 font-medium px-3 py-2 rounded-xl hover:bg-[#93B4FF] transition-all duration-300">
                      Message
                    </button>
                  </div>
                  <div>
                    <button className="bg-[#3C65F5] text-white text-center text-sm px-2 py-2 rounded-xl hover:opacity-80 transition-all duration-300">
                      Apply Now
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetractableJobInfo;
