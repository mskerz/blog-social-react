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
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deletePostLocal, moveToTrash } from "../../../store/slice/postSlice";

function DeletePostConfirmDialog({ postId, isOpen, onClose }) {
  const cancelRef = useRef();
  const dispatch = useDispatch();
  const onDelete =()=>{
    dispatch(moveToTrash(postId))
          .unwrap()
          .then((data) => {
            // ถ้าการล็อกอินสำเร็จ
         
            toast.success(data.message)
    
           
          })
          .catch((error) => {
            // ถ้าการล็อกอินล้มเหลว
            toast.error(`${error.message || error}`);
          });
    onClose();
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
        <AlertDialogHeader>ยืนยันการย้ายโพสต์ไปที่ถังขยะ </AlertDialogHeader>
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
  );
}
export default DeletePostConfirmDialog;
