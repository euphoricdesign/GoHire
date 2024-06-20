"use client";
import { useState, useEffect } from "react";
import UserCard from "../userCard/userCard";
import RetractableView from "../RetractableView/RetractableView";
import RetractableUserInfo from "../RetractableUserInfo/RetractableUserInfo";
import { useListUsersQuery } from "@/lib/services/userApi";
import { UserData } from "@/types/userTypes";
import SendMessageModal from "../Modals/SendMessageModal";
import { useSelector } from "react-redux";
import { selectUserDetail } from "@/lib/features/slices/userSlice";
import Toastify from "toastify-js";
import InvitationModal from "../Modals/InvitationModal";
import { usePostInvitationMutation } from "@/lib/services/jobsApi";

const UsersCards = () => {
  const [page, setPage] = useState(1);
  const {
    data: paginatedUsersResponse,
    isLoading: isPaginatedUsersLoading,
    isFetching,
  } = useListUsersQuery(page);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [invitationModal, setInvitationModal] = useState(false);
  const [postInvitation] = usePostInvitationMutation();

  const userDetail = useSelector(selectUserDetail);

  useEffect(() => {
    setPage(page);
  }, [paginatedUsersResponse]);

  const handleDescription = (user: UserData | null) => {
    setSelectedUser(user);
    setShowDescription(true);
  };

  const totalPages = Math.ceil((paginatedUsersResponse?.count ?? 0) / 10);

  const handleInvitationModal = (user: UserData) => {
    setSelectedUser(user);
    setInvitationModal(true);
  };

  const handleCloseInvitationModal = () => {
    setInvitationModal(false);
    setSelectedUser(null);
  };

  const handleOpenModal = (user: UserData) => {
    if (!userDetail) {
      // Crear una instancia de notificación
      const myToast = Toastify({
        text: "You must be logged in to send a message",
        className: "toastify",
        position: "left",
        gravity: "bottom",
        duration: 999999999, // Duración muy grande para simular permanencia en pantalla
        close: true,
      });

      // Mostrar la notificación
      myToast.showToast();
    } else {
      setSelectedUser(user);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleInvitationSubmit = async (formData: {
    jobDescription: string;
    payPerHour: number;
    issue: string;
    location: string;
    startDate: string;
  }) => {
    try {
      if (!selectedUser) {
        throw new Error("No user selected");
      }
      const response = await postInvitation({
        id: selectedUser.id,
        jobDescription: formData.jobDescription,
        payPerHour: formData.payPerHour,
        issue: formData.issue,
        location: formData.location,
        startDate: formData.startDate,
      }).unwrap();
      console.log("Invitation sent successfully:", response);
      Toastify({
        text: "Invitation sent successfully",
        className: "toastify",
        position: "left",
        gravity: "bottom",
        duration: 3000,
        close: true,
      }).showToast();
      handleCloseInvitationModal();
    } catch (error: any) {
      console.error("Failed to send invitation:", error);
      const errorMessages = error.data?.message || ["Failed to send invitation"];
      setFormErrors(errorMessages);
      Toastify({
        text: "Failed to send invitation",
        className: "toastify",
        position: "left",
        gravity: "bottom",
        duration: 3000,
        close: true,
      }).showToast();
    }
  };

  if (!paginatedUsersResponse?.usersFind || paginatedUsersResponse.usersFind.length === 0) {
    return (
      <div className="w-full flex flex-row gap-2 justify-center items-center my-[200px]">
        <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.5s]"></div>
      </div>
    );
  }

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
                onInvitationClick={() => handleInvitationModal(user)}
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
      <InvitationModal
        isOpen={invitationModal}
        onRequestClose={handleCloseInvitationModal}
        selectedUser={selectedUser}
        onSubmit={handleInvitationSubmit} // Pasa la función de manejo de la invitación
        formErrors={[]}
      />

      {/* Renderiza errores del formulario si existen */}
      {formErrors.length > 0 && (
        <div className="error-messages">
          {formErrors.map((error, index) => (
            <div key={index} className="error-message">
              {error}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersCards;
