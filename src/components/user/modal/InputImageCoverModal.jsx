import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Image,
    ModalOverlay,
    Avatar,
    Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FALLBACK_IMAGE_URL } from "../../../constant/image";
import { changeCoverImageLocal } from "../../../store/slice/authSlice";

function InputImageCoverModal({ user, isOpen, onClose }) {
    const [newImage, setNewImage] = useState(user?.detail?.coverImage);
    const dispatch = useDispatch();

    const handleImageUrlChange = (event) => {
        setNewImage(event.target.value);
    };

    const handleSave = async () => {
        if (!newImage) {
            toast.error("กรุณาใส่ URL ของภาพ");
            return;
        }
    
        try {
            const imgElement =  new window.Image(); // หรือ HTMLImageElement
            imgElement.src = newImage;
    
            // ตรวจสอบ URL ว่าถูกต้องและสามารถโหลดภาพได้
            await new Promise((resolve, reject) => {
                imgElement.onload = resolve; // ภาพโหลดสำเร็จ
                imgElement.onerror = () => reject(new Error("ไม่สามารถโหลดภาพจาก URL ที่ให้มาได้")); // ภาพโหลดไม่สำเร็จ
            });
    
            // ถ้าภาพโหลดได้สำเร็จ ให้ทำการบันทึก
            console.log(`new Cover Image URL: ${newImage}`);
            dispatch(changeCoverImageLocal({ newCoverImage: newImage }));
            toast.success("เปลี่ยนหน้าปกสำเร็จ");
            setNewImage(''); // เคลียร์ input
            onClose(); // ปิด modal
        } catch (error) {
            toast.error(error.message || "ไม่สามารถโหลดภาพจาก URL ที่ให้มาได้");
        }
    };
    
    

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={false} // Disable closing by clicking outside
        >
            <ModalOverlay />

            <ModalContent >
                <ModalHeader>เปลี่ยนภาพหน้าปก</ModalHeader>
                <ModalBody>
                    <Flex direction={"column"} align={"center"} className="space-y-4">
                        <Image
                            src={newImage || FALLBACK_IMAGE_URL}  // ถ้า newImage เป็นค่าว่าง จะใช้ fallback image แทน
                            fallbackSrc={FALLBACK_IMAGE_URL}
                            bg={"blue.500"}
                            color={"white"}
                            size={"2xl"}
                            alt={`${user?.detail?.firstname} ${user?.detail?.lastname}`}
                        />
                        <Input
                            placeholder="ใส่ URL ของภาพ"
                            value={newImage}
                            onChange={handleImageUrlChange}
                        />
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" onClick={onClose}>
                        ยกเลิก
                    </Button>
                    <Button colorScheme="blue" onClick={handleSave}>
                        บันทึก
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default InputImageCoverModal;
