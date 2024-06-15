"use client";

import { useGetCategoryQuery } from "@/lib/services/jobsApi";
import React from "react";
import { FaBriefcase, FaSearchLocation } from "react-icons/fa";
interface BannerCategoryProps {
  selectedCategory: string;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedCountry: string;
  handleCountryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  count: number | undefined;
}
const BannerCategory: React.FC<BannerCategoryProps> = ({
  selectedCategory,
  handleCategoryChange,
  selectedCountry,
  handleCountryChange,
  count,
}) => {
  const { data: categories, isLoading, isError, error } = useGetCategoryQuery(null);

  // Agregar logs para depuración
  console.log("Categories:", categories);
  console.log("Loading:", isLoading);
  console.log("Error:", isError, error);

  return (
    <div className="bg-bannerBg bg-center flex flex-col justify-center items-center p-[40px] rounded-xl mt-[100px]">
      <h2 className="text-[28px] text-[#05264E] font-[700] z-10">
        <span className="text-[#3C65F5] relative spanAfterSm">{count || 0} Jobs</span> Available Now
      </h2>
      <p className="leading-custom text-sm font-medium text-[#66789C] text-center mt-[12px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero repellendus magni, <br />{" "}
        atque delectus molestias quis
      </p>
      <div className="mt-[40px]">
        <div className="relative w-[580px] bg-white py-[12px] px-[16px] flex gap-4 items-center rounded shadow-custom">
          <div className="flex-1 relative">
            <div className="flex items-center gap-[15px] text-[#747474]">
              <FaBriefcase className="text-[40px]" />
              <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="py-[0.6rem] px-4 focus:outline-none w-full">
                <option value="">Filter by category</option>
                {isLoading && <option>Loading...</option>}
                {isError && <option>Error loading categories</option>}
                {categories?.categoryReturn &&
                  categories.categoryReturn.map((category: string, index: number) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
              </select>

              <FaSearchLocation className="text-[40px]" />
              <select
                id="city"
                value={selectedCountry}
                onChange={handleCountryChange}
                className="py-[0.6rem] px-4 focus:outline-none w-full">
                <option value="">Filter by Location</option>
                {isLoading && <option>Loading...</option>}
                {isError && <option>Error loading categories</option>}
                {categories?.locationReturn &&
                  categories.locationReturn.map((location: string, index: number) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BannerCategory;