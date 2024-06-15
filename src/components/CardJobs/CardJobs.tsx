"use client";
import React, { useState, useEffect } from "react";
import { JobsData } from "@/types/jobsTypes";
import { useGetCategoryQuery } from "@/lib/services/jobsApi";

const CardJobs = ({
  id,
  title,
  description,
  image,
  date,
  time,
  timelapse,
  category,
  user,
  onClick,
  onEdit, // Prop para la función onEdit
  onDelete, // Prop para la función onDelete
  isEditable = false, // Prop para indicar si el componente es editable, por defecto es false
}: JobsData & { onClick: () => void; onEdit?: (updatedJob: Partial<JobsData>) => void; onDelete?: () => void; isEditable?: boolean }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title, description, category });
  const { data: categories, isLoading, isError } = useGetCategoryQuery(null);

  useEffect(() => {
    setFormData({ title, description, category });
  }, [title, description, category]);

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (onEdit) {
      onEdit(formData);
    }
    setIsEditing(false);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className="relative bg-[#f2f6fd] rounded-lg">
      <div
        onClick={onClick}
        className="relative block overflow-hidden rounded-lg border border-gray-100 h-full cursor-pointer"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
        <div className="sm:flex sm:flex-col sm:justify-between sm:gap-4 px-4 pt-4">
          <div className="flex items-center justify-between">
            {isEditing ? (
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="text-lg font-bold text-[#05264E] sm:text-xl"
              />
            ) : (
              <h3 className="text-lg font-bold text-[#05264E] sm:text-xl">{title}</h3>
            )}
            {isEditable && (
              <div className="flex gap-2">
                <button
                  onClick={handleEditClick}
                  className="bg-[#ec8d2f] text-white text-center text-sm px-2 py-2 rounded-xl hover:opacity-80 transition-all duration-300"
                >
                  Edit
                </button>
                {onDelete && (
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white text-center text-sm px-2 py-2 rounded-xl hover:opacity-80 transition-all duration-300"
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
            {!isEditable && (
              <div className="bg-[#3C65F5] text-white text-center text-sm px-2 py-2 rounded-xl hover:opacity-80 transition-all duration-300">
                Apply Now
              </div>
            )}
          </div>
          <div className="flex flex-col text-xs text-gray-500">
            Posted {timelapse}{" "}
            <span>
              by <span className="font-bold">{user?.name}</span>
            </span>
          </div>
          <div>
            {isEditing ? (
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="text-gray-900 min-h-16"
              />
            ) : (
              <h3 className="text-gray-900 min-h-16">{description}</h3>
            )}
          </div>
        </div>
        <div className="border-t border-gray-300 px-4 py-2">
          <h6 className="font-bold text-xs text-[#05264E] text-left">Looking for:</h6>
          <ul className="list-none text-sm text-[#05264E] flex flex-wrap">
            {isEditing ? (
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border border-slate-300 rounded-lg inline-block my-4 p-1"
              >
                {isLoading && <option>Loading...</option>}
                {isError && <option>Error loading categories</option>}
                {categories?.categoryReturn &&
                  categories.categoryReturn.map((category: string, index: number) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
            ) : (
              <li className="border border-slate-300 rounded-lg inline-block my-4 p-1">
                {category}
              </li>
            )}
          </ul>
          {isEditing && (
            <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition">
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardJobs;
