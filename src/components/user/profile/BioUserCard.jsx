import { Avatar, Button, Card, CardBody, CardHeader, CloseButton, Divider, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { FaAddressCard, FaBirthdayCake, FaEnvelope, FaPhone, FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { changeBio } from "../../../store/slice/authSlice";
import { toast } from "react-toastify";
import { BsX } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

function BioUserCard({ user }) {
    const [bio, setBio] = useState(user?.detail?.bio || "ไม่มีคำแนะนำตัว");
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();


    const toggleChangeBio = () => {
     
        setIsEditing(!isEditing);
    }
    const handleCancel = () => {
        setIsEditing(false);
    }
    const handleEditBio = () => {
        if (bio === "ไม่มีคำแนะนำตัว" || bio === "") {
            toast.warn("กรุณากรอกคำแนะนำตัว")
            return;
        }
        dispatch(changeBio({ bio: bio }))
            .unwrap()
            .then((data) => {
                // ถ้าการล็อกอินสำเร็จ

                toast.success( data.message+" : "+data.bio)

            })
            .catch((error) => {
                // ถ้าการล็อกอินล้มเหลว
                toast.error(`${error.message || error}`);
            });
    }
    
    /*  
    
     dispatch(login(credentials))
          .unwrap()
          .then((data) => {
            // ถ้าการล็อกอินสำเร็จ
            dispatch(verify())
            toast.success("เข้าสู่ระบบสําเร็จ", options)
    
            navigate("/home");
          })
          .catch((error) => {
            // ถ้าการล็อกอินล้มเหลว
            toast.error(`${error.message || error}`, options);
          });
    */

    return (
        <Flex direction="column" w={{ base: "auto", md: "full", lg: "auto" }}>
            <Card my={3} rounded="2xl" className="lg:w-auto  bg-white shadow-md rounded-lg p-4">
                <CardHeader textAlign={"start"} m={"-5"} className="flex items-center">
                    <p className="text-xl">แนะนำตัวเอง</p>
                </CardHeader>


                <CardBody className="text-center">
                    {/* Bio */}
                    {isEditing ? (
                        <div className="flex flex-col space-y-3 ">
                            <textarea
                                type="text"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="border border-gray-300 rounded-md p-2"
                            />
                            <div className="flex items-center gap-2">
                            <Button
                                size="sm"
                                leftIcon={<FaEdit />}
                                colorScheme="blue"
                                variant="outline"
                                mt={3}
                                onClick={handleEditBio}
                            >
                                บันทึก
                            </Button>
                            <Button
                                size="sm"
                                leftIcon={<MdCancel />}
                                colorScheme="red"
                                variant="outline"
                                mt={3}
                                onClick={handleCancel}
                            >ปิด</Button>
                            </div>
                        </div>) : <p className="text-xl">
                        {bio}
                    </p>
                    }

                    {/* Edit Bio Button */}
                  { !isEditing  &&  ( <Button
                        size="sm"
                        leftIcon={<FaEdit />}
                        colorScheme="blue"
                        variant="outline"
                        mt={3}
                        onClick={toggleChangeBio}
                    >
                        แก้ไขคำอธิบายตัวเอง
                    </Button>)

                  }

                    <Divider my={3} />
                    <div className="flex flex-col space-y-3 ">
                        <p className="flex items-center gap-2 text-lg">
                            <FaEnvelope /> {user?.email}
                        </p>
                        <p className="flex items-center gap-2 text-lg">
                            <FaBirthdayCake />  {user?.detail?.age} ปี
                        </p>
                        <p className="flex items-center gap-2 text-lg">
                            <FaPhone /> {user?.detail?.phoneNumber}
                        </p>
                        <p className="flex items-start gap-2 text-lg text-start">
                            <FaAddressCard />

                            <span className="-mt-1">{user?.detail?.address}</span>

                        </p>
                    </div>
                </CardBody>
            </Card>

        </Flex>
    );
}

export default BioUserCard;

