import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetail } from "@/lib/features/slices/userSlice";
import {
  useGetAllPublicationQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
} from "@/lib/services/jobsApi";
import { JobsData } from "@/types/jobsTypes";
import CardJobs from "../../components/CardJobs/CardJobs";
import Toastify from "toastify-js";
import { useGetUserMeQuery } from "@/lib/services/userApi";
import Link from "next/link";

const UserDashboardPublication = () => {
  const { user, isLoading: userLoading } = useUser();
  const { data, isLoading: publicationLoading, refetch } = useGetAllPublicationQuery(null);
  const {
    data: userMe,
    error: getUserError,
    isLoading: getUserLoading,
    refetch: reload,
  } = useGetUserMeQuery(null);

  const [selectedJobPost, setSelectedJobPost] = useState<JobsData | null>(null);
  const [showDescription, setShowDescription] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

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
  const [deleteJob] = useDeleteJobMutation(); // Usa la mutación de eliminación

  const handleEdit = async (updatedJob: Partial<JobsData>) => {
    if (selectedJobPost) {
      try {
        await updateJob({ id: selectedJobPost.id, updatedJob }).unwrap();
        const myToast = Toastify({
          text: "The publication was successfully updated",
          className: "toastify",
          position: "right",
          gravity: "bottom",
          duration: 3000,
          close: true,
          backgroundColor: "green",
        });
        myToast.showToast();
        setSelectedJobPost(null);
        setIsEditing(false);
        refetch(); // Vuelve a obtener los datos después de la actualización
      } catch (error) {
        const myToast = Toastify({
          text: "Failed to update the publication!",
          className: "toastify",
          position: "right",
          gravity: "bottom",
          duration: 3000,
          close: true,
          backgroundColor: "red",
        });
        myToast.showToast();
        console.log(error);
      }
    }
  };

  const handleDelete = async (jobId: string) => {
    try {
      await deleteJob({ id: jobId }).unwrap();
      const myToast = Toastify({
        text: "The publication was successfully deleted",
        className: "toastify",
        position: "right",
        gravity: "bottom",
        duration: 3000,
        close: true,
        backgroundColor: "green",
      });
      myToast.showToast();
      refetch(); // Vuelve a obtener los datos después de la eliminación
    } catch (error) {
      const myToast = Toastify({
        text: "Failed to delete the publication!",
        className: "toastify",
        position: "right",
        gravity: "bottom",
        duration: 3000,
        close: true,
        backgroundColor: "red",
      });
      myToast.showToast();
      console.log(error);
    }
  };

  const filteredJobsByUser = data?.publicationsFind?.filter(
    (jobItem) => jobItem.user?.email === user?.email
  );

  if (userLoading || publicationLoading || getUserLoading) {
    return (
      <div className="w-full flex flex-row gap-2 justify-center items-center mb-[60px]">
        <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.5s]"></div>
      </div>
    );
  }

  if (getUserError) {
    return <div>Error: {getUserError.toString()}</div>;
  }

  return (
    <div>
      {user && userDetail && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {filteredJobsByUser && filteredJobsByUser.length > 0 ? (
            filteredJobsByUser.map((job) => (
              <div key={job.id} className="">
                <CardJobs
                  key={job.id}
                  {...job}
                  onClick={() => handleDescription(job)}
                  onEdit={handleEdit}
                  onDelete={() => handleDelete(job.id)}
                  isEditable={true}
                />
              </div>
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
