import UsersCards from "@/components/usersCards.tsx/usersCards";
import React from "react";

const Users = () => {
  return (
    <div className="flex mt-[100px] justify-center mobile:px-[30px]">
      <div className="">
        <UsersCards />
      </div>
    </div>
  );
};

export default Users;
