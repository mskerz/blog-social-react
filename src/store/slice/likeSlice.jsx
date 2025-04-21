import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../config/network";


// สร้าง AsyncThunk สำหรับการดึงข้อมูลสถานะไลค์จาก API
export const fetchLikeStatus = createAsyncThunk(
    'like/fetchLikeStatus',
    async (postId, { rejectWithValue }) => {
        try {
            // /post/:postId/like-status
            const response = await api.get(`/post/${postId}/like-status`);

            return response.data;  // ส่งข้อมูลผลลัพธ์กลับไป

        } catch (error) {
            return rejectWithValue(error.response.data);

        }
    });



export const toggleLikePost = createAsyncThunk("like/toggleLike",
    async (postId, { rejectWithValue }) => {
        try {
            const response = await api.post(`/post/like/${postId}`);
            return response.data;  // ส่งข้อมูลผลลัพธ์กลับไป

        } catch (error) {
            return rejectWithValue(error.response.data);

        }
    });

const initialState = {
    isLiked: {},  // เปลี่ยนจาก boolean เป็นอ็อบเจ็กต์
    status: 'idle',
    error: null,
    loading: false
};

const likeSlice = createSlice({
    name: 'like',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(fetchLikeStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLikeStatus.fulfilled, (state, action) => {
                const { postId, isLiked } = action.payload;
                state.isLiked[postId] = isLiked; // เก็บสถานะไลค์ที่ได้จาก API
                state.loading = false;
            })
            .addCase(fetchLikeStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(toggleLikePost.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(toggleLikePost.fulfilled, (state, action) => {
                state.status = "succeeded";
                const { postId, updateIsLiked } = action.payload;
                state.isLiked[postId] = updateIsLiked; // อัปเดตสถานะไลค์จาก API เมื่อมีการกดไลค์
                state.loading = false;
            })
            .addCase(toggleLikePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});


export default likeSlice.reducer;



