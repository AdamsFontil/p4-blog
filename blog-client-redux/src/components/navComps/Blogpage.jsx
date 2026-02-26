import { useState } from "react";
import {
  appendComment,
  likeBlog,
  removeBlog,
} from "../../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Blogpage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const [newComment, setNewComment] = useState("");

  const blog = blogs.find((b) => b.id === id);
  if (!blog) return <div>Loading blog...</div>;

  const canDelete = user?.username === blog?.user?.username;
  const comments = blog?.comments || [];

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    dispatch(appendComment(blog.id, newComment));
    setNewComment("");
  };

  return (
    <div className="container mx-auto p-4">
      {/* Blog Card */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title text-3xl">{blog.title}</h2>
          <p className="text-blue-500 underline">{blog.url}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="badge badge-primary">Likes: {blog.likes}</span>
            <button
              className="btn btn-sm btn-outline btn-success"
              onClick={() => dispatch(likeBlog(blog))}
            >
              Like
            </button>
            {canDelete && (
              <button
                className="btn btn-sm btn-outline btn-error"
                onClick={() => dispatch(removeBlog(blog))}
              >
                Remove
              </button>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-500">By {blog?.user?.name}</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="card bg-base-200 shadow-md p-4">
        <h3 className="text-xl font-semibold mb-2">Comments</h3>
        <div className="flex gap-2 mb-4">
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddComment}>
            Add
          </button>
        </div>
        <ul className="list-disc pl-5 space-y-2">
          {comments.map((comment, index) => (
            <li key={index} className="bg-base-100 p-2 rounded shadow-sm">
              {comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blogpage;
