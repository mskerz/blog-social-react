import { Avatar, Box, Button, Divider, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Textarea } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { MdPublic, MdOutlineEmojiEmotions as MdEmoji } from "react-icons/md";
import { RiImageAddLine } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import {  getPosts } from "../../../store/slice/postSlice";

function EditPostModal({ isOpen, onClose, post }) {
    const [content, setContent] = useState(post?.content || "");
    const [showPicker, setShowPicker] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const textareaRef = useRef(null);
    const autoResize = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        }
    };

    const handleEmojiClick = (emojiData) => {
        setContent((prevContent) => prevContent + emojiData.emoji);
        setShowPicker(false);
    };

    const handleTextareaChange = (e) => {
        setContent(e.target.value);
        autoResize();
    };

    const handleUpdatePost = () => {
       
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent my={65} maxWidth={"60%"} minWidth={"50%"} width="60%" height="60%" boxShadow="xl" rounded="lg" border="none">
                <ModalBody className="flex flex-col p-4">
                    <Flex justify="space-between" align="center" mb={2}>
                        <p className="text-xl font-semibold">แก้ไขโพสต์</p>
                        <ModalCloseButton cursor="pointer" />
                    </Flex>
                    <Divider />
                    <Flex direction="column" my={4}>
                        <Flex align="center">
                            <Avatar src={user?.detail?.profileImage} name={`${user?.detail?.firstname} ${user?.detail?.lastname}`} bg="blue.500" color="white" />
                            <Box ml={2}>
                                <p className="font-medium">{user?.detail?.firstname} {user?.detail?.lastname}</p>
                                <div className="flex text-gray-500 space-x-1 items-center"><MdPublic size={"0.9em"} /> <p className="text-xs">Public</p></div>
                            </Box>
                        </Flex>
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
                                onKeyDown={(e) => e.key === 'Enter' && autoResize()}
                            />
                        </Box>
                        <Box display={"flex"} ml={"auto"}>
                            <Button onClick={() => setShowPicker(!showPicker)} mt={2}>
                                <MdEmoji />
                            </Button>
                            {showPicker && <EmojiPicker emojiStyle="facebook" onEmojiClick={handleEmojiClick} />}
                        </Box>
                    </Flex>
                </ModalBody>
                <ModalFooter display={"flex"} justifyContent={"space-between"}>
                    <Button cursor={"pointer"} className="flex items-center gap-2" bg={"transparent"}>
                        <RiImageAddLine />
                        <p>เพิ่มรูป</p>
                    </Button>
                    <Button onClick={handleUpdatePost}>บันทึก</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default EditPostModal;
