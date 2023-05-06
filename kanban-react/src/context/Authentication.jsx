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

  const initialForm2 = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    department: "IT",
    role: "Admin"
  }

  const today = new Date();
  const numberOfDaysToAdd = 0;

  const date = today.setDate(today.getDate() + numberOfDaysToAdd); 
  const defaultTimeValue = new Date(date).toISOString().split('T')[0]

  const initialDeleteForm = {
      name: "",
      email: "",
      password: "",
      department: "",
      role: "",
      deleted_at: defaultTimeValue
  }


  const [formValues, setFormValues] = useState(initialForm);
  const [formValues2, setFormValues2] = useState(initialForm2);

  
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onChange2 = (e) => {
    const { name, value } = e.target;
    setFormValues2({ ...formValues2, [name]: value });
  };


    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState([]);
    const [showModal, setModal] = useState(false);
    const [showModal2, setModal2] = useState(false);


    const [ loading, setLoading ] = useState(false);
    const [result, setResult] = useState(null);

    const [del_result, setDelResult] = useState(null);
    const [res_result, setResResult] = useState(null);


    function closeResResult(){
      setTimeout(() => {
        setResResult(null);
      }, 5000)
    }

    function closeResResultFast(){
      setResResult(null);
    }
      
    function closeDelResult(){
      setTimeout(() => {
        setDelResult(null);
      }, 5000)
    }

    function closeDelResultFast(){
        setDelResult(null);
    }

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

    
    const createAdmin = async (e) => {
      e.preventDefault();
      setLoading(true);
      setErrors([]);
      try {
        const response = await axios.post("api/usergroup", formValues2);
        await getUsers();
        setFormValues(initialForm2);
        setResult(response.status);
        setModal2(false);
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

    const logout = () => {
        axios.post('/logout').then(() => {
            setUser(null);
            navigate("/");
        });
    };

    const deleteUser = async (id) => {
      const response = await axios.delete("api/usergroup/" + id);
      // const response = await axios.post(`api/usergroup/${id}`, {_method: 'delete'});
      await getUsers();
      setDelResult(response.status);
      closeDelResult();
    };

    const handleSoftDelete = async (id) => {
      const response = await axios.put("api/usergroup/" + id, initialDeleteForm);
      if(response.data.status === 200){
          getUsers();
          navigate("/admin/users-page");
          setDelResult(response.status);
          closeDelResult();
      }
    };

    const handleUserRestore = async (id) => {
      const response = await axios.put(`api/usergroup/${id}/restore`);
      if (response.data.status === 200) {
        getUsers();
        navigate("/admin/users-page");
        setResResult(response.status);
        closeResResult();
      }
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
        formValues2,
        setFormValues2,
        setFormValues,
        onChange,
        setModal,
        showModal,
        showModal2,
        setModal2,
        createUser,
        setErrors,
        loading,
        result,
        closeResultFast,
        deleteUser,
        del_result,
        closeDelResultFast,
        handleSoftDelete,
        handleUserRestore,
        res_result,
        closeResResultFast,
        onChange2,
        createAdmin,
        initialForm2
      }}>
      {children}
    </Auth.Provider>

}

export default function useAuthContext() {
      return useContext(Auth);
}

