
import React, {useState, useEffect, useContext} from 'react'
import OrdersContext from '../../context/Orders'
import { Link } from 'react-router-dom';

import { ExportToExcel } from '../components/ExcelExport';
import { ExportToExcel2 } from '../components/ExcelExport2';

import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";

const Dashboard = () => {

  const { product_orders, getOrders} = useContext(OrdersContext);

  useEffect(()=>{
    getOrders();
  }, [])
  
  const rmCuttingStart= product_orders.map(({ cutting_start, ...rest }) => rest);
  const rmCuttingFinish = rmCuttingStart.map(({ cutting_finish, ...rest }) => rest);

  const rmPrepStart = rmCuttingFinish.map(({ assembly_prep_start, ...rest }) => rest);
  const rmPrepFinish = rmPrepStart.map(({ assembly_prep_finish, ...rest }) => rest);

  const rmAssemblyOneStart = rmPrepFinish.map(({ assembly_one_start, ...rest }) => rest);
  const rmAssemblyOneFinish = rmAssemblyOneStart.map(({ assembly_one_finish, ...rest }) => rest);

  const rmAssemblyTwoStart = rmAssemblyOneFinish.map(({ assembly_two_start, ...rest }) => rest);
  const rmAssemblyTwoFinish = rmAssemblyTwoStart.map(({ assembly_two_finish, ...rest }) => rest);

  const rmQCStart = rmAssemblyTwoFinish.map(({ quality_control_start, ...rest }) => rest);
  const rmQCFinish = rmQCStart.map(({ quality_control_finish, ...rest }) => rest);

  const rmFinishingOneStart = rmQCFinish.map(({ finishing_one_start, ...rest }) => rest);
  const rmFinishineOneFinish = rmFinishingOneStart.map(({ finishing_one_finish, ...rest }) => rest);

  const rmFinishingTwoStart = rmFinishineOneFinish.map(({ finishing_two_start, ...rest }) => rest);
  const rmFinishineTwoFinish = rmFinishingTwoStart.map(({ finishing_two_finish, ...rest }) => rest);

  // const rmAssembled1 = rmDatePreped.map(({ date_assembled_one, ...rest }) => rest);
  // const rmAssembled2 = rmAssembled1.map(({ date_assembled_two, ...rest }) => rest);
  // const rmChecked = rmAssembled2.map(({ date_checked, ...rest }) => rest);
  // const rmDataFinished1 = rmChecked.map(({ date_finished_one, ...rest }) => rest);


  const filtered2 = rmFinishineTwoFinish.filter(product_order => product_order.date_finished !== null && product_order.status == "Reviewed");
  const filtered = filtered2.map(({ status, ...rest }) => rest);


  const [filteredOrders, setFiltered] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const [ dateFilter, setDateFilter] = useState('');
  const [ weekFilter, setWeekFilter] = useState('');

  const filterWeek = (array) => {
    if(weekFilter != ''){
      return array.filter((order) => order.week_issued.toLowerCase() === weekFilter.toLowerCase());
    }
    else{
      return array;
    }
  };

  const filterDate = (array) => {
    if(dateFilter != ''){
      return array.filter((order) => order.date_finished === dateFilter);
    }
    else{
      return array;
    }
  };

  useEffect(() => {
    let result = filtered;

    result = filterWeek(result);
    result = filterDate(result);
    setFiltered(result);
  }, [weekFilter, dateFilter]);

  useEffect(() => {
          
    if(weekFilter != "" || dateFilter != "" )
    {
      setIsFiltered(true);
    }
    else{
      setIsFiltered(false);
    }
  }, [weekFilter, dateFilter]);

  return (

    <div className='md:px-12'>
        <div className="h-full mt-14">
        <div className="grid gap-6 mb-4 md:grid-cols-2 xl:grid-cols-6">
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                    <div className="p-3 mr-4 rounded-full text-orange-100 bg-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5V7A2.5 2.5 0 0011 4.5H8.128a2.252 2.252 0 011.884-1.488A2.25 2.25 0 0112.25 1h1.5a2.25 2.25 0 012.238 2.012zM11.5 3.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.25h-3v-.25z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M2 7a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7zm2 3.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm0 3.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>

                    </div>
                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-400">
                        Ongoing Cutting
                        </p>
                        <p className="text-lg font-semibold text-gray-200">
                        {product_orders?.filter(product_order => product_order.cutting === "In-Progress").length}
                        </p>
                    </div>
                    </div>
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                    <div className="p-3 mr-4 rounded-full text-orange-100 bg-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5V7A2.5 2.5 0 0011 4.5H8.128a2.252 2.252 0 011.884-1.488A2.25 2.25 0 0112.25 1h1.5a2.25 2.25 0 012.238 2.012zM11.5 3.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.25h-3v-.25z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M2 7a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7zm2 3.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm0 3.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-400">
                        Ongoing Assembly-1
                        </p>
                        <p className="text-lg font-semibold text-gray-200">
                        {product_orders?.filter(product_order => product_order.assembly_one === "In-Progress").length}
                        </p>
                    </div>
                    </div>
                    <div className="flex items-center p-4  rounded-lg shadow-xs bg-gray-800">
                    <div className="p-3 mr-4  rounded-full text-green-100 bg-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5V7A2.5 2.5 0 0011 4.5H8.128a2.252 2.252 0 011.884-1.488A2.25 2.25 0 0112.25 1h1.5a2.25 2.25 0 012.238 2.012zM11.5 3.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.25h-3v-.25z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M2 7a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7zm2 3.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm0 3.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-400">
                        Ongoing Assembly-2
                        </p>
                        <p className="text-lg font-semibold text-gray-200">
                        {product_orders?.filter(product_order => product_order.assembly_two === "In-Progress").length}
                        </p>
                    </div>
                    </div>
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                        <div className="p-3 mr-4  rounded-full text-teal-100 bg-teal-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5V7A2.5 2.5 0 0011 4.5H8.128a2.252 2.252 0 011.884-1.488A2.25 2.25 0 0112.25 1h1.5a2.25 2.25 0 012.238 2.012zM11.5 3.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.25h-3v-.25z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M2 7a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7zm2 3.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm0 3.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                            </svg>
                        </div>
                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-400">
                        Ongoing QC
                        </p>
                        <p className="text-lg font-semibold text-gray-200">
                        {product_orders?.filter(product_order => product_order.quality_control === "In-Progress").length}
                        </p>
                    </div>
                    </div>
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                    
                    <div className="p-3 mr-4  rounded-full text-blue-100 bg-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5V7A2.5 2.5 0 0011 4.5H8.128a2.252 2.252 0 011.884-1.488A2.25 2.25 0 0112.25 1h1.5a2.25 2.25 0 012.238 2.012zM11.5 3.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.25h-3v-.25z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M2 7a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7zm2 3.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm0 3.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-400">
                        Ongoing Finishing-1
                        </p>
                        <p className="text-lg font-semibold text-gray-200">
                        {product_orders?.filter(product_order => product_order.finishing_one === "In-Progress").length}
                        </p>
                    </div>
                    </div>
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                    <div className="p-3 mr-4 rounded-full text-orange-100 bg-purple-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5V7A2.5 2.5 0 0011 4.5H8.128a2.252 2.252 0 011.884-1.488A2.25 2.25 0 0112.25 1h1.5a2.25 2.25 0 012.238 2.012zM11.5 3.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.25h-3v-.25z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M2 7a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7zm2 3.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm0 3.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-400">
                        Ongoing Finishing-2
                        </p>
                        <p className="text-lg font-semibold text-gray-200">
                        {product_orders?.filter(product_order => product_order.finishing_two === "In-Progress").length}
                        </p>
                    </div>
                    </div>
                </div>
        </div>
        <div className="">
            <h3 className="text-lg font-semibold">Enrod Orders Summary</h3>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 py-4 gap-4 text-gray-800 ">
          <div className="md:col-span-2 xl:col-span-1">
            <div className="rounded bg-white p-3 border shadow-md border-gray-200">
              <div className="flex justify-between py-1 text-gray-800 ">
                <h3 className="text-sm font-semibold">Orders in TO-DO</h3>
                <svg className="h-4 fill-current text-gray-600 dark:text-gray-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" /></svg>
              </div>
              <div className="text-sm text-white mt-2 max-h-[30vh] overflow-y-scroll scrollbar-hide">
              {
                    product_orders?.filter(product_order => product_order.date_finished === null && product_order.cutting === null).slice(0,7).map(order => {
                        return(
                          <Link to='/admin/product-orders'> 
                            <div className="bg-gray-800 hover:bg-blue-700 p-2 rounded mt-1 border-b cursor-pointer">Order # {order.product_order} - Item Code: {order.item_code}</div>
                          </Link>
                        )
                    })
                }
              </div>
            </div>
          </div>
          <div className='md:col-span-2 xl:col-span-1'>
            <div className="rounded bg-white p-3 border shadow-md border-gray-200">
              <div className="flex justify-between py-1 text-gray-800">
                <h3 className="text-sm font-semibold">Orders In-Progress</h3>
                <svg className="h-4 fill-current text-gray-600 dark:text-gray-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" /></svg>
              </div>
              <div className="text-sm text-white mt-2 max-h-[30vh] overflow-y-scroll scrollbar-hide">
                {
                    product_orders?.filter(product_order => product_order.date_finished === null && product_order.cutting !== null).slice(0,7).map(order => {
                        return(
                          <Link to='/admin/product-orders'>
                            <div class="bg-gray-800 hover:bg-blue-700 p-2 rounded mt-1 border-b  cursor-pointer">Order # {order.product_order} - Item Code: {order.item_code}</div>
                          </Link>
                        )
                    })
                }
              </div>
            </div>
          </div>
          <div className='md:col-span-2 xl:col-span-1'>
            <div className="rounded bg-white shadow-md border-gray-200 border p-3">
              <div className="flex justify-between py-1 text-gray-800 ">
                <h3 className="text-sm font-semibold">Completed Orders</h3>
                <svg className="h-4 fill-current text-gray-600 dark:text-gray-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" /></svg>
              </div>
              <div className="text-sm text-white mt-2 max-h-[30vh] overflow-y-scroll scrollbar-hide">
                  {
                      product_orders?.filter(product_order => product_order.date_finished !== null && product_order.finishing_two === "Done" && product_order.status !== "Reviewed").slice(0,7).map(order => {
                          return(
                            <Link to='/admin/product-orders'> 
                              <div className="bg-gray-800 hover:bg-blue-700  p-2 rounded mt-1 border-b border-gray-100  cursor-pointer">Order # {order.product_order} - Item Code: {order.item_code}</div>
                            </Link>
                          )
                      })
                  }
              </div>
            </div>
          </div>
          <div className='md:col-span-2 xl:col-span-1'>
            <div className="rounded bg-white shadow-md border-gray-200 border p-3">
              <div className="flex justify-between py-1 text-gray-800 ">
                <h3 className="text-sm font-semibold">Reviewed Orders</h3>
                <svg className="h-4 fill-current text-gray-600 dark:text-gray-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" /></svg>
              </div>
              <div className="text-sm text-white mt-2 max-h-[30vh] overflow-y-scroll scrollbar-hide">
                  {
                      product_orders?.filter(product_order => product_order.date_finished !== null && product_order.status === "Reviewed").slice(0,7).map(order => {
                          return(
                              <div className="bg-gray-800 hover:bg-blue-700  p-2 rounded mt-1 border-b border-gray-100  cursor-pointer">Order # {order.product_order} - Item Code: {order.item_code}</div>
                          )
                      })
                  }
              </div>
            </div>
          </div>
        </div>
        <div className=''>
          <div>
            <div className='flex justify-between items-center mt-10'>
                    <h3 className="text-lg font-semibold">Order Reports</h3>
                    <div className='flex gap-2 items-center'>
                      <div className="relative max-w-sm w-fit">
                          <input onChange={(e) => {setDateFilter(e.target.value)}} value={dateFilter} id='date' name='date' type="date" className="bg-white text-gray-700 border shadow-md text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5"/>
                      </div>
                      <Menu className="w-fit">
                          <MenuHandler>
                              <Button className="bg-white text-gray-800 w-fit border font-medium normal-case py-2 text-sm flex items-center gap-2">{weekFilter == "" ? <span className='normal-case'>Week</span> : weekFilter }  <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                        <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                        <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                                                    </svg></Button>
                          </MenuHandler>
                          <MenuList className='space-y-2 h-[30vh] overflow-y-scroll'>
                                <MenuItem className='hover:bg-gray-200 py-2' onClick={() => {setWeekFilter("")}}>All</MenuItem>
                                {[...Array(52)].map((x, i) =>
                                    <MenuItem key={i} className='hover:bg-gray-200 py-2' onClick={() => {setWeekFilter(`Week ${i + 1}`)}}>Week {i + 1}</MenuItem>
                                )}
                          </MenuList>
                      </Menu>
                      {/* <Menu>
                            <MenuHandler>
                                <Button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-white transition-colors font-normal duration-200 bg-blue-600 normal-case rounded-lg gap-x-2 sm:w-auto hover:bg-blue-500" variant="black">

                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_3098_154395)">
                                        <path d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_3098_154395">
                                        <rect width="20" height="20" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                    Export
                                </Button>
                            </MenuHandler>
                            <MenuList className='space-y-2 rounded-md'>
                                <ExportToExcel apiData={product_orders.filter(product_order => (product_order.cutting === null || product_order.cutting === "In-Progress" || product_order.cutting === "Ok" || product_order.date_finished === null))} fileName={"Enrod-Orders"} name={"In-Progress Orders"}/>
                                <ExportToExcel apiData={product_orders.filter(product_order => product_order.date_finished !== null && product_order.finishing_two === "Ok")} fileName={"Enrod-Orders"} name={"Completed Orders"} />
                                <ExportToExcel apiData={product_orders.filter(product_order => product_order.date_finished !== null && product_order.finishing_two === "Reviewed")} fileName={"Enrod-Orders"} name={"Reviewed Orders"} />

                            </MenuList>
                        </Menu> */}
                        <button >
                          <ExportToExcel2 apiData={isFiltered? filteredOrders : filtered} fileName={"Summary-Report Enrod"} name={"Export"} />
                        </button>

                    </div>
            </div>
          <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden  shadow-md border-gray-200 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-700">
                                    <thead className="bg-gray-800 ">
                                        <tr>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-100">
                                                Week Issued
                                            </th> 
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-300">
                                                <div className="flex items-center gap-x-3 focus:outline-none">
                                                    <span>Order Info</span>

                                                    {/* <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                        <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                        <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                                                    </svg> */}
                                                </div>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-300">
                                                Description
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-300">
                                                Info
                                            </th>
                                            

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-300">Status</th>
                                            <th scope="col" className="relative py-3.5 px-4">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 ">
                                    {
                                            !isFiltered ?
                                            filtered?.map(order => {
                                                return(
                                                  <tr key={order.id}>
                                                  <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                      <div>
                                                          <p className="text-gray-700 ">{order.week_issued}</p>
                                                      </div>
                                                  </td>
                                                  <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                      <div>
                                                      <h2 className="font-medium text-gray-800 ">Order Number: {order.product_order}</h2>
                                                              <p className="text-sm font-normal text-gray-600">Item Code: {order.item_code}</p>
                                                      </div>
                                                  </td>
                                                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                      <div>
                                                          <h4 className="text-gray-700 ">Quantity: {order.quantity}</h4>
                                                          <p className="text-gray-500">{order.description}</p>
                                                      </div>
                                                  </td>      
                                                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                      <div>
                                                          <p className="text-gray-700">Date Started: {order.date_started}</p>
                                                          <p className="text-gray-500 ">Date Finished: {order.date_finished}</p>
                                                      </div>
                                                  </td>                                                 
                                                  <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div className="justify-center flex gap-2 items-center  px-2 py-1 text-sm font-medium rounded-full text-green-700 gap-x-2 ">
                                                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                                          </svg>
                                                          <p>Reviewed</p>
                                                        </div>
                                                    
                                                  </td>
                                              </tr>
                                                )
                                            })
                                            :
                                            filteredOrders.length > 0 ?
                                            filteredOrders?.map(order => {
                                              return(
                                                <tr key={order.id}>
                                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                    <div>
                                                        <p className="text-gray-700 ">{order.week_issued}</p>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                    <div>
                                                    <h2 className="font-medium text-gray-800 ">Order Number: {order.product_order}</h2>
                                                            <p className="text-sm font-normal text-gray-600">Item Code: {order.item_code}</p>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div>
                                                        <h4 className="text-gray-700 ">Quantity: {order.quantity}</h4>
                                                        <p className="text-gray-500">{order.description}</p>
                                                    </div>
                                                </td>      
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div>
                                                        <p className="text-gray-700">Date Started: {order.date_started}</p>
                                                        <p className="text-gray-500 ">Date Finished: {order.date_finished}</p>
                                                    </div>
                                                </td>                                                 
                                                <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                                                      <div className="justify-center flex gap-2 items-center  px-2 py-1 text-sm font-medium rounded-full text-green-700 gap-x-2 ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                                        </svg>
                                                        <p>Reviewed</p>
                                                      </div>
                                                  
                                                </td>
                                            </tr>
                                              )
                                          }):
                                          
                                          <tr className=''>
                                            {/* <td className="py-1 invisible">No Result</td>
                                            <td className="py-1 invisible">No Result</td> */}
                                            <td className="py-2 text-sm font-semibold px-4">No Result</td>
                                            {/* <td className="py-1 invisible">No Result</td>
                                            <td className="py-1 invisible">No Result</td> */}
                                          </tr>
                                    }
                                      
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        </div>
    </div>
  )
}


export default Dashboard