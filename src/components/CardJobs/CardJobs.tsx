import React from 'react';

interface User {
  name: string;
  jobTitle: string;
  description: string;
  bio: string;
  publishedDate: string;
  readingTime: string;
  imageUrl: string;
}

const UserCard: React.FC<User> = ({ name, jobTitle, description, bio, publishedDate, readingTime, imageUrl }) => {
  return (
    <a
      href="#"
      className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
    >
      <span
        className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
      ></span>

      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
            {description}
          </h3>

          <p className="mt-1 text-xs font-medium text-gray-600">By {name}</p>
        </div>

        <div className="hidden sm:block sm:shrink-0">
          <img
            alt={jobTitle}
            src={imageUrl}
            className="size-16 rounded-lg object-cover shadow-sm"
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-pretty text-sm text-gray-500">
          {bio}
        </p>
      </div>

      <dl className="mt-6 flex gap-4 sm:gap-6">
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">Published</dt>
          <dd className="text-xs text-gray-500">{publishedDate}</dd>
        </div>

        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">Reading time</dt>
          <dd className="text-xs text-gray-500">{readingTime}</dd>
        </div>
      </dl>
    </a>
  );
}

export default UserCard;
