import { Avatar, Button, Link } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { CiLogout } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiHome2Line } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";

import { PiSignInFill } from "react-icons/pi";

const MobileMenu = ({ isMenuOpen, setIsMenuOpen, isLoggedIn, user, status, handleLogout }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen, setIsMenuOpen]);

    return (
        <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                    ref={menuRef}
                    className="md:hidden container mx-auto"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    <ul className="flex flex-col space-y-10 items-start text-center p-2   rounded-md z-50">
                        {isLoggedIn ? (
                             <>
                             <li>
                                 <Link to="/" className="flex items-center space-x-4"
                                 >

                                     <RiHome2Line size={25} />
                                     <p>หน้าแรก</p>
                                 </Link>
                             </li>
                             <li>
                                 <Link
                                     to="/profile"
                                     className="flex items-center space-x-4"
                                 >
                                     <Avatar
                                         size="xs"
                                         name={`${user?.detail?.firstname} ${user?.detail?.lastname}`}
                                         src={user?.detail?.profileImage}
                                     />
                                     <p>

                                         โปรไฟล์ผู้ใช้
                                     </p>
                                 </Link>
                             </li>
                             <li>
                                 <Link
                                     to="/trash-posts"
                                     className="flex items-center space-x-4"
                                 >
                                     <FaRegTrashAlt size={25} />

                                     <span>ถังขยะ</span>
                                 </Link>
                             </li>
                             <li>
                                 <Button
                                     display={"flex"}
                                     alignItems={"center"}
                                     gap={4}
                                     onClick={handleLogout}
                                     ml={-4}
                                     cursor={"pointer"}
                                     bg={"transparent"}
                                     _hover={{ bg: "transparent" }}
                                 >
                                     <CiLogout size={25} />

                                     <p className="text-sm">ออกจากระบบ</p>
                                 </Button>
                             </li>
                         </>
                        ) : (
                            <>
                                <li>
                                    <Link _hover={{ textDecoration: "none" }} to="/login"  className="flex items-center space-x-4">
                                    <PiSignInFill size={25} />
                                    <p> เข้าสู่ระบบ</p>
                                    </Link>
                                </li>
                                <li  >
                                    <Link to="/register" >
                                    <IoMdPersonAdd size={25} />
                                    <p>ลงทะเบียน</p>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
