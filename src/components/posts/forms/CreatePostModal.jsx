import { Avatar, Box, Button, Divider, Flex, Modal, ModalBody, CloseButton, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Textarea, useColorModeValue } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { MdPublic, MdOutlineEmojiEmotions as MdEmoji } from "react-icons/md";
import { RiImageAddLine } from "react-icons/ri";
import EmojiPicker from 'emoji-picker-react';
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { createPostLocal, createPostUser, getPosts } from "../../../store/slice/postSlice";

function CreatePostModal({ isOpen, onClose }) {
    const [content, setContent] = useState('ทริปเชียงใหม่ครั้งแรก! บรรยากาศดี คนไม่เยอะ เดินเล่นชิลๆ ฟีลดีมาก 😍🌿');
    const [isDisabled, setDisable] = useState(true);
    const [showPicker, setShowPicker] = useState(false); // สำหรับเปิด/ปิด Emoji Picker
    const [imagePosts, setImagePosts] = useState([]);
    const [isShowInputImage, setIsShowInputImage] = useState({});
    const [firstTimeAddImage, setFirstTimeAddImage] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const MAX_LIMIT_IMAGE = 4;
    const textareaRef = useRef(null);
    const autoResize = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    };

    // ฟังก์ชันเพิ่มอีโมจิและปิด Picker
    const handleEmojiClick = (emojiData) => {
        setContent((prevContent) => prevContent + emojiData.emoji);
        setShowPicker(false); // ปิด Picker หลังจากเลือกอีโมจิ
    };

    // รวมฟังก์ชันเพื่อไม่ให้มี onChange ซ้อนกัน
    const handleTextareaChange = (e) => {
        setContent(e.target.value);
        autoResize();
        // อัปเดตสถานะปุ่ม disable โดยอัตโนมัติ
        setDisable(e.target.value.trim() === '');
    }

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

    const handleImageUrlChange = (index, url) => {
        const updatedImages = [...imagePosts];
        updatedImages[index] = url;
        setImagePosts(updatedImages);
    };

    const handleImageClick = (index) => {
        const updatedImages = [...imagePosts];
        updatedImages[index] = ''; // แปลงกลับเป็น input
        setImagePosts(updatedImages);
    };

    const deleteImage = (index) => {
        const updatedImages = [...imagePosts];
        updatedImages.splice(index, 1);

        setImagePosts(updatedImages);

        if (updatedImages.length === 0) {
            setFirstTimeAddImage(!firstTimeAddImage);
        }
    };


    const closeButtonColor = useColorModeValue("gray.500", "black");
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                my={65}
                maxWidth={"60%"}
                minWidth={"50%"}
                width="60%"
                height="60%"
                boxShadow="xl"
                rounded="lg"
                border="none" // ลบขอบออก
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
                            {!firstTimeAddImage && (
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
                                            <Box position="relative"  onClick={() => handleImageClick(index)} cursor="pointer" m={2}>
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

                </ModalBody>
                <ModalFooter display={"flex"} justifyContent={"space-between"} mb={40} >
                    <Box>
                        {imagePosts.length > 0 && (
                            <p className="text-sm text-gray-500">{`คุณได้เพิ่มรูปภาพ ${imagePosts.length} รูป`}</p>
                        )}
                    </Box>
                    <Button   onClick={handleCreatePost} isDisabled={isDisabled} >โพสต์</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CreatePostModal;
