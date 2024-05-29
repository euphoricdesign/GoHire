import UsersCards from "@/components/usersCards.tsx/usersCards";
import React from "react";
import { usersPreload } from "@/utils/users";

const Users = () => {
  return (
    <div className="flex justify-center">
      <div className="">
        <UsersCards users={usersPreload} />
      </div>
    </div>
  );
};

export default Users;
