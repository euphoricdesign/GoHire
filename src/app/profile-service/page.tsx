import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';

type UserProfile = {
  picture?: string;
  name?: string;
  email?: string;
};

type ProfileServerProps = {
  user?: UserProfile;
};

export default function ProfileServer({ user }: ProfileServerProps) {
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context.req, context.res);

//   return {
//     props: {
//       user: session?.user || null,
//     },
//   };
// };
