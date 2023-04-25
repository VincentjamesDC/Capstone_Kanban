import React, {useEffect, useState, useContext} from 'react'
import OrdersContext from '../../../context/Orders'
import DepPosts from '../../components/DepPosts';

const CuttingBoard = () => {
  const { product_orders, getOrders} = useContext(OrdersContext);

  useEffect(() =>{
    getOrders();
  }, []);

  return (
    <div className=' py-5 mt-5  md:px-12'>
        <div className='flex gap-1'> 
         
          <div className='w-1/3'>
          {/* <h5 className='font-medium mb-4 py-2'>Department Progress</h5> */}
            <div class="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-white border-b border-gray-200  w-full shadow-lg rounded">
            <div class="rounded-t mb-0 px-0 border-0">
              <div class="flex flex-wrap items-center px-4 py-2">
                <div class="relative w-full max-w-full flex-grow flex-1">
                  <h3 class="font-semibold text-base text-gray-800">Department Progress</h3>
                </div>
                <div class="relative w-full max-w-full flex-grow flex-1 text-right">
                  <button class=" invisible bg-blue-500 dark:bg-gray-100 text-white active:bg-blue-600 dark:text-gray-800 dark:active:text-gray-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                </div>
              </div>
              <div class="block w-full overflow-x-auto">
                <table class="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th class="px-4 bg-gray-800  text-gray-200  align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Department</th>
                      <th class="px-4 bg-gray-800  text-gray-200  align-middle border border-solid border-gray-200  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">To Do</th>
                      <th class="px-4 bg-gray-800  text-gray-200  align-middle border border-solid border-gray-200  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">In-Progress</th>
                      <th class="px-4 bg-gray-800  text-gray-200  align-middle border border-solid border-gray-200  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="text-gray-800 border-b">
                      <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Cutting</th>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.cutting === null).length}</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.cutting === "In-Progress").length}</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.cutting === "Ok").length}</td>
                    </tr>
                    <tr class="text-gray-800 border-b">
                      <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">A-1 Prep (Assembly Prep)</th>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.cutting === "Ok" && product_order.assembly_prep === null).length}</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.cutting === "Ok" && product_order.assembly_prep === "In-Progress").length}</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.cutting === "Ok" && product_order.assembly_prep === "Ok").length}</td>
                    </tr>
                    <tr class="text-gray-800 border-b">
                      <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">A-1 (Assembly One)</th>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.assembly_prep === "Ok" && product_order.assembly_one === null).length}</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.assembly_prep === "Ok" && product_order.assembly_one === "In-Progress").length}</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.assembly_prep === "Ok" && product_order.assembly_one === "Ok").length}</td>
                    </tr>
                    <tr class="text-gray-800 border-b">
                      <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">A-2 (Assembly Two)</th>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.assembly_one === "Ok" && product_order.assembly_two === null).length}</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.assembly_one === "Ok" && product_order.assembly_two === "In-Progress").length}</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.assembly_one === "Ok" && product_order.assembly_two === "Ok").length}</td>
                    </tr>
                    <tr class="text-gray-800 border-b">
                      <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">QC (Quality Control)</th>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.assembly_two === "Ok" && product_order.quality_control === null).length}</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.assembly_two === "Ok" && product_order.quality_control === "In-Progress").length}</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.assembly_two === "Ok" && product_order.quality_control === "Ok").length}</td>
                    </tr>
                    <tr class="text-gray-800 border-b">
                      <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">F-1 (Finishing One)</th>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.quality_control === "Ok" && product_order.finishing_one === null).length}</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.quality_control === "Ok" && product_order.finishing_one === "In-Progress").length}</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.quality_control === "Ok" && product_order.finishing_one === "Ok").length}</td>
                    </tr>
                    
                    <tr class="text-gray-800 border-b">
                      <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">F-2 (Finishing Two)</th>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.finishing_one === "Ok" && product_order.finishing_two === null).length}</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.finishing_one === "Ok" && product_order.finishing_two === "In-Progress").length}</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product_orders?.filter(product_order => product_order.finishing_one === "Ok" && product_order.finishing_two === "Ok").length}</td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className='w-2/3'>
              <DepPosts product_orders={product_orders}/>
          </div>
      </div>
  </div>
  )
}

export default CuttingBoard