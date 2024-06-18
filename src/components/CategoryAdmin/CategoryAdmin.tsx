import React from "react";
import Link from "next/link";

const ButtonCategory: React.FC = () => {
  return (
    <Link href="/addAdminForm" legacyBehavior className="">
      <a
        className="mt-0 mb-5 text-sm border-none w-26 p-2.5 h-10 rounded text-white font-medium bg-[#3C65F5] cursor-pointer transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-80 md:mb-0 md:block hidden"
      >
        Create Category
      </a>
    </Link>
  );
};

export default ButtonCategory;
