import { Button } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import { fetchLikeStatus, toggleLikePost as toggleLike } from "../../../store/slice/likeSlice";
import { toggleLikeLocal } from "../../../store/slice/postSlice";
import { toast } from "react-toastify";
import { useTheme } from "../../../hook/useTheme";
import { EffectToggleAuthorLike } from "../../../store/slice/otherUserSlice";
function LikeBar({ post, onClickLikeDetail, onOpenModal }) {
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const [likesCount, setLikesCount] = useState(Array.isArray(post.likes) ? post.likes.length : 0);
    const dispatch = useDispatch();
    const { isLiked } = useSelector((state) => state.like);
    const { isDark } = useTheme();
    // ใช้ useMemo เพื่อคำนวณ likeStatus โดยไม่ต้องคำนวณซ้ำ
    const likeStatus = useMemo(() => {
        return isLiked[post.postId]; // ถ้าไม่มีค่าจะให้ค่าเป็น false
    }, [isLiked, post.postId]);
    const [isAnimating, setIsAnimating] = useState(false);

    // ตรวจสอบว่ามีค่าหรือยัง (ขณะโหลดข้อมูล)

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => setIsAnimating(false), 300); // Duration of animation
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    useEffect(() => {
        if (isLoggedIn && likeStatus === undefined) { // ตรวจสอบว่าเราเคยดึงสถานะนี้หรือยัง
            dispatch(fetchLikeStatus(post.postId));
        }
    }, [dispatch, post.postId, likeStatus, isLoggedIn]);

    const handleLikeToggle = () => {
        if (!isLoggedIn) {
            toast.warning("กรุณาเข้าสู่ระบบเพื่อกดไลค์โพสนี้");
            return;
        }


        const userLikedState = {
            fullname: `${user?.detail?.firstname || ""} ${user?.detail?.lastname || ""}`.trim(),
            profileImage: user?.detail?.profileImage || "",
        };

        // อัปเดต Local State และ Redux
        dispatch(toggleLikeLocal({ postId: post.postId, user: userLikedState }));
        dispatch(EffectToggleAuthorLike({ postId: post.postId, user: userLikedState }));
        dispatch(toggleLike(post.postId));

        // ปรับจำนวนไลค์ใน UI ทันที
        setIsAnimating(!isAnimating);
        setLikesCount((prevCount) => likeStatus ? prevCount - 1 : prevCount + 1);
    };

    return (

        <div style={{ border: isDark ? "1px solid #fff8" : "1px solid #000" }} className="flex w-full justify-start space-x-2 p-2 rounded-2xl">
            <div className="flex items-center  space-x-1">
                {<Button cursor={"pointer"} variant="ghost" size="sm" onClick={handleLikeToggle}>
                    {isLoggedIn && likeStatus ? <FaHeart /> : <FaRegHeart />}

                </Button>
                }
                <a onClick={onClickLikeDetail} className="cursor-pointer">
                    <p
                        className={`ml-2 transform transition-all ${isAnimating ? "translate-y-2" : "translate-y-0"
                            }`}
                    >
                        {likesCount || 0}
                    </p>                </a>
            </div>
            <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" cursor={"pointer"} onClick={onOpenModal}>

                    <FaRegComment />
                </Button>
                <a onClick={onOpenModal} className="cursor-pointer">

                    <p
                        className= "ml-2"
                    >
                        {post.comments.length}
                    </p>
                </a>
            </div>
        </div>


    )
}
export default LikeBar