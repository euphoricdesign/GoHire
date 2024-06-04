// "use client";
// import React, { useEffect, useState } from "react";
// import CardJobs from "../../components/CardJobs/CardJobs";
// import { jobsPreload } from "@/utils/jobsPosts";
// import { usersPreload } from "@/utils/users";
// import { IJobPost } from "@/types";
// import RetractableView from "@/components/RetractableView/RetractableView";
// import RetractableJobInfo from "@/components/RetractableJobInfo/RetractableJobInfo";

// const SearchJobs = ({ jobsPosts }: { jobsPosts: IJobPost[] }) => {
//   const [filteredJobs, setFilteredJobs] = useState<IJobPost[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedLocation, setSelectedLocation] = useState("");
//   const [selectedJobPost, setSelectedJobPost] = useState<IJobPost | null>(null);
//   const [showDescription, setShowDescription] = useState(false);

//   useEffect(() => {
//     applyFilters();
//   }, [selectedCategory, selectedLocation]);

//   const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedCategory(event.target.value);
//   };

//   const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedLocation(event.target.value);
//   };

//   const applyFilters = () => {
//     let filteredJobs = jobsPreload.map((job) => {
//       const user = usersPreload.find((user) => user.id === job.userId);
//       return {
//         ...job,
//         user,
//       };
//     });

//     if (selectedCategory) {
//       filteredJobs = filteredJobs.filter((job) => job.professions.includes(selectedCategory));
//     }

//     setFilteredJobs(filteredJobs);
//   };

//   useEffect(() => {
//     setFilteredJobs(
//       jobsPreload.map((job) => {
//         const user = usersPreload.find((user) => user.id === job.userId);
//         return {
//           ...job,
//           user,
//         };
//       })
//     );
//   }, []);

//   const handleDescription = (jobPost: IJobPost | null) => {
//     setSelectedJobPost(jobPost);
//     setShowDescription(true);
//   };

//   const handleCloseDescription = () => {
//     setShowDescription(false);
//     setSelectedJobPost(null);
//   };

//   return (
//     <div className="px-[124px]">
//       <div className="container mx-auto mt-[100px] flex gap-[20px] items-start">
//         <div className="flex justify-center mb-4 flex-col gap-[20px]">
//           <div className="mr-4">
//             <select
//               id="category"
//               value={selectedCategory}
//               onChange={handleCategoryChange}
//               className="custom-select">
//               <option value="">Filter by category</option>
//               <option value="Developer">Developer</option>
//               <option value="Designer">Designer</option>
//               <option value="Content Writer">Content Writer</option>
//               <option value="Manager">Manager</option>
//               <option value="Video Editor">Video Editor</option>
//               <option value="Data Analyst">Data Analyst</option>
//               <option value="Engineer">Engineer</option>
//             </select>
//           </div>

//           <div>
//             <select
//               id="location"
//               value={selectedLocation}
//               onChange={handleLocationChange}
//               className="custom-select">
//               <option value="">Filter by location</option>
//               <option value="Ciudad 1">Ciudad 1</option>
//               <option value="Ciudad 2">Ciudad 2</option>
//             </select>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
//           {filteredJobs.map((jobPost) => (
//             <div
//               key={jobPost.id}
//               className="hover:scale-95 transition-all duration-300 relative"
//               onClick={() => handleDescription(jobPost)}>
//               <CardJobs {...jobPost} onClick={() => handleDescription(jobPost)} />
//             </div>
//           ))}
//         </div>
//       </div>
//       <div>
//         <RetractableView show={showDescription} onClose={handleCloseDescription}>
//           {selectedJobPost && <RetractableJobInfo selectedJob={selectedJobPost} />}
//         </RetractableView>
//       </div>
//     </div>
//   );
// };

// export default SearchJobs;

"use client";

import React, { useState } from "react";
import CardJobs from "../../components/CardJobs/CardJobs";
import jobData from "../../utils/jobs.json";
import { useGetAllJobsQuery } from "@/lib/services/jobsApi";
import { JobsData } from "@/types/jobsTypes";
import RetractableJobInfo from "@/components/RetractableJobInfo/RetractableJobInfo";
import RetractableView from "@/components/RetractableView/RetractableView";

const SearchJobs: React.FC = () => {
  const { data, error, isLoading, isFetching } = useGetAllJobsQuery(null);

  const [selectedJobPost, setSelectedJobPost] = useState<JobsData | null>(null);
  const [showDescription, setShowDescription] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(jobData.users);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleDescription = (job: JobsData | null) => {
    setSelectedJobPost(job);
    setShowDescription(true);
  };

  const handleCloseDescription = () => {
    setShowDescription(false);
    setSelectedJobPost(null);
  };

  if (error) return <p>Some Error</p>;

  // useEffect(() => {
  //   applyFilters()
  // }, [selectedCategory, selectedLocation])

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(event.target.value);
  };

  const applyFilters = () => {
    let filtered = jobData.users;

    if (selectedCategory) {
      filtered = filtered.filter((user) => user.category === selectedCategory);
    }

    // if (selectedLocation) {
    //   filtered = filtered.filter(product => product.location === selectedLocation)
    // }

    setFilteredProducts(filtered);
  };

  return (
    <div className="md:px-[124px] mobile:px-[30px]">
      <div className="container mx-auto mt-[100px] flex gap-[20px] items-start md:flex-row md:items-start mobile:flex-col mobile:items-center">
        <div className="flex justify-center mb-4 flex-col gap-[20px]">
          <div className="mr-4">
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="custom-select">
              <option value="">Filter by category</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Data Scientist">Data Scientist</option>
            </select>
          </div>

          <div>
            <select
              id="location"
              value={selectedLocation}
              onChange={handleLocationChange}
              className="custom-select">
              <option value="">Filter by location</option>
              <option value="Ciudad 1">Ciudad 1</option>
              <option value="Ciudad 2">Ciudad 2</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {isLoading || isFetching ?<p>Loading...</p>: " "}
          {data?.map((job:any, index:any) => (
            <CardJobs  key={index} {...job} />
          ))}
        </div>
        {/* onClick={() => handleDescription(job)} */}
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
