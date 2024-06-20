"use client";
import React, { Suspense } from "react";
import UserDashboardContent from "./UserDashboardContent";

const UserDashboard = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserDashboardContent />
    </Suspense>
  );
};

export default UserDashboard;
