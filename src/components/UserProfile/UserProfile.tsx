import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import { TfiBolt } from "react-icons/tfi";
import { FaShareFromSquare } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import { useGetUserMeQuery, useUpdateUserMutation } from "@/lib/services/userApi";
import ProfileModal from "../Modals/ProfileModal";
import { UserData } from "@/types/userTypes";

const UserProfile = () => {
  const { data: user, error: getUserError, isLoading: getUserLoading } = useGetUserMeQuery(null);
  const [updateUser] = useUpdateUserMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState<string | null>(null);
  const [show, setShow] = useState(true);
  const [isAvailable, setIsAvailable] = useState(false);

  const openModal = (field: string) => {
    setCurrentField(field);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentField(null);
  };

  const handleUpdateUser = async (updatedData: Partial<UserData>) => {
    if (user) {
      await updateUser({ id: user.id, ...updatedData });
    }
  };

  if (getUserLoading) return <p>Loading...</p>;
  if (getUserError) return <p>Error loading user data</p>;

  const handleAvailableClick = () => {
    setIsAvailable(!isAvailable);
  };

  const handleShowClick = () => {
    setShow(!show);
  };

  return (
    <div className="h-full w-full">
      <div className="flex flex-col border rounded-3xl">
        <div className="border-b border-b-gray-300 rounded-t-3xl">
          <div className="flex items-center">
            <div className="relative w-auto mx-[1.5rem] border border-gray-300 rounded-full">
              <Image
                className="rounded-full"
                src={"https://i.ibb.co/StS3yL7/Default-Profile-Img.png"}
                alt={""}
                width={96}
                height={96}
              />
              <HiOutlinePencilSquare
                className="absolute top-0 right-[-13px] text-[#3C65F5] w-[1.5rem] h-[1.5rem] cursor-pointer"
                onClick={() => openModal("profileImg")}
              />
            </div>
            <div className="w-full p-5">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center">
                    <h2 className="text-[32px] font-bold text-[#05264E]">
                      {user?.name} {user?.lastName}
                    </h2>
                    <div>
                      <button onClick={() => openModal("nameAndLastName")}>
                        <HiOutlinePencilSquare className="text-[#3D63DD] size-6 cursor-pointer ml-2" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <IoLocationOutline />
                      <h2 className="text-xl text-[#05264E]">
                        {user?.city}, {user?.country}
                      </h2>
                    </div>
                    <button className="" onClick={() => openModal("location")}>
                      <HiOutlinePencilSquare className="text-[#3C65F5] size-6 cursor-pointer ml-2" />
                    </button>
                  </div>
                  <div className="flex items-center">
                    {isAvailable ? (
                      <div className="flex items-center border border-[#3D63DD] w-fit px-3 py-1 rounded-xl">
                        <TfiBolt className="text-[#3D63DD] mr-1" />
                        <h2 className="text-[#3D63DD] text-[12px]">Available Now</h2>
                      </div>
                    ) : (
                      <div className="flex items-center border border-[#3D63DD] w-fit px-3 py-1 rounded-xl">
                        <TfiBolt className="text-[#3D63DD] mr-1" />
                        <h2 className="text-[#3D63DD] text-[12px]">Not Available</h2>
                      </div>
                    )}
                    <button onClick={handleAvailableClick}>
                      <HiOutlinePencilSquare className="text-[#3D63DD] size-6 cursor-pointer ml-2" />
                    </button>
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
                    <button onClick={() => openModal("bio")}>
                      <HiOutlinePencilSquare className="text-[#3C65F5] size-6 cursor-pointer mr-5" />
                    </button>
                  </div>
                </div>
                <div className="px-[1.5rem] mb-4 text-[#05264E]">{user?.bio}</div>
              </div>
            </div>
            <div className="h-auto flex flex-col">
              <div className="border-b border-gray-300 mt-5">
                <div className="flex items-center mb-3 justify-between">
                  <div className="font-bold mx-[1.5rem] text-[#05264E]">Professions:</div>
                  <div>
                    <HiOutlinePencilSquare
                      className="text-[#3C65F5] size-6 cursor-pointer mr-5"
                      onClick={() => openModal("professions")}
                    />
                  </div>
                </div>
                <div className="">
                  {user?.profesions &&
                    user?.profesions.map((profession) => (
                      <div key={profession.id}>
                        <ul className="list-none flex text-lg pb-4 px-[1.5rem]">
                          <li className="border border-slate-300 rounded-lg inline-block m-1 p-1 text-[12px] text-[#05264E]">
                            {profession.category}
                          </li>
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
              <div className="border-b border-gray-300 mt-5">
                <div className="flex items-center mb-3 justify-between">
                  <div className="font-bold mx-[1.5rem]">Education:</div>
                  <div>
                    <HiOutlinePencilSquare
                      className="text-[#3D63DD] size-6 cursor-pointer mr-5"
                      onClick={() => openModal("education")}
                    />
                  </div>
                </div>
                <div className="">
                  {user?.educations &&
                    user?.educations.map((education) => (
                      <div key={education.id}>
                        <ul className="list-none flex text-lg pb-4 px-[1.5rem]">
                          <li className="border border-slate-300 rounded-lg inline-block m-1 p-1 text-[12px] text-[#05264E]">
                            {education.title}
                          </li>
                        </ul>
                      </div>
                    ))}
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
                  <div className="font-bold text-lg text-[#05264E]">
                    experience.title en experience.company
                  </div>
                  <p className="text-sm text-gray-600">
                    since: <span className="italic mr-2 text-[#05264E]">experience.startDate</span>-
                    until: <span className="italic">experience.endDate</span>
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
      {isModalOpen && (
        <ProfileModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          field={currentField}
          user={user}
          onSave={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default UserProfile;
