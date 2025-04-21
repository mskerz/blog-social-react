import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FaRegComment,
  FaRegHeart,
  FaShare,
  FaTransgender,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import LikeBar from "./like/LikeBar";
import LikesModal from "./like/LikeDetail";
import { TimeFormat } from "../../utils/time";
import CommentCard from "./card/CommentCard";
import CommentInput from "./forms/CommentInput";

function ModalPost({ open, close, post, selectedImage,onAvatarClick }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const modalLikes = useDisclosure();

  const handleGoToProfile = () => {
    onAvatarClick();
    close();
  };
  
  return (
    <>
      <Modal isOpen={open} onClose={close}>
        <ModalOverlay />
        <ModalContent
          my={65}
          p={4}
          minWidth={"75%"}
          minHeight={"auto"}
          width="100%"
          height="auto"
        >
          {/* <ModalCloseButton color="gray.700" mr="3" /> */}
          <ModalBody
            display={"flex"}
            flexDirection={{ base: "column", lg: "row" }}
          >
            {/* รูปภาพอยู่ทางซ้าย */}
            <Box flex="5" ml={-6} mt={-2} mb={-2} pr={3}>
              <Image
                rounded={"md"}
                src={selectedImage}
                alt="Selected Image"
                objectFit="cover"
                width="100%"
                height={"100%"} // ให้รูปเต็มขนาด
              />
            </Box>
            <ModalCloseButton cursor={"pointer"} />
            {/* ข้อความและข้อมูลผู้โพสต์อยู่ทางขวา */}
            <Box
              flex="4"
              display="flex"
              mt={{ base: 0, sm: 5 }} // mt เฉพาะ sm ขึ้นไป
              flexDirection="column"
            >
              <div className="flex flex-row items-center" mb={3}>
                <Avatar
                  onClick={handleGoToProfile}
                  src={post.profileImage}
                  name={post.authorName}
                  cursor={"pointer"}
                  size="sm"
                  mr={2}
                />
                <div className="flex flex-col mx-2">
                  <div>{post.authorName}</div>
                  <div>{TimeFormat.smartDate(post.createDate)}</div>
                </div>
              </div>
              <div>{post.content}</div>
              <div className="mt-3 flex">
                  <LikeBar post={post} onClickLikeDetail={modalLikes.onOpen} />
                </div>
              <Box
                p={2.5}
                 overflowY="auto"
                maxHeight="250px"
                display="flex"
                flexDirection="column"
                pr={2}
                gap={2} // space-y-2 ใน Tailwind เทียบกับ gap=2
                css={{
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  msOverflowStyle: "none", // แก้ไขจาก kebab-case เป็น camelCase
                  scrollbarWidth: "none", // แก้ไขจาก kebab-case เป็น camelCase
                }}
              >
                {post.comments.length === 0 ? (
                  <div className="text-center text-xl text-gray-400"> ยังไม่มีคอมเม้นในโพสต์นี้</div>
                ) : (
                  post.comments.map((comment, index) => (
                    <CommentCard key={index} comment={comment}  postId={post.postId}  />
                  ))
                )}
              </Box>

              {isLoggedIn ? (
                <div className="mt-auto py-4">
                  <CommentInput postId={post.postId} authorUsername={post.username}   />
                </div>
              ) : <div> </div>

              }
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <LikesModal
        likes={post.likes}
        isOpen={modalLikes.isOpen}
        onClose={modalLikes.onClose}
      />
    </>
  );
}
export default ModalPost;
