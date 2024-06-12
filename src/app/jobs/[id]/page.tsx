"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { JobsData } from "@/types/jobsTypes";
import JobInfo from "@/components/JobsInfo/JobsInfo";
import { ToastContainer } from 'react-toastify';
import { useGetAllJobsQuery } from '@/lib/services/jobsApi';
import 'react-toastify/dist/ReactToastify.css';

const JobDetail: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetAllJobsQuery(null);
  const [job, setJob] = useState<JobsData | null>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const filteredJob = data.find(jobItem => jobItem.id === id);
      setJob(filteredJob || null);
    }
  }, [data, id]);

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
