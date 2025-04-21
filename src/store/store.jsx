import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice'
import postReducer from './slice/postSlice'
import likeReducer from './slice/likeSlice'
import otherAuthorSlice from './slice/otherUserSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    like : likeReducer,
    author: otherAuthorSlice
  },
});

export default store;
