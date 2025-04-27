// AuthCallback.jsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Parse the query parameters
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const error = params.get('error');
    
    if (token) {
      // Store the token
      console.log(`Token with url params: ${token}`);
      
      Cookies.set('accessToken', token);
      // Update Redux state
      dispatch({ type: 'auth/loginSuccess', payload: { accessToken: token } });
      // Navigate to profile or dashboard
      navigate('/profile');
    } else if (error) {
      // Navigate to login with error
      console.log("have some thing ");
      
      navigate('/login', { state: { error } });
    } 
  }, [location, dispatch, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Processing authentication....</p>
    </div>
  );
};

export default AuthCallback;