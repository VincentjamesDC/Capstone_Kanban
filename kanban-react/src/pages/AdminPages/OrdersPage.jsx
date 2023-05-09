import React, {useEffect, useContext, useState} from 'react'
import OrdersContext from '../../context/Orders'
import FadeInOut from '../../animations/Fade';
import { useNavigate } from 'react-router-dom';
import axios from '../../kanban-api/axios';

const OrdersPage = () => {

    const [update_id, setUpdateID] = useState('');
    const [product_order, setProductOrder] = useState('');
    const [item_code, setItemCode] = useState('');
    const [description, setDescription] = useState('');
    const [quantity2, setQuantity] = useState('');
    const [week_issued, setWeekIssued] = useState('');
    const [date_started, setDateStarted] = useState('');

    const [deleteModal, setDeleteModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

    const [delID, setDelID] = useState('');
    const [delOrder, setDelOrder] = useState('');

    const navigate = useNavigate();


    const { product_orders, getOrders, showModal, setModal, formValues, onChange, errors, postOrder, loading, deleteOrder, updateOrder, result, closeResultFast, up_result, closeUpdateResultFast, del_result, closeDelResultFast } = useContext(OrdersContext);

    useEffect(() =>{
        getOrders();
    },[]);

    const handleDelete = (id, order) => {
        setDelOrder(order);
        setDelID(id);
        setDeleteModal(true);
    }

    const handleEdit = (id, p_order, i_code, desc, quan, w_issued, d_started) => {
        setUpdateID(id);
        setProductOrder(p_order);
        setItemCode(i_code);
        setDescription(desc);
        setQuantity(quan);
        setWeekIssued(w_issued);
        setDateStarted(d_started);
        setUpdateModal(true);
    }

    const deleteOrder2 = () => { 
        deleteOrder(delID);
        setDeleteModal(false);
        getOrders();
    }

    const updateOrder2 = () => { 
        console.log('clicked');
        updateOrder(update_id, product_order, item_code, description, quantity2, week_issued, date_started);
        setUpdateModal(false);
        getOrders();
    }

    const DeliverForm = {
        status: "Reviewed",
    }

    const CancelForm = {
        status: "Cancelled",
    }


    const [review_result, setReviewResult ] = useState(null);
    const [cancel_result, setCancelResult ] = useState(null);

    function closeCancelResult(){
        setTimeout(() => {
            setCancelResult(null);
        }, 5000)
      }
    
    function closeCancelResultFast(){
        setCancelResult(null);
    }


    function closeReviewResult(){
        setTimeout(() => {
            setReviewResult(null);
        }, 5000)
      }
    
    function closeReviewResultFast(){
        setReviewResult(null);
    }

    const handleDeliver = async (e, order_id) => {
        let status = "Reviewed";
        e.preventDefault();
        const response = await axios.put("api/enrod/status/" + order_id, {status});
        if(response.data.status === 200){
            await getOrders();
            setReviewResult(response.status);
            closeReviewResult();
        }
    };

    const handleCancelled = async (order_id) => {
        let status = "Cancelled";
        const response = await axios.put("api/enrod/status/" + order_id, {status});
        if(response.data.status === 200){
            await getOrders();
            setCancelResult(response.status);
            setDeleteModal(false);
            closeCancelResult();
        }
    };

  return (
    <div>
        <div className="pt-5 md:px-12">
            <div className="h-full  overflow-y-auto">
                <div className="container  mx-auto grid">
                <h5 className='font-medium mb-4'>Product Orders</h5>
                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800 col-span-1">
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
                        {product_orders?.filter(product_order => product_order.cutting === null && product_order.status !== "Cancelled").length}
                        </p>
                    </div>
                    </div>
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800 col-span-1">
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
                        {product_orders?.filter(product_order => (product_order.cutting === "In-Progress" || product_order.cutting === "Done") && product_order.date_finished === null && product_order.status !== "Cancelled").length}
                        </p>
                    </div>
                    </div>
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800 col-span-1">
                    
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
                        {product_orders?.filter(product_order => product_order.date_finished !== null && product_order.status !== "Reviewed" && product_order.status !== "Cancelled").length}
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div className='md:px-12 mb-2'>
            <button onClick={() => setModal(true)} className='px-4 py-2 bg-blue-600 text-sm font-medium hover:bg-blue-500 duration-100 transition-all ease-out text-white rounded-md'>New Order</button>
        </div>
        <div className='px-4 gap-10 flex w-full flex-wrap lg:flex-nowrap md:px-12'>
        <div className="w-full lg:w-1/3">
            <h5 className='py-4 font-bold text-lg'>To Do</h5>
            <div className='flex flex-col gap-4 max-h-[60vh] overflow-y-scroll'>
                {
                    product_orders?.filter(product_order => product_order.cutting === null && product_order.status !== "Cancelled").length > 0 ?
                    product_orders?.filter(product_order => product_order.cutting === null && product_order.status !== "Cancelled").map(order => {
                        return(
                                 <div  key={order.id} className="m-auto h-full w-full max-w-md bg-white shadow-md p-2 border-t-4 border-blue-600 rounded">
                                        <header className="p-2 border-b flex justify-between"> 
                                            <div className="flex flex-col">
                                                <h4 className="text-xs font-semibold">PO: {order.product_order}</h4>
                                                <h1 className="text-lg font-mono text-blue-600">Item Code: {order.item_code}</h1>
                                            </div>
                                            <div className='flex gap-2'>
                                                <button onClick={() => {handleEdit(order.id, order.product_order, order.item_code, order.description, order.quantity, order.week_issued, order.date_started)}} className='text-sm font-medium '>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => {handleDelete(order.id, order.product_order)}} className='text-sm font-medium '>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-700 hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                                    </svg>
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-700 hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg> */}
                                                </button>
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
                                                <h4 className="text-xs">Week Issued</h4>
                                                <h1 className="text-md">{order.week_issued}</h1>
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
                                    <h4 className="text-xs">Week Issued</h4>
                                    <h1 className="text-md"></h1>
                            
                            </div>
                        </div>

                    </div>
                    

                }
            </div>
        </div>
        <div className="w-full lg:w-1/3">
            <h5 className='py-4 font-bold text-lg'>In-Progress</h5>
            <div className='flex flex-col gap-4 max-h-[60vh] overflow-y-scroll'>
                {
                    product_orders?.filter(product_order => (product_order.cutting === "In-Progress" || product_order.cutting === "Done") && product_order.date_finished === null && product_order.status !== "Cancelled").length > 0 ?
                    
                        product_orders?.filter(product_order => (product_order.cutting === "In-Progress" || product_order.cutting === "Done") && product_order.date_finished === null && product_order.status !== "Cancelled").map(order => {
                            return(
                                     <div  key={order.id} className="m-auto h-full w-full max-w-md bg-white shadow-md p-2 border-t-4 border-amber-600 rounded">
                                            <header className="p-2 border-b flex justify-between"> 
                                                <div className="flex flex-col">
                                                    <h4 className="text-xs font-semibold">PO: {order.product_order}</h4>
                                                    <h1 className="text-lg font-mono text-blue-600">Item Code: {order.item_code}</h1>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <button onClick={() => {handleEdit(order.id, order.product_order, order.item_code, order.description, order.quantity, order.week_issued, order.date_started)}} className='text-sm font-medium '>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button onClick={() => {handleDelete(order.id, order.product_order)}} className='text-sm font-medium '>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-700 hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                                        </svg>
                                                        {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-700 hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg> */}
                                                    </button>
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
                                                    <h4 className="text-xs">Week Issued</h4>
                                                    <h1 className="text-md">{order.week_issued}</h1>
                                                </div>
                                            </div>
    
                                        </div>
                            )
                        }):
                        <div className="m-auto h-52 invisible w-full max-w-md bg-white shadow-md p-2 border-t-4 border-amber-600 rounded ">
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
                                    <h4 className="text-xs">Week Issued</h4>
                                    <h1 className="text-md"></h1>
                                </div>
                            </div>

                        </div>
                        


                
                
                }
            </div>
        </div>
        <div className="w-full lg:w-1/3">
            <h5 className='py-4 font-bold text-lg'>Completed</h5>
            <div className='flex flex-col gap-4 max-h-[60vh] overflow-y-scroll'>
                {
                    product_orders?.filter(product_order => product_order.date_finished !== null && product_order.status !== "Reviewed" && product_order.status !== "Cancelled").map(order => {
                        return(
                                 <div  key={order.id} className="m-auto h-full w-full max-w-md bg-white shadow-md p-2 border-t-4 border-green-600 rounded">
                                        <header className="p-2 border-b flex justify-between"> 
                                            <div className="flex flex-col">
                                                <h4 className="text-xs font-semibold">PO: {order?.product_order}</h4>
                                                <h1 className="text-lg font-mono text-green-700">Item Code: {order?.item_code}</h1>
                                            </div>
                                            <div>
                                                <button onClick={(e) => handleDeliver(e, order.id, order.date_finished)} className='px-2 py-1 bg-green-600 text-white text-sm rounded-sm hover:bg-green-500 ease-out transition-all duration-200'>Reviewed</button>
                                            </div>
                                        </header>
                                        <div className="flex flex-wrap justify-between p-2 w-full gap-2">
                                            <div className="flex flex-col w-full">
                                                <h4 className="text-xs">Quantity: {order.quantity}</h4>
                                                <h1 className="text-lg">{order?.description}</h1>
                                            </div>

                                            <div className="flex flex-col">
                                                <h4 className="text-xs">Date Issued</h4>
                                                <h1 className="text-md">{order?.date_started}</h1>
                                            </div>

                                            <div className="flex flex-col">
                                                <h4 className="text-xs">Date Finished</h4>
                                                <h1 className="text-md">{order?.date_finished}</h1>
                                            </div>

                                            <div className="flex flex-col  mr-2">
                                                <h4 className="text-xs">Week Issued</h4>
                                                <h1 className="text-md">{order?.week_issued}</h1>
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
        result && 
        <FadeInOut show={result} duration={150}>
             <div className='w-1/6 absolute bottom-2 right-6'>
                <div id="alert-border-3" className="flex p-4 mb-4 border-t-4  text-white bg-gray-800 border-green-800 rounded-md" role="alert">
                    <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <div className="ml-3 text-sm font-medium">
                        <p>Successfully Created!</p>
                    </div>
                    <button onClick={closeResultFast} type="button" className="ml-auto -mx-1.5 -my-1.5   rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 inline-flex h-8 w-8 bg-gray-800 text-green-400 hover:bg-gray-700"  data-dismiss-target="#alert-border-3" aria-label="Close">
                    <span className="sr-only">Dismiss</span>
                    <svg aria-hidden="true" className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
            </div>
        </FadeInOut>
    }
     {
        review_result && 
        <FadeInOut show={review_result} duration={150}>
             <div className='w-1/6 absolute bottom-2 right-6'>
                <div id="alert-border-3" className="flex p-4 mb-4 border-t-4  text-white bg-gray-800 border-green-800 rounded-md" role="alert">
                    <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <div className="ml-3 text-sm font-medium">
                        <p>Order Reviewed!</p>
                    </div>
                    <button onClick={closeReviewResultFast} type="button" className="ml-auto -mx-1.5 -my-1.5   rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 inline-flex h-8 w-8 bg-gray-800 text-green-400 hover:bg-gray-700"  data-dismiss-target="#alert-border-3" aria-label="Close">
                    <span className="sr-only">Dismiss</span>
                    <svg aria-hidden="true" className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
            </div>
        </FadeInOut>
    }
    {
        up_result && 
        <FadeInOut show={up_result} duration={150}>
            <div className='w-1/6 absolute bottom-2 right-6'>
                <div id="alert-border-3" className="flex p-4 mb-4 border-t-4  text-white bg-gray-800 border-green-800 rounded-md" role="alert">
                    <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <div className="ml-3 text-sm font-medium">
                        <p>Updated Successfully!</p>
                    </div>
                    <button onClick={closeUpdateResultFast} type="button" className="ml-auto -mx-1.5 -my-1.5   rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 inline-flex h-8 w-8 bg-gray-800 text-green-400 hover:bg-gray-700"  data-dismiss-target="#alert-border-3" aria-label="Close">
                    <span className="sr-only">Dismiss</span>
                    <svg aria-hidden="true" className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
            </div>
        </FadeInOut>
    }

    {
        cancel_result && 
        <FadeInOut show={cancel_result} duration={150}>
            <div className='w-1/6 absolute bottom-2 right-6'>
                <div id="alert-border-3" className="flex p-4 mb-4 border-t-4  text-white bg-gray-800 border-green-800 rounded-md" role="alert">
                    <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <div className="ml-3 text-sm font-medium">
                        <p>Order Cancelled!</p>
                    </div>
                    <button onClick={closeCancelResultFast} type="button" className="ml-auto -mx-1.5 -my-1.5   rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 inline-flex h-8 w-8 bg-gray-800 text-green-400 hover:bg-gray-700"  data-dismiss-target="#alert-border-3" aria-label="Close">
                    <span className="sr-only">Dismiss</span>
                    <svg aria-hidden="true" className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
            </div>
        </FadeInOut>
    }
        
    
        {
            showModal && 
            <FadeInOut show={showModal} duration={200}>
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 bg-zinc-800/60 left-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg md:h-auto">

                <div className="relative bg-white rounded-lg shadow-lg">
                    <button onClick={() => setModal(false)}  type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="authentication-modal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 ">Create New Order</h3>
                        <form className="space-y-6" onSubmit={postOrder}>
                            <div>
                                <label htmlFor="product_order" className="block mb-2 text-sm font-medium text-gray-900 ">Product Order</label>
                                <input type="text" name="product_order" id="product_order" value={formValues["product_order"]} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                                {errors.product_order && (<div className='flex'><span className="text-red-400 text-sm m-2 p-2">{errors.product_order[0]}</span></div>)}

                            </div>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Item Code</label>
                                <input type="text" name="item_code" id="item_code" value={formValues["item_code"]} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                                {errors.item_code && (<div className='flex'><span className="text-red-400 text-sm m-2 p-2">{errors.item_code[0]}</span></div>)}

                            </div>
                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                                <input type="text" name="description" id="description" value={formValues["description"]} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                                {errors.description && (<div className='flex'><span className="text-red-400 text-sm m-2 p-2">{errors.description[0]}</span></div>)}
                            </div>
                            <div>
                                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 ">Quantity</label>
                                <input type="number" name="quantity" id="quantity" value={formValues["quantity"]} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                                {errors.quantity && (<div className='flex'><span className="text-red-400 text-sm m-2 p-2">{errors.quantity[0]}</span></div>)}

                            </div>
                            {/* <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create</button> */}
                            <button type="submit" className="flex items-center justify-center w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            {
                                loading ? <div role="status">
                                <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-300 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div> : <span className="inline-block " id='sign-in'>Create</span>
                            }
                            
                            
                        </button>
                        
                        </form>
                    </div>
                </div>
            </div>
        </div> 
        </FadeInOut>
        }

        {
            updateModal && 
            <FadeInOut show={updateModal} duration={200}>
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 bg-zinc-800/60 left-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg md:h-auto">

                <div className="relative bg-white rounded-lg shadow-lg">
                    <button onClick={() => {setUpdateModal(false), setProductOrder(''), setItemCode(''), setDescription(''), setQuantity(''), setWeekIssued(''), setDateStarted('')}}  type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="authentication-modal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 ">Update Order</h3>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="product_order" className="block mb-2 text-sm font-medium text-gray-900 ">Product Order</label>
                                <input type="text" name="product_order" id="product_order" defaultValue={product_order} onChange={(e) => {setProductOrder(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                                {errors.product_order && (<div className='flex'><span className="text-red-400 text-sm m-2 p-2">{errors.product_order[0]}</span></div>)}

                            </div>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Item Code</label>
                                <input type="text" name="item_code" id="item_code" defaultValue={item_code} onChange={(e) => {setItemCode(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                                {errors.item_code && (<div className='flex'><span className="text-red-400 text-sm m-2 p-2">{errors.item_code[0]}</span></div>)}

                            </div>
                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                                <input type="text" name="description" id="description" defaultValue={description} onChange={(e) => {setDescription(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                                {errors.description && (<div className='flex'><span className="text-red-400 text-sm m-2 p-2">{errors.description[0]}</span></div>)}
                            </div>
                            <div>
                                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 ">Quantity</label>
                                <input type="number" name="quantity" id="quantity" defaultValue={quantity2} onChange={(e) => {setQuantity(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                                {errors.quantity && (<div className='flex'><span className="text-red-400 text-sm m-2 p-2">{errors.quantity[0]}</span></div>)}
                            </div>
                            {/* <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create</button> */}
                            <button type="button" onClick={updateOrder2} className="flex items-center justify-center w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            {
                                loading ? <div role="status">
                                <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-300 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div> : <span className="inline-block " id='sign-in'>Save</span>
                            }            
                        </button>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        </FadeInOut>
        }

        
        {
            deleteModal && 
            <FadeInOut show={deleteModal} duration={200}>
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 bg-zinc-800/60 left-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg md:h-auto">

                <div className="relative bg-white rounded-lg shadow-lg">
                    <button onClick={() => setDeleteModal(false)}  type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="authentication-modal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 ">Cancel Product Order {delOrder}?</h3>
                        <div className='flex gap-2'>
                        <button type="button" onClick={() => handleCancelled(delID)} className="flex items-center justify-center w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            {
                                loading ? <div role="status">
                                <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-300 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div> : <span className="inline-block " id='sign-in'>Confirm</span>
                            }
                            
                            
                        </button>
                        <button onClick={() => setDeleteModal(false)} className="w-full text-gray-800 bg-gray-300 hover:bg-gray-400 transition-all duration-100 ease-out border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                          Cancel
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        </FadeInOut>
        }
    </div>
  )
}

export default OrdersPage