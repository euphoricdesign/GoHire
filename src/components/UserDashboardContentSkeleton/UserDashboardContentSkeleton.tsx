import React from 'react';

const UserDashboardContentSkeleton = () => {
  return (
    <div className="px-[30px] sm:px-6 md:px-[124px] mt-[100px] sm:mt-12 md:mt-[100px] mb-8 sm:mb-12 md:mb-16 flex flex-col md:flex-row justify-start gap-[80px] relative">
      {/* Sidebar Skeleton */}
      <div className="w-full md:w-1/4 mb-8 md:mb-0">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="w-full md:w-3/4">
        {/* Header */}
        <div className="mb-6">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
        </div>

        {/* Content Blocks */}
        <div className="space-y-6">
          {[1, 2, 3].map((block) => (
            <div key={block} className="border border-gray-200 rounded-lg p-4">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardContentSkeleton;