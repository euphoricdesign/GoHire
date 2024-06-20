import React from "react";
import { useGetNotificationsMeQuery } from "@/lib/services/userApi";

interface NotificationsModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  handleOptionClick: (option: string, notificationType?: string) => void;
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({
  showModal,
  handleCloseModal,
  handleOptionClick,
}) => {
  const { data: notifications } = useGetNotificationsMeQuery(null);

  return (
    <>
      {showModal && (
        <div className="absolute top-[3.5rem] w-[16rem] bg-white gap-4 right-[125px] px-1 h-[22rem] rounded shadow-md">
          <div className="flex flex-col items-center">
            <h5 className="text-base font-medium text-[#05264E] mt-5">Your Notifications</h5>
            {notifications && notifications.length > 0 ? (
              <div className="w-full">
                <ul>
                  {notifications.map((notification) => (
                    <div
                      onClick={() => handleOptionClick("HandleNotification", notification.type)}
                      key={notification.id}
                      className="border cursor-pointer border-gray-300 py-4 flex items-center justify-around hover:bg-[#93B4FF] transition-all duration-500">
                      <li>
                        <p>{notification.title}</p>
                        <p>{notification.date}</p>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            ) : (
              <div>You don't have notifications</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationsModal;
