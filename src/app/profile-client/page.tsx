'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div className="w-full flex flex-row gap-2 justify-center items-center mb-[60px]">
      <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.5s]"></div>
    </div>
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <img src={user.picture ?? ''} alt={user.name ?? 'User'} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
