"use client";
import { UserData } from "@/types/userTypes";
import Modal from "react-modal";
import Image from "next/image";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

interface SendMessageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedUser: UserData | null;
}

const SendMessageModal: React.FC<SendMessageModalProps> = ({
  isOpen,
  onRequestClose,
  selectedUser,
}) => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    console.log("Message sent:", message);
    // lógica para enviar el mensaje.
    setMessage("");
    onRequestClose();
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Send Message Modal"
        ariaHideApp={false}
        className="fixed inset-0 flex items-center justify-center z-50 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40">
        <div className="bg-white rounded-lg shadow-lg p-6 w-auto z-50">
          <div className="w-full flex items-center justify-between p-1">
            <h2 className="text-xl font-bold">Send a Message to</h2>
            <button
              onClick={onRequestClose}
              className="text-[#3D63DD] hover:text-blue-600 hover:bg-[#93B4FF] transition-all duration-300 rounded-full p-1">
              <FaTimes size={25} />
            </button>
          </div>
          <div>
            <div className="flex">
              <div className="w-auto m-3 p-1 border border-gray-300 rounded-full">
                <Image
                  className="rounded-full"
                  src={
                    selectedUser?.imgPictureUrl ||
                    "https://i.ibb.co/StS3yL7/Default-Profile-Img.png"
                  }
                  alt={`${selectedUser?.name} ${selectedUser?.lastName}'s profile image`}
                  width={96}
                  height={96}
                />
              </div>
              <div className="flex flex-col m-3 justify-between">
                <div>
                  <Link
                    href={`/users/${selectedUser?.id}`}
                    rel="noopener noreferrer"
                    target="_blank">
                    <button className="text-[#3D63DD] underline flex items-center">
                      {selectedUser?.name} {selectedUser?.lastName}{" "}
                      <FaArrowUpRightFromSquare className="ml-2 text-[#3C65F5] text-lg" />
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
            <div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={handleMessageChange}
                  className="shadow appearance-none border rounded-xl w-[45rem] h-[12rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder=""
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSendMessage}
              className="mt-4 bg-[#3D63DD] text-white text-center px-6 py-2 rounded-xl hover:bg-[#93B4FF] transition-all duration-300">
              Send your Message
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SendMessageModal;
