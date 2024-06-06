// UserPageList.tsx
import { useState } from "react";
import { useListUsersQuery } from "@/lib/services/usersApi";
import { IUser } from "@/types";

const UserPageList = () => {
  const [page, setPage] = useState(1);
  const { data: users, isLoading, isFetching } = useListUsersQuery(page);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!users?.data) {
    return <div>No users</div>;
  }

  return (
    <div>
      {users.data.map((user: IUser) => (
        <div
          key={user.id}
          style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
          {Object.entries(user).map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong> {String(value)}
            </div>
          ))}
        </div>
      ))}
      <button onClick={() => setPage(page - 1)} disabled={isFetching || page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)} disabled={isFetching}>
        Next
      </button>
    </div>
  );
};

export default UserPageList;
