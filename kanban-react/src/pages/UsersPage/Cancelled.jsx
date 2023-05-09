import React from 'react'
import { useEffect, useState, useContext } from 'react'
import OrdersContext from '../../context/Orders';
import { ExportToExcel2 } from '../components/ExcelExport2';

const Cancelled = () => {

    const { product_orders, getOrders} = useContext(OrdersContext);

    useEffect(()=>{
        getOrders();
    }, [])

  return (
    <div className='md:px-12'>
        <div className=''>
          <div>
            <div className='flex justify-between items-center mt-10'>
                    <h3 className="text-lg font-semibold">Cancelled Orders Report</h3>
                 
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
                                            product_orders.filter((product_order) => product_order.status === "Cancelled").map(order => {
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
                                                        <p className="text-gray-500 ">Date Finished: Cancelled</p>
                                                    </div>
                                                </td>                                                 
                                                <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                                                      <div className="justify-center flex gap-2 items-center  px-2 py-1 text-sm font-medium rounded-full text-red-700 gap-x-2 ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                            </svg>
                                                        <p>Cancelled</p>
                                                      </div>
                                                  
                                                </td>
                                            </tr>  )
                                          })}
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

export default Cancelled