'use client'
import JobPostingManagement from '@/components/JobPostingMagement/JobPostingManagement';
import Reports from '@/components/Reports/Reports';
import UserManagement from '@/components/UserManagement/UserManagement';
import SettingsAdmin from '@/components/SettingsAdmin/SettingsAdmin';
import Image from 'next/image';
import React, { useState } from 'react';
import ButtonCategory from '@/components/CategoryAdmin/CategoryAdmin';
import ButtonGrafic from '@/components/grafAdminDashboar/graficoDashboard';

const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('Users');

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  let content;
  switch (selectedOption) {
    case 'Users':
      content = <UserManagement />;
      break;
    case 'Job Postings':
      content = <JobPostingManagement />;
      break;
    case 'Reports':
      content = <Reports />;
      break;
    case 'Settings':
      content = <SettingsAdmin />;
      break;
      case 'Category':
        content = <ButtonCategory />;
        break;
        case 'Economic chart':
          content = <ButtonGrafic />;
          break;
    default:
      content = 'No content available';
  }

  return (
    <div className="px-[124px] my-[100px] justify-start gap-[80px] flex relative">
      <div className="relative float-left w-[20%]">
        <div className="text-3xl font-bold text-[#05264E]">Admin Dashboard</div>
        <div className="flex flex-col mt-10 font-bold">
          <div
            className={`cursor-pointer border-l pb-2 pt-2 pl-4 text-[#05264E] ${
              selectedOption === 'Users' && 'text-[#3C65F5]'
            }`}
            onClick={() => handleOptionClick('Users')}
          >
            User Management
          </div>
          <div
            className={`cursor-pointer border-l pb-2 pt-2 pl-4 text-[#05264E] ${
              selectedOption === 'Job Postings' && 'text-[#3C65F5]'
            }`}
            onClick={() => handleOptionClick('Job Postings')}
          >
            Job Postings
          </div>
          <div
            className={`cursor-pointer border-l pb-2 pt-2 pl-4 text-[#05264E] ${
              selectedOption === 'Reports' && 'text-[#3C65F5]'
            }`}
            onClick={() => handleOptionClick('Reports')}
          >
            Reports
          </div>
          <div
            className={`cursor-pointer border-l pb-2 pt-2 pl-4 text-[#05264E] ${
              selectedOption === 'Settings' && 'text-[#3C65F5]'
            }`}
            onClick={() => handleOptionClick('Settings')}
          >
            Settings
          </div>
          <div
            className={`cursor-pointer border-l pb-2 pt-2 pl-4 text-[#05264E] ${
              selectedOption === 'Category' && 'text-[#3C65F5]'
            }`}
            onClick={() => handleOptionClick('Category')}
          >
            Category
          </div>
          <div
            className={`cursor-pointer border-l pb-2 pt-2 pl-4 text-[#05264E] ${
              selectedOption === 'Economic chart' && 'text-[#3C65F5]'
            }`}
            onClick={() => handleOptionClick('Economic chart')}
          >
            Economic chart
          </div>
        </div>
      </div>
      <div className="relative float-right w-[70%]">
        <div className="h-full w-full">
          <div className="flex flex-col border rounded-3xl">
            <div className="border-b border-b-gray-300 rounded-t-3xl">
              <div className="flex items-center py-[1rem]">
                <div className="absolute inset-0 opacity-20"></div>
                <div className="relative w-auto mx-[1.5rem]  border border-gray-300 rounded-full">
                  <Image
                    className="rounded-full"
                    src={'https://i.ibb.co/StS3yL7/Default-Profile-Img.png'}
                    alt={''}
                    width={96}
                    height={96}
                  />
                </div>
                <div className="w-full p-5">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center">
                        <h2 className="text-[32px] font-bold text-[#05264E]">
                          Admin Name
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="h-auto">{content}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;