import { useGetUserByIdQuery } from '@/lib/services/userApi';
import React from 'react';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import Link from 'next/link';
import { JobsData } from '@/types/jobsTypes';

const JobInfo = ({ selectedJob }: { selectedJob: JobsData }) => {
  const { data, error, isLoading } = useGetUserByIdQuery({ id: selectedJob.user.id });

  if (error || !data) {
    return <div>User not found</div>;
  }

  return (
    <div className="h-full w-full mt-24">
      <div className="flex flex-col mx-5 my-3 border border-gray-300 rounded-3xl h-[90%] overflow-y-auto">
        <div>
            {error || !data && <div>User not found</div>}
          <div className="float-left w-[70%] h-full flex flex-col border-r border-gray-300">
            <div className="">
              <div className="p-5 border-b border-gray-300">
                <div className="text-[32px] font-bold">{selectedJob.title}</div>
                <div className="flex items-center ">
                  Posted {selectedJob.timelapse} ago -{" "}
                  <span className="ml-1 flex items-center text-xl">
                    <IoLocationOutline /> Location
                  </span>
                </div>
              </div>
              <div className="border-b border-gray-300 p-5">{selectedJob.description}</div>
              <div className="p-5">
                <div className="text-lg font-bold">Professions needed:</div>
                <div className="mt-2 ">{selectedJob.category}</div>
              </div>
            </div>
          </div>
          <div className="float-right w-[30%] h-full flex flex-col">
            <div className="border-b border-gray-300 p-5">
              <div className="text-lg font-bold">About the client:</div>
              <div className="flex flex-col items-start">
                <div className="m-3 p-1 border border-gray-300 rounded-full">
                  {/* <Image
                    className="rounded-full"
                    src={user.profileImg}
                    alt="profile img"
                    width={96}
                    height={96}
                  /> */}
                </div>
                <h2 className="text-[16px] font-bold">
                  {data.name} {data.lastName}
                </h2>
                <div className="flex items-center">
                  <IoLocationOutline />
                  <h2 className="text-[16px]">
                    {data.city}, {data.country}
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-full text-sm p-5 border-b border-gray-300">
              <Link href={`/users/${data.id}`} rel="noopener noreferrer" target="_blank">
                <button className="flex items-center">
                  <h6 className="text-[#3D63DD] font-bold border-b-2 border-transparent hover:border-solid hover:border-[#3D63DD]">
                    View Profile
                  </h6>
                  <FaArrowUpRightFromSquare className="ml-2 text-[#3D63DD] text-lg" />
                </button>
              </Link>
            </div>
            <div className="p-5 flex items-center justify-around">
              <div>
                <button className="bg-white text-sm border w-24 text-[#5049e5] border-slate-300 font-medium px-3 py-2 rounded-xl hover:bg-[#93B4FF] transition-all duration-300">
                  Message
                </button>
              </div>
              <div>
                <button className="bg-[#5049e5] text-sm text-white w-24 text-center px-3 py-2 rounded-xl hover:opacity-80 transition-all duration-300">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobInfo;
