import { Card, CardBody, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react"

function SkeletonRemovePost({width = "md"}) {
  return (
    <>
    <Card my={3} rounded={"2xl"} width={width}>
            <CardBody  >
              <div className="flex flex-col">
                <div className="flex flex-row items-center">
                  <SkeletonCircle  size={9}/>
                  <div className="flex flex-col ms-4 text-start">
                    <Skeleton height="10px" width="100px" mb={1} />
                    <Skeleton height="8px" width="60px" mb={1} />
                  </div>
                  <div className="ml-auto -mt-3">
                </div>
                </div>
    
                <div className="mt-3 text-sm text-start">
                <SkeletonText noOfLines={2} height={10} spacing={2} />    
                </div>
    
                {/* กรณีมีรูปภาพ */}
               
              </div>
            </CardBody>
            {/* <CardFooter mt={-5}>
              <LikeBar post={post} onClickLikeDetail={LikesDetailClick} />
            </CardFooter> */}
          </Card>
    </>
  )
}
export default SkeletonRemovePost