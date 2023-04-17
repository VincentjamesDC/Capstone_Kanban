import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from '../context/Authentication'

const LoginAuth = () => {
  const { user } = useAuthContext();
  if( user ) {
    return user.role != 'User' ?  <Outlet></Outlet> : <Navigate to="/dashboard"/>; 
  }
  else{
    return <Navigate to="/" />
  }
};

export default LoginAuth;