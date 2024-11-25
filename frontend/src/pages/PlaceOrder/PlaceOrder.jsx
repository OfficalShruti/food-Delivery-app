import React,{useContext, useState, useEffect} from 'react'
import { StoreContext } from '../../context/StoreContext'
import './PlaceOrder.css'
import { food_list } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const PlaceOrder = () => {
  const{getTotalCartAmount, token,food_list,cartItems,url}=useContext(StoreContext)
  const[data,setData] =useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""  
  });
  const navigate =useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token,navigate,getTotalCartAmount])

  const onChangeHandler =(event)=>{
    const name =event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const placeOrder =async (event)=>{
     event.preventDefault();
     let orderItems=[];
     food_list.map((item)=>{
      if(cartItems[item.id]>0){
        let itemInfo =item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    // const deliveryCharge = 5;
    let orderData={
      address:data,
      items:orderItems,
      amount :getTotalCartAmount()+50,
    }; 
    try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
  
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error: " + response.data.message); // Show server-side error message
      }
    } catch (error) {
      console.error(error); // Log error to console
      alert("An error occurred while placing the order. Please try again.");
    }
    
  }
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName'onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName'onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email'onChange={onChangeHandler} value={data.email} type="text" placeholder='Email address' />
        <input required name='street'onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city'onChange={onChangeHandler} value={data.city} type="text" placeholder='city' />
          <input required name='state'onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode'onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country'onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone'onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
                       <h2>Cart Totals</h2>
                       <div>
                          <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p> Rs.{getTotalCartAmount()}</p>
                          </div>
                          <hr />
                          <div className="cart-total-details">
                             <p>Delivery Free</p>
                             <p>Rs.{getTotalCartAmount()===0?0:50}</p>
                          </div>
                          <hr />
                          <div className="cart-total-details">
                            <b>Total</b>
                            <b>Rs.{getTotalCartAmount()===0?0:getTotalCartAmount() + 50}</b>
                          </div>
                        </div>
                        <button typr='submit'>PROCEED TO PAYMENT</button>
                      
                       </div>
      </div>
    </form>
  )
}

export default PlaceOrder
