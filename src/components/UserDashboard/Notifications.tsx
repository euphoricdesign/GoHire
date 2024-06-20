import React from "react";
import { useGetNotificationsMeQuery } from "@/lib/services/userApi";

interface NotificationsProps {
  notifications: Notification[];
  handleOptionClick: (option: string, notificationType: string) => void;
}
const Notifications: React.FC<NotificationsProps> = ({ handleOptionClick }) => {
  const { data: notifications, isLoading, isError } = useGetNotificationsMeQuery(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading notifications</div>;
  }

  if (!notifications?.length) {
    return <div>No notifications</div>;
  }

  return (
    <div>
      <h1>Notifications</h1>
      {notifications && (
        <div className="">
          <ul>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="border border-gray-300 my-5 shadow-lg flex items-center justify-around">
                <li>
                  <p>{notification.title}</p>
                  <p>{notification.date}</p>
                </li>
                <div>
                  <p
                    onClick={() => handleOptionClick("HandleNotification", notification.type)}
                    className="cursor-pointer text-blue-500 underline">
                    Click here
                  </p>
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;
