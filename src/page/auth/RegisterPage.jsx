import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { signup } from "../../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useTheme } from "../../hook/useTheme";

const RegisterPage = () => {
    const [dataRegister, setDataRegister] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        age: 0,
        phoneNumber: '',
        address: '',
        profileImage: '',
    });
    const {  isDark } = useTheme();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status } = useSelector((state) => state.auth);
    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple validation
      
        const options = {
            autoClose: 2000,
            position: "bottom-center",
            theme: "dark",  // ใช้ธีม dark

        }
        if (!dataRegister.email || !dataRegister.password || dataRegister.age <= 0) {
            toast.error("กรุณากรอกข้อมูลให้ครบถ้วน", options);
            return;
        }

         // ทำการ dispatch action login
         dispatch(signup(dataRegister))
              .unwrap()
              .then((data) => {
                // ถ้าการล็อกอินสำเร็จ
                toast.success("ลงทะเบียนสําเร็จ", options);
                navigate("/login");

            })
              .catch((error) => {
                // ถ้าการล็อกอินล้มเหลว
                toast.error(`${error.message || error}`,options);
              });
      
    };

    useEffect(() => {
        document.title = "Sign up";
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center  lg:my-13   ">
            {/* 
                // panel
           */}
           
            <div style={(isDark ? { background: "#2D3748"} : {background:"white"})} className="   w-full  max-w-xl p-10  px-6 space-y-6  rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center ">Register</h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium ">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={dataRegister.email}
                            onChange={(e) => setDataRegister({ ...dataRegister, email: e.target.value })}
                            
                            className="mt-2 p-2 w-full border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium ">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={dataRegister.password}
                            onChange={(e) => setDataRegister({ ...dataRegister, password: e.target.value })}
                            
                            className="mt-2 p-2 w-full border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="flex flex-col ">
                        {/* First Name Field */}

                        <div className="flex flex-row space-x-3">
                            <div>
                                <label htmlFor="firstname" className="block text-sm font-medium ">First Name</label>
                                <input
                                    id="firstname"
                                    type="text"
                                    value={dataRegister.firstname}
                                    onChange={(e) => setDataRegister({ ...dataRegister, firstname: e.target.value })}
                                    
                                    className="mt-2 p-2 w-full border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your first name"
                                />
                            </div>
                            {/* Last Name Field */}
                            <div>
                                <label htmlFor="lastname" className="block text-sm font-medium ">Last Name</label>
                                <input
                                    id="lastname"
                                    type="text"
                                    value={dataRegister.lastname}
                                    onChange={(e) => setDataRegister({ ...dataRegister, lastname: e.target.value })}
                                    
                                    className="mt-2 p-2 w-full border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your last name"
                                />
                            </div>
                        </div>

                        <div className="flex flex-row space-x-3">


                            {/* Phone Number Field */}
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium ">Phone Number</label>
                                <input
                                    id="phoneNumber"
                                    type="text"
                                    value={dataRegister.phoneNumber}
                                    onChange={(e) => setDataRegister({ ...dataRegister, phoneNumber: e.target.value })}
                                    
                                    className="mt-2 p-2 w-full border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <div>
                                <label htmlFor="age" className="block text-sm font-medium ">Age</label>
                                <input
                                    id="age"
                                    type="number"
                                    value={dataRegister.age}
                                    onChange={(e) => setDataRegister({ ...dataRegister, age: e.target.value })}
                                    
                                    className="mt-2 p-2 w-20 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your age"
                                />
                            </div>
                        </div>


                    </div>
                    {/* Age Field */}


                    {/* Address Field */}
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium ">Address</label>
                        <textarea className="mt-2 p-3 w-full border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={dataRegister.address}
                            onChange={(e) => setDataRegister({ ...dataRegister, address: e.target.value })}
                            name="" id="" cols="30"></textarea>
                    </div>

                    {/* Google Sign Up Button */}
                    <div className="flex justify-center">
                        <button style={isDark ? {background: "white", color: "black" }:{ background: "#2D3748", color: "white" }} className="flex items-center gap-2    px-4 py-2 rounded-lg shadow-md  hover:shadow-lg transition-all duration-300">
                            <span>Sign Up</span>
                        </button>

                    </div>
                </form>


            </div>
            <ToastContainer/>
        </div>
    );
};

export default RegisterPage;
