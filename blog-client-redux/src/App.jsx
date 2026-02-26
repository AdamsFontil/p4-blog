import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { logoutUser, initializeUser } from "./reducers/userReducer";
import Notification from "./components/defaultComps/Notification";
import LoginForm from "./components/defaultComps/LoginForm";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Users from "./components/navComps/Userspage";
import Home from "./components/navComps/Homepage";
import User from "./components/navComps/Userpage";
import Blog from "./components/navComps/Blogpage";
import Navbar from "./components/navComps/Navbar";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
  }, [dispatch]);

  if (user === null) {
    return <LoginForm />;
  }

  return (
    <Router>
      <Navbar user={user} />
      <Notification />

      <Routes>
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
