import React, {useRef, useState, useEffect} from 'react'
import { ExportToExcel } from './ExcelExport';

import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";


const Posts = ({product_orders, postsPerPage, totalPosts, paginate, currentP, indexOfFirstPost, indexOfLastPost}) => {

    const tableRef = useRef(null);

    const [filteredOrders, setFiltered] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [searchValue, setSearchValue] = useState('');


    const [ progressFilter, setProgressFilter] = useState('');
    const [ weekFilter, setWeekFilter] = useState('');


    const filterProgress = (array) => {
        if(progressFilter != ''){
          if(progressFilter === "Completed"){
            setCurrentPage2(1);
            return array.filter((order) => order.date_finished !== null && order.finishing_two === "Ok" && order.status === "Reviewed");
          }
          else if(progressFilter === "In-Progress"){
            setCurrentPage2(1);
            return array.filter((order) => order.cutting === null || order.cutting === "In-Progress" || order.cutting === "Ok" && order.date_finished === null);
          }
          else if(progressFilter === "Delivered"){
            setCurrentPage2(1);
            return array.filter((order) => order.date_finished !== null && order.finishing_two === "Reviewed");
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

      const handleSearch = (array) => {
        if(searchValue != ''){
          return array.filter((arr) => {
            return Object.values(arr).join('').toLowerCase().includes(searchValue.toLowerCase())
            })
        }
        else{
          return array;
        }
      };

    useEffect(() => {
        let result = product_orders;
    
        result = handleSearch(result);
        result = filterProgress(result);
        result = filterWeek(result);
    
        setFiltered(result);
      }, [progressFilter, weekFilter, searchValue]);
    
      useEffect(() => {
        
          if(progressFilter != "" || weekFilter != "" || searchValue != "" )
          {
            setIsFiltered(true);
          }
          else{
            setIsFiltered(false);
          }
      }, [progressFilter, weekFilter, searchValue]);


      //pagination
      const [showPrev, setShowPrev] = useState(true);
      const pageNumbers = [];
      for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
          pageNumbers.push(i);
      }

      //newpaginate

      const [currentPage2, setCurrentPage2] = useState(1);
      const [postsPerPage2, setPostsPerPage2] = useState(8);
    
      const indexOfLastPost2 = currentPage2 * postsPerPage2;
      const indexOfFirstPost2 = indexOfLastPost2 - postsPerPage2;
      const currentFilteredPosts2 = filteredOrders?.slice(indexOfFirstPost2, indexOfLastPost2);

      const [showPrev2, setShowPrev2] = useState(true);
      const pageNumbers2 = [];
      for(let i = 1; i <= Math.ceil(filteredOrders.length / postsPerPage2); i++) {
          pageNumbers2.push(i);
      }

      const paginate2 = (pageNumber2) => setCurrentPage2(pageNumber2);


  return (
    <div>            
        <div className="md:px-12 py-0 w-full">
        <section className="container mx-auto">
              <div className="mt-6 md:flex md:items-center md:justify-between">
                  <div className="inline-flex overflow-hidden border divide-x rounded-lg bg-gray-800 rtl:flex-row-reverse border-gray-700 divide-gray-700">
                      
                      <button onClick={() => {setProgressFilter("")}} className={progressFilter == "" ? "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm bg-blue-600 text-gray-200" : "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm bg-gray-800 text-gray-200"}>
                          All
                      </button>

                      <button onClick={() => {setProgressFilter("In-Progress")}} className={progressFilter == "In-Progress" ? "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm bg-blue-600 text-gray-200" : "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm bg-gray-800 text-gray-200"}>
                          In-Progress
                      </button>

                      <button onClick={() => {setProgressFilter("Completed")}} className={progressFilter == "Completed" ? "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm bg-blue-600 text-gray-200" : "px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm bg-gray-800 text-gray-200"}>
                          Completed
                      </button>
                  </div>

                  <div className="relative flex items-center mt-4 md:mt-0">
                      <span className="absolute">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                          </svg>
                      </span>

                      <input type="search" placeholder="Search" onChange={(e) => {setSearchValue(e.target.value), setProgressFilter('')}} className="block w-full py-1.5 pr-5 text-gray-700 bg-white border  border-gray-500 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                  </div>
              </div>

              <div className="flex flex-col mt-6">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                          <div className="overflow-hidden border shadow-md border-gray-200 md:rounded-lg">
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

                                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-300">Cutting</th>
                                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-300">A1-Prep</th>
                                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-300">Assembly-1</th>
                                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-300">Assembly-2</th>
                                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-300">Quality Control</th>
                                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-300">Finishing-1</th>
                                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-300">Finishing-2</th>
                                          <th scope="col" className="relative py-3.5 px-4">
                                              <span className="sr-only">Edit</span>
                                          </th>
                                      </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200 ">
                                  {
                                          isFiltered ? 
                                          currentFilteredPosts2?.map(order => {
                                              return(
                                                <tr key={order.id}>
                                                   <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div>
                                                            <h4 className="text-gray-700 ">{order.week_issued}</h4>
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
                                                    <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                                                        {
                                                          order.cutting === null && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60">
                                                              Pending
                                                          </div>
                                                        }
                                                        {
                                                          order.cutting === "In-Progress" && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-amber-500 gap-x-2 bg-amber-100/60">
                                                              {order.cutting}
                                                          </div>
                                                        }
                                                        {
                                                          order.cutting === "Ok" && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                              {order.cutting}
                                                          </div>
                                                        }
                                                    </td>
                                                    <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                                                        {
                                                          order.assembly_prep === null && order.cutting === "Ok" && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60">
                                                              Pending
                                                          </div>
                                                        }
                                                        {
                                                          order.assembly_prep === "In-Progress" && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-amber-500 gap-x-2 bg-amber-100/60">
                                                              {order.assembly_prep}
                                                          </div>
                                                        }
                                                        {
                                                          order.assembly_prep === "Ok" && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                              {order.assembly_prep}
                                                          </div>
                                                        }
                                                    </td>
                                                    
                                                    <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                                                        {
                                                          order.assembly_one === null  && order.assembly_prep === "Ok" && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60">
                                                              Pending
                                                          </div>
                                                        }
                                                        {
                                                          order.assembly_one === "In-Progress" && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-amber-500 gap-x-2 bg-amber-100/60">
                                                              {order.assembly_one}
                                                          </div>
                                                        }
                                                        {
                                                          order.assembly_one === "Ok" && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                              {order.assembly_one}
                                                          </div>
                                                        }
                                                    </td>
                                                    <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                                                        {
                                                          order.assembly_two === null  && order.assembly_one === "Ok" && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60">
                                                              Pending
                                                          </div>
                                                        }
                                                        {
                                                          order.assembly_two === "In-Progress" && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-amber-500 gap-x-2 bg-amber-100/60">
                                                              {order.assembly_two}
                                                          </div>
                                                        }
                                                        {
                                                          order.assembly_two === "Ok" && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                              {order.assembly_two}
                                                          </div>
                                                        }
                                                    </td>
                                                    <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                                                        {
                                                          order.quality_control === null  && order.assembly_two === "Ok" && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60">
                                                              Pending
                                                          </div>
                                                        }
                                                        {
                                                          order.quality_control === "In-Progress" && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-amber-500 gap-x-2 bg-amber-100/60">
                                                              {order.quality_control}
                                                          </div>
                                                        }
                                                        {
                                                          order.quality_control === "Ok" && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                              {order.quality_control}
                                                          </div>
                                                        }
                                                    </td>
                                                    <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                                                        {
                                                          order.finishing_one === null  && order.quality_control === "Ok" && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60">
                                                              Pending
                                                          </div>
                                                        }
                                                        {
                                                          order.finishing_one === "In-Progress" && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-amber-500 gap-x-2 bg-amber-100/60">
                                                              {order.finishing_one}
                                                          </div>
                                                        }
                                                        {
                                                          order.finishing_one === "Ok" && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                              {order.finishing_one}
                                                          </div>
                                                        }
                                                    </td>
                                                    <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                                                        {
                                                          order.finishing_two === null  && order.finishing_one === "Ok" && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60">
                                                              Pending
                                                          </div>
                                                        }
                                                        {
                                                          order.finishing_two === "In-Progress" && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-amber-500 gap-x-2 bg-amber-100/60">
                                                              {order.finishing_two}
                                                          </div>
                                                        }
                                                        {
                                                          order.finishing_two === "Ok" && 
                                                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                              {order.finishing_two}
                                                          </div>
                                                        }
                                                          {
                                                          order.finishing_two === "Reviewed" && 
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
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div>
                                                            <h4 className="text-gray-700 font-semibold ">{order.week_issued}</h4>
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
                                                <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                                                    {
                                                      order.cutting === null && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60">
                                                          Pending
                                                      </div>
                                                    }
                                                    {
                                                      order.cutting === "In-Progress" && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-amber-500 gap-x-2 bg-amber-100/60">
                                                          {order.cutting}
                                                      </div>
                                                    }
                                                    {
                                                      order.cutting === "Ok" && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                          {order.cutting}
                                                      </div>
                                                    }
                                                </td>
                                                <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                                                    {
                                                      order.assembly_prep === null && order.cutting === "Ok" && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60">
                                                          Pending
                                                      </div>
                                                    }
                                                    {
                                                      order.assembly_prep === "In-Progress" && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-amber-500 gap-x-2 bg-amber-100/60">
                                                          {order.assembly_prep}
                                                      </div>
                                                    }
                                                    {
                                                      order.assembly_prep === "Ok" && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                          {order.assembly_prep}
                                                      </div>
                                                    }
                                                </td>
                                                
                                                <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                                                    {
                                                      order.assembly_one === null  && order.assembly_prep === "Ok" && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60">
                                                          Pending
                                                      </div>
                                                    }
                                                    {
                                                      order.assembly_one === "In-Progress" && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-amber-500 gap-x-2 bg-amber-100/60">
                                                          {order.assembly_one}
                                                      </div>
                                                    }
                                                    {
                                                      order.assembly_one === "Ok" && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                          {order.assembly_one}
                                                      </div>
                                                    }
                                                </td>
                                                <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                                                    {
                                                      order.assembly_two === null  && order.assembly_one === "Ok" && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60">
                                                          Pending
                                                      </div>
                                                    }
                                                    {
                                                      order.assembly_two === "In-Progress" && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-amber-500 gap-x-2 bg-amber-100/60">
                                                          {order.assembly_two}
                                                      </div>
                                                    }
                                                    {
                                                      order.assembly_two === "Ok" && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                          {order.assembly_two}
                                                      </div>
                                                    }
                                                </td>
                                                <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                                                    {
                                                      order.quality_control === null  && order.assembly_two === "Ok" && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60">
                                                          Pending
                                                      </div>
                                                    }
                                                    {
                                                      order.quality_control === "In-Progress" && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-amber-500 gap-x-2 bg-amber-100/60">
                                                          {order.quality_control}
                                                      </div>
                                                    }
                                                    {
                                                      order.quality_control === "Ok" && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                          {order.quality_control}
                                                      </div>
                                                    }
                                                </td>
                                                <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                                                    {
                                                      order.finishing_one === null  && order.quality_control === "Ok" && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60">
                                                          Pending
                                                      </div>
                                                    }
                                                    {
                                                      order.finishing_one === "In-Progress" && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-amber-500 gap-x-2 bg-amber-100/60">
                                                          {order.finishing_one}
                                                      </div>
                                                    }
                                                    {
                                                      order.finishing_one === "Ok" && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                          {order.finishing_one}
                                                      </div>
                                                    }
                                                </td>
                                                <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                                                    {
                                                      order.finishing_two === null  && order.finishing_one === "Ok" && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60">
                                                          Pending
                                                      </div>
                                                    }
                                                    {
                                                      order.finishing_two === "In-Progress" && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-amber-500 gap-x-2 bg-amber-100/60">
                                                          {order.finishing_two}
                                                      </div>
                                                    }
                                                    {
                                                      order.finishing_two === "Ok" && 
                                                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                          {order.finishing_two}
                                                      </div>
                                                    }
                                                    {
                                                          order.finishing_two === "Reviewed" && 
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
              </div>
              <div className="pb-6">
                {
                  isFiltered ?
                  <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
                    <div className="text-sm text-gray-500 ">
                        Showing <span className="font-medium text-gray-700 ">{indexOfFirstPost2 + 1} - {(indexOfLastPost2 > filteredOrders.length) ? (indexOfLastPost - (indexOfLastPost2 - filteredOrders.length)) : indexOfLastPost2} of {filteredOrders.length}</span> 
                    </div>

                          <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                                {
                                currentPage2 > 1 &&   
                                    <a onClick={() =>paginate2(currentPage2 - 1)} className="cursor-pointer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-white capitalize transition-colors duration-200 bg-gray-800 border rounded-md sm:w-auto gap-x-2 hover:bg-gray-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                        </svg>

                                        <span>
                                            previous
                                        </span>
                                    </a>
                                }
                              
                            

                              {currentPage2 < pageNumbers2.length &&
                                    <a onClick={() =>paginate2(currentPage2 + 1)}  className=" cursor-pointer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-white capitalize transition-colors duration-200 bg-gray-800 border rounded-md sm:w-auto gap-x-2 hover:bg-gray-800 ">
                                        <span>
                                            Next
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                        </svg>
                                    </a>
                                }

                            
                          </div>
                      </div>
                      :
                      <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
                      <div className="text-sm text-gray-500 ">
                          Showing <span className="font-medium text-gray-700 ">{indexOfFirstPost + 1} - {(indexOfLastPost > totalPosts) ? (indexOfLastPost - (indexOfLastPost - totalPosts)) : indexOfLastPost} of {totalPosts}</span> 
                      </div>

                      <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                            {
                            currentP > 1 &&   
                                <a onClick={() =>paginate(currentP - 1)} className="cursor-pointer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-white capitalize transition-colors duration-200 bg-gray-800 border rounded-md sm:w-auto gap-x-2 hover:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                    </svg>

                                    <span>
                                        previous
                                    </span>
                                </a>
                            }
                          
                        

                          {currentP < pageNumbers.length &&
                                <a onClick={() =>paginate(currentP + 1)}  className=" cursor-pointer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-white capitalize transition-colors duration-200 bg-gray-800 border rounded-md sm:w-auto gap-x-2 hover:bg-gray-800 ">
                                    <span>
                                        Next
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                </a>
                            }

                        
                      </div>
                  </div>
                }
                
              </div>

           
          </section>
        </div>
      </div>
  )
}

export default Posts