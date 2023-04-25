import React, {useEffect, useContext, useState} from 'react'
import OrdersContext from '../../../context/Orders'
import FadeInOut from '../../../animations/Fade';
import axios from '../../../kanban-api/axios';
import useAuthContext from '../../../context/Authentication';

const QualityControl = () => {

    
    const today = new Date();
    const numberOfDaysToAdd = 0;

    const date = today.setDate(today.getDate() + numberOfDaysToAdd); 
    const defaultTimeValue = new Date(date).toISOString().split('T')[0]
    
    const DoForm = {
        week_issued: "",
        product_order: "",
        item_code: "",
        description: "",
        quantity: "",
        cutting: "",
        date_cutted: "",
        assembly_prep: "",
        date_preped: "",
        assembly_one: "",
        date_assembled_one: "",
        assembly_two: "",
        date_assembled_two: "",
        quality_control: "In-Progress",
        date_checked: "",
        finishing_one: "",
        date_finished_one: "",
        finishing_two: "",
        date_started: "",
        date_finished: ""
    }

    const DoneForm = {
        week_issued: "",
        product_order: "",
        item_code: "",
        description: "",
        quantity: "",
        cutting: "",
        date_cutted: "",
        assembly_prep: "",
        date_preped: "",
        assembly_one: "",
        date_assembled_one: "",
        assembly_two: "",
        date_assembled_two: "",
        quality_control: "Ok",
        date_checked: defaultTimeValue,
        finishing_one: "",
        date_finished_one: "",
        finishing_two: "",
        date_started: "",
        date_finished: ""
    }


    const { product_orders, getOrders, showModal, setModal, formValues, onChange, errors, postOrder } = useContext(OrdersContext);
    const { user, getUser, logout } = useAuthContext();

    function closeProgResult(){
        setTimeout(() => {
            setProgressRes(null);
        }, 5000)
      }
  
       
    function closeDoneResult(){
        setTimeout(() => {
            setDoneRes(null);
        }, 5000)
      }
    
    function closeProgResultFast(){
        setProgressRes(null);
    }

    function closeDoneResultFast(){
        setDoneRes(null);
    }

    const [progress_res, setProgressRes ] = useState(null);
    const [done_res, setDoneRes] = useState(null);


    const handleDoProcess = async (e, order_id) => {
        e.preventDefault();
        const response = await axios.put("api/enrod/quality_control/" + order_id, DoForm);
        if(response.data.status === 200){
            await getOrders();
            setProgressRes(response.status);
            closeProgResult();
            navigate("/dashboard/quality_control");
        }
      };

      const handleDone = async (e, order_id) => {
        e.preventDefault();
        const response = await axios.put("api/enrod/quality_control/" + order_id, DoneForm);
        if(response.data.status === 200){
            await getOrders();
            setDoneRes(response.status);
            closeDoneResult();
            navigate("/dashboard/quality_control");
        }
      };

    useEffect(() =>{
        getOrders();
    },[]);

  return (
<div className='py-5 md:px-12'>
        <div className="">
            <div className="h-full overflow-y-auto">
                <div className="container  mx-auto grid">
                <h5 className='font-medium mb-4'>Product Orders</h5>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                    <div className="p-3 mr-4 rounded-full text-orange-100 bg-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5V7A2.5 2.5 0 0011 4.5H8.128a2.252 2.252 0 011.884-1.488A2.25 2.25 0 0112.25 1h1.5a2.25 2.25 0 012.238 2.012zM11.5 3.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.25h-3v-.25z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M2 7a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7zm2 3.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm0 3.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>

                    </div>
                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-400">
                        To Do
                        </p>
                        <p className="text-lg font-semibold text-gray-200">
                        {product_orders?.filter(product_order => product_order.quality_control === null  && product_order.assembly_two === "Ok").length}
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
                        In-Progress
                        </p>
                        <p className="text-lg font-semibold text-gray-200">
                        {product_orders?.filter(product_order => product_order.quality_control === "In-Progress" && product_order.assembly_two === "Ok").length}
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
                        Completed Orders
                        </p>
                        <p className="text-lg font-semibold text-gray-200">
                        {product_orders?.filter(product_order => product_order.date_checked !== null && product_order.date_assembled_two !==null).length}
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <div className='px-4 gap-6 flex w-full flex-wrap lg:flex-nowrap'>
            <div className="py-8 w-full lg:w-1/3">
                <h5 className='py-4 font-bold text-lg'>To Do</h5>
                <div className='flex flex-col gap-4 max-h-[60vh] overflow-y-scroll'>
                    {
                        product_orders?.filter(product_order => product_order.quality_control === null  && product_order.assembly_two === "Ok").length > 0 ?
                        product_orders?.filter(product_order => (product_order.quality_control === null && product_order.assembly_two === "Ok")).map(order => {
                            return(
                                    <div  key={order.id} className="m-auto h-full w-full max-w-md bg-white shadow-md p-2 border-t-4 border-blue-600 rounded">
                                            <header className="p-2 border-b flex"> 
                                                <div className="flex flex-col">
                                                    <h4 className="text-xs font-semibold">PO: {order.product_order}</h4>
                                                    <h1 className="text-lg font-mono text-blue-600">Item Code: {order.item_code}</h1>
                                                </div>
                                            </header>
                                            <div className="flex flex-wrap justify-between p-2 w-full gap-4">
                                                <div className="flex flex-col w-full">
                                                    <h4 className="text-xs">Quantity: {order.quantity}</h4>
                                                    <h1 className="text-lg">{order.description}</h1>
                                                </div>

                                                <div className="flex flex-col">
                                                    <h4 className="text-xs">Date Issued</h4>
                                                    <h1 className="text-md">{order.date_started}</h1>
                                                </div>

                                                <div className="flex flex-col mr-2">
                                                    {/* <p className='text-xs'>Action</p> */}
                                                    <button onClick={(e) => handleDoProcess(e, order.id)} className="text-sm mt-2 bg-blue-600 text-white px-3 py-1 rounded-sm">
                                                        Mark In-Progress
                                                    </button>
                                                
                                                </div>
                                            </div>

                                        </div>
                            )
                        }):
                        <div className="m-auto h-52 invisible w-full max-w-md bg-white shadow-md p-2 border-t-4 border-amber-600 rounded">
                            <header className="py-1 px-2 border-b flex"> 
                                <div className="flex flex-col">
                                    <h4 className="text-xs font-semibold">PO: </h4>
                                    <h1 className="text-lg font-mono text-red-600">Item Code: </h1>
                                </div>
                            </header>
                            <div className="flex flex-wrap justify-between p-2 w-full gap-2">
                                <div className="flex flex-col w-full">
                                    <h4 className="text-xs">Quantity: </h4>
                                    <h1 className="text-lg"></h1>
                                </div>

                                <div className="flex flex-col">
                                    <h4 className="text-xs">Date Issued</h4>
                                    <h1 className="text-md"></h1>
                                </div>

                                <div className="flex flex-col mr-2">
                                    {/* <p className='text-xs'>Action</p> */}
                                    <button className="text-sm mt-2 bg-blue-600 text-white px-3 py-1 rounded-sm">
                                        Mark In-Progress
                                    </button>
                                </div>
                            </div>

                        </div>
                        

                    }
                </div>
            </div>
            <div className="py-8 w-full lg:w-1/3">
                <h5 className='py-4 font-bold text-lg'>In-Progress</h5>
                <div className='flex flex-col gap-4 max-h-[60vh] overflow-y-scroll'>
                    {
                        product_orders?.filter(product_order => product_order.quality_control === "In-Progress"  && product_order.assembly_two === "Ok").length > 0 ?
                        
                            product_orders?.filter(product_order => (product_order.quality_control === "In-Progress" && product_order.assembly_two === "Ok")).map(order => {
                                return(
                                        <div  key={order.id} className="m-auto h-full w-full max-w-md bg-white shadow-md p-2 border-t-4 border-amber-600 rounded">
                                                <header className="px-2 py-1 border-b flex"> 
                                                    <div className="flex flex-col">
                                                        <h4 className="text-xs font-semibold">PO: {order.product_order}</h4>
                                                        <h1 className="text-lg font-mono text-amber-600">Item Code: {order.item_code}</h1>
                                                    </div>
                                                </header>
                                                <div className="flex flex-wrap justify-between p-2 w-full gap-2">
                                                    <div className="flex flex-col w-full">
                                                        <h4 className="text-xs">Quantity: {order.quantity}</h4>
                                                        <h1 className="text-lg">{order.description}</h1>
                                                    </div>
        
                                                    <div className="flex flex-col">
                                                        <h4 className="text-xs">Date Issued</h4>
                                                        <h1 className="text-md">{order.date_started}</h1>
                                                    </div>
        
                                                    <div className="flex flex-col mr-2">
                                                        {/* <p className='text-xs'>Action</p> */}
                                                        <button onClick={(e) => handleDone(e, order.id)}  className="text-sm mt-2 bg-amber-600 text-white px-3 py-1 rounded-sm">
                                                            Mark as Done
                                                        </button>
                                                    
                                                    </div>
                                                </div>
        
                                            </div>
                                )
                            }):
                            <div className="m-auto h-52 invisible w-full max-w-md bg-white shadow-md p-2 border-t-4 border-amber-600 rounded">
                                <header className="p-2 border-b flex"> 
                                    <div className="flex flex-col">
                                        <h4 className="text-xs font-semibold">PO: </h4>
                                        <h1 className="text-lg font-mono text-red-600">Item Code: </h1>
                                    </div>
                                </header>
                                <div className="flex flex-wrap justify-between p-2 w-full gap-2">
                                    <div className="flex flex-col w-full">
                                        <h4 className="text-xs">Quantity: </h4>
                                        <h1 className="text-lg"></h1>
                                    </div>

                                    <div className="flex flex-col">
                                        <h4 className="text-xs">Date Issued</h4>
                                        <h1 className="text-md"></h1>
                                    </div>

                                    <div className="flex flex-col mr-2">
                                        {/* <p className='text-xs'>Action</p> */}
                                        <button className="text-sm mt-2 bg-blue-600 text-white px-3 py-1 rounded-sm">
                                            Mark In-Progress
                                        </button>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
            <div className="py-8 w-full lg:w-1/3">
                <h5 className='py-4 font-bold text-lg'>Done</h5>
                <div className='flex flex-col gap-4 max-h-[60vh] overflow-y-scroll'>
                    {
                        product_orders?.filter(product_order => (product_order.quality_control === "Ok" && product_order.assembly_two === "Ok")).map(order => {
                            return(
                                    <div  key={order.id} className="m-auto h-full w-full max-w-md bg-white shadow-md p-2 border-t-4 border-green-600 rounded">
                                            <header className="px-2 py-1 border-b flex"> 
                                                <div className="flex flex-col">
                                                    <h4 className="text-xs font-semibold">PO: {order.product_order}</h4>
                                                    <h1 className="text-lg font-mono text-green-700">Item Code: {order.item_code}</h1>
                                                </div>
                                            </header>
                                            <div className="flex flex-wrap justify-between p-2 w-full gap-2">
                                                <div className="flex flex-col w-full">
                                                    <h4 className="text-xs">Quantity: {order.quantity}</h4>
                                                    <h1 className="text-lg">{order.description}</h1>
                                                </div>

                                                <div className="flex flex-col">
                                                    <h4 className="text-xs">Date Issued</h4>
                                                    <h1 className="text-md">{order.date_started}</h1>
                                                </div>

                                                <div className="flex flex-col mr-2">
                                                    <h4 className="text-xs">Date Cutted</h4>
                                                    <h1 className="text-md">{order.date_cutted}</h1>
                                                </div>
                                            </div>

                                        </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        {
            progress_res && 
            <FadeInOut show={progress_res} duration={150}>
                <div className='w-1/6 absolute bottom-2 right-6'>
                    <div id="alert-border-3" className="flex p-4 mb-4 border-t-4  text-white bg-gray-800 border-green-800 rounded-md" role="alert">
                        <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                        <div className="ml-3 text-sm font-medium">
                            <p>Item In-Progress!</p>
                        </div>
                        <button onClick={closeProgResultFast} type="button" className="ml-auto -mx-1.5 -my-1.5   rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 inline-flex h-8 w-8 bg-gray-800 text-green-400 hover:bg-gray-700"  data-dismiss-target="#alert-border-3" aria-label="Close">
                        <span className="sr-only">Dismiss</span>
                        <svg aria-hidden="true" className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>
            </FadeInOut>
        }

        {
            done_res && 
            <FadeInOut show={done_res} duration={150}>
                <div className='w-1/6 absolute bottom-2 right-6'>
                    <div id="alert-border-3" className="flex p-4 mb-4 border-t-4  text-white bg-gray-800 border-green-800 rounded-md" role="alert">
                        <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                        <div className="ml-3 text-sm font-medium">
                        <p>Item Done!</p>
                        </div>
                        <button onClick={closeDoneResultFast} type="button" className="ml-auto -mx-1.5 -my-1.5   rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 inline-flex h-8 w-8 bg-gray-800 text-green-400 hover:bg-gray-700"  data-dismiss-target="#alert-border-3" aria-label="Close">
                        <span className="sr-only">Dismiss</span>
                        <svg aria-hidden="true" className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>
            </FadeInOut>
        }
    </div>
  )
}

export default QualityControl