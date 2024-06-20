import React, { useState } from "react";
import Modal from "react-modal";
import { UserData } from "@/types/userTypes";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Link from "next/link";

interface InvitationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedUser: UserData | null;
  onSubmit: (formData: {
    jobDescription: string;
    payPerHour: number;
    issue: string;
    location: string;
    startDate: string;
  }) => void;
  formErrors: string[]; // Añade esta propiedad
}

const InvitationModal: React.FC<InvitationModalProps> = ({
  isOpen,
  onRequestClose,
  selectedUser,
  onSubmit,
  formErrors,
}) => {
  const [formData, setFormData] = useState({
    jobDescription: "",
    payPerHour: 0,
    issue: "",
    location: "",
    startDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      payPerHour: Number(formData.payPerHour),
    };
    onSubmit(updatedFormData);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Send Invitation Modal"
        ariaHideApp={false}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
        className="fixed inset-0 flex items-center justify-center z-50 outline-none">
        <div className="bg-white rounded-lg shadow-lg p-6 w-[75%] z-[100]">
          <div className="w-full flex items-center justify-between p-1">
            <h2 className="text-xl font-bold">Send a Job Invitation to {selectedUser?.name}</h2>
            <button
              onClick={onRequestClose}
              className="text-[#3D63DD] hover:text-blue-600 hover:bg-[#93B4FF] transition-all duration-300 rounded-full p-1">
              <FaTimes size={25} />
            </button>
          </div>
          <div className="flex">
            <div className="w-auto m-3 p-1 border border-gray-300 rounded-full">
              <Image
                className="rounded-full"
                src={
                  selectedUser?.imgPictureUrl || "https://i.ibb.co/StS3yL7/Default-Profile-Img.png"
                }
                alt={`${selectedUser?.name} ${selectedUser?.lastName}'s profile image`}
                width={96}
                height={96}
              />
            </div>
            <div className="flex flex-col m-3 justify-between">
              <div>
                <Link href={`/users/${selectedUser?.id}`} rel="noopener noreferrer" target="_blank">
                  <button className="text-[#3D63DD] underline flex items-center">
                    {selectedUser?.name} {selectedUser?.lastName}{" "}
                    <FaArrowUpRightFromSquare className="ml-2 text-[#3D63DD] text-lg" />
                  </button>
                </Link>
                <div>
                  {selectedUser?.profesions.map((profession, index) => (
                    <div key={index} className="rounded-lg inline-block">
                      {profession.category}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div>
              <label className="text-gray-700 text-sm mb-2 flex flex-col">
                <span className="font-bold">Tittle</span>
                <input
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  className="border-gray-300 border p-2 rounded-lg"
                />
              </label>
            </div>
            <div>
              <label className="text-gray-700 text-sm mb-2 flex flex-col">
                <span className="font-bold">Pay per Hour</span>
                <input
                  type="number"
                  name="payPerHour"
                  value={formData.payPerHour}
                  onChange={handleChange}
                  className="border-gray-300 border p-2 rounded-lg"
                />
              </label>
            </div>
            <div>
              <label className="text-gray-700 text-sm  mb-2 flex flex-col">
                <span className="font-bold">Job Description</span>
                <textarea
                  rows={3}
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleChange}
                  className="border-gray-300 border p-2 rounded-lg"
                />
              </label>
            </div>
            <div>
              <label className="text-gray-700 text-sm mb-2 flex flex-col">
                <span className="font-bold">Location</span>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border-gray-300 border p-2 rounded-lg"
                />
              </label>
            </div>
            <div>
              <label className="text-gray-700 text-sm mb-2 flex flex-col">
                <span className="font-bold">Start Date</span>
                <input
                  type="text"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="border-gray-300 border p-2 rounded-lg"
                />
              </label>
            </div>
            {formErrors.length > 0 && (
              <div className="error-messages">
                <ul>
                  {formErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              type="submit"
              className="mt-4 bg-[#3D63DD] text-white text-center px-6 py-2 rounded-xl hover:bg-[#93B4FF] transition-all duration-300">
              Send Invitation
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default InvitationModal;
