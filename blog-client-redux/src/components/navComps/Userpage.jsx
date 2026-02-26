// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getUsers } from "../../services/users";

// const User = () => {
//   const id = useParams().id;

//   const result = useQuery({
//     queryKey: ["users"],
//     queryFn: getUsers,
//   });

//   if (result.isLoading) {
//     return <div>loading data...</div>;
//   }

//   const users = result.data;
//   console.log("users are", users);

//   const user = users?.find((u) => {
//     console.log("what is u", typeof u.id);
//     return u.id === id;
//   });

//   if (!user) return <div>User not found</div>;

//   console.log("who are users", users);
//   console.log("id is what", id);
//   console.log("found user", user);
//   console.log("user blogs", user.blogs);
//   const userBlogs = user.blogs;
//   return (
//     <div>
//       <h3>added blogs</h3>
//       <ul>
//         {userBlogs.map((blog) => (
//           <li key={blog.id}> {blog.title} </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default User;

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/users";
import { Link } from "react-router-dom";

const User = () => {
  const { id } = useParams();

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const user = users?.find((u) => u.id === id);

  if (!user) {
    return <div className="alert alert-error mt-4">User not found</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{user.name}'s Blogs</h2>

      {user.blogs.length === 0 ? (
        <div className="alert alert-info">
          This user has not added any blogs yet.
        </div>
      ) : (
        <ul className="list-disc list-inside space-y-2">
          {user.blogs.map((blog) => (
            <li
              key={blog.id}
              className="flex justify-between items-center p-2 border rounded-lg hover:bg-gray-100"
            >
              <Link
                className="text-blue-500 hover:underline"
                to={`/blogs/${blog.id}`}
              >
                {blog.title}
              </Link>
              <span className="badge badge-primary">{blog.likes} Likes</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default User;
