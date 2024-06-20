"use client";

import React, { useState, useEffect } from "react";
import CardJobs from "../../components/CardJobs/CardJobs";
import {
  useGetJobByIdQuery,
  useListJobsQuery,
  usePostListMeMutation,
} from "@/lib/services/jobsApi";
import { JobsData } from "@/types/jobsTypes";
import RetractableJobInfo from "@/components/RetractableJobInfo/RetractableJobInfo";
import RetractableView from "@/components/RetractableView/RetractableView";
import BannerCategory from "@/components/BannerCategory/BannerCategory";
import Toastify from "toastify-js";
import { useSelector } from "react-redux";
import { selectUserDetail } from "@/lib/features/slices/userSlice";

const SearchJobs: React.FC = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const { data, isLoading, isFetching } = useListJobsQuery({
    page,
    category: selectedCategory,
    city: selectedCountry,
  });
  const [postListMe, { isLoading: postLoading }] = usePostListMeMutation();
  const [selectedJobPost, setSelectedJobPost] = useState<JobsData | null>(null);
  const [showDescription, setShowDescription] = useState(false);
  const userDetail = useSelector(selectUserDetail);

  console.log(data)

  useEffect(() => {
    setPage(page);
  }, [data]);

  const handleDescription = (job: JobsData | null) => {
    if (!userDetail) {
      // Crear una instancia de notificación
      const myToast = Toastify({
        text: "You must be logged in to apply for a job",
        className: "toastify",
        position: "left",
        gravity: "bottom",
        duration: 999999999, // Duración muy grande para simular permanencia en pantalla
        close: true,
      });

      // Mostrar la notificación
      myToast.showToast();
    } else {
      setSelectedJobPost(job);
      setShowDescription(true);
    }
  };

  const handleApply = async (jobId: string) => {
    console.log(jobId, "esto es jobId cuando clickeo en apply"); // Aquí deberías ver el id del trabajo seleccionado

    try {
      await postListMe({ id: jobId }).unwrap();
      alert("Application successful!");
    } catch (error) {
      console.error("Failed to apply:", error);
      alert("Failed to apply");
    }
  };
  const handleCloseDescription = () => {
    setShowDescription(false);
    setSelectedJobPost(null);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const totalPages = Math.ceil((data?.count ?? 0) / 10);
  console.log(data?.count);

  return (
    <div className="md:px-[124px] mobile:px-[30px]">
      <BannerCategory
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        selectedCountry={selectedCountry}
        handleCountryChange={handleCountryChange}
        count={data?.count}
      />

      <div
        className={`container mx-auto ${
          isLoading ? "mt-[80px]" : "mt-[100px]"
        } mb-[40px] gap-[20px] items-start md:flex-row md:items-start mobile:flex-col mobile:items-center`}>
        <div className="flex flex-col">
          {isLoading || isFetching ? (
            <div className="w-full flex flex-row gap-2 justify-center items-center mb-[60px]">
              <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce"></div>
              <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.5s]"></div>
            </div>
          ) : (
            ""
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {data?.publicationsFind &&
              data.publicationsFind.length > 0 &&
              data.publicationsFind.map((job) => (
                <CardJobs
                  key={job.id}
                  {...job}
                  onClick={() => handleDescription(job)}
                  onApply={() => handleApply(job.id)} // Pasar el id como argumento
                />
              ))}
          </div>

          {/* Paginado */}
          <div className={`flex items-center justify-center mt-4 ${isLoading && "hidden"}`}>
            <button
              onClick={() => setPage(page - 1)}
              disabled={isFetching || page === 1}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isFetching || page === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#3C65F5] hover:bg-[#3c52f5] text-white"
              }`}>
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="px-4 py-2 text-gray-700">{page}</div>

            <button
              onClick={() => setPage(page + 1)}
              disabled={isFetching || page === totalPages}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isFetching
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#3C65F5] hover:bg-[#3c52f5] text-white"
              }`}>
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {/* Fin Paginado */}
        </div>
        <div>
          <RetractableView show={showDescription} onClose={handleCloseDescription}>
            {selectedJobPost && <RetractableJobInfo selectedJob={selectedJobPost} />}
          </RetractableView>
        </div>
      </div>
    </div>
  );
};

export default SearchJobs;
