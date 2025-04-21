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
  
  function DeletePostForeverConfirmDialog({ postId, isOpen, onClose }) {
    const cancelRef = useRef();
    const dispatch = useDispatch();
    const onDelete =()=>{
       
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
          <AlertDialogHeader>ยืนยันการลบถาวร </AlertDialogHeader>
          <AlertDialogBody>
            แน่ใจนะ ! ว่าจะลบโพสต์นี้
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              ยกเลิก
            </Button>
            <Button onClick={onDelete} color={"white"} bg={"red.500"} _hover={{ bg: "red.600" }} ml={3}  >
             ลบถาวร
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  export default DeletePostForeverConfirmDialog;
  