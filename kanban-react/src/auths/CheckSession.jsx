import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from '../context/Authentication'

const CheckSession = () => {
  const { user } = useAuthContext();
  return !user ? <Navigate to="/"/> : <Outlet></Outlet>;
};

export default CheckSession;