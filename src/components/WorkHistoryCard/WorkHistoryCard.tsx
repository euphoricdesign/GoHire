import React from "react";
import { JobsHistory } from "@/types/jobsTypes";

const WorkHistoryCard = ({ title, company, testimonial, startDate, endDate }: JobsHistory) => {
  return (
    <div className="border p-4 rounded-md shadow-md mb-4">
      <h4 className="font-bold text-lg">
        {title} en {company}
      </h4>
      <p className="text-sm text-gray-600">
        {startDate} - {endDate}
      </p>
      <div className="mt-3">
        <h2 className="font-bold">Feedback:</h2>
        <p className="mt-2">"{testimonial}"</p>
      </div>
    </div>
  );
};

export default WorkHistoryCard;
