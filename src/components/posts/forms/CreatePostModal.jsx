import { Avatar, Box, Button, Divider, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Textarea } from "@chakra-ui/react"
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
    const [imagePosts, setImagePosts] = useState([
        "https://images.unsplash.com/photo-1599698011977-c08128ff1652?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)

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
                        <Box display={"flex"} ml={"auto"}>
                            <Button onClick={() => setShowPicker(!showPicker)} style={{ marginTop: "10px" }}>
                                <MdEmoji />
                            </Button>
                            {showPicker && <EmojiPicker emojiStyle="facebook" onEmojiClick={handleEmojiClick} />}

                        </Box>
                    </Flex>

                </ModalBody>
                <ModalFooter display={"flex"} justifyContent={"space-between"} >
                    <Button cursor={"pointer"} className="flex items-center gap-2" bg={"transparent"} >
                        <RiImageAddLine />
                        <p>เพิ่มรูป</p>
                    </Button>
                    <Button onClick={handleCreatePost} isDisabled={isDisabled} >โพสต์</Button>



                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CreatePostModal
