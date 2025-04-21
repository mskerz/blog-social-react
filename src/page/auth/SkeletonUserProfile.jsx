import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Box,
  Stack,
  Spacer,
  Flex,
  Card,
  CardBody,
  Divider,
} from "@chakra-ui/react";
import { useTheme } from "../../hook/useTheme";

const SkeletonUserProfile = () => {
  const { isDark } = useTheme();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Cover image skeleton */}
      <div
        style={isDark ? { background: "#2D3748" } : { background: "white" }}
        className="rounded-b-2xl pb-6 shadow-sm w-205 text-center animate-fade-in"
      >
        <Skeleton height="96" width="100%" borderRadius="lg" />

        {/* Profile avatar skeleton */}
        <Flex justifyContent="space-around" mt="-12" ml="5">
          <SkeletonCircle size="24" opacity={1} mt="4" className="mr-auto" />

          {/* Edit buttons skeleton */}
        </Flex>

        {/* Name and username skeleton */}
        <Box mt="6" ml="4" textAlign="left" className="space-y-2">
          <Skeleton height="5" width="30%" />
          <Skeleton height="4" width="20%" />
        </Box>
      </div>

      {/* Bio card and posts skeleton */}
      <Flex direction={{ base: "column", lg: "row" }} mt="4" gap="4">
        {/* Bio card skeleton */}
        <Box width={{ base: "100%", lg: "30%" }}>
          <Card
            style={isDark ? { background: "#2D3748" } : { background: "white" }}
          >
            <CardBody className="space-y-4">
                <Flex  direction={"column"} className="space-y-5">
                  <Skeleton width={"20%"} height={"4"} />
                  <Skeleton width={"50%"} alignItems={"center"} height={"4"} />
                    <Divider/>
                </Flex>
              <Flex direction={"column"} className="space-y-3">
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  className="items-center space-x-2"
                >
                  <Skeleton height="6" width={"6"} rounded={"full"} />
                  <Skeleton height="4" width={"full"} />
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  className="items-center space-x-2"
                >
                  <Skeleton height="6" width={"6"} rounded={"full"} />
                  <Skeleton height="4" width={"full"} />
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  className="items-center space-x-2"
                >
                  <Skeleton height="6" width={"6"} rounded={"full"} />
                  <Skeleton height="4" width={"full"} />
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  className="items-center space-x-2"
                >
                  <Skeleton height="6" width={"6"} rounded={"full"} />
                  <Skeleton height="4" width={"full"} />
                </Box>
              </Flex>
            </CardBody>
          </Card>
        </Box>

        {/* Posts skeleton */}
        <Box
          width={{ base: "100%", lg: "65%" }}
          display="flex"
          flexDirection="column"
          gap="4"
        >
          {/* <Skeleton height="10" borderRadius="xl" mb="4" /> */}

          {/* Multiple post skeletons */}
          {[1, 2, 3].map((_, index) => (
            <Box
              key={index}
              mb="4"
              className="space-y-3"
              p={4}
              rounded={"2xl"}
              style={
                isDark ? { background: "#2D3748" } : { background: "white" }
              }
            >
              <Flex direction={"row"}>
                <SkeletonCircle size="10" mr="2" />
                <Flex
                  direction={"column"}
                  rounded={"xl"}
                  className="space-y-2.5"
                >
                  <Skeleton width={"100"} height={"5"} />
                  <Skeleton width={"40"} height={"2"} />
                </Flex>
              </Flex>
              <Box className="space-y-2.5">
              <SkeletonText width={"100%"}  noOfLines={3} spacing="3" />

              </Box>
              <Skeleton height="200" borderRadius="xl" />
            </Box>
          ))}
        </Box>
      </Flex>
    </div>
  );
};

export default SkeletonUserProfile;
