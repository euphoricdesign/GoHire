'use client'
import { useGetAllActiveUsersQuery, useGetAllBlockedUsersQuery } from "@/lib/services/userApi";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const UserManagement = () => {
  const [refresh, setRefresh] = useState(false);
  const [viewBlocked, setViewBlocked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: activeUsers, refetch: refetchActive } = useGetAllActiveUsersQuery(null);
  const { data: blockedUsers, refetch: refetchBlocked } = useGetAllBlockedUsersQuery(null);

  const MySwal = withReactContent(Swal);

  const handleDelete = async (id: any) => {
    await fetch(`https://gohire-back-production.up.railway.app/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    setRefresh(prev => !prev);
  };

  const handleUnblock = async (id: any) => {
    await fetch(`https://gohire-back-production.up.railway.app/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    setRefresh(prev => !prev);
  };

  const confirmBlock = (id: any) => {
    MySwal.fire({
      title: 'Are you sure to block this user?',
      text: 'This user will not be able to log in to the application again.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#60D394',
      cancelButtonColor: '#EE6055',
      confirmButtonText: 'Yes, I want to perform this action'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id).then(() => {
          Swal.fire(
            'Blocked user!',
            'You have disabled this user.',
            'success'
          );
        });
      }
    });
  };

  const confirmUnblock = (id: any) => {
    MySwal.fire({
      title: 'Are you sure to unblock this user?',
      text: "This user can log in to the application again.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#60D394',
      cancelButtonColor: '#EE6055',
      confirmButtonText: 'Yes, I want to perform this action'
    }).then((result) => {
      if (result.isConfirmed) {
        handleUnblock(id).then(() => {
          Swal.fire(
            'Unlocked user!',
            'You have enabled this user.',
            'success'
          );
        });
      }
    });
  };

  const filteredUsers = (users: any[]) => {
    return users.filter((user) => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  useEffect(() => {
    if (viewBlocked) {
      refetchBlocked();
    } else {
      refetchActive();
    }
  }, [refresh, viewBlocked, refetchActive, refetchBlocked]);



  return (
    <div className="">
      <div className="flex justify-between items-center mx-[1.5rem] mb-[10px]">
        <h2 className="text-2xl font-bold my-[10px] mr-[1.5rem]">User Management</h2>
        <button
          onClick={() => setViewBlocked(!viewBlocked)}
          className="bg-[#3C65F5] hover:bg-blue-400 text-white font-medium py-2 px-4 rounded my-[10px]"
        >
          {viewBlocked ? 'View Active Users' : 'View Blocked Users'}
        </button>
      </div>
      <div className="mx-[1.5rem] mb-[10px]">
        <input 
          type="text" 
          placeholder="Search by name or email..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      {
        viewBlocked ? (
          blockedUsers ? (
            <div className="overflow-x-auto rounded-3xl h-[500px]">
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
                  {filteredUsers(blockedUsers).map((user: any) => (
                    <tr key={user.id}>
                      <td className="border px-4 py-2">{user.name}</td>
                      <td className="border px-4 py-2">{user.email}</td>
                      <td className="border px-4 py-2">{user.role}</td>
                      <td className="border px-4 py-2">
                        <button onClick={() => confirmUnblock(user.id)} className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded ml-2">
                          Unblock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full flex flex-row gap-2 justify-center items-center mb-[60px]">
              <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce"></div>
              <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.5s]"></div>
            </div>
          )
        ) : (
          activeUsers ? (
            <div className="overflow-x-auto rounded-3xl h-[500px]">
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
                  {filteredUsers(activeUsers).map((user: any) => (
                    <tr key={user.id}>
                      <td className="border px-4 py-2">{user.name}</td>
                      <td className="border px-4 py-2">{user.email}</td>
                      <td className="border px-4 py-2">{user.role}</td>
                      <td className="border px-4 py-2">
                        <button onClick={() => confirmBlock(user.id)} className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded ml-2">
                          Block
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full flex flex-row gap-2 justify-center items-center mt-[40px] mb-[60px]">
              <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce"></div>
              <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.5s]"></div>
            </div>
          )
        )
      }
    </div>
  );
};

export default UserManagement;
