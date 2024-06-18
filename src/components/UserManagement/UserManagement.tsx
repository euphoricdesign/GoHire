'use client'
import { useGetAllActiveUsersQuery, useGetAllBlockedUsersQuery, useGetAllUsersQuery } from "@/lib/services/userApi";
import { UserData, UsersData } from "@/types/userTypes";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// users verbo DELETE

const UserManagement = () => {
  const [refresh, setRefresh] = useState(false); // Estado para forzar recarga
  const [viewBlocked, setViewBlocked] = useState(false); // Estado para cambiar entre usuarios activos y bloqueados

  const { data: activeUsers, refetch: refetchActive } = useGetAllActiveUsersQuery(null);
  const { data: blockedUsers, refetch: refetchBlocked } = useGetAllBlockedUsersQuery(null);

  const MySwal = withReactContent(Swal);

  const handleDelete = async (id: any) => {
    await fetch(`http://localhost:3001/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    setRefresh(prev => !prev); // Actualiza el estado para forzar recarga
  };

  const handleUnblock = async (id: any) => {
    await fetch(`http://localhost:3001/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    setRefresh(prev => !prev); // Actualiza el estado para forzar recarga
  };

  const confirmBlock = (id: any) => {
    MySwal.fire({
      title: '¿Estás seguro de bloquear a este usuario?',
      text: "Dicho usuario no podrá volver a loguearse en la aplicación",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#60D394',
      cancelButtonColor: '#EE6055',
      confirmButtonText: 'Sí, deseo realizar esta acción'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id).then(() => {
          Swal.fire(
            '¡Usuario bloqueado!',
            'Has deshabilitado a este usuario.',
            'success'
          );
        });
      }
    });
  };

  const confirmUnblock = (id: any) => {
    MySwal.fire({
      title: '¿Estás seguro de desbloquear a este usuario?',
      text: "Dicho usuario podrá volver a loguearse en la aplicación",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#60D394',
      cancelButtonColor: '#EE6055',
      confirmButtonText: 'Sí, deseo realizar esta acción'
    }).then((result) => {
      if (result.isConfirmed) {
        handleUnblock(id).then(() => {
          Swal.fire(
            '¡Usuario desbloqueado!',
            'Has habilitado a este usuario.',
            'success'
          );
        });
      }
    });
  };

  useEffect(() => {
    if (viewBlocked) {
      refetchBlocked(); // Vuelve a cargar los datos de usuarios bloqueados cuando cambia el estado refresh
    } else {
      refetchActive(); // Vuelve a cargar los datos de usuarios activos cuando cambia el estado refresh
    }
  }, [refresh, viewBlocked, refetchActive, refetchBlocked]);

  return (
    <div className="">
      <div className="flex justify-between items-center mx-[1.5rem] mb-[10px]">
      <h2 className="text-2xl font-bold my-[10px] mr-[1.5rem]">User Management</h2>
        <button
          onClick={() => setViewBlocked(!viewBlocked)}
          className="bg-[#3C65F5] hover:bg-blue-400 text-white font-medium py-2 px-4 rounded mr-[1.5rem] my-[10px]"
        >
          {viewBlocked ? 'Ver Usuarios Activos' : 'Ver Usuarios Bloqueados'}
        </button>
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
                  {blockedUsers.map((user:any) => (
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
                  {activeUsers.map((user:any) => (
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
            <div className="w-full flex flex-row gap-2 justify-center items-center mb-[60px]">
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
