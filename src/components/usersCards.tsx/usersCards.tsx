"use client";
import { IUser } from "@/types";
import { useState, useEffect } from "react";
import UserCard from "../userCard/userCard";
import RetractableView from "../RetractableView/RetractableView";
import RetractableUserInfo from "../RetractableUserInfo/RetractableUserInfo";
import { useListUsersQuery } from "@/lib/services/userApi";
import Modal from "react-modal";

const UsersCards = () => {
  const [page, setPage] = useState(1);
  const {
    data: paginatedUsersResponse,
    isLoading: isPaginatedUsersLoading,
    isFetching,
  } = useListUsersQuery(page);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("Paginated Users:", paginatedUsersResponse);
    setPage(page);
  }, [paginatedUsersResponse]);

  const handleDescription = (user: IUser | null) => {
    setSelectedUser(user);
    setShowDescription(true);
  };

  if (isPaginatedUsersLoading) {
    return <div>Loading...</div>;
  }

  if (!paginatedUsersResponse || paginatedUsersResponse.length === 0) {
    return <div>No users available.</div>;
  }

  console.log(paginatedUsersResponse, "esto es la respuesta del back");

  const handleOpenModal = (user: IUser) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-wrap">
      <div className="mobile:w-full flex items-center flex-wrap z-30 gap-[20px]">
        {paginatedUsersResponse &&
          paginatedUsersResponse.map((user: IUser) => (
            <div
              key={user.id}
              className="mobile:w-full md:w-[25.8rem] hover:scale-95 transition-all duration-300 relative"
              onClick={() => handleDescription(user)}>
              <UserCard
                {...user}
                onClick={() => handleDescription(user)}
                onMessageClick={() => handleOpenModal(user)}
              />
            </div>
          ))}
      </div>
      <RetractableView show={showDescription} onClose={() => setShowDescription(false)}>
        {selectedUser && <RetractableUserInfo selectedUser={selectedUser} />}
      </RetractableView>
      <div className="w-full flex justify-center mt-4">
        <button onClick={() => setPage(page - 1)} disabled={isFetching || page === 1}>
          Previous
        </button>
        <div>{page}</div>
        <button onClick={() => setPage(page + 1)} disabled={isFetching}>
          Next
        </button>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel="Send Message Modal"
        ariaHideApp={false}
        className="fixed inset-0 flex items-center justify-center z-50 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto z-50">
          <h2 className="text-xl font-bold mb-4">Send a Message to {selectedUser?.name}</h2>
          <button
            onClick={handleCloseModal}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UsersCards;
