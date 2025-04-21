import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import RemovePosts from "../../components/posts/card/RemovePosts";
import { getRemovePosts } from "../../store/slice/postSlice";
import { Button, Checkbox, Flex } from "@chakra-ui/react";
import SkeletonRemovePost from "../../components/posts/card/SkeletonRemovePost";

function TrashPostsPage() {
    const dispatch = useDispatch();
    const { currectUserRemovePosts , status } = useSelector((state) => state.post);
    const sortedPosts = useMemo(() => {
        return [...currectUserRemovePosts].sort((a, b) => {
            const dateA = new Date(a.createDate);
            const dateB = new Date(b.createDate);
            return dateB - dateA;
        });
    }, [currectUserRemovePosts]); // เมื่อ posts เปลี่ยนแปลง, จะคำนวณ sortedPosts ใหม่

    useEffect(() => {
    
        dispatch(getRemovePosts());
    },[dispatch]);

    return (
        <>
            <div className="flex flex-col   min-w-screen pt-30">


                <div className="flex flex-col justify-baseline mx-auto">
                    <div className="flex flex-col">
                        <p className="text-2xl text-start">รายการโพสต์ที่ถูกลบ</p>
                        <div className="flex text-start">
                            <Checkbox bg className="">ลบทั้งหมด</Checkbox>
                        </div>
                    </div>
                    {status === "loading" || sortedPosts.length === 0 ? (
                            
                            <>
                            <SkeletonRemovePost/>
                            <SkeletonRemovePost/>
                            </>

                    ) : (
                        
                        sortedPosts.map((post, index) => (
                            <RemovePosts key={index} post={post} width={"auto"} />
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
export default TrashPostsPage;
