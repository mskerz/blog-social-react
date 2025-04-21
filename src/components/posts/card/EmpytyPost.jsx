import { Box, Text, Button, VStack, Flex } from "@chakra-ui/react";
import { FaInbox } from "react-icons/fa";
import { useTheme } from "../../../hook/useTheme"; 

function EmptyPosts() {
  const { isDark } = useTheme();
  return (
    <Flex direction={"column"} my={3} w="full"> {/* ใช้ w="full" เพื่อให้เต็มพื้นที่ */}
      <VStack spacing={5} align="center" justify="center" height="300px">
        <FaInbox size="50px" />
        <Text fontSize="lg" color="gray.500" px={3} >
        คุณยังไม่มีโพสต์ใด ๆ กรุณาสร้างโพสต์ใหม่เพื่อแบ่งปันเรื่องราวและประสบการณ์ของคุณ
        </Text>
      </VStack>
    </Flex>
  );
}

export default EmptyPosts;
