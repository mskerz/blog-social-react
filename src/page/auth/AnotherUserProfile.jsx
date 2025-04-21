import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProfileAuthor, getPostAuthor, resetAuthorState, setCurrentUsername } from "../../store/slice/otherUserSlice";
import { Avatar, AvatarBadge, Image } from "@chakra-ui/react";
import { FaAddressCard, FaBirthdayCake, FaEnvelope, FaPhone } from "react-icons/fa";
import Post from "../../components/posts/card/Post";

import { useTheme } from "../../hook/useTheme";
import CreatePostToggle from "../../components/posts/CreatePostToggle";
import BioAuthorCard from "../../components/user/profile/BioAuthorCard";
import SkeletonUserProfile from "./SkeletonUserProfile";

function AnotherUserProfile() {
    const { username } = useParams(); // รับ username จาก URL

    const { isDark } = useTheme();
    const dispatch = useDispatch();
    const { profiles, posts, dataPostFetcheds, currentUsername } = useSelector((state) => state.author);
    const author = profiles[currentUsername];

    const { user, isLoggedIn, status } = useSelector((state) => state.auth);
    const navigate = useNavigate();

     const sortedPosts = useMemo(() => {
        const userPosts = posts[currentUsername] || [];
        return [...userPosts].sort((a, b) => {
            const dateA = new Date(a.createDate);
            const dateB = new Date(b.createDate);
            return dateB - dateA;
        });
    }, [posts, currentUsername]);


    useEffect(() => {
        if (isLoggedIn && user?.username === username) {
            navigate("/profile"); // ถ้าเป็นผู้ใช้ที่ล็อกอินอยู่ ไปที่โปรไฟล์ตัวเอง
        }
    }, [isLoggedIn, user?.username, username, navigate]);

    useEffect(() => {
        // ตรวจสอบว่าโพสต์ของ currentUsername ยังไม่ได้ถูกโหลด
        if (!dataPostFetcheds[username] || currentUsername !== username) {
            dispatch(setCurrentUsername(username)); // เปลี่ยน currentUsername
            dispatch(getProfileAuthor(username));   // โหลดข้อมูลโปรไฟล์
            dispatch(getPostAuthor(username));      // โหลดโพสต์ของผู้ใช้
        }
    }, [dispatch, username, currentUsername, dataPostFetcheds]);
    if (!author) {
        return <SkeletonUserProfile/>
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">


            <div style={(isDark ? { background: "#2D3748" } : { background: "white" })} className="rounded-b-2xl pb-0.5  shadow-sm w-full max-w-4xl text-center animate-fade-in">
                {/* Avatar */}
                <div className="relative w-full h-96 overflow-hidden">
                    <Image
                        src={author?.detail?.coverImage}
                        alt="Cover"
                        layout="fill"
                        objectFit="cover"

                    />
                </div>
                <div className="flex -mt-12 ml-5 justify-between">
                    <div className="w-24 h-24   rounded-full flex items-center justify-center text-4xl font-bold shadow-md">
                        <Avatar referrerPolicy="no-referrer" size='xl' color="whiteAlpha" background="blue.500" name={`${author?.detail?.firstname} ${author?.detail?.lastname}`} src={author?.detail?.profileImage} >

                            <AvatarBadge
                                boxSize="1.2em"
                                bg="transparent"
                                borderWidth="0" // เอาเส้นขอบออก
                            />



                        </Avatar>


                    </div>

                </div>

                <div className="flex flex-col m-4 -mt-0.5 ">
                    <div>
                        <h1 className="text-2xl font-bold mt-5 text-left">
                            {author?.detail?.firstname} {author?.detail?.lastname}
                        </h1>
                        <div className="flex flex-row items-center space-x-3">
                            <p className="text-left text-gray-500">{author?.username}</p>

                        </div>
                    </div>


                </div>


            </div>


            <div className="rounded-2xl  w-full max-w-4xl text-center animate-fade-in">

                <div className="lg:flex space-x-4">
                    <BioAuthorCard profile={author} />
                    <div className="flex flex-col">
                        <CreatePostToggle user={user} />
                        {sortedPosts?.map((post, index) => (
                            <Post key={index} post={post} width={"auto"} />
                        ))}
                    </div>
                </div>
            </div>

        </div>



    );
}

export default AnotherUserProfile;
