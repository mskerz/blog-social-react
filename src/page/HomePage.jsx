import { useSelector, useDispatch } from "react-redux";
import CreatePostToggle from "../components/posts/CreatePostToggle";
import { Avatar, Card, CardBody, CardHeader } from "@chakra-ui/react";
import Post from "../components/posts/card/Post";
import { useEffect, useMemo } from "react";
import { getPosts } from "../store/slice/postSlice";
import EmptyPosts from "../components/posts/card/EmpytyPost";
import SkeletonPost from "../components/posts/card/SkeletonPost";
import SkeletonCreatePostToggle from "../components/posts/card/SkeletonCreatePostToggle";

function HomePage() {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const { posts, status, dataPostFetched } = useSelector((state) => state.post);

  // useMemo
  // useMemo เพื่อคำนวณ sortedPosts เมื่อ posts เปลี่ยนแปลง
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const dateA = new Date(a.createDate);
      const dateB = new Date(b.createDate);
      return dateB - dateA;
    });
  }, [posts]); // เมื่อ posts เปลี่ยนแปลง, จะคำนวณ sortedPosts ใหม่

  useEffect(() => {


    if (!dataPostFetched) {

      dispatch(getPosts()); // ดึงข้อมูลโพสต์จาก API ถ้ายังไม่ได้ดึง
    }    // Cleanup timer เมื่อ component unmount
  }, [dataPostFetched, dispatch]);

  return (
    <div className="flex flex-col  min-w-screen pt-20">
      <div className="flex justify-center">
        {isLoggedIn ? (
          <CreatePostToggle user={user} width="md" />
        ) : status === "loading" ? (
          <SkeletonCreatePostToggle width={"md"} />
        ) : (
          <div></div>
        )}
      </div>


      <div className="flex flex-col items-center justify-center">
        {status === "loading" ? (
          <>
            <SkeletonPost width="md" />
            <SkeletonPost width="md" />
            <SkeletonPost width="md" />
          </>
        ) : sortedPosts.length === 0 ? (
          <EmptyPosts />
        ) : (
          sortedPosts.map((post, index) => (
            <Post key={index} post={post} isLoggedIn={isLoggedIn} />
          ))
        )}
      </div>

    </div>
  );
}
export default HomePage;
