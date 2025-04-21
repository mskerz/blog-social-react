import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import EditPostModal from "./posts/forms/EditPostModal";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DeletePostConfirmDialog from "./posts/alert/DeletePostConfirmDialog";

function MenuUserPostDropdown({post} ) {
    const modalEditPost = useDisclosure();
    const dispatch = useDispatch();
    const alertDeleteConfirm  = useDisclosure();

    const onEditClick = ()=>{
        modalEditPost.onOpen();
    }

    const onDeleteClick = ()=>{
        alertDeleteConfirm.onOpen();
         
    }

    return (
   <>
        <Menu>
            {({ isOpen }) => (
                <>
                    <MenuButton size={"sm"} isActive={isOpen} as={Button} bg={"transparent"} rounded={"full"} _hover={{ rounded: "full" }}  >
                        <BsThreeDotsVertical />
                    </MenuButton>
                    <MenuList>
                        <MenuItem className="flex items-center space-x-2" onClick={onEditClick}>
                            <FaEdit />
                            <p>แก้ไขโพสต์</p>
                        </MenuItem>
                        <MenuItem className="flex items-center space-x-2" onClick={onDeleteClick}>
                            <FaTrashAlt />
                            <p>ย้ายไปถังขยะ</p></MenuItem>
                    </MenuList>
                </>
            )}
        </Menu>
    <EditPostModal post={post} isOpen={modalEditPost.isOpen} onClose={modalEditPost.onClose} />
    <DeletePostConfirmDialog postId={post.postId} isOpen={alertDeleteConfirm.isOpen} onClose={alertDeleteConfirm.onClose} />
   </>

    );
}
export default MenuUserPostDropdown;
