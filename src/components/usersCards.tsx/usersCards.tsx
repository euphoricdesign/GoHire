"use client";
import { IUser } from "@/types";
import { useState } from "react";
import UserCard from "../userCard/userCard";
import RetractableView from "../RetractableView/RetractableView";
import RetractableUserInfo from "../RetractableUserInfo/RetractableUserInfo";

const UsersCards = ({ users }: { users: IUser[] }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const handleDescription = (user: IUser | null) => {
    setSelectedUser(user);
    setShowDescription(true);
  };

  return (
    <div className="flex flex-wrap ">
      <div className="flex justify-center items-center flex-wrap z-30 gap-[20px]">
        {users.map((user) => (
          <div
            key={user.id}
            className="hover:scale-95 transition-all duration-300 relative"
            onClick={() => handleDescription(user)}>
            <UserCard {...user} onClick={() => handleDescription(user)} />
          </div>
        ))}
      </div>
      <RetractableView show={showDescription} onClose={() => setShowDescription(false)}>
        {selectedUser && <RetractableUserInfo selectedUser={selectedUser} />}
      </RetractableView>
    </div>
  );
};

export default UsersCards;
