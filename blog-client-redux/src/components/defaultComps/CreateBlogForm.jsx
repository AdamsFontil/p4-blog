import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../../reducers/notificationReducer";
import { appendBlog } from "../../reducers/blogReducer";

const CreateBlogForm = () => {
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch()

  const handleCreate = (event) => {
    event.preventDefault();
    console.log("creating new blog");
    console.log("values are", author, url, title);
    console.log('app is not involved');

    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    try {
      dispatch(appendBlog(blogObject))
      console.log('what is blogObject', blogObject);
      dispatch(setNotification({
        message: `a new blog ${blogObject.title} by ${blogObject.author} added`,
      }));
      setAuthor("");
      setUrl("");
      setTitle("");
      }
    catch (error) {
      console.error("Error creating blog:", error);
      setNotification({ message: error, messageType: 'error' });
    }
  };



  return (
    <form
      onSubmit={handleCreate}
      style={{ border: "2px solid blue", padding: "10px" }}
    >
      <div>
        <label>
          title
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default CreateBlogForm;
