import UserCard from "../userCard/userCard";
import { IUser } from "@/types";

const UsersCards = ({ users }: { users: IUser[] }) => {
  return (
    <div className="flex justify-center items-center flex-wrap m-2">
      {users.map((user) => {
        return <UserCard key={user.id} {...user} />;
      })}
    </div>
  );
};

export default UsersCards;
