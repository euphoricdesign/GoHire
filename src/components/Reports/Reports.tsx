import JobPostingActivity from "../JobPostingActivity/JobPostingActivity";
import UserRegistrationReport from "../UserRegistrationReport/UserRegistrationReport";

const Reports = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold my-[10px] mx-[1.5rem]">Reports</h2>
        <div className="grid grid-cols-2 gap-4 m-[1.5rem]">
          {/* Render user registration report data */}
          <UserRegistrationReport />
          
          {/* Render job posting activity report data */}
          <JobPostingActivity />
        </div>
      </div>
    );
  };

  export default Reports