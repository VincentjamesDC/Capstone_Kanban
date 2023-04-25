import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from '../context/Authentication'

const UserAuth = () => {
  const { user } = useAuthContext();
  if( user ) {
    return user.role != 'User' ?  <Navigate to="/admin"/> : <Navigate to="/dashboard"/>; 
  }
  else{
    return <Navigate to="/" />
  }

};

export default UserAuth;