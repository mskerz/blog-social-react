import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/network";
import { v4 as uuidv4 } from "uuid"; // เพิ่ม uuid เพื่อสร้าง postId ที่ unique
import { data } from "react-router-dom";

export const getPosts = createAsyncThunk(
    "get/getPosts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/posts");

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getCurrentUserPosts = createAsyncThunk(
    "get/getCurrentPosts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/posts/user");
            console.log(response.data);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createPostUser = createAsyncThunk(
    "post/createPostUser",
    async (bodyData, { rejectWithValue }) => {
        try {
            const response = await api.post("/post/create", bodyData);
            console.log(`response created post : ${response.data.post}`);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const moveToTrash = createAsyncThunk(
    "post/moveToTrash",
    async (postId, { rejectWithValue }) => {
        try {
            const response = await api.post(`/post/move-to-trash/${postId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getRemovePosts = createAsyncThunk(
    "post/getRemovePosts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/posts/remove");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const addComment = createAsyncThunk(
    "post/addComment",
    async (commentData, { rejectWithValue }) => {
        try {
            const response = await api.post("/post/comment", commentData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const cachedPosts = JSON.parse(localStorage.getItem("cachedPosts") || "[]");
const cachedCurrentUserPosts = JSON.parse(localStorage.getItem("cachedCurrentUserPosts") || "[]");
const initialState = {
    status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
    posts: cachedPosts,
    currentUserPosts: cachedCurrentUserPosts,
    currectUserRemovePosts: [],
    dataPostFetched: false, // <== ถ้ามี cached ถือว่าโหลดแล้ว
    dataCurrentUserPostsFetched: false,
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {

        toggleLikeLocal: (state, action) => {
            const { postId, user } = action.payload;
            // ฟังก์ชันช่วยสำหรับการไลค์โพสต์
            const toggleLike = (postList) => {
                const postIndex = postList.findIndex((post) => post.postId === postId);
                if (postIndex !== -1) {
                    const post = postList[postIndex];
                    const userIndex = post.likes.findIndex(
                        (like) => like.user_like_fullname === user.fullname
                    );

                    if (userIndex === -1) {
                        // กดไลค์ -> เพิ่ม user เข้าไปใน likes[]
                        post.likes.push({
                            user_like_fullname: user.fullname,
                            user_like_profileImage: user.profileImage,
                            likedAt: new Date().toISOString(),
                        });
                    } else {
                        // ยกเลิกไลค์ -> ลบ user ออกจาก likes[]
                        post.likes.splice(userIndex, 1);
                    }
                }
            };

            // เรียกฟังก์ชันสำหรับทั้ง posts และ currentUserPosts
            toggleLike(state.posts);
            toggleLike(state.currentUserPosts);
        },
        createPostLocal: (state, action) => {
            const newPost = {
                postId: uuidv4(), // สร้าง postId ที่ unique

                ...action.payload,
            };
            // ฟังก์ชันช่วยสำหรับเพิ่มโพสต์
            const addPost = (postList) => {
                postList.push({ ...newPost }); // เพิ่มโพสต์ใหม่ไว้ด้านบน (เหมือนโซเชียลมีเดีย)
            };

            // เรียกใช้ฟังก์ชันสำหรับทั้ง posts และ currentUserPosts
            addPost(state.posts);
            addPost(state.currentUserPosts);
        },
        EffectChangedAuthorProfile: (state, action) => {
            const { username, newProfileImage } = action.payload;
            const updateProfileImage = (posts) => {
                return posts.map((post) => {
                    if (post.username === username) {
                        return {
                            ...post,
                            profileImage: newProfileImage,
                        };
                    }
                    return post;
                });
            };
            state.currentUserPosts = updateProfileImage(state.currentUserPosts);
        },

        deletePostLocal: (state, action) => {
            const { postId } = action.payload;
            state.posts = state.posts.filter((post) => post.postId !== postId);
            state.currentUserPosts = state.currentUserPosts.filter(
                (post) => post.postId !== postId
            );
        },


        insertCommentLocal: (state, action) => {
            const { postId, commentData } = action.payload;



            const addComment = (postList) => {
                const targetPost = postList.find(post => post.postId === postId);
                if (targetPost) {
                    if (!Array.isArray(targetPost.comments)) {
                        targetPost.comments = [];
                    }
                    targetPost.comments.push({ ...commentData }); // หรือ unshift ถ้าอยากให้แสดงบนสุด
                }

                console.log(targetPost);

            };
            addComment(state.posts);
            addComment(state.currentUserPosts);
            localStorage.setItem("cachedPosts", JSON.stringify(state.posts));
            localStorage.setItem("cachedCurrentUserPosts", JSON.stringify(state.currentUserPosts));
        },

        editCommentLocal: (state, action) => {
            const { postId, commentId, updatedContent } = action.payload;

            const editComment = (postList) => {
                const targetPost = postList.find(post => post.postId === postId);
                if (targetPost && Array.isArray(targetPost.comments)) {
                    const comment = targetPost.comments.find(c => c.user_comment_id === commentId);
                    if (comment) {
                        comment.content = updatedContent;
                        comment.editedAt = new Date().toISOString(); // เพิ่ม timestamp การแก้ไข ถ้าต้องการ
                    }
                }
            };

            editComment(state.posts);
            editComment(state.currentUserPosts);

            localStorage.setItem("cachedPosts", JSON.stringify(state.posts));
            localStorage.setItem("cachedCurrentUserPosts", JSON.stringify(state.currentUserPosts));
        }
        ,

        removeCommentLocal: (state, action) => {
            const { postId, commentId } = action.payload;
            const removeComment = (postList) => {
                const targetPost = postList.find(post => post.postId === postId);
                if (targetPost && Array.isArray(targetPost.comments)) {
                    targetPost.comments = targetPost.comments.filter(c => c.user_comment_id !== commentId);
                }
            };
            removeComment(state.posts);
            removeComment(state.currentUserPosts);
            localStorage.setItem("cachedPosts", JSON.stringify(state.posts));
            localStorage.setItem("cachedCurrentUserPosts", JSON.stringify(state.currentUserPosts));
        }




    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.status = "loading";
                localStorage.removeItem("cachedPosts"); // <== ล้าง cache เดิม

            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts = action.payload.posts;
                state.dataPostFetched = true;

                localStorage.setItem("cachedPosts", JSON.stringify(action.payload.posts)); // <== เก็บลง localStorage
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getCurrentUserPosts.pending, (state) => {
                // get current user posts
                state.status = "loading";
                localStorage.removeItem("cachedCurrentUserPosts");
            })
            .addCase(getCurrentUserPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentUserPosts = action.payload.posts;
                state.dataCurrentUserPostsFetched = true;
                localStorage.setItem("cachedCurrentUserPosts", JSON.stringify(action.payload.posts));

            })
            .addCase(getCurrentUserPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(getRemovePosts.pending, (state) => {
                state.status = "loading";

            })
            .addCase(getRemovePosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currectUserRemovePosts = action.payload.posts;
            })
            .addCase(getRemovePosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            //

            .addCase(createPostUser.pending, (state) => {
                state.status = "loading";

            })
            .addCase(createPostUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                const newPost = action.payload.post;
                // ฟังก์ชันสำหรับเพิ่มโพสต์ใหม่
                const addPosts = (list) => {
                    list.push(newPost); // เพิ่มโพสต์ใหม่ไปไว้ที่ด้านบนสุด
                };
                addPosts(state.currentUserPosts);
                addPosts(state.posts);
            })
            .addCase(createPostUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(moveToTrash.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(moveToTrash.fulfilled, (state, action) => {
                state.status = "succeeded";
                const { removePostId } = action.payload;
                state.posts = state.posts.filter(
                    (post) => post.postId !== removePostId
                );
                state.currentUserPosts = state.currentUserPosts.filter(
                    (post) => post.postId !== removePostId
                );
            })
            .addCase(moveToTrash.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const {
    toggleLikeLocal,
    deletePostLocal,
    createPostLocal,
    EffectChangedAuthorProfile,
    insertCommentLocal,
    editCommentLocal,
    removeCommentLocal
} = postSlice.actions;
export default postSlice.reducer;
