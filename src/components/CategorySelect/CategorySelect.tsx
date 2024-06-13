import React from "react";
import { useGetCategoryQuery } from "@/lib/services/jobsApi";

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
      <label htmlFor="category" className="block text-sm font-medium text-gray-700"></label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
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
