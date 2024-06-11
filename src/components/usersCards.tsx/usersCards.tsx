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

  if (!paginatedUsersResponse?.usersFind || paginatedUsersResponse.usersFind.length === 0) {
    return (
      <div className="w-full flex flex-row gap-2 justify-center items-center">
        <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.5s]"></div>
      </div>
    );
  }

  const totalPages = Math.ceil((paginatedUsersResponse.count ?? 0) / 10);

  const handleOpenModal = (user: UserData) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-wrap justify-center">
      <div className="mobile:w-full flex items-center flex-wrap z-30 gap-[16px]">
        {paginatedUsersResponse.usersFind &&
          paginatedUsersResponse.usersFind.map((user: UserData) => (
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
      {/* Paginado */}
      <div className={`flex items-center justify-center mt-4`}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={isFetching || page === 1}
          className={`p-2 rounded-full transition-colors duration-300 ${
            isFetching || page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#3C65F5] hover:bg-[#3c52f5] text-white"
          }`}>
          <svg
            className="w-5 h-5 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="px-4 py-2 text-gray-700">{page}</div>

        <button
          onClick={() => setPage(page + 1)}
          disabled={isFetching}
          className={`p-2 rounded-full transition-colors duration-300 ${
            isFetching
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#3C65F5] hover:bg-[#3c52f5] text-white"
          }`}>
          <svg
            className="w-5 h-5 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {/* Fin Paginado */}
      <SendMessageModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default UsersCards;
