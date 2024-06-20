"use client";
import React, { useEffect, useState } from "react";
import JobInfo from "@/components/JobsInfo/JobsInfo";
import { ToastContainer } from "react-toastify";
import { useGetJobByIdQuery } from "@/lib/services/jobsApi";
import "react-toastify/dist/ReactToastify.css";

const JobDetail = ({ params }: { params: { id: string } }) => {
  const { data: jobArray, error, isLoading } = useGetJobByIdQuery({ id: params.id });
  const job = jobArray ? jobArray[0] : null;
  console.log("job: ", job);
  return (
    <div className="container mx-auto">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        {job ? (
          <JobInfo selectedJob={job} />
        ) : (
          <div className="w-full flex flex-row gap-2 justify-center items-center my-[278px]">
            <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.5s]"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
