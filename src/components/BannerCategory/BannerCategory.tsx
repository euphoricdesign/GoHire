import { useListJobsQuery } from "@/lib/services/jobsApi";
import React, { useState } from "react";
import { FaBriefcase, FaSearchLocation } from "react-icons/fa";

interface BannerCategoryProps {
  selectedCategory: string;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedCountry: string;
  handleCountryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const BannerCategory: React.FC<BannerCategoryProps> = ({
  selectedCategory,
  handleCategoryChange,
  selectedCountry,
  handleCountryChange,
}) => {
  const [page, setPage] = useState(1);

  const { data } = useListJobsQuery({
    page,
    category: selectedCategory,
    city: selectedCountry,
  });

  return (
    <div className="bg-bannerBg bg-center flex flex-col justify-center items-center p-[40px] rounded-xl mt-[100px]">
      <h2 className="text-[28px] text-[#05264E] font-[700] z-10">
        <span className="text-[#3C65F5] relative spanAfterSm">
          {data?.publicationsFind?.length || 0} Jobs
        </span>{" "}
        Available Now
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
                <option value="Enfermera">Enfermera</option>
                <option value="Chef">Chef</option>
                <option value="Dentista">Dentista</option>
                <option value="Psicólogo">Psicólogo</option>
                <option value="Doctor">Doctor</option>
                <option value="Fotógrafo">Fotógrafo</option>
                <option value="Científico">Científico</option>
                <option value="Maestro">Maestro</option>
                <option value="Mecánico">Mecánico</option>
                <option value="Abogado">Abogado</option>
              </select>

              <FaSearchLocation className="text-[40px]" />
              <select
                id="city"
                value={selectedCountry}
                onChange={handleCountryChange}
                className="py-[0.6rem] px-4 focus:outline-none w-full">
                <option value="">Filter by Country</option>
                <option value="Brasil">Brasil</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Argentina">Argentina</option>
                <option value="Chile">Chile</option>
                <option value="Uruguay">Uruguay</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCategory;
