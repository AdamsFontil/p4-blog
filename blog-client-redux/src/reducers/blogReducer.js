import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs"
import { setNotification } from "./notificationReducer";


const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlogOnRedux(state, action) {
      console.log('selected blog--unchanged', action.payload);
      const blogToLike = action.payload
      console.log('blogtoLike', blogToLike);
      return state.map((blog) => (blog.id !== blogToLike.id ? blog : blogToLike))
    },
    removeFromRedux(state, action) {
      console.log('action.payload', action.payload);
      return state.filter((blog) => blog.id !== action.payload.id)
    },
    addCommentToRedux(state, action) {
      console.log('what is action payload', action.payload);
      const blogWithNewComment = action.payload
      return state.map((blog) => (blog.id === blogWithNewComment.id ? blogWithNewComment : blog ))
    }
  }
})

const { createBlog, setBlogs, updateBlogOnRedux, removeFromRedux, addCommentToRedux } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
    console.log('reducer dispatched', blogs);
  }
}

export const appendBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(createBlog(newBlog))
  }
}

export const appendComment = (id, comment) => {
  return async (dispatch) => {
    const blogWithNewComment = await blogService.createNewComment(id, comment)
    dispatch(addCommentToRedux(blogWithNewComment))
  }
}

export const likeBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const modifiedBlogObject = {
        ...blogObject,
        likes: blogObject.likes + 1,
        user: blogObject.user.id,
      }
      const updatedBlog = await blogService.update(modifiedBlogObject.id, modifiedBlogObject)
      dispatch(updateBlogOnRedux(updatedBlog))
      dispatch(setNotification({
        message: `You liked '${updatedBlog.title}'`,
        messageType: 'info'
      }, 3))
    } catch (error) {
      console.error('Error liking blog:', error)
      dispatch(setNotification({
        message: 'Failed to like blog',
        messageType: 'error'
      },5))
    }
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    if (
      !window.confirm(
        `Are you sure you want to remove "${blog.title}" by ${blog.author}?`,
      )
    ) {
      return;
    }
    try {
      console.log('blog info', blog);
      await blogService.remove(blog.id); //remove from backend
      dispatch(removeFromRedux(blog)) // remove from frontend
      dispatch(setNotification({
        message: `removed ${blog.title} successfully`,
        messageType: 'info'
      },3))
    } catch (error) {
      console.error("Something went wrong", error);
      dispatch(setNotification({
        message: 'Failed to remove this blog',
        messageType: 'error'
      },5))
    }
  }
  };


export default blogSlice.reducer
