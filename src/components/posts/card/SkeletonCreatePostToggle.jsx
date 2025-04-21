import { SkeletonCircle, SkeletonText, Card, CardBody, Button, Skeleton } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function SkeletonCreatePostToggle({ width }) {
  return (
    <Card my={3} zIndex={0} width={width} rounded="2xl">
      <CardBody>
        <div className="flex">
        <SkeletonCircle size="10" mr={2} />

        <Skeleton rounded={"full"} />
        </div>
      </CardBody>
    </Card>
  );
}

export default SkeletonCreatePostToggle;
