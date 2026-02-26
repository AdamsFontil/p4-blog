import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  console.log("what is blog??", blog);
  return (
    <li style={blogStyle}>
      <Link className="list-row p-4" to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </li>
  );
};

export default Blog;
