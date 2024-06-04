import UsersCards from "@/components/usersCards.tsx/usersCards";
import React from "react";
import { usersPreload } from "@/utils/users";

const Users = () => {
  return (
    <div className="flex mt-[100px] md:px-[124px] mobile:px-[30px]">
      <div className="">
        <UsersCards users={usersPreload} />
      </div>
    </div>
  );
};

export default Users;
