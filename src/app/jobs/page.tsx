"use client"

import React from 'react';
import CardJobs from '../../components/CardJobs/CardJobs';
import jobData from '../../components/CardJobs/jobs.json';
const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {jobData.users.map((user, index) => (
        <CardJobs  key={index} {...user} />
      ))}
    </div>
  );
}

export default Home;
