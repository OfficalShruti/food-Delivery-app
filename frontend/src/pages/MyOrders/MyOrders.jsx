/*import React, { useContext , useState ,useEffect} from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import parcleIcon from '../../assets/parcel_icon.png';;
import axios from 'axios'

const MyOrders = () => {

   const{url, token}=useContext(StoreContext);
   const[data,setdata] =useState([]);
   

   const fetchOrders = async () => {
      try {
          const response = await axios.post(url + "/api/order/userorders", { headers: { token } });
          if (response.data && response.data.data) {
              setdata(response.data.data); // Ensure `data` is properly set
           } else {
              setdata([]); // Fallback to an empty array if data is missing
          }
        } catch (error) {
            console.error("Error fetching orders:", error);
            setdata([]); // Handle error gracefully
          }
    };
    useEffect(() => {
      if (token) {
          fetchOrders();
      }
    }, [token]);


   /*const fetchOrders =async () => {
     const response =await axios.post(url+"/api/order/userorders",{headers:{token}});
     setdata(response.data.data);
     console.log(response.data.data);
   }
   useEffect(()=>{
        if(token){
          fetchOrders();
        }

    },[token])
   

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data .map((order ,index)=>{

          return(
            <div key={index}className='my-order-order'>
              <img src={assets.parcel_icon} alt =""/>
              
              <p>{order.items.map((item,index)=>{
                if(index === order.items.length-1){
                  return item.name+" x "+item.quantity+", "
                }
              })}</p>
              <p>Rs.{order.items.length}.00</p>
              <p><span>&#25cf;</span><b>{order.status}</b></p>
              <button onClick={(fetchOrders)}>Track Order</button>
             </div>       
          
          )
        })}
      </div>
      
    </div>
  )
}

export default MyOrders;*/

import React, { useContext, useState, useEffect } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import parcelIcon from '../../assets/parcel_icon.png'; // Adjust path as needed

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", { headers: { token } });
            console.log("Fetch Orders Response:", response.data);
            setData(response.data?.data || []); // Safely set the data
        } catch (error) {
            console.error("Error fetching orders:", error);
            setData([]); // Handle errors gracefully
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {data.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    data.map((order, index) => (
                        <div key={index} className="my-order-order">
                            <img src={parcelIcon} alt="Parcel Icon" />
                            <p>
                                {Array.isArray(order.items) &&
                                    order.items.map((item, idx) => (
                                        `${item.name} x ${item.quantity}${idx === order.items.length - 1 ? '' : ', '}`
                                    ))}
                            </p>
                            <p>Rs.{order.items?.length || 0}.00</p>
                            <p>
                                <span>&#25cf;</span> <b>{order.status}</b>
                            </p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyOrders;
