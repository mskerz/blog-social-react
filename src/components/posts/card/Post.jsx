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
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikeStatus } from "../../../store/slice/likeSlice";
import { TimeFormat } from "../../../utils/time";
import ModalPost from "../ModalPost";
import LikesModal from "../like/LikeDetail";
import LikeBar from "../like/LikeBar";
import { useNavigate } from "react-router-dom";
import { getPostAuthor, setCurrentUsername } from "../../../store/slice/otherUserSlice";
function  Post({ post , width = "md" }) {
  const modalPost = useDisclosure();
  const modalLikes = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const {dataPostFetcheds} = useSelector((state) => state.author);
  const [selectedImage, setSelectedImage] = useState(null);
  // const { user } = useSelector((state) => state.auth);
  // ดึงสถานะไลค์จาก Redux store ด้วย useMemo

  const isUserPost = user?.detail?.posts?.includes(post.postId); // ตรวจสอบว่า post.id อยู่ใน user.detail.posts หรือไม่

  // handle fuction
  const handleImageClick = (image) => {
    const selected = image || post.imagePosts[0];

    setSelectedImage(selected);
    modalPost.onOpen();
  };

  const LikesDetailClick = () => {
    modalLikes.onOpen();
  };


  const handleAvatarClick = () => {
    dispatch(setCurrentUsername(post.username));
    if(!dataPostFetcheds[post.username]){
      dispatch(getPostAuthor(post.username));
    }

    navigate(isLoggedIn && post.username === user.username ? "/profile" : `/user/${post.username}`);
  };
  

  // จำนวนรูปภาพที่จะแสดงในกริด (รวมรูปแรก)
  const MAX_VISIBLE_IMAGES = 3;
  // จำนวนรูปภาพที่เหลือ (ไม่ได้แสดง)
  const remainingImages =
    post.imagePosts.length > MAX_VISIBLE_IMAGES
      ? post.imagePosts.length - MAX_VISIBLE_IMAGES
      : 0;


  return (
    <>
      <Card my={3} rounded={"2xl"} width={width}>
        <CardBody  >
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <Avatar
                src={post.profileImage}
                referrerPolicy="no-referrer"
                width="10"
                height="10"
                name={post.authorName}
                size="sm"
                border={"2px"}
                bg={isUserPost ? "blue.500" : "gray.500"} // ใช้สีตามเดิมถ้าไม่ใช่โพสต์ของผู้ใช้
                onClick={handleAvatarClick} // เพิ่มการคลิกที่ Avatar
                cursor="pointer"  
                color={"white"}
                mr={2}
              />
              <div className="flex flex-col ml-2 text-start">
                <div className="font-medium text-sm">{post.authorName}</div>
                <div className="font-light text-xs">
                  {TimeFormat.smartDate(post.createDate)}
                </div>
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
                        loading="lazy"
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
                    <Box
                      flex="2"
                      display="grid"
                      gridTemplateColumns="repeat(1, 1fr)"
                    >
                      {post.imagePosts
                        .slice(1, MAX_VISIBLE_IMAGES)
                        .map((image, index) => {
                          // ตรวจสอบว่าเป็นรูปสุดท้ายที่จะแสดงและมีรูปเหลืออีกหรือไม่
                          const isLastVisibleWithMore =
                            index === MAX_VISIBLE_IMAGES - 2 &&
                            remainingImages > 0;

                          return (
                            <Box
                              key={index}
                              position="relative"
                              overflow="hidden"
                            >
                              <Image
                                rounded="sm"
                                loading="lazy"
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
                                  onClick={() =>
                                    handleImageClick(
                                      post.imagePosts[MAX_VISIBLE_IMAGES]
                                    )
                                  }
                                  cursor="pointer"
                                >
                                  <Text
                                    fontSize="xl"
                                    fontWeight="bold"
                                    color="white"
                                  >
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

          <LikeBar post={post} onClickLikeDetail={LikesDetailClick} onOpenModal={() => handleImageClick(selectedImage)} />
        </CardFooter>
      </Card>
      <ModalPost
        post={post}
        selectedImage={selectedImage}
        open={modalPost.isOpen}
        close={modalPost.onClose}
        onAvatarClick={handleAvatarClick}
      />
      <LikesModal
        likes={post.likes}
        isOpen={modalLikes.isOpen}
        onClose={modalLikes.onClose}
      />
    </>
  );
}

export default Post;
