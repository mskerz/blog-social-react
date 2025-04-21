import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import EditPostModal from "./posts/forms/EditPostModal";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DeletePostConfirmDialog from "./posts/alert/DeletePostConfirmDialog";
import DeleteCommenConfirmDialog from "./posts/alert/DeleteCommenConfirmDialog";

function MenuCommentDropdown({ commentId, postId, onEditClick }) {
    const dispatch = useDispatch();
    const alertDeleteConfirm = useDisclosure();



    const onDeleteClick = () => {
        alertDeleteConfirm.onOpen();

    }

    return (
        <>
            <Menu>
                {({ isOpen }) => (
                    <>
                        <MenuButton size={"sm"} isActive={isOpen} as={Button} bg={"transparent"} rounded={"full"} _hover={{ rounded: "full" }}  >
                            <BsThreeDots />
                        </MenuButton>
                        <MenuList>
                            <MenuItem className="flex items-center space-x-2"  onClick={onEditClick}
                            >
                                <FaEdit />
                                <p>แก้ไขความคิดเห็น</p>
                            </MenuItem>
                            <MenuItem className="flex items-center space-x-2" onClick={onDeleteClick}>
                                <FaTrashAlt />
                                <p>ลบคอมเม้น</p></MenuItem>
                        </MenuList>
                    </>
                )}
            </Menu>
            <DeleteCommenConfirmDialog postId={postId} commentId={commentId} isOpen={alertDeleteConfirm.isOpen} onClose={alertDeleteConfirm.onClose} />
        </>

    );
}
export default MenuCommentDropdown;
