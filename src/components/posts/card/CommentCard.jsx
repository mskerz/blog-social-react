

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Flex,
    Text,
    Avatar,
    Card,
    CardBody,
    Button,
    IconButton,
    ButtonGroup,
    Textarea,
} from "@chakra-ui/react";
import { FaCheck, FaTimes, FaRegHeart } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";

import { editCommentLocal } from "../../../store/slice/postSlice";

import { useTheme } from "../../../hook/useTheme";
import { TimeFormat } from "../../../utils/time";
import MenuCommentDropdown from "../../MenuCommentDropdown";

function CommentCard({ postId, comment }) {
    const { isDark } = useTheme();
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [editContent, setEditContent] = useState(comment?.user_comment_content);
    const [isEditing, setIsEditing] = useState(false);

    const LinkProfile = () => {
        navigate(
            isLoggedIn && comment?.user_comment_username === user.username
                ? "/profile"
                : `/user/${comment?.user_comment_username}`
        );
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSubmit = () => {
        dispatch(
            editCommentLocal({
                postId: postId,
                commentId: comment?.user_comment_id,
                updatedContent: editContent,
            })
        );
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditContent(comment?.user_comment_content); // รีเซ็ตข้อความ
        setIsEditing(false);
    };

    return (
        <Flex direction="row" alignItems="start">
            <Card height="auto" width="100%" shadow="none" rounded="2xl">
                <CardBody p={1}>
                    <Box display="block">
                        <Flex direction="row">
                            <Box my={1}>
                                <Avatar
                                    onClick={LinkProfile}
                                    cursor="pointer"
                                    src={comment?.user_comment_profileImage}
                                    size="sm"
                                    name={comment?.user_comment_fullname}
                                />
                            </Box>

                            <Flex direction="column" flex="1">
                                <Box bg={isDark ? "gray.600" : "gray.100"} p={"3"} rounded={"2xl"} className="mx-2.5">               
                                {isEditing ? ( 

                                    
                                        <Flex alignItems={"end"} gap={2}>
                                            <Textarea
                                                value={editContent}
                                                onChange={(e) => setEditContent(e.target.value)}
                                                size="sm"
                                                 rounded={"xl"}
                                                bg={"transparent"}

                                                border="2px"
                                                _focus={{ boxShadow: "none" }}
                                                _hover={{ bg: "transparent" }}
                                                resize="none"
                                                mt={2}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Escape') {
                                                        e.stopPropagation();
                                                        handleCancel();
                                                    }
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.stopPropagation();
                                                        handleSubmit();
                                                    }
                                                }}
                                                css={{
                                                    "&::-webkit-scrollbar": {
                                                      display: "none",
                                                    },
                                                    msOverflowStyle: "none", // แก้ไขจาก kebab-case เป็น camelCase
                                                    scrollbarWidth: "none", // แก้ไขจาก kebab-case เป็น camelCase
                                                  }}
                                            />
                                            <Flex justify="flex-end" mt={2}>
                                                <ButtonGroup size="sm">
                                                    <IconButton color={"green.400"} icon={<IoSendSharp />} onClick={handleSubmit} />
                                                </ButtonGroup>
                                            </Flex>
                                        </Flex>
                                    ) : (
                                        <>
                                        <Text fontSize="sm" fontWeight="bold">
                                    {comment?.user_comment_fullname}
                                </Text>
                                        <Text fontSize="sm" mt={2}>
                                            {editContent}
                                        </Text>
                                        </>
                                    )}
                                </Box>

                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    alignItems="center"
                                    textAlign="start"
                                    mx={2.5}
                                    my={1.5}
                                >
                                    <Text fontSize="xs">
                                        {TimeFormat.smartDate(comment?.comment_updatedAt)}
                                    </Text>
                                    <Button bg="transparent" variant="ghost" size="xs" className="space-x-2" ml={1}>
                                        <FaRegHeart />
                                    </Button>
                                    <Text fontSize="xs">{0}</Text>
                                </Box>
                            </Flex>

                            <MenuCommentDropdown
                                commentId={comment?.user_comment_id}
                                postId={postId}
                                onEditClick={handleEditClick}
                            />
                        </Flex>
                    </Box>
                </CardBody>
            </Card>
        </Flex>
    );
}

export default CommentCard;
