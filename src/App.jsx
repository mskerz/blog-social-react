//hook
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { verify } from "./store/slice/authSlice";

//routes
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
//page
import LoginPage from "./page/auth/LoginPage";
import UserProfile from "./page/auth/UserProfile";
import Navbar from "./components/layouts/Navbar";
import HomePage from "./page/HomePage";
import RegisterPage from "./page/auth/RegisterPage";
import AuthCallback from "./page/auth/GoogleCallback";
import Footer from "./components/layouts/Footer";
import NotFoundPage from "./page/404/NotFoundPage";
import ProtectedRoute from "./guard/ProtectRoutes";
import PublicRoutes from "./guard/PublicRoutes";
import { ToastContainer } from "react-toastify";
import AnotherUserProfile from "./page/auth/AnotherUserProfile";
import TrashPostsPage from "./page/auth/TrashPostsPage";
import { getCurrentUserPosts } from "./store/slice/postSlice";
import SplashPage from "./page/SplashPage";
import { AnimatePresence } from "framer-motion";
function App() {
  const dispatch = useDispatch();
  const [isSplashing, setIsSplashing] = useState(true);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const userData = useMemo(() => user, [user]);
  const dataFetched = useSelector(
    (state) => state.post.dataCurrentUserPostsFetched
  );

  useEffect(() => {
    if (!isLoggedIn && !userData) {
      dispatch(verify())
        .unwrap()
        .then(() => {
          if (!dataFetched) {
            dispatch(getCurrentUserPosts());
          }
        })
        .catch((err) => {
          console.error("verify failed", err);
        });
    }
  }, [dataFetched, dispatch, isLoggedIn, userData]);

  const handleSplash = () => {
    setIsSplashing(false);
  };

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      handleSplash();
    }, 3000); // Splash screen duration set to 3 seconds

    return () => clearTimeout(splashTimeout); // Cleanup timeout on component unmount
  }, []);

  return (
    <>
      <Router>
        <AnimatePresence mode="wait">
          {isSplashing ? (
            <SplashPage key={"splash"} />
          ) : (
            <div key={"main"} className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route
                    path="/login"
                    element={
                      <PublicRoutes>
                        <LoginPage />
                      </PublicRoutes>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <PublicRoutes>
                        <RegisterPage />
                      </PublicRoutes>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <UserProfile />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/trash-posts"
                    element={
                      <ProtectedRoute>
                        <TrashPostsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/auth-callback" element={<AuthCallback />} />
                  <Route path="*" element={<NotFoundPage />} />
                  <Route
                    path="/user/:username"
                    element={<AnotherUserProfile />}
                  />
                </Routes>
              </main>
            </div>
          )}
        </AnimatePresence>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
