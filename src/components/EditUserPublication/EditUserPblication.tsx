import React, { useState } from "react";
import { useUpdateJobMutation } from "@/lib/services/jobsApi";
import { JobsPostData } from "@/types/jobsTypes";

interface EditJobFormProps {
  job: JobsPostData;
  jobId: string;
}

const EditUserPublication: React.FC<EditJobFormProps> = ({ job, jobId }) => {
  const [updateJob, { isLoading, isSuccess, isError }] = useUpdateJobMutation();
  const [formData, setFormData] = useState<Partial<JobsPostData>>(job);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateJob({ id: jobId, updatedJob: formData });
      if (isSuccess) {
        // Handle successful update (e.g., show a success message or redirect)
      }
    } catch (error) {
      if (isError) {
        // Handle error (e.g., show an error message)
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category || ""}
          onChange={handleChange}
        />
      </div>
      {/* Añade más campos según sea necesario */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Job"}
      </button>
    </form>
  );
};

export default EditUserPublication;
