import { useContext , useEffect} from 'react';
import React from 'react'
import './Verify.css';
import {useSearchParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
const Verify = () => {
    
    const[searchParams,setSearchParams] =useSearchParams();
    const success =searchParams.get("success")
    const orderId=searchParams.get("orderId")
    const {url} =useContext(StoreContext);
    const navigate =useNavigate();
    
    const verifyPayment =async() =>{
      try{
            const response =await axios.post(url+"/api/order/verify",{success,orderId});
            if (response.data.success){
            navigate("/myorders");

            }
            else{
                navigate("/")
            }
            
        } catch(error){
            console.error("Error verifying payment:", error);
            alert("An error occurred while verifying payment. Please try again.");
            navigate("/"); 
        }
    };   
    useEffect(()=>{
      verifyPayment();
    },[]);
        
    

  return (
    <div className='verify'>
    <div className="spinner"></div> 
    </div>
  )
}

export default Verify
