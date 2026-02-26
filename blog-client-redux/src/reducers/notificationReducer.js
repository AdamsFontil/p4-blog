import { createSlice } from '@reduxjs/toolkit'

let timeoutId

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    }
  }
})

export const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = (content, seconds = 5) => {
  return (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    dispatch(showNotification(content))

    // clear it after the given time (default 5s)
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
