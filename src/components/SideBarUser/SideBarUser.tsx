"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SlHome } from "react-icons/sl";
import { BsInfoSquare, BsEnvelopeAt } from "react-icons/bs";
import { FaTshirt, FaRedhat } from "react-icons/fa";

interface SideBarUserProps {
  show: boolean;
  setter: () => void;
}

const SideBarUser: React.FC<SideBarUserProps> = ({ show, setter }) => {
  const pathname = usePathname();

  const className =
    "bg-black w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  const MenuItem: React.FC<{ icon: React.ReactNode; name: string; route: string }> = ({
    icon,
    name,
    route,
  }) => {
    const colorClass = pathname === route ? "text-white" : "text-white/50 hover:text-white";

    return (
      <Link
        href={route}
        onClick={setter}
        className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}>
        <div className="text-xl flex [&>*]:mx-auto w-[30px]">{icon}</div>
        <div>{name}</div>
      </Link>
    );
  };

  const ModalOverlay: React.FC = () => (
    <div
      className="flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30"
      onClick={setter}
    />
  );

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className="flex flex-col">
          <MenuItem name="Home" route="/" icon={<SlHome />} />
          <MenuItem name="T-Shirts" route="/t-shirts" icon={<FaTshirt />} />
          <MenuItem name="Hats" route="/hats" icon={<FaRedhat />} />
          <MenuItem name="About Us" route="/about" icon={<BsInfoSquare />} />
          <MenuItem name="Contact" route="/contact" icon={<BsEnvelopeAt />} />
        </div>
      </div>
      {show ? <ModalOverlay /> : null}
    </>
  );
};

export default SideBarUser;
