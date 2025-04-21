import { Card, CardHeader, CardBody, Avatar, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import CreatePostModal from './forms/CreatePostModal';

function CreatePostToggle({ user, width = 'auto' }) {
  const modalCreatePost = useDisclosure();

  const handleCreatePostModal = () => {
    modalCreatePost.onOpen()
  }

  return (
    <>
      <Card my={3} zIndex={0} width={width} rounded="2xl" >
        <CardBody   >
          <div className="flex" >
            <Link to="/profile">
              <Avatar
                background={"blue.500"}
                color={"white"}
                src={user?.detail?.profileImage}
                width="10"
                height="10"
                name={`${user?.detail?.firstname} ${user?.detail?.lastname}`}
                size="sm"
                mr={2}
              />
            </Link>
            <Button
              rounded="3xl"
              width="full"
              onClick={handleCreatePostModal}
              cursor="pointer"
              fontSize="lg"
              height="10"
              fontWeight="light"
              display="flex"
              justifyContent="start"  // จัดข้อความไปทางซ้าย
              alignItems="center"
              textAlign="start"  // กำหนดให้ข้อความเริ่มต้นจากซ้าย
              px={4}  // เพิ่ม padding ด้านซ้ายให้ข้อความไม่ติดขอบ
            >
              คุณกำลังคิดอะไรอยู่   
            </Button>

          </div>
        </CardBody>
      </Card>
      <CreatePostModal isOpen={modalCreatePost.isOpen} onClose={modalCreatePost.onClose}
       
      />

    </>
  );
}
export default CreatePostToggle;
