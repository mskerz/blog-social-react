import { Modal, ModalOverlay, ModalContent, ModalBody, Image, Button, ModalCloseButton, Flex, Box, ModalHeader, Divider, Text } from "@chakra-ui/react";

function ImagePreviewModal({ isOpen, onClose, urlImage, }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent boxShadow="none">
        <ModalHeader>
          <div className="flex items-center my-2 justify-around">
            
            <ModalCloseButton cursor={"pointer"} />
          </div>
         </ModalHeader>
        <ModalBody display="block" my={-1} mb={3} justifyContent="center" alignItems="center">


          <Image
            src={urlImage}
            alt="Preview"
            maxH="80vh"
            rounded={"xl"}
            boxShadow="outline"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ImagePreviewModal;
