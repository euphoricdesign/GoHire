import { useGetCategoryQuery } from "@/lib/services/jobsApi";
import {  useUpdateProfessionMutation } from "@/lib/services/professionsApi";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";





const AdminCategory: React.FC = () => {
  const { data, isLoading, isFetching } = useGetCategoryQuery(null);
  const dispatch = useDispatch();
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [updateProfession, { isLoading: isUpdating }] = useUpdateProfessionMutation();
  const handleEditClick = (index: number, category: string) => {
    setEditIndex(index);
    setEditValue(category);
  };

  const handleSaveClick = async (index: number, categoryId: string) => {
    // Aca se guarda el nuevo nombre de la categoria
    setEditIndex(null);
  };

  const handleDeleteClick = async (categoryId: string) => {
    // Aca se elimina la categoria, se tendria que mostrar un modal
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
        {data?.categoryReturn &&
          data.categoryReturn.map((category: string, index: number) => (
            <div key={index} className="flex items-center justify-between p-2 border-b">
              <span>{category}</span>
              <div className="flex space-x-2">
                <button onClick={() => handleEditClick(index, category)} className="text-blue-500">
                  <FaEdit />
                </button>
                <button onClick={() => handleDeleteClick(String(index))} className="text-purple-500">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
      </div>
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
    </div>
  );
};

export default AdminCategory;
