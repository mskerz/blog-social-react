import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Avatar,
    AvatarBadge,
    Icon
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { TimeFormat } from "../../../utils/time";

function LikesModal({ likes, isOpen, onClose }) {

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent width="80%" height="80%">
                    <ModalHeader>
                        <div className="flex items-center space-x-3">
                            <FaHeart />
                            <p className="font-normal text-md">ผู้ใช้ที่ถูกใจ</p>
                        </div>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div>
                            {likes.map((like, index) => (
                                <div className="flex items-center justify-baseline  space-x-4" key={index}>
                                    <div className="flex items-center space-x-4 space-y-3">
                                        <Avatar  size="sm" src={like.user_like_profileImage} name={like.user_like_fullname}>
                                            <AvatarBadge bg="transparent" borderColor={"transparent"}>
                                                <Icon as={FaHeart} color="red" />
                                            </AvatarBadge>
                                        </Avatar>
                                        <p>{like.user_like_fullname} </p>
                                    </div>


                                </div>
                            ))}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default LikesModal;
