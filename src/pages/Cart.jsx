import React, { useContext } from "react";
import { storecontext } from "../context/storecontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import cartboy from '../assets/cartboy.gif';
import { HashLink } from "react-router-hash-link";

function Cart() {
  const { foodData, cartitems, removefromcart } = useContext(storecontext);

  // Calculate total price
  const totalPrice = foodData.reduce((acc, item) => {
    if (cartitems[item.name] > 0) {
      return acc + item.price * cartitems[item.name];
    }
    return acc;
  }, 0);

  // Calculate total items
  const totalItems = Object.values(cartitems).reduce((acc, quantity) => acc + quantity, 0);

  // Define the fixed delivery fee
  const deliveryFee = 50;
  const subtotal = totalPrice + deliveryFee;

  // Check if the cart is empty
  const isCartEmpty = totalItems === 0;
  
  const scrollWithOffset = (el) => {
    const yOffset = -70; 
    const yPosition = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: yPosition, behavior: 'smooth' });
  };
  return (
    <div id="cart-section" className="mt-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "20px" }}>
      <div className="container mt-5">
        <h2 style={{ fontSize: '30px' }} className="text-center mb-5 font-weight-bold ">CART</h2>

        {/* If the cart is empty, display the placeholder */}
        {isCartEmpty ? (
          <div className="text-center">
            <img className="img-fluid"
              src={cartboy}
              alt="Empty Cart"

            />
            <p className="mt-3">Your cart is empty!</p>
          </div>
        ) : (
          <div>
        
            {foodData.map((item) => {
              if (cartitems[item.name] > 0) {
                return (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between align-items-center py-3 px-4 mb-3"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
   
                    <div className="d-flex align-items-center">
                      <img
                        src={`http://localhost:4007/images/${item.img}`}
                        alt={item.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "10px",
                          marginRight: "15px",
                        }}
                      />
                      <div>
                        <p className="mb-1 fw-bold">{item.name}</p>
                        <p className="mb-0 text-muted">
                          ₹{item.price} x {cartitems[item.name]}
                        </p>
                      </div>
                    </div>

                    {/* Total and Remove Button */}
                    <div className="d-flex align-items-center">
                      <p className="mb-0 fw-bold me-4">₹{item.price * cartitems[item.name]}</p>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removefromcart(item.name)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}

        {/* Order Summary Section - only show if cart is not empty */}
        {!isCartEmpty && (
          <div className="container mt-4">
            <div className="col-md-3"></div>
            <div className="col-md-4 p-4 rounded border bg-light">
              <h4 className="text-center mb-4">Order Summary</h4>

              {/* Total Items */}
              <div className="d-flex justify-content-between mb-3">
                <p className="mb-0">Total Items</p>
                <p className="mb-0 fw-bold">{totalItems}</p>
              </div>

              {/* Total Price */}
              <div className="d-flex justify-content-between mb-3">
                <p className="mb-0">Total Price</p>
                <p className="mb-0 fw-bold">₹{totalPrice}</p>
              </div>

              {/* Delivery Fee */}
              <div className="d-flex justify-content-between mb-3">
                <p className="mb-0">Delivery Fee</p>
                <p className="mb-0 fw-bold">₹{deliveryFee}</p>
              </div>

              <hr />

              {/* Subtotal */}
              <div className="d-flex justify-content-between mb-3">
                <p className="mb-0">Subtotal</p>
                <p className="mb-0 fw-bold text-success">₹{subtotal}</p>
              </div>

              {/* Confirm Button */}
       <HashLink     className="headerbtn"  smooth to="/order#order-section" scroll={scrollWithOffset}>
                  <button className="w-100">    ORDER NOW</button>
                    </HashLink>
            </div>
            <div className="col-md-4"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
