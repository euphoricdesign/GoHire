import UserCard from "./userCard";
import { IUser } from "@/types";

const UserCards = ({ users }: { users: IUser[] }) => {
  return (
    <div className="flex justify-center items-center flex-wrap m-2">
      {users.map((user) => {
        return <UserCard key={user.id} {...user} />;
      })}
    </div>
  );
};

export default UserCards;
