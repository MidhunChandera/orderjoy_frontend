import React from 'react';
import { IoFastFoodOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";

function Howitworks() {
  return (
    <div style={{ backgroundColor: "#f8f9fa" }}>
      <div style={{ backgroundColor: "#f8f9fa" }} className="container mt-5">
  
        <div className="row">
        
      
          <div
            style={{ borderRight: '2.5px solid #ddd' }}
            className="col-md-4 d-flex flex-column align-items-center text-center mb-4"
          >
            <IoFastFoodOutline size={40}  style={{color:'orange'}}  />
            <h5 className='mt-3 font-weight-bold'>Select Menu</h5>
            <p>Select from a wide variety of dishes across different categories.</p>
          </div>

        
          <div
            className="col-md-4 d-flex flex-column align-items-center text-center mb-4"
          >
            <FaShoppingCart size={35}  style={{color:'green'}}  />
            <h5 className='mt-3 font-weight-bold'>Place Order</h5>
            <p>Add your items to the cart and customize your order easily.</p>
          </div>

        
          <div
            style={{ borderLeft: '2.5px solid #ddd' }}
            className="col-md-4 d-flex flex-column align-items-center text-center mb-4"
          >
            <MdDeliveryDining size={40}  style={{color:'red'}} />
            <h5 className='mt-3 font-weight-bold'>Wait for Delivery</h5>
            <p>Sit back and relax as your meal makes its way to you. Track it in real-time.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Howitworks;
