import React from "react";
import { GoArrowLeft } from "react-icons/go";

interface RetractableViewBlackProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const RetractableView: React.FC<RetractableViewBlackProps> = ({ show, onClose, children }) => {
  return (
    <div className="">
      {show && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-[101]" onClick={onClose}></div>
      )}
      <div
        className={`fixed z-[102] top-0 right-0 h-full bg-white overflow-y-auto p-4 transition-all duration-300 ease-in-out ${
          show ? "transform translate-x-0 w-[60rem]" : "transform translate-x-full w-0"
        }`}>
        <button className="absolute top-0 left-0 m-5" onClick={onClose}>
          <GoArrowLeft className="size-8" />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default RetractableView;
