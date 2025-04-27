import {
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Flex,
    Text,
    Box,
} from '@chakra-ui/react'
import { IoNotifications } from 'react-icons/io5'


export default function NotificationPopOver() {
    return (
        <PopoverContent height={"md"}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
                <Flex gap={2} alignItems={"center"}>
                    <IoNotifications />
                    <Text>Notification</Text>
                </Flex>
            </PopoverHeader>
            <PopoverBody>
                <Box p={2}>
                <Text>No notifications available.</Text>
                </Box>
            </PopoverBody>
        </PopoverContent>
    )
}