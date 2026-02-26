import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs"
import { setNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser( state, action ) {
      return action.payload
    }
  }
})

const { setUser } = userSlice.actions

export const loginUser = (username, password) => {
  return async (dispatch) => {
    console.log('from reducer', username, password);
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      console.log("login success", user);
      dispatch(setNotification({ message: `Login succeeded ${user.username} is in`, messageType: 'info' }))

    } catch (error) {
      console.log("login failed", error);
      dispatch(setNotification({ message: error.response.data.error, messageType: 'error' }));
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogUser");
    blogService.setToken(null);
    dispatch(setUser(null));
    console.log("log out complete");
  }
}

export const initializeUser = () => {
  return async (dispatch) => {
    console.log('testing use effect with thunk redux', );
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
      console.log("log in saved---", user);
    }
  }
}

export default userSlice.reducer
