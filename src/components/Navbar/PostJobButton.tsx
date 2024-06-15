// components/Navbar/PostJobButton.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import Toastify from 'toastify-js';

const PostJobButton = () => {
  const { userDetail } = useAuth();
  const router = useRouter();

  const handlePostAJob = () => {
    if (!userDetail) {
      Toastify({
        text: 'You must be logged in to make a post',
        className: 'toastify',
        position: 'left',
        gravity: 'bottom',
        duration: 3000,
        close: true
      }).showToast();
    } else {
      router.push('/formJobs');
    }
  };

  return (
    <button
      className="mt-0 mb-5 text-sm border-none w-28 p-2.5 h-10 rounded text-white font-medium bg-[#3C65F5] cursor-pointer transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-80 md:mb-0 md:block hidden"
      onClick={handlePostAJob}>
      Post a job
    </button>
  );
};

export default PostJobButton;