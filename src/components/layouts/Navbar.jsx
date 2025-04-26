import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slice/authSlice";
import { Link } from "react-router-dom";
import ProfileDropDown from "../Dropdown";
import {
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Button,
    IconButton,
    Text,
    Avatar,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { IoNotifications, IoMenu, IoClose } from "react-icons/io5";
import { SlSocialDribbble } from "react-icons/sl";

import { CiLogout, CiSearch } from "react-icons/ci";
import ThemeToggle from "../ThemeToggle";
import { useTheme } from "../../hook/useTheme";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import MobileMenuButton from "../ิbutton/MobileMenuButton";
import { FaRegTrashAlt, FaTrash, FaTrashAlt } from "react-icons/fa";
import { RiHome2Line } from "react-icons/ri";
function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isLoggedIn, status } = useSelector((state) => state.auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const handleLogout = () => {
        dispatch(logout());
        toast.success("ออกจากระบบสําเร็จ");
        navigate("/");
    };

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
        <nav className="shadow-md w-full  fixed top-0 z-50">
            <div className="container mx-auto p-3 flex justify-between items-center">
                {/* ================= Desktop View ================= */}
                <div className="hidden md:flex justify-between items-center w-full">
                    {/* Left: Logo & Search */}
                    <div className="flex items-center space-x-3">
                        <Link to="/" className="flex text-xl items-center gap-2 font-bold">
                            Friendly <SlSocialDribbble className="text-blue-400" />
                        </Link>


                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <CiSearch color='gray.300' size={15} className="mb-2"   />
                            </InputLeftElement>
                            <Input rounded={"full"} size={"sm"} width={"xs"}   type='tel' placeholder='Search..' />
                        </InputGroup>
                    </div>

                    {/* Right: Menu */}
                    <ul className="flex items-center space-x-6">
                        <li>
                            <ThemeToggle />
                        </li>
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <Button
                                        rounded="full"
                                        size="xs"
                                        background="blue.900"
                                        _hover={{ bg: "blue.700" }}
                                    >
                                        <IoNotifications color="white" size="1.5em" />
                                    </Button>
                                </li>
                                <li>
                                    <ProfileDropDown
                                        user={user}
                                        status={status}
                                        SignOutPressed={handleLogout}
                                    />
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">
                                        <Button bg="transparent" _hover={{ bg: "transparent" }}>
                                            เข้าสู่ระบบ
                                        </Button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/register">
                                        <Button>ลงทะเบียน</Button>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                {/* ================= Mobile View ================= */}
                <div className="flex md:hidden justify-between items-center w-full">
                    {/* Left: Logo */}
                    <Link to="/" className="flex text-xl items-center gap-2 font-bold">
                        Friendly <SlSocialDribbble className="text-blue-400" />
                    </Link>

                    {/* Right: Toggle & Menu Button */}
                    <div className="flex items-center space-x-3">
                        <ThemeToggle />
                        <MobileMenuButton
                            isOpen={isMenuOpen}
                            onToggle={() => setIsMenuOpen(!isMenuOpen)}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="md:hidden container mx-auto"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}

                    >
                        <ul className="flex flex-col mb-4 space-y-10 items-justify   p-4     z-50">
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
                                        <Link to="/login">
                                            <Button
                                                bg="transparent"
                                                cursor="pointer"
                                                _hover={{ bg: "transparent" }}
                                            >
                                                เข้าสู่ระบบ
                                            </Button>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/register">
                                            <Button>ลงทะเบียน</Button>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;

// หยุดแค่นี้ ก็คือส่วนของ fetch POsts และ จัดการ bug
