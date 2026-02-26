import Blog from "../defaultComps/Blog";
import Togglable from "../defaultComps/Togglable";
import CreateBlogForm from "../defaultComps/CreateBlogForm";
import { useSelector } from "react-redux";

const Home = () => {
  const blogs = useSelector((state) => state.blogs);

  console.log("blogs from home", blogs);
  return (
    <div className="bg-rd-800">
      <Togglable buttonLabelShow="create new blog" buttonLabelCancel="cancel">
        <CreateBlogForm />
      </Togglable>
      <div className="p-4">
        <ul class="list bg-base-100 shadow-md">
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
