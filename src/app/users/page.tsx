import UsersCards from "@/components/usersCards.tsx/usersCards";
import React from "react";
import { usersPreload } from "@/utils/users";

const Users = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users Cards</h1>
      <div className="">
        <UsersCards users={usersPreload} />
      </div>
    </div>
  );
};

export default Users;
