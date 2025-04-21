import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoutes = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation(); // ใช้สำหรับดึง path ปัจจุบัน

  // ถ้าล็อกอินอยู่แล้ว และพยายามไปที่ /login หรือ /register
  if (isLoggedIn) {
    return <Navigate to={location.state?.from || "/"} replace />;
  }

  return children;
}; 

export default PublicRoutes;
