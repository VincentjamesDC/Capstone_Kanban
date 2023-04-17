import React, {useRef, useState, useEffect} from 'react'

import { useDownloadExcel } from 'react-export-table-to-excel';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";

import { CSVDownload, CSVLink } from 'react-csv';

const DepPosts = ({product_orders}) => {

    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Enrod-Records',
        sheet: 'Records'
    })

    const [filteredOrders, setFiltered] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);

    const [ progressFilter, setProgressFilter] = useState('');
    const [ weekFilter, setWeekFilter] = useState('');
    const [ departmentFilter, setDepartmentFilter] = useState('cutting');
    const [ dateFilter, setDateFilter] = useState('');

    const filterProgress = (array) => {
        if(progressFilter != ''){
          if(progressFilter === "Completed"){
            return array.filter((order) => order.date_finished !== null);
          }
          else if(progressFilter === "In-Progress"){
            return array.filter((order) => order.cutting === "In-Progress" || order.cutting === "Ok" && order.date_finished === null);
          }
          else{
            return array.filter((order) => order.cutting === null);
          }
        }
        else{
          return array;
        }
      };

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
            if(departmentFilter === "cutting"){
                return array.filter((order) => order.date_cutted === dateFilter);
            }
            else if(departmentFilter === "assembly_prep"){
                return array.filter((order) => order.date_preped === dateFilter);
            }
            else if(departmentFilter === "assembly_one"){
                return array.filter((order) => order.date_assembled_one === dateFilter);
            }
            else if(departmentFilter === "assembly_two"){
                return array.filter((order) => order.date_assembled_two === dateFilter);
            }
            else if(departmentFilter === "quality_control"){
                return array.filter((order) => order.date_checked === dateFilter);
            }
            else if(departmentFilter === "finishing_one"){
                return array.filter((order) => order.date_finished_one === dateFilter);
            }
            else if(departmentFilter === "finishing_two"){
                return array.filter((order) => order.date_finished === dateFilter);
            }
            else{
                return array.filter((order) => order.date_finished === dateFilter);
            }
        }
        else{
          return array;
        }
      };

      const filterDepartment = (array) => {
        if(departmentFilter != ''){
            if(departmentFilter === "cutting"){
                return array.filter((order) => order.cutting === "Ok");
            }
            else if(departmentFilter === "assembly_prep"){
                return array.filter((order) => order.assembly_prep === "Ok");
            }
            else if(departmentFilter === "assembly_one"){
                return array.filter((order) => order.assembly_one === "Ok");
            }
            else if(departmentFilter === "assembly_two"){
                return array.filter((order) => order.assembly_two === "Ok");
            }
            else if(departmentFilter === "quality_control"){
                return array.filter((order) => order.quality_control === "Ok");
            }
            else if(departmentFilter === "finishing_one"){
                return array.filter((order) => order.finishing_one === "Ok");
            }
            else if(departmentFilter === "finishing_two"){
                return array.filter((order) => order.finishing_two === "Ok");
            }
        }
        else{
          return array;
        }
      };

      useEffect(() => {
        console.log(dateFilter);
    }, [dateFilter]);

    useEffect(() => {
        let result = product_orders;

        result = filterProgress(result);
        result = filterWeek(result);
        result = filterDate(result);
        result = filterDepartment(result);
        setFiltered(result);
    }, [progressFilter, weekFilter, departmentFilter, dateFilter]);
    
      useEffect(() => {
        
          if(progressFilter != "" || weekFilter != "" || departmentFilter != "" || dateFilter != "" )
          {
            setIsFiltered(true);
          }
          else{
            setIsFiltered(false);
          }
      }, [progressFilter, weekFilter, departmentFilter, dateFilter]);

  return (
    <div>            
        <div className="md:px-12 py-0 w-full">
        <div className='flex justify-between items-center  mb-3'>
                <div className='flex flex-col gap-2'>
                    <div className="hidden w-fit overflow-hidden  divide-x rounded-lg bg-gray-800 rtl:flex-row-reverse  divide-gray-700">
                        <button onClick={() => {setProgressFilter("")}} className="px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm hover:bg-gray-700 text-gray-200">
                            All Orders
                        </button>

                        <button onClick={() => {setProgressFilter("In-Progress")}} className={progressFilter == "In-Progress" ? "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm text-white bg-blue-600" : "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm hover:bg-gray-700 text-gray-200"}>
                            In-Progress
                        </button>

                        <button onClick={() => {setProgressFilter("Completed")}} className={progressFilter == "Completed" ? "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm text-white bg-blue-600" : "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm hover:bg-gray-700 text-gray-200"}>
                            Completed
                        </button>
                    </div>
                    <div className="inline-flex w-fit overflow-hidden border divide-x rounded-lg bg-gray-800 rtl:flex-row-reverse divide-gray-700">
                        {/* <button onClick={() => {setDepartmentFilter("")}} className="px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm hover:bg-gray-700 text-gray-200">
                            All Department
                        </button> */}

                        <button onClick={() => {setDepartmentFilter("cutting")}} className={departmentFilter == "cutting" ? "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm text-white bg-blue-600" : "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm hover:bg-gray-700 text-gray-200"}>
                            Cutting
                        </button>

                        <button onClick={() => {setDepartmentFilter("assembly_prep")}} className={departmentFilter == "assembly_prep" ? "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm text-white bg-blue-600" : "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm hover:bg-gray-700 text-gray-200"}>
                            A1-Prep
                        </button>

                        <button onClick={() => {setDepartmentFilter("assembly_one")}} className={departmentFilter == "assembly_one" ? "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm text-white bg-blue-600" : "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm hover:bg-gray-700 text-gray-200"}>
                            A-1
                        </button>

                        <button onClick={() => {setDepartmentFilter("assembly_two")}} className={departmentFilter == "assembly_two" ? "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm text-white bg-blue-600" : "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm hover:bg-gray-700 text-gray-200"}>
                            A-2
                        </button>

                         <button onClick={() => {setDepartmentFilter("quality_control")}} className={departmentFilter == "quality_control" ? "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm text-white bg-blue-600" : "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm hover:bg-gray-700 text-gray-200"}>
                            QC
                        </button>

                        <button  onClick={() => {setDepartmentFilter("finishing_one")}} className={departmentFilter == "finishing_one" ? "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm text-white bg-blue-600" : "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm hover:bg-gray-700 text-gray-200"}>
                            F-1
                        </button>

                        <button  onClick={() => {setDepartmentFilter("finishing_two")}} className={departmentFilter == "finishing_two" ? "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm text-white bg-blue-600" : "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm hover:bg-gray-700 text-gray-200"}>
                            F-2
                        </button>
                    </div>
                    <Menu className="w-fit">
                        <MenuHandler>
                            <Button className="bg-gray-800 w-fit text-white border font-medium normal-case py-2 text-sm">{weekFilter == "" ? <span className='normal-case'>Week</span> : weekFilter }</Button>
                        </MenuHandler>
                        <MenuList className='space-y-2 h-[30vh] overflow-y-scroll'>
                              <MenuItem className='hover:bg-gray-200 py-2' onClick={() => {setWeekFilter("")}}>All</MenuItem>
                               {[...Array(52)].map((x, i) =>
                                  <MenuItem key={i} className='hover:bg-gray-200 py-2' onClick={() => {setWeekFilter(`Week ${i + 1}`)}}>Week {i + 1}</MenuItem>
                              )}
                        </MenuList>
                    </Menu>
                    <div className="flex items-center gap-2">
                        <div className="relative max-w-sm w-fit">
                                    <input onChange={(e) => {setDateFilter(e.target.value)}} value={dateFilter} id='date' name='date' type="date" className="bg-white text-gray-700 border shadow-md text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5"/>
                        </div>
                        <button onClick={onDownload} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md flex items-center gap-2 text-sm">
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
                        </button>
                    </div>
                    {/* <CSVLink data={filteredOrders}>Download me</CSVLink> */}
                </div>

            </div>
            <div className="shadow overflow-hidden rounded border-b border-gray-200">
                <table className="hidden min-w-full bg-white"  ref={tableRef}>
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Week Issued</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Product Order</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Item Code</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Description</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Quantity</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date Started</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date Finished</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
                        {
                            dateFilter && <th className="text-left py-3 px-4 uppercase font-semibold text-sm hidden">Date Finished</th>
                        }
                    </tr>
                </thead>
                <tbody className="text-gray-700 divide-y divide-gray-200">
                    {
                        isFiltered ? 
                        filteredOrders?.map(order => {
                            return(
                                <tr key={order.id}>
                                   
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        {order.week_issued}
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        {order.product_order}
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        {order.item_code}
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        {order.description}
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        {order.quantity}
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        {order.date_started}
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        {
                                            departmentFilter === "cutting" &&  order.date_cutted
                                        }
                                        {
                                            departmentFilter === "assembly_prep" &&  order.date_preped
                                        }
                                        {
                                            departmentFilter === "assembly_one" &&  order.date_assembled_one
                                        }
                                        {
                                            departmentFilter === "assembly_two" &&  order.date_assembled_two
                                        }
                                        {
                                            departmentFilter === "quality_control" &&  order.date_checked
                                        }
                                        {
                                            departmentFilter === "finishing_one" &&  order.date_finished_one
                                        }
                                         {
                                            departmentFilter === "finishing_two" &&  order.date_finished
                                        }
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        {
                                            departmentFilter == "" ?
                                            order.date_finished === null ?
                                             <div className="inline px-3 py-1 text-sm font-normal rounded-full text-orange-500 gap-x-2 bg-orange-100/60">
                                                    In-Progress
                                                </div>    

                                                :
                                                <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                    Completed
                                                </div>
                                            :
                                            <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                Ok
                                            </div>    
                                        }
                                    </td>
                                </tr>
                            )
                        }):
                        product_orders?.map(order => {
                            return(
                                <tr key={order.id}>
                                     <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        {order.week_issued}
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        {order.product_order}
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        {order.item_code}
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        {order.description}
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        {order.quantity}
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        {
                                            departmentFilter == "" ?
                                            order.date_finished === null ?
                                             <div className="inline px-3 py-1 text-sm font-normal rounded-full text-orange-500 gap-x-2 bg-orange-100/60">
                                                    In-Progress
                                                </div>    

                                                :
                                                <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                    Completed
                                                </div>
                                            :
                                            <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                Ok
                                            </div>    
                                        }
                                    </td>
                                </tr>
                            )
                        })

              
                    
                }
                </tbody>
                </table>
                <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-100">Week Issued</th>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-300">Order Info</th>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-300">Description</th>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-300">Status</th>
                    {
                        dateFilter && <th className="text-left py-3 px-4 uppercase font-semibold text-sm hidden">Date Finished</th>
                    }
    

                    </tr>
                </thead>
                <tbody className="text-gray-700 divide-y divide-gray-200">
                    {
                        isFiltered ? 
                        filteredOrders?.map(order => {
                            return(
                                <tr key={order.id}>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                        <h2 className="font-medium text-gray-800 ">Week Issued: {order.week_issued}</h2>
                                                <p className="text-sm font-normal text-gray-600">Date Started: {order.date_started}</p>
                                        </div>

                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                        <h2 className="font-medium text-gray-800 ">Product Order: {order.product_order}</h2>
                                                <p className="text-sm font-normal text-gray-600">Item Code: {order.item_code}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        <div>
                                            <h4 className="text-gray-700 ">Quantity: {order.quantity}</h4>
                                            <p className="text-gray-500">{order.description}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        {
                                            departmentFilter == "" ?
                                            order.date_finished === null ?
                                             <div className="inline px-3 py-1 text-sm font-normal rounded-full text-orange-500 gap-x-2 bg-orange-100/60">
                                                    In-Progress
                                                </div>    

                                                :
                                                <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                    Completed
                                                </div>
                                            :
                                            <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                Ok
                                            </div>    
                                        }
                                    </td>
                                </tr>
                            )
                        }):
                        product_orders?.map(order => {
                            return(
                                <tr key={order.id}>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                    {order.week_issued}
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                        <h2 className="font-medium text-gray-800 ">Product Order: {order.product_order}</h2>
                                                <p className="text-sm font-normal text-gray-600">Item Code: {order.item_code}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        <div>
                                            <h4 className="text-gray-700 ">Quantity: {order.quantity}</h4>
                                            <p className="text-gray-500">{order.description}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">

                                        {
                                            departmentFilter == "" ?
                                            order.date_finished === null ?
                                                <div className="inline px-3 py-1 text-sm font-normal rounded-full text-orange-500 gap-x-2 bg-orange-100/60">
                                                        In-Progress
                                                    </div>    

                                                    :
                                                    <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                        Completed
                                                    </div>    
                                            :
                                            <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                        Ok
                                            </div>    
                                        }
                                    </td>
                                </tr>
                            )
                        })

              
                    
                }
                </tbody>
                </table>
            </div>
        </div>
        
        </div>
  )
}

export default DepPosts