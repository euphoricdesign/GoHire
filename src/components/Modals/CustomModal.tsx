import React from "react";
import Modal from "react-modal";
import { FaPencil } from "react-icons/fa6";

interface Field {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "select";
  options?: string[];
  defaultValue?: string | number;
}

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  fields: Field[];
  onSave: (updatedData: Record<string, string | number>) => void;
  ariaHideApp?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
  title,
  fields,
  onSave,
  ariaHideApp,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const updatedData: Record<string, string | number> = {};

    formData.forEach((value, key) => {
      updatedData[key] = value.toString();
    });

    onSave(updatedData);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={ariaHideApp}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          padding: "0px",
          borderRadius: "8px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col shadow-xl rounded-xl p-4">
          {fields.map((field, index) => (
            <div key={index} className="mb-4">
              <label className="font-bold text-sm">{field.label}</label>
              <div className="relative flex items-center">
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    defaultValue={field.defaultValue}
                    className="w-full text-gray-700 text-base pl-0 pr-3 py-2 peer border-b-2 border-gray-300 focus:border-[#3C65F5]"
                  />
                ) : field.type === "select" && field.options ? (
                  <select
                    name={field.name}
                    className="w-full text-gray-700 text-base pl-0 pr-3 py-2 peer border-b-2 border-gray-300 focus:border-[#3C65F5]">
                    {field.options.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={field.name}
                    type={field.type}
                    defaultValue={field.defaultValue}
                    className="w-full text-gray-700 text-base pl-0 pr-3 py-2 peer border-b-2 border-gray-300 focus:border-[#3C65F5]"
                  />
                )}
                <FaPencil className="absolute right-3 text-gray-400 peer-focus:text-[#3C65F5]" />
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-[#93B4FF] transition-all duration-300">
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CustomModal;
