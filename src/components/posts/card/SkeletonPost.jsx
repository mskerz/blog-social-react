import { Box, Card, CardBody, CardFooter, Avatar, Skeleton, SkeletonText, Image, SkeletonCircle } from "@chakra-ui/react";

const SkeletonPost = ({ width }) => {
  return (
    <Card my={3} rounded={"2xl"} width={width}>
      <CardBody>
        <div className="flex flex-col">
          {/* Header - Avatar & Name */}
          <div className="flex flex-row items-center">
            <SkeletonCircle size="10" mr={2} />
            <div className="flex flex-col ml-2 text-start">
              <Skeleton height="10px" width="80px" mb={1} />
              <Skeleton height="8px" width="60px" />
            </div>
          </div>

          {/* Content */}
          <div className="mt-3">
            <SkeletonText noOfLines={3} spacing="3" />
          </div>

          {/* Image Placeholder */}
          <Box mt={3}>
            <Skeleton height="200px" width="100%" />
          </Box>
        </div>
      </CardBody>
      <CardFooter mt={-5} className="space-x-4">
        <Skeleton height="20px" width="70px" rounded={"full"} />
        <Skeleton height="20px" width="70px" rounded={"full"} />

      </CardFooter>
    </Card>
  );
};

export default SkeletonPost;
