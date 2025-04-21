import {
    Card,
    CardBody,
    CardFooter,
    Avatar,
    Button,
    Image,
    useDisclosure,
    Box,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { TimeFormat } from "../../../utils/time";
import ModalPost from "../ModalPost";
import LikesModal from "../like/LikeDetail";
import LikeBar from "../like/LikeBar";
import { useSelector } from "react-redux";
import MenuUserPostDropdown from "../../MenuPostDropdown";

function UserPost({ post, width = "md" }) {
    const modalPost = useDisclosure();
    const modalLikes = useDisclosure();
    const [selectedImage, setSelectedImage] = useState(null);
    const { user, isLoggedIn } = useSelector((state) => state.auth);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        modalPost.onOpen();
    };

    const LikesDetailClick = () => {
        modalLikes.onOpen();
    }





    // จำนวนรูปภาพที่จะแสดงในกริด (รวมรูปแรก)
    const MAX_VISIBLE_IMAGES = 3;
    // จำนวนรูปภาพที่เหลือ (ไม่ได้แสดง)
    const remainingImages = post.imagePosts.length > MAX_VISIBLE_IMAGES ?
        post.imagePosts.length - MAX_VISIBLE_IMAGES : 0;

    return (
        <>
            <Card my={3} rounded="2xl" width={width}>
                <CardBody  >
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <Avatar
                                src={post.profileImage}
                                referrerPolicy="no-referrer"
                                width="10"
                                height="10"
                                name={post.authorName}
                                size="sm"
                                color={"white"}
                                background={"blue.500"}
                            />
                            <div className="ml-2 flex flex-col text-start">
                                <div className="font-medium text-sm">{post.authorName}</div>
                                <div className="font-light text-xs">{TimeFormat.smartDate(post.createDate)}</div>
                            </div>
                            <div className="ml-auto -mt-3">
                                <MenuUserPostDropdown post={post}  />
                            </div>
                        </div>


                        <div className="mt-3 text-sm text-start">{post.content}</div>

                        {/* กรณีมีรูปภาพ */}
                        {post.imagePosts && post.imagePosts.length > 0 && (
                            <>
                                {/* กรณีมีเพียง 1 รูป */}
                                {post.imagePosts.length === 1 ? (
                                    <Box mt={3}>
                                        <Image
                                            rounded="sm"
                                            src={post.imagePosts[0]}
                                            alt="Post Image"
                                            onClick={() => handleImageClick(post.imagePosts[0])}
                                            cursor="pointer"
                                            _hover={{ opacity: 0.95 }}
                                            width="100%"
                                            objectFit="cover"
                                        />
                                    </Box>
                                ) : (
                                    /* กรณีมีหลายรูป */
                                    <Box display="flex" mt={3}>
                                        {/* รูปแรกขนาดใหญ่ทางซ้าย */}
                                        <Box flex="3" pr={0}>
                                            <Image
                                                rounded="sm"
                                                src={post.imagePosts[0]}
                                                alt="Post Image 1"
                                                onClick={() => handleImageClick(post.imagePosts[0])}
                                                cursor="pointer"
                                                _hover={{ opacity: 0.95 }}
                                                height="100%"
                                                objectFit="cover"
                                            />
                                        </Box>

                                        {/* รูปที่เหลือแสดงเป็นกริด 2 คอลัมน์ทางขวา */}
                                        <Box flex="2" display="grid" gridTemplateColumns="repeat(1, 1fr)" >
                                            {post.imagePosts.slice(1, MAX_VISIBLE_IMAGES).map((image, index) => {
                                                // ตรวจสอบว่าเป็นรูปสุดท้ายที่จะแสดงและมีรูปเหลืออีกหรือไม่
                                                const isLastVisibleWithMore =
                                                    index === MAX_VISIBLE_IMAGES - 2 && remainingImages > 0;

                                                return (
                                                    <Box
                                                        key={index}
                                                        position="relative"
                                                        overflow="hidden"
                                                    >
                                                        <Image
                                                            rounded="sm"
                                                            src={image}
                                                            alt={`Post image ${index + 2}`}
                                                            onClick={() => handleImageClick(image)}
                                                            cursor="pointer"
                                                            _hover={{ opacity: 0.8 }}
                                                            height="100%"
                                                            objectFit="cover"
                                                        />

                                                        {/* แสดง + จำนวนรูปที่เหลือ */}
                                                        {isLastVisibleWithMore && (
                                                            <Box
                                                                position="absolute"
                                                                top="0"
                                                                left="0"
                                                                right="0"
                                                                bottom="0"
                                                                backgroundColor="rgba(0, 0, 0, 0.6)"
                                                                display="flex"
                                                                alignItems="center"
                                                                justifyContent="center"
                                                                onClick={() => handleImageClick(post.imagePosts[MAX_VISIBLE_IMAGES])}
                                                                cursor="pointer"
                                                            >
                                                                <Text fontSize="xl" fontWeight="bold" color="white">
                                                                    +{remainingImages}
                                                                </Text>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                );
                                            })}
                                        </Box>
                                    </Box>
                                )}
                            </>
                        )}
                    </div>
                </CardBody>
                <CardFooter mt={-5}>
                    <LikeBar post={post} onClickLikeDetail={LikesDetailClick} />

                </CardFooter>
            </Card>
            <ModalPost post={post} selectedImage={selectedImage} open={modalPost.isOpen} close={modalPost.onClose} />
            <LikesModal likes={post.likes} isOpen={modalLikes.isOpen} onClose={modalLikes.onClose} />
            
        </>
    );
}

export default UserPost;

/* 
  in today i did :
  - optimistic ui like system
  - api change username
  - เตรียม UI ในการตั้ง Username 
  - ปรับการ Protect Route  Redirect หน้า    

*/