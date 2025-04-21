import { Card, CardBody, CardHeader, Divider, Flex } from "@chakra-ui/react";
import { FaAddressCard, FaBirthdayCake, FaEnvelope, FaPhone, FaEdit } from "react-icons/fa";

function BioAuthorCard({ profile }) {
    return (
        <Flex direction="column" w={{ base: "auto", md: "full", lg: "md" }}>
            <Card my={3} rounded="2xl" className="lg:w-auto  bg-white shadow-md rounded-lg p-4">
                <CardHeader textAlign={"start"} m={"-5"} className="flex items-center">
                    <p className="text-xl">แนะนำตัวเอง</p>
                </CardHeader>


                <CardBody className="text-center">
                    {/* Bio */}
                    <p className="text-xl">
                        {profile?.detail?.bio || "ไม่มีคำแนะนำตัว"}
                    </p>



                    <Divider my={3} />
                    <div className="flex flex-col space-y-3 ">
                        <p className="flex items-center gap-2 text-lg">
                            <FaEnvelope /> {profile?.email}
                        </p>
                        <p className="flex items-center gap-2 text-lg">
                            <FaBirthdayCake /> {profile?.detail?.age} ปี
                        </p>
                        <p className="flex items-center gap-2 text-lg">
                            <FaPhone /> {profile?.detail?.phoneNumber} 
                        </p>
                        <p className="flex items-start gap-2 text-lg text-start">
                            <FaAddressCard />
                            <span className="-mt-1"> {profile?.detail?.address}</span>

                        </p>
                    </div>

                </CardBody>
            </Card>

        </Flex>
    );
}

export default BioAuthorCard;


{/* 
    
  <div className="mt-4">
                            <p className="flex items-center gap-2 text-lg">
                                <FaEnvelope /> {profile?.email}
                            </p>
                            <p className="flex items-center gap-2 text-lg">
                                <FaBirthdayCake /> อายุ: {profile?.detail?.age} ปี
                            </p>
                            <p className="flex items-center gap-2 text-lg">
                                <FaPhone /> {profile?.detail?.phoneNumber}
                            </p>
                            <p className="flex items-center gap-2 text-lg">
                                <FaAddressCard /> {profile?.detail?.address}
                            </p>
                        </div>

    */}