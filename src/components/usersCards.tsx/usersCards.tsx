"use client";
import { useState, useEffect } from "react";
import UserCard from "../userCard/userCard";
import RetractableView from "../RetractableView/RetractableView";
import RetractableUserInfo from "../RetractableUserInfo/RetractableUserInfo";
import { useListUsersQuery } from "@/lib/services/userApi";
import { UserData } from "@/types/userTypes";
import SendMessageModal from "../Modals/SendMessageModal";

const UsersCards = () => {
  const [page, setPage] = useState(1);
  const {
    data: paginatedUsersResponse,
    isLoading: isPaginatedUsersLoading,
    isFetching,
  } = useListUsersQuery(page);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setPage(page);
  }, [paginatedUsersResponse]);

  const handleDescription = (user: UserData | null) => {
    setSelectedUser(user);
    setShowDescription(true);
  };

  if (isPaginatedUsersLoading) {
    return <div>Loading...</div>;
  }

  if (!paginatedUsersResponse || paginatedUsersResponse.length === 0) {
    return <div>No users available.</div>;
  }

  const handleOpenModal = (user: UserData) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-wrap">
      <div className="mobile:w-full flex items-center flex-wrap z-30 gap-[16px]">
        {paginatedUsersResponse &&
          paginatedUsersResponse.map((user: UserData) => (
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
      <SendMessageModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default UsersCards;
