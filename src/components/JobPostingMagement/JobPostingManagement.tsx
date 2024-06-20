const JobPostingManagement = () => {
    return (
      <div className="">
        <div className="flex justify-between mb-4 items-center">
          <h2 className="text-2xl font-bold my-[10px] mx-[1.5rem]">Job Posting Management</h2>
          <button className="bg-[#3C65F5] hover:bg-blue-400 text-white font-medium py-2 px-4 rounded mr-[1.5rem] my-[10px]">
            Create New Job Posting
          </button>
        </div>
        <div className="overflow-x-auto rounded-3xl">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Company</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through job posting data and render rows */}
              <tr>
                <td className="border px-4 py-2">Software Engineer</td>
                <td className="border px-4 py-2">Acme Inc.</td>
                <td className="border px-4 py-2">San Francisco, CA</td>
                <td className="border px-4 py-2">
                  <button className="bg-[#3C65F5] hover:bg-blue-400 text-white font-medium py-2 px-4 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded ml-2">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  export default JobPostingManagement