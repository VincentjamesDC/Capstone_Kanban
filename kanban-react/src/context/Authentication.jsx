import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from '../kanban-api/axios';
import { useNavigate } from "react-router-dom";

const Auth = createContext({});

export const AuthProvider = ({ children }) => {

  const initialForm = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    department: "",
    role: "User"
  }

  const [formValues, setFormValues] = useState(initialForm);
  
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState([]);
    const [showModal, setModal] = useState(false);

    const [ loading, setLoading ] = useState(false);
    const [result, setResult] = useState(null);

    function closeResult(){
      setTimeout(() => {
        setResult(null);
      }, 5000)
    }

    function closeResultFast(){
        setResult(null);
    }

    const navigate = useNavigate();

    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const getUser = async () => {
        const { data } = await axios.get("/api/user");
        setUser(data); 
    }

    const getUsers = async () => {
      const users = await axios.get("api/usergroup");
      setUsers(users.data.data);
    };

    const createUser = async (e) => {
      e.preventDefault();
      setLoading(true);
      setErrors([]);
      try {
        const response = await axios.post("api/usergroup", formValues);
        await getUsers();
        setFormValues(initialForm);
        setResult(response.status);
        setModal(false);
        closeResult();
      } catch (e) {
        if (e.response.status === 422) {
          setErrors(e.response.data.errors);
        }
      }
      setLoading(false);
    }

    const loginAdmin = async ({ ...data }) => {
        await csrf();
        setLoading(true);
        setErrors([]);
        try {
          await axios.post('login',  data );
          await getUser();
          navigate("/admin");
        } catch(e) {
          if (e.response.status === 422){
            setErrors(e.response.data.errors);
          }
        }
        setLoading(false);
    };

    // const loginUser = async ({ ...data }) => {
    //     await csrf();
    //     setLoading(true);
    //     setErrors([]);
    //     try {
    //       await axios.post('login',  data );
    //       await getUser();
    //       navigate("/dashboard");
    //     } catch(e) {
    //       if (e.response.status === 422){
    //         setErrors(e.response.data.errors);
    //       }
    //     }
    //     setLoading(false);
    //   };

    const logout = () => {
        axios.post('/logout').then(() => {
            setUser(null);
            navigate("/");
        });
    };

    return <Auth.Provider value = {{ 
        loginAdmin,
        errors,
        getUser,
        user,
        logout,
        users,
        getUsers,
        formValues,
        setFormValues,
        onChange,
        setModal,
        showModal,
        createUser,
        setErrors,
        loading,
        result,
        closeResultFast
      }}>
      {children}
    </Auth.Provider>

}

export default function useAuthContext() {
      return useContext(Auth);
}

