import UsersCards from "@/components/usersCards.tsx/usersCards";
import React from "react";

const Users = () => {
  return (
    <div className="flex mt-[100px] md:px-[124px] mobile:px-[30px]">
      <div className="">
        <UsersCards />
      </div>
    </div>
  );
};

export default Users;
