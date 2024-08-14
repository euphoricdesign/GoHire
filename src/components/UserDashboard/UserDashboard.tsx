"use client";
import React, { Suspense } from "react";
import UserDashboardContent from "./UserDashboardContent";
import { useGetUserMeQuery } from "@/lib/services/userApi";
import UserDashboardContentSkeleton from "../UserDashboardContentSkeleton/UserDashboardContentSkeleton";

const UserDashboard = () => {

  const { isLoading } = useGetUserMeQuery(null)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {
        isLoading ? (
          <UserDashboardContentSkeleton />
        ) : (
          <UserDashboardContent />
        )
      }
      
    </Suspense>
  );
};

export default UserDashboard;
