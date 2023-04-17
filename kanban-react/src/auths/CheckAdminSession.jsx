import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from '../context/Authentication'

const CheckAdminSession = () => {
  const { user } = useAuthContext();
  return user ? <Navigate to="/admin"/> : <Outlet></Outlet>;
};

export default CheckAdminSession;