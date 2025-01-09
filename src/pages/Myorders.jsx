import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { storecontext } from '../context/storecontext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Myorders() {
  const { token,cartitems } = useContext(storecontext);
  const [orders, setOrders] = useState([]);

  const fetchUserOrders = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4007/api/order/userorder',
        {},
        { headers: { token } }
      );
      setOrders(response.data); // Assuming response.data is an array of orders
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  const cancelOrder = async (orderId) => {
    try {
      
      await axios.post(
        'http://localhost:4007/api/order/cancel',
        { orderId },
        { headers: { token } }
      );
      toast.success('Order canceled successfully');
      fetchUserOrders();
    } catch (error) {
      console.error('Error canceling order:', error);
    
    }
  };

  const deleteorder=async(orderId)=>{
    try {
      await axios.post(
        'http://localhost:4007/api/order/delete',
        { orderId },
        { headers: { token } }
      );
      toast.success('Order deleted successfully');
      fetchUserOrders();
   
    } catch (error) {
      console.error('Error deleting order:', error);
    
    }
  }

  useEffect(() => {
    if (token) {
      fetchUserOrders();
    }
  }, [token]);
console.log(cartitems);

  return (
<div className='mt-5' style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "20px" }}>    <div className="container my-5 n=mt-5">
<h2 style={{fontSize:'30px'}} className="text-center mb-5 font-weight-bold ">MY <span  className="greentxt">ORDERS</span></h2>
  
    {orders.length > 0 ? (
      orders.map((order) => (
        <div
          key={order._id}
          className="row border rounded p-4 align-items-center mb-4 shadow-sm bg-light"
        >
          {/* Items */}
          <div className="col-md-6">
            <h5 className="fw-bold mb-3">Items Ordered:</h5>
            {order.items.map((item, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                <img
                  width="70px"
                  className="rounded me-3"
                  src={`http://localhost:4007/images/${item.image}`}
                  alt={item.name}
                />
                <div>
                  <h6 className="mb-1">{item.name}</h6>
                  <p className="mb-0 text-muted">Price: ₹{item.price}</p>
                  <p className="mb-0 text-muted">
                    Qty: {cartitems[item.name] || item.qty || 1}
                  </p>
                  <p className="mb-0 text-muted">
                    Total: ₹{item.total || item.price * (item.qty || 1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
  
          {/* Delivery Address */}
          <div className="col-md-4">
            <h6 className="fw-bold">Delivery Address:</h6>
            <p className="mb-1">
              {order.address.firstname} {order.address.lastname}
            </p>
            <p className="mb-1">{order.address.house}</p>
            <p className="mb-1">{order.address.street}</p>
            <p className="mb-1">
              {order.address.city}, {order.address.state}
            </p>
            <p className="mb-0">Phone: {order.address.phone}</p>
          </div>
  
          {/* Status and Actions */}
          <div className="col-md-2 text-center">
            <span
              className={`btn w-100 mb-3 mt-3 ${
                order.status === 'Delivered' ? 'btn-success' : 'btn-warning'
              }`}
            >
              {order.status}
            </span>

          
              <button onClick={() => cancelOrder(order._id)}  className="btn btn-dark w-100">
                Cancel Order
              </button>
            
              <button onClick={() => deleteorder(order._id)}  className="btn btn-danger mt-3 w-100">
               Remove
              </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-muted">No orders found.</p>
    )}
  </div>
  </div>
  );
}

export default Myorders;
