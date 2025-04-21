import { InputGroup, Input, InputRightElement, IconButton } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { MdSend } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { insertCommentLocal } from "../../../store/slice/postSlice";
import { EffectCommentLocal, getPostAuthor } from "../../../store/slice/otherUserSlice";
import { v4 as uuidv4 } from 'uuid';

function CommentInput({ postId, authorUsername }) {
    const [commentText, setCommentText] = useState("");
    const [pendingComment, setPendingComment] = useState(null); // รอคอมเมนต์ไว้ชั่วคราวถ้ายังโหลดไม่เสร็จ

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { dataPostFetcheds } = useSelector((state) => state.author);
    const isPostFetched = dataPostFetcheds[authorUsername];
    // ถ้ายังไม่ได้โหลดโพสต์ จะทำการ dispatch เพื่อโหลดโพสต์
    // ถ้ายังไม่ได้โหลดโพสต์ จะทำการ dispatch เพื่อโหลดโพสต์
    useEffect(() => {
        if (!isPostFetched && authorUsername) {
            console.log("fetch posts ก่อน comment");
            
            dispatch(getPostAuthor(authorUsername));
        }
    }, [isPostFetched, authorUsername, dispatch]);
   
    const handleDispatchComment = (commentData) => {
        dispatch(
            insertCommentLocal(
                {
                    postId: postId,
                    commentData
                }
            )
        );
        dispatch(EffectCommentLocal(
            {
                postId: postId,
                commentData
            }
        ));
    }
    const handleCommentSubmit = () => {
        if (commentText.trim() === "") {
            toast.warn("คุณยังไม่ได้เขียนอะไรในคอมเมนต์")
            return;
        }
        console.log(authorUsername);


        const commentData = {
            user_comment_id: uuidv4(),
            user_comment_username: user?.username,
            user_comment_fullname: `${user?.detail?.firstname} ${user?.detail?.lastname}`,
            user_comment_profileImage: user?.detail?.profileImage || "",
            user_comment_content: commentText,  // คอนเทนต์ของคอมเมนต์
            comment_createdAt: new Date().toISOString(),  // เวลาที่คอมเมนต์ถูกสร้าง
            comment_updatedAt: new Date().toISOString(),  // เวลาที่คอมเมนต์ถูกอัพเดต
        }


        handleDispatchComment(commentData);

        setCommentText("");
        toast.success("คอมเมนต์โพสต์นี้เรียบร้อยแล้ว!");


    }
    return (
        <InputGroup size="md">
            <Input
                placeholder="Add a comment"
                rounded="2xl"
                value={commentText} // ← ตรงนี้สำคัญ!
                variant="filled"
                onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
                onChange={(e) => setCommentText(e.target.value)}
                pr="3rem" // padding ขวาเผื่อพื้นที่สำหรับไอคอน
            />
            <InputRightElement width="3rem">
                <IconButton
                    onClick={handleCommentSubmit}
                    icon={<MdSend />}
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                    aria-label="Send Comment"
                />
            </InputRightElement>
        </InputGroup>
    )
}
export default CommentInput