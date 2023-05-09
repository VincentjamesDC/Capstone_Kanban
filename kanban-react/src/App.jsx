import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from './pages/Index';
import Forbidden from './pages/403';

import UserLogin from './pages/UsersPage/UserLogin';
import AdminLogin2 from './pages/AdminPages/AdminLogin2';

import UserBoard from './pages/UsersPage';
import DashboardUser from './pages/UsersPage/Dashboard';
import Board from './pages/UsersPage/Boards/Board';
import CancelOrders from './pages/AdminPages/CancelOrders';

import AdminPage from './pages/AdminPages';
import Dashboard from './pages/AdminPages/Dashboard';
import UsersPage from './pages/AdminPages/UsersPage';
import OrdersPage from './pages/AdminPages/OrdersPage';
import OverallBoard from './pages/AdminPages/Board';
//Boards
import CuttingBoard from './pages/AdminPages/boards/CuttingBoard';

import UserAuth from './auths/UserAuth';
import CheckSession from './auths/CheckSession';
import AdminAuth from './auths/AdminAuth';
import CheckAdminSession from './auths/CheckAdminSession';
import LoginAuth from './auths/LoginAuth';
//Boards
import PrepBoard from './pages/UsersPage/Boards/PrepBoard';
import FirstAssembly from './pages/UsersPage/Boards/FirstAssembly';
import SecondAssembly from './pages/UsersPage/Boards/SecondAssembly';
import QualityControl from './pages/UsersPage/Boards/QualityControl';
import FinishingOne from './pages/UsersPage/Boards/FinishingOne';
import FinishingTwo from './pages/UsersPage/Boards/FinishingTwo';

//report 
import CuttingDept from './pages/UsersPage/Report/CuttingDept';
import AssemblyOneDept from './pages/UsersPage/Report/AssemblyOneDept';
import AssemblyTwoDept from './pages/UsersPage/Report/AssemblyTwoDept';
import PrepDept from './pages/UsersPage/Report/PrepDept';
import FinishingOneDept from './pages/UsersPage/Report/FinishingOneDept';
import FinishingTwoDept from './pages/UsersPage/Report/FinishingTwoDept';
import QualityControlDept from './pages/UsersPage/Report/QualityControlDept';

import Cancelled from './pages/UsersPage/Cancelled';

function App() {

  return (
    <>
     <Routes>
        <Route element={ <CheckAdminSession /> }>
           <Route path="/" element={<LandingPage />}/>
        </Route>

        <Route element={ <AdminAuth /> }>
          <Route path='/admin'  element={<AdminPage />}>
            <Route index element={<Dashboard />} />
            <Route path="users-page" element={<UsersPage />}></Route>
            <Route path="cancelled-orders" element={<CancelOrders />}></Route>
            <Route path="product-orders" element={<OrdersPage />}></Route>
            <Route path="progress-tracker" element={<OverallBoard />}></Route>
            {/* //boards */}
            <Route path="department-progress" element={<CuttingBoard />}></Route>
          </Route>
        </Route>
        <Route path="/403" element={<Forbidden />}></Route>

        <Route element={ <CheckSession /> }>
          <Route path='/dashboard'  element={<UserBoard />}>
            <Route index element={<DashboardUser />} />
            <Route path="cancelled-orders" element={<Cancelled />}></Route>
            {/* Boards */}
            {/* --- Cutting --- */}
            <Route path="cutting" element={<Board />}></Route>
            <Route path="cutting-report" element={<CuttingDept />}></Route>
            {/* --- A-1 Prep --- */}
            <Route path="assembly_preparation-report" element={<PrepDept />}></Route>
            <Route path="assembly_preparation" element={<PrepBoard />}></Route>
            {/* --- A-1 --- */}
            <Route path="assembly_one-report" element={<AssemblyOneDept />}></Route>
            <Route path="assembly_one" element={<FirstAssembly />}></Route>

            {/* --- A-2 --- */}
            <Route path="assembly_two-report" element={<AssemblyTwoDept />}></Route>
            <Route path="assembly_two" element={<SecondAssembly />}></Route>
            {/* --- QC --- */}
            <Route path="quality_control-report" element={<QualityControlDept />}></Route>
            <Route path="quality_control" element={<QualityControl />}></Route>

            {/* --- F-1 --- */}
            <Route path="finishing_one-report" element={<FinishingOneDept />}></Route>
            <Route path="finishing_one" element={<FinishingOne />}></Route>
            {/* --- F-2 --- */}
            <Route path="finishing_two-report" element={<FinishingTwoDept />}></Route>
            <Route path="finishing_two" element={<FinishingTwo />}></Route>
          </Route>
       </Route>
     </Routes>
    </>
  )
}

export default App
