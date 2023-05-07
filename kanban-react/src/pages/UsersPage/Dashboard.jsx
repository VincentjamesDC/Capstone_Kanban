import React, {useEffect, useState, useRef, useContext} from 'react'
import useAuthContext from '../../context/Authentication';
import OrdersContext from '../../context/Orders'
import { ExportToExcel } from '../components/ExcelExport'
import { useDownloadExcel } from 'react-export-table-to-excel';

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

const Dashboard = () => {

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Enrod-Records',
    sheet: 'Records'
  })

  const { user, getUser, logout } = useAuthContext();

  const { product_orders, getOrders} = useContext(OrdersContext);
  const [orders, setOrders] = useState([]);

  const [filteredOrders, setFiltered] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const [ weekFilter, setWeekFilter] = useState('');

  useEffect(()=>{
    getOrders();
  }, [])

  useEffect(() =>{
    if(user?.department == "Cutting"){
      const cuttingRecords = product_orders.filter(product_order => product_order.cutting_finish !== null);
      setOrders(cuttingRecords);
    }
    else if(user?.department == "Assembly-Prep"){
      const prepRecords = product_orders.filter(product_order => product_order.assembly_prep_finish !== null);
      setOrders(prepRecords);
    }
    else if(user?.department == "Assembly-1"){
      const a_oneRecords = product_orders.filter(product_order => product_order.assembly_one_finish !== null);
      setOrders(a_oneRecords);
    }
    else if(user?.department == "Assembly-2"){
      const a_twoRecords = product_orders.filter(product_order => product_order.assembly_two_finish !== null);
      setOrders(a_twoRecords);
    }
    else if(user?.department == "Quality-Control"){
      const qcRecords = product_orders.filter(product_order => product_order.quality_control_finish !== null);
      setOrders(qcRecords);
    }
    else if(user?.department == "Finishing-1"){
      const f_oneRecords = product_orders.filter(product_order => product_order.finishing_one_finish !== null);
      setOrders(f_oneRecords);
    }
    else if(user?.department == "Finishing-2"){
      const f_twoRecords = product_orders.filter(product_order => product_order.finishing_two_finish !== null);
      setOrders(f_twoRecords);
    }
  },[product_orders]);

  const filterWeek = (array) => {
    if(weekFilter != ''){
      return array.filter((order) => order.week_issued.toLowerCase() === weekFilter.toLowerCase());
    }
    else{
      return array;
    }
  };

  useEffect(() => {
    let result = orders;

    result = filterWeek(result);
    setFiltered(result);
  }, [weekFilter]);

  useEffect(() => {
    if(weekFilter != "")
    {
      setIsFiltered(true);
    }
    else{
      setIsFiltered(false);
    }
}, [weekFilter]);

  return (
    <div className='py-5 md:px-12'>
      <div>
          <div className='flex justify-between items-center'>
                  <h3 className="text-lg font-semibold">{user.department} Deparment Report</h3>
                  <div className='flex gap-2 items-center'>
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
          </div>
        <div className="flex flex-col mt-6">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                          <div className="overflow-hidden border shadow-md border-gray-200 md:rounded-lg max-h-[75vh] overflow-y-scroll">
                              <table className="min-w-full divide-y divide-gray-700">
                                  <thead className="bg-gray-800 ">
                                      <tr>
                                          <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-100">
                                              <button className="flex items-center gap-x-3 focus:outline-none">
                                                  <span>Order Info</span>
                                              </button>
                                          </th>

                                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-300">
                                              Issued
                                          </th>
                                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-300">
                                              Description
                                          </th>
                                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-300">
                                              Date
                                          </th>
                                       

                                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-300">Status</th>
                                          <th scope="col" className="relative py-3.5 px-4">
                                              <span className="sr-only">Edit</span>
                                          </th>
                                      </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                  {
                                          isFiltered ?
                                          filteredOrders?.map(order => {
                                              return(
                                                <tr key={order.id}>
                                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                  <div>
                                                  <h2 className="font-medium text-gray-800 ">Product Order: {order.product_order}</h2>
                                                          <p className="text-sm font-normal text-gray-600">Item Code: {order.item_code}</p>
                                                  </div>
                                              </td>
                                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                  <div>
                                                      <h4 className="text-gray-700 ">Week Issued: {order.week_issued}</h4>
                                                      <p className="text-gray-500">Date Issued: {order.date_started}</p>
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
                                                        {
                                                        user?.department === "Cutting" &&  <p className="text-gray-700">Date Finished: {order.cutting_finish.split(' ')[0]}</p>
                                                        }
                                                        {
                                                            user?.department === "Assembly-Prep" && <p className="text-gray-700">Date Finished: {order.assembly_prep_finish.split(' ')[0]}</p>
                                                        }
                                                        {
                                                            user?.department === "Assembly-1" && <p className="text-gray-700">Date Finished: {order.assembly_one_finish.split(' ')[0]}</p>
                                                        }
                                                        {
                                                            user?.department === "Assembly-2" && <p className="text-gray-700">Date Finished: {order.assembly_two_finish.split(' ')[0]}</p>
                                                        }
                                                        {
                                                            user?.department === "Quality-Control" && <p className="text-gray-700">Date Finished: {order.quality_control_finish.split(' ')[0]}</p>
                                                        }
                                                        {
                                                            user?.department === "Finishing-2" && <p className="text-gray-700">Date Finished: {order.finishing_one_finish.split(' ')[0]}</p>
                                                        }
                                                        {
                                                            user?.department === "Finishing-2" && <p className="text-gray-700">Date Finished: {order.finishing_two_finish.split(' ')[0]}</p>
                                                        }
                                                        {/* //spe */}
                                                        {
                                                        user?.department === "Cutting" &&  <h4 className="text-gray-500 ">Date Started: {order.cutting_start.split(' ')[0]}</h4>
                                                        }
                                                        {
                                                            user?.department === "Assembly-Prep" && <h4 className="text-gray-500 ">Date Started: {order.assembly_prep_start.split(' ')[0]}</h4>
                                                        }
                                                        {
                                                            user?.department === "Assembly-1" && <h4 className="text-gray-500 ">Date Started: {order.assembly_one_start.split(' ')[0]}</h4>
                                                        }
                                                        {
                                                            user?.department === "Assembly-2" && <h4 className="text-gray-500 ">Date Started: {order.assembly_two_start.split(' ')[0]}</h4>
                                                        }
                                                        {
                                                            user?.department === "Quality-Control" && <h4 className="text-gray-500 ">Date Started: {order.quality_control_start.split(' ')[0]}</h4>
                                                        }
                                                        {
                                                            user?.department === "Finishing-2" && <h4 className="text-gray-500 ">Date Started: {order.finishing_one_start.split(' ')[0]}</h4>
                                                        }
                                                        {
                                                            user?.department === "Finishing-2" && <h4 className="text-gray-500 ">Date Started: {order.finishing_two_start.split(' ')[0]}</h4>
                                                        }
                                                      
                                                      
                                                  </div>
                                              </td>
                                              <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                                                    <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                        Done
                                                    </div>
                                              </td>
                                            </tr>
                                              )
                                          }):
                                          orders?.map(order => {
                                            return(
                                              <tr key={order.id}>
                                              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                  <div>
                                                  <h2 className="font-medium text-gray-800 ">Product Order: {order.product_order}</h2>
                                                          <p className="text-sm font-normal text-gray-600">Item Code: {order.item_code}</p>
                                                  </div>
                                              </td>
                                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                  <div>
                                                      <h4 className="text-gray-700 ">Week Issued: {order.week_issued}</h4>
                                                      <p className="text-gray-500">Date Issued: {order.date_started}</p>
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
                                                        {
                                                        user?.department === "Cutting" &&  <p className="text-gray-700">Date Finished: {order.cutting_finish.split(' ')[0]}</p>
                                                        }
                                                        {
                                                            user?.department === "Assembly-Prep" && <p className="text-gray-700">Date Finished: {order.assembly_prep_finish.split(' ')[0]}</p>
                                                        }
                                                        {
                                                            user?.department === "Assembly-1" && <p className="text-gray-700">Date Finished: {order.assembly_one_finish.split(' ')[0]}</p>
                                                        }
                                                        {
                                                            user?.department === "Assembly-2" && <p className="text-gray-700">Date Finished: {order.assembly_two_finish.split(' ')[0]}</p>
                                                        }
                                                        {
                                                            user?.department === "Quality-Control" && <p className="text-gray-700">Date Finished: {order.quality_control_finish.split(' ')[0]}</p>
                                                        }
                                                        {
                                                            user?.department === "Finishing-1" && <p className="text-gray-700">Date Finished: {order.finishing_one_finish.split(' ')[0]}</p>
                                                        }
                                                        {
                                                            user?.department === "Finishing-2" && <p className="text-gray-700">Date Finished: {order.finishing_two_finish.split(' ')[0]}</p>
                                                        }
                                                        {/* //spe */}
                                                        {
                                                        user?.department === "Cutting" &&  <h4 className="text-gray-500 ">Date Started: {order.cutting_start.split(' ')[0]}</h4>
                                                        }
                                                        {
                                                            user?.department === "Assembly-Prep" && <h4 className="text-gray-500 ">Date Started: {order.assembly_prep_start.split(' ')[0]}</h4>
                                                        }
                                                        {
                                                            user?.department === "Assembly-1" && <h4 className="text-gray-500 ">Date Started: {order.assembly_one_start.split(' ')[0]}</h4>
                                                        }
                                                        {
                                                            user?.department === "Assembly-2" && <h4 className="text-gray-500 ">Date Started: {order.assembly_two_start.split(' ')[0]}</h4>
                                                        }
                                                        {
                                                            user?.department === "Quality-Control" && <h4 className="text-gray-500 ">Date Started: {order.quality_control_start.split(' ')[0]}</h4>
                                                        }
                                                        {
                                                            user?.department === "Finishing-1" && <h4 className="text-gray-500 ">Date Started: {order.finishing_one_start.split(' ')[0]}</h4>
                                                        }
                                                        {
                                                            user?.department === "Finishing-2" && <h4 className="text-gray-500 ">Date Started: {order.finishing_two_start.split(' ')[0]}</h4>
                                                        }
                                                      
                                                      
                                                  </div>
                                              </td>
                                              <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                                                    <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                        Done
                                                    </div>
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
          {/* for export */}
          <div className="flex-col mt-6 hidden">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                          <div className="overflow-hidden border shadow-md border-gray-200 md:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-700" ref={tableRef}>
                                  <thead className="bg-gray-800 ">
                                      <tr>
                                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Week Issued</th>
                                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Product Order</th>
                                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Item Code</th>
                                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Description</th>
                                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Quantity</th>
                                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date Started</th>
                                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date Finished</th>                                          
                                      </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200 ">
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
                                                  {
                                                      user?.department === "Cutting" &&  order.cutting_start
                                                  }
                                                  {
                                                      user?.department === "Assembly-Prep" &&  order.assembly_prep_start
                                                  }
                                                  {
                                                      user?.department === "Assembly-1" &&  order.assembly_one_start
                                                  }
                                                  {
                                                      user?.department === "Assembly-2" &&  order.assembly_two_start
                                                  }
                                                  {
                                                      user?.department === "Quality-Control" &&  order.quality_control_start
                                                  }
                                                  {
                                                      user?.department === "Finishing-1" &&  order.finishing_one_start
                                                  }
                                                  {
                                                      user?.department === "Finishing-2" &&  order.finishing_two_start
                                                  }
                                              </td>
                                              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                  {
                                                      user?.department === "Cutting" &&  order.cutting_finish
                                                  }
                                                  {
                                                      user?.department === "Assembly-Prep" &&  order.assembly_prep_finish
                                                  }
                                                  {
                                                      user?.department === "Assembly-1" &&  order.assembly_one_finish
                                                  }
                                                  {
                                                      user?.department === "Assembly-2" &&  order.assembly_two_finish
                                                  }
                                                  {
                                                      user?.department === "Quality-Control" &&  order.quality_control_finish
                                                  }
                                                  {
                                                      user?.department === "Finishing-1" &&  order.finishing_one_finish
                                                  }
                                                  {
                                                      user?.department === "Finishing-2" &&  order.finishing_two_finish
                                                  }
                                              </td>
                                            </tr>
                                              )
                                          })
                                          :
                                          orders?.map(order => {
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
                                                      user?.department === "Cutting" &&  order.cutting_start
                                                  }
                                                  {
                                                      user?.department === "Assembly-Prep" &&  order.assembly_prep_start
                                                  }
                                                  {
                                                      user?.department === "Assembly-1" &&  order.assembly_one_start
                                                  }
                                                  {
                                                      user?.department === "Assembly-2" &&  order.assembly_two_start
                                                  }
                                                  {
                                                      user?.department === "Quality-Control" &&  order.quality_control_start
                                                  }
                                                  {
                                                      user?.department === "Finishing-1" &&  order.finishing_one_start
                                                  }
                                                  {
                                                      user?.department === "Finishing-2" &&  order.finishing_two_start
                                                  }
                                              </td>
                                              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                  {
                                                      user?.department === "Cutting" &&  order.cutting_finish
                                                  }
                                                  {
                                                      user?.department === "Assembly-Prep" &&  order.assembly_prep_finish
                                                  }
                                                  {
                                                      user?.department === "Assembly-1" &&  order.assembly_one_finish
                                                  }
                                                  {
                                                      user?.department === "Assembly-2" &&  order.assembly_two_finish
                                                  }
                                                  {
                                                      user?.department === "Quality-Control" &&  order.quality_control_finish
                                                  }
                                                  {
                                                      user?.department === "Finishing-1" &&  order.finishing_one_finish
                                                  }
                                                  {
                                                      user?.department === "Finishing-2" &&  order.finishing_two_finish
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
  )
}

export default Dashboard