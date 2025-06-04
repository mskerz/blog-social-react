import { Avatar, Box, Button, Divider, Flex, Modal, ModalBody, CloseButton, ModalCloseButton, ModalContent, ModalOverlay, Textarea, useColorModeValue } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { MdPublic, MdOutlineEmojiEmotions as MdEmoji } from "react-icons/md";
import { RiImageAddLine } from "react-icons/ri";
import EmojiPicker from 'emoji-picker-react';
import { toast } from "react-toastify";
import { createPostLocal, createPostUser, getPosts } from "../../../store/slice/postSlice";
import { usePostContent, usePostImages } from "../../../hook/usePostModal";

function CreatePostModal({ isOpen, onClose }) {
    const {
        content,
        setContent,
        showPicker,
        setShowPicker,
        isDisabled,
        setDisable,
        textareaRef,
        autoResize,
        handleEmojiClick,
        handleTextareaChange,
    } = usePostContent("");

    const {
        imagePosts,
        setImagePosts,
        firstTimeAddImage,
        setFirstTimeAddImage,
        handleImageUrlChange,
        handleImageClick,
        deleteImage,
    } = usePostImages([]);

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const MAX_LIMIT_IMAGE = 4;
    const closeButtonColor = useColorModeValue("gray.500", "black");

    const handleCreatePost = () => {
        if (!content.trim()) {
            toast.warning("คุณยังไม่ได้เขียนเนื้อหาโพสต์");
            return; // กันไม่ให้โพสต์ว่างเปล่า
        }
        const newPostLocal = {
            content: content,
            authorName: `${user?.detail?.firstname} ${user?.detail?.lastname}`,
            username: user?.username,
            profileImage: user?.detail?.profileImage || "",
            imagePosts: imagePosts || [],
            likes: [],
            comments: [],
            createDate: new Date().toISOString(),  // แปลงเป็น ISO string
            updateDate: new Date().toISOString()
        }

        const newPostRemote = {
            content: content,
            imagePosts: imagePosts || [],
        }

        dispatch(createPostLocal(newPostLocal));

        dispatch(createPostUser(newPostRemote))
            .unwrap()
            .then((data) => {
                // ถ้าการล็อกอินสำเร็จ
                dispatch(getPosts());
                toast.success(data.message); // แจ้งเตือนเมื่อโพสต์สำเร็จ

            })
            .catch((error) => {
                // ถ้าการล็อกอินล้มเหลว
                toast.error(`${error.message || error}`);
            });

        setContent('')
        setDisable(true);
        onClose();
    }



    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                my={65}
                maxWidth={"60%"}
                minWidth={"50%"}
                width="60%"
                height="auto"
                boxShadow="xl"
                rounded="lg"
                border="none"
                display="flex"
                flexDirection="column"
            >
                <ModalBody className="flex flex-col p-4">

                    {/* Header */}
                    <Flex justify="space-between" align="center" mb={2}>
                        <p className="text-xl font-semibold">สร้างโพสต์</p>
                        <ModalCloseButton cursor="pointer" />
                    </Flex>
                    <Divider />

                    {/* User Info */}
                    <Flex direction="column" my={4}>
                        <Flex align="center">
                            <Avatar
                                src={user?.detail?.profileImage}
                                name={`${user?.detail?.firstname} ${user?.detail?.lastname}`}
                                bg="blue.500"
                                color="white"
                            />
                            <Box ml={2}>
                                <p className="font-medium">{user?.detail?.firstname} {user?.detail?.lastname}</p>
                                <div className="flex text-gray-500 space-x-1 items-center"><MdPublic size={"0.9em"} /> <p className="text-xs " >Public</p></div>
                            </Box>
                        </Flex>

                        {/* Input Field */}
                        <Box mt={4}>
                            <Textarea
                                placeholder="What's on your mind?"
                                fontSize="lg"
                                border="none"
                                _focus={{ boxShadow: "none" }}
                                _hover={{ bg: "transparent" }}
                                ref={textareaRef}
                                onChange={handleTextareaChange}
                                value={content}
                                overflow="hidden"
                                maxHeight={"200px"}
                                resize="none"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        autoResize();
                                    }
                                }}
                            />
                        </Box>

                        {/* Image Upload Section */}
                        <Box mt={4}>
                            {firstTimeAddImage && (
                                <Button onClick={() => {
                                    setImagePosts([...imagePosts, ''])
                                    setFirstTimeAddImage(true)
                                }}>
                                    <RiImageAddLine />
                                    เพิ่มรูป
                                </Button>
                            )}
                            <Box mt={2} display="flex" flexDirection={"row"} alignItems={"center"}>
                                {imagePosts.map((imageUrl, index) => (
                                    <Box key={index} m={2}>
                                        {imageUrl ? (
                                            <Box position="relative" onClick={() => handleImageClick(index)} cursor="pointer" m={2}>
                                                <CloseButton
                                                    className="right-0 top-0  "
                                                    onClick={(e) => {
                                                        e.stopPropagation();  // ป้องกันการเรียก handleImageClick เมื่อคลิก CloseButton
                                                        deleteImage(index);
                                                    }}
                                                    position="absolute"
                                                    color={closeButtonColor}
                                                    size="sm"

                                                    zIndex="1"
                                                />
                                                <img
                                                    src={imageUrl}
                                                    alt={`preview-${index}`}
                                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                                />
                                            </Box>

                                        ) : (
                                            <input
                                                type="text"
                                                placeholder="กรอก URL รูปภาพ"
                                                value={imageUrl}
                                                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                                style={{ width: '100px' }}
                                            />
                                        )}
                                    </Box>
                                ))}
                                {imagePosts.length > 0 && (
                                    <Button
                                        onClick={() => {
                                            if (imagePosts.length < MAX_LIMIT_IMAGE) {
                                                setImagePosts([...imagePosts, '']);  // เพิ่มช่อง input ใหม่
                                            } else {
                                                toast.warning(`คุณสามารถเพิ่มรูปได้สูงสุด ${MAX_LIMIT_IMAGE} รูปเท่านั้น`);
                                                return;
                                            }
                                        }}
                                    >
                                        +
                                    </Button>
                                )}
                            </Box>

                        </Box>

                        <Box display={"flex"} ml={"auto"} position={"sticky"}>
                            <Button onClick={() => setShowPicker(!showPicker)} style={{ marginTop: "10px" }}>
                                <MdEmoji />
                            </Button>
                            {showPicker && <EmojiPicker emojiStyle="facebook" onEmojiClick={handleEmojiClick} />}
                        </Box>


                    </Flex>
                    <Flex
                        direction="row"
                        justify="space-between"
                        position="sticky"
                        bottom="0"
                        py={2}
                        mt="auto"
                        zIndex={1}
                    >
                        <Box>
                            {imagePosts.length > 0 && (
                                <p className="text-sm text-gray-500">{`คุณได้เพิ่มรูปภาพ ${imagePosts.length} รูป`}</p>
                            )}
                        </Box>
                        <Button onClick={handleCreatePost} isDisabled={isDisabled}>
                            โพสต์
                        </Button>
                    </Flex>

                </ModalBody>

            </ModalContent>
        </Modal>
    )
}

export default CreatePostModal;
