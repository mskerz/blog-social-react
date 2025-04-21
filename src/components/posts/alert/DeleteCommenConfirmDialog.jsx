import { useRef } from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeCommentLocal } from "../../../store/slice/postSlice";

function DeleteCommenConfirmDialog({ postId,commentId, isOpen, onClose }) {
    const cancelRef = useRef();
    const dispatch = useDispatch();

 const onDelete =()=>{
    dispatch(removeCommentLocal({postId,commentId}));
    onClose();
    toast.success("ลบคอมเม้นสําเร็จ");
  }
    return (
        <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>ยืนยันการลบ Comment {commentId} </AlertDialogHeader>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            ยกเลิก
          </Button>
          <Button onClick={onDelete} color={"white"} bg={"red.500"} _hover={{ bg: "red.600" }} ml={3}  >
           ลบ
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    )
}
export default DeleteCommenConfirmDialog