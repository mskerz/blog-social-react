import { Avatar, Button, Card, CardBody, CardHeader, Divider, Flex } from "@chakra-ui/react";
import { FaAddressCard, FaBirthdayCake, FaEnvelope, FaPhone, FaEdit } from "react-icons/fa";

function BioUserCard({ user }) {
    return (
        <Flex direction="column" w={{ base: "auto", md: "full", lg: "auto" }}>
            <Card my={3} rounded="2xl" className="lg:w-auto  bg-white shadow-md rounded-lg p-4">
                <CardHeader textAlign={"start"} m={"-5"} className="flex items-center">
                    <p className="text-xl">แนะนำตัวเอง</p>
                </CardHeader>


                <CardBody className="text-center">
                    {/* Bio */}
                    <p className="text-xl">
                        {user?.detail?.bio || "ไม่มีคำแนะนำตัว"}
                    </p>

                    {/* Edit Bio Button */}
                    <Button
                        size="sm"
                        leftIcon={<FaEdit />}
                        colorScheme="blue"
                        variant="outline"
                        mt={3}
                    >
                        แก้ไขคำอธิบายตัวเอง
                    </Button>

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

