import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../reducers/userReducer";
import Notification from "./Notification";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <div className="hero bg-base-200 min-h-screen min">
      <div className="hero-content flex-col">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <Notification />
            <h2 className="text-3xl">Log in to Blog App.com</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                  placeholder="Username"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  placeholder="Password"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <a className="link link-hover text-sm">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-neutral w-full mt-2">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
