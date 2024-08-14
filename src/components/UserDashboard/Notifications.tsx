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
    return (
      <div>
        <h2 className="font-bold text-2xl py-2">Your Notifications:</h2>
        <div className="mb-[350px] text-lg">You have not received any notification yet.</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications && (
        <div className="">
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="border border-gray-300 rounded-lg shadow-lg p-4">
                <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="font-semibold">{notification.title}</p>
                    <p className="text-sm text-gray-500">{notification.date}</p>
                  </div>
                  <div>
                    <p
                      onClick={() => handleOptionClick("HandleNotification", notification.type)}
                      className="cursor-pointer text-blue-500 underline text-sm">
                      Click here
                    </p>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;
