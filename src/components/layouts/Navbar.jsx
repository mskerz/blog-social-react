import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slice/authSlice";
import { Link } from "react-router-dom";
import ProfileDropDown from "../Dropdown";
import { Input, InputGroup, InputLeftElement, Stack, Button, IconButton } from '@chakra-ui/react';
import { useState } from "react";
import { IoNotifications, IoMenu, IoClose } from "react-icons/io5";
import { SlSocialDribbble } from "react-icons/sl";

import { CiSearch } from "react-icons/ci";
import ThemeToggle from "../ThemeToggle";
import { useTheme } from "../../hook/useTheme";
import { toast } from "react-toastify";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isLoggedIn, status } = useSelector((state) => state.auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isDark } = useTheme();
    const handleLogout = () => {
        dispatch(logout());
        toast.success("ออกจากระบบสําเร็จ");
        navigate("/");
    };

    return (
        <nav className="shadow-sm  w-full fixed top-0 z-50">
            <div className="container mx-auto p-3 flex justify-between items-center">
                {/* โลโก้และค้นหา */}
                <div className="flex items-center space-x-3">
                    <Link to="/" className="flex text-xl items-center gap-2 font-bold"> Friendly <SlSocialDribbble className="text-blue-400"/>  </Link>
                    <div className="hidden md:block">
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <CiSearch />
                            </InputLeftElement>
                            <Input width="xs" size="sm" rounded="full" placeholder="ค้นหา..." />
                        </InputGroup>
                    </div>
                </div>

                {/* เมนูสำหรับมือถือ */}
                <div className="md:hidden flex items-center space-x-3">
                    <ThemeToggle />

                    <IconButton icon={isMenuOpen ? <IoClose /> : <IoMenu />} onClick={() => setIsMenuOpen(!isMenuOpen)} />
                </div>

                {/* เมนูหลัก */}<ul className={`md:flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-6 
                items-center justify-center text-center 
                ${isMenuOpen ? 'flex' : 'hidden'}  
                md:flex absolute md:static lg:bg-transparent 
                w-full md:w-auto left-0 md:left-auto top-16 md:top-auto 
                shadow-md md:shadow-none p-5 md:p-0`}
                >
                    <li className="hidden md:block"><ThemeToggle /></li>
                    {isLoggedIn ? (
                        <>
                            <li>
                                <Button rounded="full" size="xs" background="blue.900" _hover={{ bg: "blue.700" }}>
                                    <IoNotifications color="white" size="1.5em" />
                                </Button>
                            </li>
                            <li>
                                <ProfileDropDown user={user} status={status} SignOutPressed={handleLogout} />
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login"><Button className="cursor-pointer w-full md:w-auto" bg={"transparent"} _hover={{ bg: "transparent" }} >เข้าสู่ระบบ</Button></Link></li>
                            <li><Link to="/register">
                                <Button   className=" cursor-pointer w-full md:w-auto ">ลงทะเบียน</Button>
                            </Link></li>
                        </>
                    )}
                </ul>

            </div>
        </nav>
    );
}

export default Navbar;

// หยุดแค่นี้ ก็คือส่วนของ fetch POsts และ จัดการ bug 