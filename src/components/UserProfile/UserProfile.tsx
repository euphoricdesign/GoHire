"use client";
import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import { TfiBolt } from "react-icons/tfi";
import { FaShareFromSquare } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { useState } from "react";

const UserProfile = () => {
  const [show, setShow] = useState(true);

  const handleShowClick = () => {
    setShow(!show);
  };

  return (
    <div className="h-full w-full">
      <div className="flex flex-col border rounded-3xl">
        <div className="border-b border-b-gray-300 rounded-t-3xl">
          <div className="flex items-center">
            <div className="absolute inset-0 opacity-20"></div>
            <div className="relative w-auto mx-[1.5rem]  border border-gray-300 rounded-full">
              <Image
                className="rounded-full"
                src={"https://i.ibb.co/StS3yL7/Default-Profile-Img.png"}
                alt={""}
                width={96}
                height={96}
              />
              <HiOutlinePencilSquare className=" absolute top-0 right-[-13px] text-[#3C65F5] w-[1.5rem] h-[1.5rem] cursor-pointer" />
            </div>
            <div className="w-full p-5">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center">
                    <h2 className="text-[32px] font-bold text-[#05264E]">Name Lastname</h2>
                    <HiOutlinePencilSquare className="text-[#3C65F5] size-6 cursor-pointer ml-2" />
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <IoLocationOutline />
                      <h2 className="text-xl text-[#05264E]">City, Country</h2>
                    </div>
                    <HiOutlinePencilSquare className="text-[#3C65F5] size-6 cursor-pointer ml-2" />
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center border border-[#3C65F5] w-fit px-3 py-1 rounded-xl">
                      <TfiBolt className="text-[#3C65F5] mr-1" />
                      <h2 className="text-[#3C65F5] text-[12px]">Available Now</h2>
                    </div>
                    <HiOutlinePencilSquare className="text-[#3C65F5] size-6 cursor-pointer ml-2" />
                  </div>
                </div>
                <div className="flex items-center justify-end px-[1.5rem] pb-14">
                  <button className="flex">
                    <h2 className="mx-4 text-[#05264E]">Share My Profile</h2>
                    <div>
                      <FaShareFromSquare className="text-[#3C65F5] size-6" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="h-auto ">
            <div className="border-b border-gray-300">
              <div className="mt-5">
                <div className="flex items-center mb-3 justify-between">
                  <div className="font-bold mx-[1.5rem]">My Description:</div>
                  <div>
                    <HiOutlinePencilSquare className="text-[#3C65F5] size-6 cursor-pointer mr-5" />
                  </div>
                </div>
                <div className="px-[1.5rem] mb-4 text-[#05264E]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum optio eveniet neque
                  numquam nemo in ad veritatis, accusamus fuga eaque saepe facilis similique ex,
                  necessitatibus, nesciunt ipsa aut! Repellat, sit?
                </div>
              </div>
            </div>
            <div className="h-auto flex flex-col">
              <div className="border-b border-gray-300 mt-5">
                <div className="flex items-center mb-3 justify-between">
                  <div className="font-bold mx-[1.5rem] text-[#05264E]">Professions:</div>
                  <div>
                    <HiOutlinePencilSquare className="text-[#3C65F5] size-6 cursor-pointer mr-5" />
                  </div>
                </div>
                <div className="">
                  <ul className="list-none flex text-lg pb-4 px-[1.5rem]">
                    <li className="border border-slate-300 rounded-lg inline-block m-1 p-1 text-[12px] text-[#05264E]">
                      Profesión 1
                    </li>
                    <li className="border border-slate-300 rounded-lg inline-block m-1 p-1 text-[12px] text-[#05264E]">
                      Profesión 2
                    </li>
                    <li className="border border-slate-300 rounded-lg inline-block m-1 p-1 text-[12px] text-[#05264E]">
                      Profesión 3
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-b border-gray-300 mt-5">
                <div className="flex items-center mb-3 justify-between">
                  <div className="font-bold mx-[1.5rem]">Education:</div>
                  <div>
                    <HiOutlinePencilSquare className="text-[#3D63DD] size-6 cursor-pointer mr-5" />
                  </div>
                </div>
                <div className="">
                  <ul className="list-none flex text-lg pb-4 px-[1.5rem]">
                    <li className="border border-slate-300 rounded-lg inline-block m-1 p-1 text-[12px] text-[#05264E]">
                      Education 1
                    </li>
                    <li className="border border-slate-300 rounded-lg inline-block m-1 p-1 text-[12px] text-[#05264E]">
                      Education 2
                    </li>
                    <li className="border border-slate-300 rounded-lg inline-block m-1 p-1 text-[12px] text-[#05264E]">
                      Education 3
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex items-center mb-3 justify-between">
                <div className="font-bold mx-[1.5rem] text-[#05264E]">Work History:</div>
                <div>
                  <button onClick={handleShowClick}>
                    {show ? (
                      <BsEye className="text-[#3D63DD] size-6 cursor-pointer mr-5" />
                    ) : (
                      <BsEyeSlash className="text-[#3D63DD] size-6 cursor-pointer mr-5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <div className="border p-4 rounded-md shadow-md mb-12 mx-[1.5rem]">
                  <div className="font-bold text-lg text-[#05264E]">experience.title en experience.company</div>
                  <p className="text-sm text-gray-600">
                    since: <span className="italic mr-2 text-[#05264E]">experience.startDate</span>- until:{" "}
                    <span className="italic">experience.endDate</span>
                  </p>
                  <div className="mt-3">
                    <h2 className="font-bold text-[#05264E]">Feedback:</h2>
                    <p className="mt-2 text-[#05264E]">"experience.description"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
