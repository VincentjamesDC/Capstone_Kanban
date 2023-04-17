
import React, {createContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../kanban-api/axios';

const OrdersContext = createContext();

export const OrdersProvider = ({children}) => {
    //date
    const today = new Date();
    const numberOfDaysToAdd = 0;

    const date = today.setDate(today.getDate() + numberOfDaysToAdd); 
    const defaultTimeValue = new Date(date).toISOString().split('T')[0]

    const startDate = new Date(today.getFullYear(), 0, 1);
    const days = Math.floor((today - startDate) /
        (24 * 60 * 60 * 1000));

    const weekNumber = Math.ceil(days / 7);

    const initialForm = {
        week_issued: "WEEK " + weekNumber,
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
        quality_control: "",
        date_checked: "",
        finishing_one: "",
        date_finishing_finished: "",
        finishing_two: "",
        date_started: defaultTimeValue,
        date_finished: ""
    }

    const [formValues, setFormValues] = useState(initialForm);

    const [product_orders, setOrders] = useState([]);
    const [errors, setErrors] = useState({});
    const [showModal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);


    const onChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };

    function clearFormValues(){
      setFormValues(initialForm);
      setTags([]);
    }

    const getOrders = async () => {
      const product_orders = await axios.get("api/enrod/order");
      setOrders(product_orders.data.data);
    };

    const postOrder = async (e) => {
      setLoading(true);
      setErrors([]);
      e.preventDefault();
      try {
        const response = await axios.post("api/enrod/order", formValues);
        await getOrders();
        setModal(false);
        setFormValues(initialForm);
      } catch (e) {
        if (e.response.status === 422) {
          setErrors(e.response.data.errors);
        }
      }
      setLoading(false);
    }

    const updateOrder = async (update_id, product_order, item_code, description, quantity2, week_issued, date_started) => {
      let quantity = quantity2.toString();
      await axios.put("api/enrod/order/" + update_id, {week_issued, product_order, item_code, description, quantity, date_started});
      getOrders();
    };

    const deleteOrder = async (id) => {
      await axios.delete("api/enrod/order/" + id);
      getOrders();
    };


    return <OrdersContext.Provider value={{
        product_orders,
        getOrders,
        showModal,
        setModal,
        formValues,
        onChange,
        errors,
        postOrder,
        loading,
        deleteOrder,
        updateOrder
    }}>{children}</OrdersContext.Provider>
};

export default OrdersContext;