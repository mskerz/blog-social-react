import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaTrashAlt, FaTrashRestore } from "react-icons/fa";
import EditPostModal from "./posts/forms/EditPostModal";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DeletePostConfirmDialog from "./posts/alert/DeletePostConfirmDialog";
import { MdDeleteForever } from "react-icons/md";
import DeletePostForeverConfirmDialog from "./posts/alert/DeletePostForeverConfirmDialog";

function MenuUserRemovePostDropdown({post} ) {
    const dispatch = useDispatch();
    const alertDeleteConfirm  = useDisclosure();

  
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
                        <MenuItem className="flex items-center space-x-2"  >
                            <FaTrashRestore />
                            <p>กู้คืนโพสต์</p>
                        </MenuItem>
                        <MenuItem className="flex items-center space-x-2" onClick={onDeleteClick}>
                            <MdDeleteForever  />
                            <p>ลบถาวร</p></MenuItem>
                    </MenuList>
                </>
            )}
        </Menu>
    <DeletePostForeverConfirmDialog postId={post.postId} isOpen={alertDeleteConfirm.isOpen} onClose={alertDeleteConfirm.onClose} />
   </>

    );
}
export default MenuUserRemovePostDropdown;
