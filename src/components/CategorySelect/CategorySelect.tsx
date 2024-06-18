"use client"
import React from "react";
import { useGetAllProfessionsQuery } from "@/lib/services/professionsApi";
import { Professions } from "@/types/professionsTypes";

interface CategorySelectProps {
  selectedCategory: string;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  selectedCategory,
  handleCategoryChange,
}) => {
  const { data, isLoading, isError } = useGetAllProfessionsQuery(null);

  return (
    <div>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="w-full text-gray-700 text-base focus:outline-none pl-0 pr-3 py-2 peer"
      >
        <option value="">Select a category</option>
        {isLoading && <option>Loading...</option>}
        {isError && <option>Error loading categories</option>}
        {data && data.map((profession: Professions, index: number) => (
          <option key={profession.id} value={profession.category}>
            {profession.category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
