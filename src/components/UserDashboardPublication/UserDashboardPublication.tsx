import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetail } from "@/lib/features/slices/userSlice";
import {
  useGetAllPublicationQuery,
  useUpdateJobMutation,
} from "@/lib/services/jobsApi";
import { JobsData } from "@/types/jobsTypes";
import CardJobs from "../../components/CardJobs/CardJobs";
import Toastify from "toastify-js";

const UserDashboardPublication = () => {
  const { user, isLoading: userLoading } = useUser();
  const { data, isLoading: publicationLoading } =
    useGetAllPublicationQuery(null);

  const [selectedJobPost, setSelectedJobPost] = useState<JobsData | null>(null);
  const [showDescription, setShowDescription] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const userDetail = useSelector(selectUserDetail);

  const handleDescription = (job: JobsData | null) => {
    if (!userDetail) {
      const myToast = Toastify({
        text: "You must be logged in to apply for a job",
        className: "toastify",
        position: "left",
        gravity: "bottom",
        duration: 999999999,
        close: true,
      });
      myToast.showToast();
    } else {
      setSelectedJobPost(job);
      setShowDescription(true);
    }
  };

  const [updateJob] = useUpdateJobMutation();

  const handleEdit = async (updatedJob: Partial<JobsData>) => {
    if (selectedJobPost) {
      try {
        await updateJob({ id: selectedJobPost.id, updatedJob });
        setSelectedJobPost(null);
        setIsEditing(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filteredJobsByUser = data?.publicationsFind?.filter(
    (jobItem) => jobItem.user.email === user?.email
  );

  console.log("jobs en search all: ", filteredJobsByUser);

  if (userLoading || publicationLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {user && userDetail && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {filteredJobsByUser && filteredJobsByUser.length > 0 ? (
            filteredJobsByUser.map((job) => (
              <CardJobs
                key={job.id}
                {...job}
                onClick={() => handleDescription(job)}
                onEdit={handleEdit}
                isEditable={true}
              />
            ))
          ) : (
            <p>No publications found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDashboardPublication;
