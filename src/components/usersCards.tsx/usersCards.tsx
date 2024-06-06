"use client";

import { useState } from "react";
import UserCard from "../userCard/userCard";
import RetractableView from "../RetractableView/RetractableView";
import RetractableUserInfo from "../RetractableUserInfo/RetractableUserInfo";
import { useGetAllUsersQuery } from "@/lib/services/userApi";
import { UserData } from "@/types/userTypes";

const UsersCards = () => {
  const {data} = useGetAllUsersQuery(null);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const handleDescription = (user: UserData | null) => {
    setSelectedUser(user);
    setShowDescription(true);
  };

  return (
    <div className="flex flex-wrap ">
      <div className="mobile:w-full flex items-center flex-wrap z-30 gap-[20px]">
        {data &&
          data.map((user) => (
            <div
              key={user.id}
              className="mobile:w-full  md:w-[25.8rem] hover:scale-95 transition-all duration-300 relative"
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
