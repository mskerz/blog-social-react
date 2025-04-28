import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../config/network";


export const getProfileAuthor = createAsyncThunk("auth/get-author-profile", async (username, { rejectWithValue }) => {
    try {

        const response = await api.get(`/user/${username}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getPostAuthor = createAsyncThunk("auth/get-author-posts", async (username, { rejectWithValue }) => {
    try {
        const response = await api.get(`/posts/author/${username}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


const initialState = {
    profiles: {}, // เปลี่ยนจาก null เป็น {} เพื่อให้เป็นอ็อบเจ็กต์
    posts: {},  // เปลี่ยนเป็นอ็อบเจ็กต์ที่เก็บโพสต์ตาม username
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
    dataPostFetcheds: {}, // เก็บสถานะว่าโพสต์ของ username ใดถูกโหลดหรือไม่
    currentUsername: null, // เพิ่มตัวแปรเก็บ username ปัจจุบัน
 

}


const otherAuthorSlice = createSlice({
    name: "otherUser",
    initialState,
    reducers: {
        EffectToggleAuthorLike: (state, action) => {
            const { postId, user } = action.payload;
            const posts = state.posts[state.currentUsername];
        
            // เช็คว่า posts เป็น array หรือไม่
            if (Array.isArray(posts)) {
                const postIndex = posts.findIndex(post => post.postId === postId);
        
                if (postIndex !== -1) {
                    const post = posts[postIndex];
                    if (!Array.isArray(post.likes)) {
                        post.likes = [];
                    }
        
                    const userIndex = post.likes.findIndex(
                        like => like.user_like_fullname === user.fullname
                    );
        
                    if (userIndex === -1) {
                        // กดไลค์
                        post.likes.push({
                            user_like_fullname: user.fullname,
                            user_like_profileImage: user.profileImage,
                            likedAt: new Date().toISOString(),
                        });
                    } else {
                        // ยกเลิกไลค์
                        post.likes.splice(userIndex, 1);
                    }
                }
            } 
        }
        ,

        EffectCommentLocal: (state, action) => {
            const { postId, commentData } = action.payload;
            const posts = state.posts[state.currentUsername]
            const post = posts.find(post => post.postId === postId);

            if (post) {
                if (!Array.isArray(post.comments)) {
                    post.comments = [];
                }
                post.comments.push({ ...commentData }); // หรือ unshift ถ้าต้องการให้แสดงคอมเมนต์ใหม่บนสุด
            }
        },

        EffectCommentEditLocal: (state, action) => {
            const { postId, commentId, newContent } = action.payload;
            const posts = state.posts[state.currentUsername];
            const post = posts?.find(post => post.postId === postId);

            if (post && Array.isArray(post.comments)) {
                const comment = post.comments.find(c => c.user_comment_id === commentId);
                if (comment) {
                    comment.user_comment_content = newContent;
                    comment.comment_updatedAt = new Date().toISOString();
                }
            }
        }
        ,

        removeCommentAuthorLocal: (state, action) => {
            const { postId, commentId } = action.payload;
            const posts = state.posts[state.currentUsername];
            const post = posts?.find(post => post.postId === postId);

            if (post && Array.isArray(post.comments)) {
                post.comments = post.comments.filter(c => c.user_comment_id !== commentId);
            }
        }
        ,


        setCurrentUsername: (state, action) => {
            const newUsername = action.payload;
            if (state.currentUsername !== newUsername) {
                state.currentUsername = newUsername;
                state.dataPostFetcheds[newUsername] = false;
            }
        },


    }
    ,
    extraReducers: (builder) => {
        builder
            .addCase(getProfileAuthor.pending, (state) => {
                state.status = 'loading';
                state.dataPostFetcheds[state.currentUsername] = false; // ระบุว่าเริ่มโหลดแล้ว
            })
            .addCase(getProfileAuthor.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profiles[state.currentUsername] = action.payload.user;
                state.dataPostFetcheds[state.currentUsername] = true; // เมื่อข้อมูลโปรไฟล์โหลดเสร็จแล้ว

            })
            .addCase(getProfileAuthor.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getPostAuthor.pending, (state) => {
                state.status = 'loading';
                state.dataPostFetcheds[state.currentUsername] = false; // ระบุว่าเริ่มโหลดแล้ว

            })
            .addCase(getPostAuthor.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts[state.currentUsername] = action.payload.posts;
                state.dataPostFetcheds[state.currentUsername] = true; // อัปเดตสถานะโหลดข้อมูล

            })
            .addCase(getPostAuthor.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.dataPostFetcheds[state.currentUsername] = false; // หากล้มเหลวให้ระบุว่าไม่สามารถโหลดข้อมูลได้

            })
    }
})
export const { EffectToggleAuthorLike, EffectCommentLocal, resetAuthorState, setCurrentUsername } = otherAuthorSlice.actions;
export default otherAuthorSlice.reducer;