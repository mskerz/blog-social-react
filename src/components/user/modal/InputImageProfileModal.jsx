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
import {
    changeImageProfile,
    changeProfileImage,
} from "../../../store/slice/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { EffectChangedAuthorProfile } from "../../../store/slice/postSlice";
function InputImageProfileModal({ user, isOpen, onClose }) {
    const [newImage, setNewImage] = useState(user?.detail?.profileImage);
    const dispatch = useDispatch();
    const handleImageUrlChange = (event) => {
        setNewImage(event.target.value);
    };

    const handleSave = () => {
        // สามารถเพิ่มการบันทึกหรือการส่งข้อมูลตามที่ต้องการ
        console.log("New Image URL:", newImage);
        dispatch(changeImageProfile({ newProfileImage: newImage }))
            .unwrap()
            .then((data) => {

                dispatch(changeProfileImage({ newProfileImage: newImage }));
                dispatch(
                    EffectChangedAuthorProfile({
                        username: user?.username,
                        newProfileImage: newImage,
                    })
                );
                toast.success(data.message);


            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
            });

        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={false} // Disable closing by clicking outside
        >
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>อัปโหลดรูปโปรไฟล์</ModalHeader>
                <ModalBody>
                    <Flex direction={"column"} align={"center"} className="space-y-4">
                         <Avatar
                            src={newImage}
                            bg={"blue.500"}
                            color={"white"}
                            size={"2xl"}
                            name={`${user?.detail?.firstname} ${user?.detail?.lastname}`}
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

export default InputImageProfileModal;
