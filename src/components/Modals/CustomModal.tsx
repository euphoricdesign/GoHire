import React from "react";
import Modal from "react-modal";
import { FaPencil } from "react-icons/fa6";

interface Field {
  name: string;
  label: string;
  type: string;
  defaultValue?: string;
  options?: string[];
}

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  fields: Field[];
  onSave: (updatedData: Record<string, string | number | File>) => void;
  onFieldChange?: (fieldName: string, value: string) => void;
  ariaHideApp?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
  title,
  fields,
  onSave,
  onFieldChange,
  ariaHideApp = false,
}) => {
  const [formData, setFormData] = React.useState<Record<string, string | number | File>>({});

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    fieldName: string
  ) => {
    const value = event.target.value;
    setFormData({ ...formData, [fieldName]: value });
    if (onFieldChange) {
      onFieldChange(fieldName, value);
    }
  };

  const handleSubmit = () => {
    onSave(formData);
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
          padding: "20px",
          borderRadius: "8px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}>
      <div>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {fields.map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            {field.type === "text" && (
              <input
                type="text"
                defaultValue={field.defaultValue}
                onChange={(e) => handleChange(e, field.name)}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            )}
            {field.type === "textarea" && (
              <textarea
                defaultValue={field.defaultValue}
                onChange={(e) => handleChange(e, field.name)}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            )}
            {field.type === "select" && field.options && (
              <select
                onChange={(e) => handleChange(e, field.name)}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
        <div className="flex justify-end">
          <button
            onClick={onRequestClose}
            className="mr-4 py-2 px-4 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="py-2 px-4 bg-blue-500 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
