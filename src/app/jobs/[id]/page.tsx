"use client";
import React, { useEffect, useState } from "react";
import JobInfo from "@/components/JobsInfo/JobsInfo";
import { ToastContainer } from 'react-toastify';
import { useGetJobByIdQuery } from '@/lib/services/jobsApi';
import 'react-toastify/dist/ReactToastify.css';

const JobDetail= ({ params }: { params: { id: string } }) => {
  const { data: jobArray, error, isLoading } = useGetJobByIdQuery({ id: params.id });
  const job = jobArray ? jobArray[0] : null; 
console.log("job: ", job)
  return (
    <div className="container mx-auto">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        {isLoading || !job &&  <div>Loading...</div>}
        {job ? (
          <JobInfo selectedJob={job} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
