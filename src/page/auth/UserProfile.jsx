import { useDispatch, useSelector } from "react-redux";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaEdit,
  FaCamera,
} from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  AvatarBadge,
  Button,
  IconButton,
  Image,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import CreatePostToggle from "../../components/posts/CreatePostToggle";
import { getCurrentUserPosts } from "../../store/slice/postSlice";
import UserPost from "../../components/posts/card/UserPost";
import { EditableUsername } from "../../components/user/EditableUsername";
import { useTheme } from "../../hook/useTheme";
import BioUserCard from "../../components/user/profile/BioUserCard";
// import ImagePreview from "../../components/user/profile/ImagePreview";
import EmptyPosts from "../../components/posts/card/EmpytyPost";
import InputImageProfileModal from "../../components/user/modal/InputImageProfileModal";
import InputImageCoverModal from "../../components/user/modal/InputImageCoverModal";
import ImagePreviewModal from "../../components/user/profile/ImagePreview";
import SkeletonUserProfile from "./SkeletonUserProfile";

function UserProfile() {
  const dispatch = useDispatch();
  const { user, status, isLoggedIn } = useSelector((state) => state.auth);
  const { currentUserPosts, dataCurrentUserPostsFetched } = useSelector((state) => state.post);
  const { isDark } = useTheme();
  const ModalImageProfile = useDisclosure();
  const ModalImageCover = useDisclosure();
  const ModalImagePreview = useDisclosure();
  const [selectedImage, setSelectedImage] = useState("");

  const sortedPosts = useMemo(() => {
    return [...currentUserPosts].sort((a, b) => {
      const dateA = new Date(a.createDate);
      const dateB = new Date(b.createDate);
      return dateB - dateA;
    });
  }, [currentUserPosts]); // เมื่อ posts เปลี่ยนแปลง, จะคำนวณ sortedPosts ใหม่

  const handleClickImageProfilePicker = () => {
    ModalImageProfile.onOpen();
  };

  const handleClickImagePreview = (imagePreview) => {
    setSelectedImage(imagePreview);
    ModalImagePreview.onOpen();
  };

  const handleImagerCoverPicker = () => {
    ModalImageCover.onOpen();
  };

  // useEffect(() => {
  //   if (!dataCurrentUserPostsFetched) {
  //     // ถ้า dataCurrentUserPostsFetched ยังไม่เป็น true (หมายถึงยังไม่ได้โหลดข้อมูลโพสต์ของผู้ใช้)
  //     dispatch(getCurrentUserPosts()); // เรียกดึงข้อมูลโพสต์ของผู้ใช้
  //   }
  // }, [dataCurrentUserPostsFetched, dispatch]);


 
  return (
    status === "loading" ? <SkeletonUserProfile /> :
      <div className="flex flex-col w-full items-center justify-center min-h-screen ">
        {isLoggedIn ? (
          <div className="max-w-4xl">
            <div
              style={isDark ? { background: "#2D3748" } : { background: "white" }}
              className="rounded-b-2xl pb-0.5  shadow-sm w-full  text-center animate-fade-in"
            >
              {/* Avatar */}
              <div className="relative  h-96 overflow-hidden">
                <Image
                  src={user?.detail?.coverImage}
                  alt="Cover"
                  layout="fill"
                  objectFit="cover"
                  cursor={"pointer"}
                  className="transition-opacity"

                  onClick={() =>
                    handleClickImagePreview(user?.detail?.coverImage)
                  }
                />
              </div>
              <div className="flex -mt-12 ml-5 justify-between">
                <div className="w-24 h-24   rounded-full flex items-center justify-center text-4xl font-bold shadow-md">
                  <Avatar
                    referrerPolicy="no-referrer"
                    size="xl"
                    color="whiteAlpha"
                    background="blue.500"
                    name={`${user.detail.firstname} ${user.detail.lastname}`}
                    src={user?.detail?.profileImage}
                    onClick={() =>
                      handleClickImagePreview(user?.detail?.profileImage)
                    }
                    cursor={"pointer"}

                    className="transition-opacity"
                  >
                    <AvatarBadge
                      boxSize="1.2em"
                      bg="transparent"
                      borderWidth="0" // เอาเส้นขอบออก
                    >
                      <IconButton
                        size="xs"
                        icon={<FaCamera />}
                        colorScheme="blue"
                        variant="solid"
                        rounded={"full"}
                        aria-label="Edit Profile"
                        onClick={(e) => {
                          e.stopPropagation(); // หยุดการส่งต่อของการคลิก
                          handleClickImageProfilePicker(); // ฟังก์ชันสำหรับการคลิกใน AvatarBadge
                        }} />
                    </AvatarBadge>
                  </Avatar>
                </div>
                <div className="flex flex-col mr-4 items-end">
                  <Button
                    width="32px" // ลดขนาดปุ่ม
                    height="32px"
                    cursor="pointer"
                    color="gray.700"
                    background="white"
                    rounded="md"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    padding="0"
                    onClick={handleImagerCoverPicker}
                  >
                    <FaCamera className="text-sm" />{" "}
                    {/* ปรับ text-2xl เพื่อให้ใหญ่ขึ้นแต่ไม่เกินปุ่ม */}
                  </Button>

                  <Spacer />
                  <Button cursor={"pointer"} rounded={"md"}>
                    <FaEdit />
                    <p className="text-sm font-medium">แก้ไขโปรไฟล์</p>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col m-4 -mt-0.5">
                <div>
                  <h1 className="text-2xl font-bold mt-5 text-left">
                    {user.detail.firstname} {user.detail.lastname}
                  </h1>
                  <div className="flex flex-row items-center space-x-3">
                    {/* <p className="text-left text-gray-500">{user.username ? `@${user.username}` : "กรุณาตั้งชื่อผู้ใช้"}</p>
                  <Button
                    size="xs"
                    cursor="pointer"
                    rounded="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="4" // ให้ความกว้างอัตโนมัติ
                    height="6" // ให้ความสูงอัตโนมัติ
                    padding="1"
                   >
                    <FaEdit  />
                  </Button> */}
                    <EditableUsername username={user.username} />
                  </div>
                </div>
              </div>

              {/* <ImagePreview/> */}
            </div>
            {/* <div className="rounded-2xl    text-center animate-fade-in"> */}

            <div className="rounded-2xl  w-full max-w-4xl text-center animate-fade-in">
              <div className="lg:flex space-x-4">
                <BioUserCard user={user} />
                <div className="flex flex-col">
                  <CreatePostToggle user={user} width="full" />
                  {sortedPosts.length === 0 ? (
                    <EmptyPosts />
                  ) : (
                    sortedPosts.map((post, index) => (
                      <UserPost key={index} post={post} width={"auto"} />
                    ))
                  )}
                </div>
              </div>
            </div>
            <InputImageProfileModal
              user={user}
              isOpen={ModalImageProfile.isOpen}
              onClose={ModalImageProfile.onClose}
            />
            <InputImageCoverModal
              user={user}
              isOpen={ModalImageCover.isOpen}
              onClose={ModalImageCover.onClose}
            />
            <ImagePreviewModal
              isOpen={ModalImagePreview.isOpen}
              onClose={ModalImagePreview.onClose}
              urlImage={selectedImage}
            />
          </div>
        ) : (
          <div></div>
        )
        }
      </div>
  );
}

export default UserProfile;
