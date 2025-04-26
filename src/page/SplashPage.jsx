import { motion } from "framer-motion";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { SlSocialDribbble } from "react-icons/sl";

function SplashPage() {
    const bgFrom = useColorModeValue("from-white", "from-gray-900");
    const bgTo = useColorModeValue("to-blue-400", "to-gray-950");
    const textColor = useColorModeValue("gray.800", "blue.100");

    return (
        <motion.div
            className={`bg-gradient-to-br ${bgFrom} ${bgTo} py-20 flex justify-center`}

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 0.5,
                    ease: "easeInOut", // 👈 นี่เลย!
                },
            }}        >
            <Box
                className="h-screen bg-transparent flex flex-col items-center justify-center"
                
            >
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}

                    transition={{ duration: 1 }}
                >
                    <FriendlyLogo textColor={textColor} />
                </motion.div>
            </Box>
        </motion.div>
    );
}

export default SplashPage;









function FriendlyLogo({ textColor }) {
    return (
        <Box fontSize="4xl" display={"flex"} alignItems={"center"} gap={2} fontWeight="bold" color={textColor}>
            <Text>Friendly</Text>

            <SlSocialDribbble className="text-blue-400" />

        </Box>
    )
}