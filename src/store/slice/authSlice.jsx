import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/network";
import Cookies from "js-cookie";

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await api.post("/signin", credentials); // ใช้ api instance
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Signup action
export const signup = createAsyncThunk("auth/signup", async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post("/signup", userData); // ใช้ api instance
    console.log(response);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Verify action (e.g., email verification)
export const verify = createAsyncThunk("auth/verify", async (verificationData, { rejectWithValue }) => {
  try {
    const response = await api.get("/verify", verificationData); // ใช้ api instance
    console.log(response.data);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const processGoogleAuth = createAsyncThunk(
  'auth/processGoogleAuth',
  async (_, { rejectWithValue }) => {
    try {
      // This function would be called after redirecting back from Google
      // It would typically extract parameters from the URL
      // For simplicity, we'll assume we're calling an endpoint that handles this
      const response = await api.get('/auth/google/callback');
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response?.data || { message: 'Authentication failed' });
    }
  }
);


export const changeUsername = createAsyncThunk("auth/change-username", async (newUsername, { rejectWithValue }) => {
  try {
    const response = await api.post("/change-username", newUsername);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);

  }
});


export const changeImageProfile = createAsyncThunk("auth/change-profile-image", async (newProfileImage, { rejectWithValue }) => {
  try {
    const response = await api.post("/change-profile-image", newProfileImage);
    return response.data;
  } catch (error) { 
    return rejectWithValue(error.response.data);
  }
});
 
// Initial state for authentication
const initialState = {
  user: null,
  isLoggedIn: false,
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove("accessToken");
      // localStorage.removeItem("cachedPosts");
      localStorage.removeItem("cachedCurrentUserPosts");
      state.isLoggedIn = false;
      state.user = null;
    },
    changeProfileImage: (state,action) => {
        const {newProfileImage} = action.payload;
        state.user.detail.profileImage = newProfileImage
     }

     ,
     changeCoverImageLocal : (state,action)=>{
        const {newCoverImage} = action.payload;
        state.user.detail.coverImage = newCoverImage
     }
    
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true; // เมื่อ login สำเร็จ ให้เปลี่ยนค่า loggedIn เป็น true
        Cookies.set("accessToken", action.payload.accessToken); // เก็บ accessToken ใน cookies
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // signup, verify
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // verify (ดึงข้อมูล user)
      .addCase(verify.pending, (state) => {
        state.status = "loading";

      })
      .addCase(verify.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.user = action.payload.user; // เก็บข้อมูล user ที่ได้จากการ verify
      })
      .addCase(verify.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(changeUsername.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changeUsername.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user.username = action.payload.detail.updateUsername; 
        state.user.lastUsernameChange = action.payload.detail.lastUsernameChange
      })
      .addCase(changeUsername.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(changeImageProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(changeImageProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user.detail.profileImage = action.payload.profileImage
      })
      .addCase(changeImageProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

   }
});

export const { logout,changeProfileImage,changeCoverImageLocal } = authSlice.actions;
export default authSlice.reducer;
