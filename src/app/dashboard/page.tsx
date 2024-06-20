'use client'
import UserDashboard from "@/components/UserDashboard/UserDashboard";
import { RootState } from "@/lib/store";
import React from "react";
import { useSelector } from "react-redux";
import AdminDashboard from "./manager/page";

const Profile = () => {

  const role = useSelector((state: RootState) => state.user.userDetail?.role)
  return (
    <div>
      {
        role === 'ADMIN' ? (
          <AdminDashboard /> 
        ) : (
          <UserDashboard />
        )
      }
    </div>
  );
};

export default Profile;
