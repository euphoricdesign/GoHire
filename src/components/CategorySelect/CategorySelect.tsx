import React from "react";
import { useGetCategoryQuery } from "@/lib/services/jobsApi";
import {CategoryResponse} from "@/types/categoryType"

interface CategorySelectProps {
  selectedCategory: string;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  selectedCategory,
  handleCategoryChange,
}) => {
  const { data: categories, isLoading, isError } = useGetCategoryQuery(null);

  return (
    <div>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="w-full text-gray-700 text-base focus:outline-none pl-0 pr-3 py-2 peer">
        <option value="">Select a category</option>
        {isLoading && <option>Loading...</option>}
        {isError && <option>Error loading categories</option>}
        {categories?.categoryReturn &&
                  categories.categoryReturn.map((category: string, index: number) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
      </select>
    </div>
  );
};

export default CategorySelect;
