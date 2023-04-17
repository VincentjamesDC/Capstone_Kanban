import React, {useState, useEffect} from 'react'
import useAuthContext from '../../context/Authentication';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const AdminPage = () => {

    const { user, getUser, logout } = useAuthContext();
    
  const [ highlighted, setHighlighted] = useState('dashboard');

  const handleClick = (value) =>{
    setHighlighted(value);
  }

    useEffect(() => {
      if (!user) {
        getUser();
      }
    }, []);
  
  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white  text-black ">
          <div className="fixed w-full flex items-center justify-between h-14 text-white z-10">
            <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-gray-800  border-none">
              {/* <img className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden" src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg" /> */}
              <span className="hidden md:block">{user.name}</span>
            </div>
            <div className="flex w-full justify-between items-center h-14 bg-gray-800 header-right">
              <div className="bg-white rounded invisible items-center w-full max-w-xl mr-4 p-2 shadow-sm border border-gray-200">
                <button className="outline-none focus:outline-none">
                  <svg className="w-5 text-gray-600 h-5 cursor-pointer" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>
                <input type="search" name="" id="" placeholder="Search" className="w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent" />
              </div>
              <ul className="flex items-center">
                <li>
                  <div className="block w-px h-6 mx-3 bg-gray-400 "></div>
                </li>
                <li>
                  <a onClick={logout} className="flex items-center mr-4 cursor-pointer hover:text-blue-100">
                    <span className="inline-flex mr-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    </span>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>

        
          <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-gray-800 h-full text-white transition-all duration-300 border-none z-10 sidebar">
            <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
              <ul className="flex flex-col py-4 space-y-1">
                <li className="px-5 hidden md:block">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-300 uppercase">Main</div>
                  </div>
                </li>
                <li>
                  <Link to="/admin" onClick={() => {handleClick('dashboard')}} className={highlighted !== 'dashboard' ? "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500  pr-6" : "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 text-white-600 text-white-800 border-l-4 border-transparent border-blue-500  pr-6"}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to='/admin/product-orders' onClick={() => {handleClick('kanban')}} className={highlighted !== 'kanban' ? "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500  pr-6" : "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 text-white-600 text-white-800 border-l-4 border-transparent border-blue-500  pr-6"}>
                    <span className="inline-flex justify-center items-center ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>                    
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Product Orders</span>
                    {/* <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full">New</span> */}
                  </Link>
                </li>
                <li>
                  <Link to='/admin/progress-tracker' onClick={() => {handleClick('tracker')}} className={highlighted !== 'tracker' ? "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500  pr-6" : "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 text-white-600 text-white-800 border-l-4 border-transparent border-blue-500  pr-6"}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Progress Tracker</span>
                    {/* <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full">New</span> */}
                  </Link>
                </li>
                {/* <li>
                  <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500  pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Notifications</span>
                    <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">1.2k</span>
                  </a>
                </li> */}
                <li className="px-5 hidden md:block">
                  <div className="flex flex-row items-center mt-5 h-8">
                    <div className="text-sm font-light tracking-wide text-gray-300 uppercase">departments</div>
                  </div>
                </li>
                <li>
                  <Link to='/admin/department-progress' onClick={() => {handleClick('report')}} className={highlighted !== 'report' ? "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500  pr-6" : "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 text-white-600 text-white-800 border-l-4 border-transparent border-blue-500  pr-6"}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Department Report</span>
                  </Link>
                </li>
                <li>
                  <Link to='/admin/users-page' onClick={() => {handleClick('users')}} className={highlighted !== 'users' ? "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500  pr-6" : "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 text-white-600 text-white-800 border-l-4 border-transparent border-blue-500  pr-6"}>
                    <span className="inline-flex justify-center items-center ml-4">
                      {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Department Users</span>
                  </Link>
                </li>
               
               
              </ul>
            </div>
          </div>
          <div className="h-full ml-14 mt-14 md:ml-64">
            <div className="">
                <Outlet></Outlet>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AdminPage