import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../reducers/userReducer";
import ToggleTheme from "../misc/ToggleTheme";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  console.log("what is", user);
  // if (!user) return null;

  return (
    <div className="navbar text-xl bg-ink-600">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-2xl">
          Blog App.com
        </Link>
      </div>
      <div className="navbar-center lg:flex bg-red700 ">
        <Link className="px-4" to="/">
          blogs
        </Link>
        <Link className="px-4" to="/users">
          users
        </Link>
        <ToggleTheme />
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <em className="pr-4">{user.name} logged in</em>
            <button className="btn" onClick={() => dispatch(logoutUser())}>
              logout
            </button>
          </>
        ) : (
          <Link to="/login">login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
