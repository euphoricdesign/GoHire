"use client";
import React from "react";

interface SendMessageModalProps {
  show: boolean;
  onClose: () => void;
}

const SendMessageModal: React.FC<SendMessageModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Send a Message</h2>
        <p>Random text</p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SendMessageModal;
