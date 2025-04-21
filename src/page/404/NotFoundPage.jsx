import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">ขออภัย! ไม่พบหน้าที่คุณต้องการ</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        กลับหน้าแรก
      </Link>
    </div>
  );
}

export default NotFoundPage;
