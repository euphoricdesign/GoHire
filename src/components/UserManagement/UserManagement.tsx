const UserManagement = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold my-[10px] mx-[1.5rem]">User Management</h2>
        <div className="overflow-x-auto rounded-3xl">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through user data and render rows */}
              <tr>
                <td className="border px-4 py-2">John Doe</td>
                <td className="border px-4 py-2">john@example.com</td>
                <td className="border px-4 py-2">User</td>
                <td className="border px-4 py-2">
                  <button className="bg-[#3C65F5] hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
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

  export default UserManagement