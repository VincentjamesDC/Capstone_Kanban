import React, {useEffect, useContext, useState, useRef} from 'react'
import OrdersContext from '../../../context/Orders';
import { Link } from 'react-router-dom';

import { ExportToExcel } from '../../components/ExcelExport';

import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";

const CuttingDept = () => {

  const { product_orders, getOrders} = useContext(OrdersContext);

  useEffect(()=>{
    getOrders();
  }, [])
  

  const filtered = product_orders.filter(product_order => product_order.date_finished !== null);


  return (
    <div className='py-5 md:px-12'>
      <div>
          <div className='flex justify-between items-center mt-10'>
                  <h3 className="text-lg font-semibold">Finished Orders Report</h3>
                  <div className='flex gap-2 items-center'>
                  <Menu>
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
                                Export Monthly
                            </Button>
                        </MenuHandler>
                        <MenuList className='space-y-2 rounded-md'>
                            <ExportToExcel apiData={product_orders.filter(product_order => product_order.date_finished !== null)} fileName={"Enrod-Orders"} name={"Completed Orders"} />
                            <ExportToExcel apiData={product_orders.filter(product_order => (product_order.cutting === null || product_order.cutting === "In-Progress" || product_order.cutting === "Ok" || product_order.date_finished === null))} fileName={"Enrod-Orders"} name={"In-Progress Orders"}/>
                        </MenuList>
                    </Menu>
                    <Menu>
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
                                Export Weekly
                            </Button>
                        </MenuHandler>
                        <MenuList className='space-y-2 rounded-md'>
                            {
                                
                            }
                            <ExportToExcel apiData={product_orders.filter(product_order => product_order.date_finished !== null)} fileName={"Enrod-Orders"} name={"Completed Orders"} />
                            <ExportToExcel apiData={product_orders.filter(product_order => (product_order.cutting === null || product_order.cutting === "In-Progress" || product_order.cutting === "Ok" || product_order.date_finished === null))} fileName={"Enrod-Orders"} name={"In-Progress Orders"}/>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuHandler>
                            <Button className="bg-gray-800 w-fit text-white border font-medium normal-case py-2 text-sm" variant="black">Print Weekly Report</Button>
                        </MenuHandler>
                        <MenuList className='space-y-2 h-[30vh] overflow-y-scroll'>
                              <ExportToExcel apiData={product_orders.filter(product_order => (product_order.date_finished !== null))} fileName={"Enrod-Orders"} name={"Week Report(All)"}/>
                               {[...Array(52)].map((x, i) =>
                                   <ExportToExcel apiData={product_orders.filter(product_order => (product_order.date_finished !== null && product_order.week_issued == 'WEEK ' + (i + 1)))} fileName={"Enrod-Orders"} name={"Week " + (i + 1) + " Report"}/>
                              )}
                        </MenuList>
                    </Menu>
                  </div>
          </div>
        <div className="flex flex-col mt-6">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                          <div className="overflow-hidden border shadow-md border-gray-200 md:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-700">
                                  <thead className="bg-gray-800 ">
                                      <tr>
                                          <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-100">
                                              <button className="flex items-center gap-x-3 focus:outline-none">
                                                  <span>Order Info</span>

                                                  <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                      <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                      <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                                                  </svg>
                                              </button>
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
                                          filtered?.map(order => {
                                              return(
                                                <tr key={order.id}>
                                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                    <div>
                                                    <h2 className="font-medium text-gray-800 ">Order Number: {order.product_order}</h2>
                                                            <p className="text-sm font-normal text-gray-600">Item Code: {order.item_code}</p>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div>
                                                        <h4 className="text-gray-700 ">{order.quantity}</h4>
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
              </div>
    </div>
  )
}

export default CuttingDept