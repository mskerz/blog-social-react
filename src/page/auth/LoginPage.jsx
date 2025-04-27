import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, verify } from "../../store/slice/authSlice";
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import { useTheme } from "../../hook/useTheme";
import LoadingOverlay from "../LoadingPage";
import { GOOGLE_AUTH_URL } from "../../constant/endpoint";
import { BsEye, BsEyeFill, BsEyeSlash, BsEyeSlashFill } from "react-icons/bs";
 

const LoginPage = () => {
  const [email, setEmail] = useState("michael@example.com");
  const [password, setPassword] = useState("12345");
  const [showPassword, setShowPassword] = useState(false);
  const { isDark } = useTheme();


  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate hook สำหรับการเปลี่ยนเส้นทาง

  const { isLoggedIn, status } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for form submission
  };

  // "email": "michael@example.com",
  // "password": "12345",
  // เมื่อกดปุ่ม Login
  const LoginPressed = () => {
    // ทำการ dispatch action login
    const credentials = { email, password };
    const options = {
      autoClose: 2000,
      position: "bottom-center",
      theme: "dark",  // ใช้ธีม dark

    }
    // ทำการ dispatch action login
    dispatch(login(credentials))
      .unwrap()
      .then((data) => {
        // ถ้าการล็อกอินสำเร็จ
        dispatch(verify())
        toast.success("เข้าสู่ระบบสําเร็จ", options)

        navigate("/home");
      })
      .catch((error) => {
        // ถ้าการล็อกอินล้มเหลว
        toast.error(`${error.message || error}`, options);
      });
  };

 
  const handleGoogleLogin = () => {
    // เปิด URL สำหรับเริ่มกระบวนการล็อกอินด้วย Google
    window.location.href = GOOGLE_AUTH_URL;
  };
  if (status == "loading") {
    return <LoadingOverlay />
  }
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div style={(isDark ? { background: "#2D3748" } : { background: "white" })} className="w-full max-w-md p-8 space-y-6   rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium  ">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium  ">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 top-2 flex items-center text-sm text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm  ">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2">Remember me</span>
            </label>

            <a href="#" className="text-sm text-blue-500 hover:text-blue-700">Forgot password?</a>
          </div>

          <div className="flex space-x-4">
            <button onClick={LoginPressed} className="flex items-center gap-2 bg-white outline-1 text-black px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition">
              <span>Sign in </span>
            </button>

            <button onClick={handleGoogleLogin} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-950 transition">
              <span className="text-xl"><FcGoogle /></span>
              <span>Sign in with Google</span>
            </button>
          </div>
        </form>

        <div className="text-center text-sm  ">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-700">Sign up</Link>
        </div>
      </div>

      {/* Toast Container */}
    </div>
  );
};

export default LoginPage;
