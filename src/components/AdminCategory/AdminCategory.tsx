import { useUpdateProfessionMutation, useGetAllProfessionsQuery } from "@/lib/services/professionsApi";
import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { useDispatch } from "react-redux";

const AdminCategory: React.FC = () => {
  const { data, isLoading, isFetching } = useGetAllProfessionsQuery(null);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [updateProfession, { isLoading: isUpdating }] = useUpdateProfessionMutation();

  const handleEditClick = (index: number, category: string) => {
    setEditIndex(index);
    setEditValue(category);
  };

  const handleSaveClick = async (professionId: string) => {
    try {
      await updateProfession({ id: professionId, category: editValue }).unwrap();
      setEditIndex(null);
      window.location.reload()
    } catch (error) {
      console.error("Failed to update category", error);
    }
  };

  return (
    <div className="relative w-full">
      <div className="h-96 overflow-y-scroll border border-gray-300 rounded-lg p-4">
        {isLoading && (
          <div className="w-full flex flex-row gap-2 justify-center items-center mb-[60px]">
            <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.5s]"></div>
          </div>
        )}
        {data && data.map((profession, index) => (
          <div key={profession.id} className="flex items-center justify-between p-2 border-b">
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="border rounded p-1"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSaveClick(profession.id)}
                    className="text-green-500"
                  >
                    <FaSave />
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>{profession.category}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(index, profession.category)}
                    className="text-blue-500"
                  >
                    <FaEdit />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
    </div>
  );
};

export default AdminCategory;
