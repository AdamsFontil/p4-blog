import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/users";
import { Link } from "react-router-dom";

const Users = () => {
  const result = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (result.isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const users = result.data;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Users</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Zebra table adds striped rows */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link
                    className="text-blue-500 hover:underline"
                    to={`/users/${user.id}`}
                  >
                    {user.name}
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
