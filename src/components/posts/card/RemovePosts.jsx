import {
    Card,
    CardBody,
    Avatar,
    useDisclosure,
  } from "@chakra-ui/react";
import { TimeFormat } from "../../../utils/time";
import MenuUserRemovePostDropdown from "../../MenuRemoveDropdown";
import SkeletonRemovePost from "./SkeletonRemovePost";

function RemovePosts({post,width}) {

    const modalPost = useDisclosure();
    const modalLikes = useDisclosure();

 
      const LikesDetailClick = () => {
        modalLikes.onOpen();
      };
    
  return (
    <>
    <Card my={3} rounded={"2xl"} width={width}>
            <CardBody  >
              <div className="flex flex-col">
                <div className="flex flex-row items-center">
                  <Avatar
                    src={post.profileImage}
                    referrerPolicy="no-referrer"
                    width="10"
                    height="10"
                    name={post.authorName}
                    size="sm"
                    border={"2px"}
                    bg={ "gray.500"} // ใช้สีตามเดิมถ้าไม่ใช่โพสต์ของผู้ใช้
                    cursor="pointer"  
                    color={"white"}
                    mr={2}
                  />
                  <div className="flex flex-col ml-2 text-start">
                    <div className="font-medium text-sm">{post.authorName}</div>
                    <div className="font-light text-xs"> {TimeFormat.smartDate(post.createDate)} </div>
                  </div>
                  <div className="ml-auto -mt-3">
                                <MenuUserRemovePostDropdown post={post} />
                </div>
                </div>
    
                <div className="mt-3 text-sm text-start">{post.content}</div>
    
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
export default RemovePosts