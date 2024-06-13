const Reports = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold my-[10px] mx-[1.5rem]">Reports</h2>
        <div className="grid grid-cols-2 gap-4 m-[1.5rem]">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2">User Registration</h3>
            {/* Render user registration report data */}
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2">Job Posting Activity</h3>
            {/* Render job posting activity report data */}
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2">User Activity</h3>
            {/* Render user activity report data */}
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2">Application Statistics</h3>
            {/* Render application statistics report data */}
          </div>
        </div>
      </div>
    );
  };

  export default Reports