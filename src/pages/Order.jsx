import React, { useContext, useState } from "react";
import { storecontext } from "../context/storecontext";
import axios from "axios";

function Order() {
  const { token, foodData, cartitems } = useContext(storecontext);
  const [addressdata, setaddressdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    house: "",
    street: "",
    city: "",
    state: "",
    pin: "",
  });

  // Calculate the subtotal
  const subtotal = foodData.reduce((total, item) => {
    if (cartitems[item.name] > 0) {
      return total + item.price * cartitems[item.name];
    }
    return total;
  }, 0);

  // Define the delivery fee and total
  const deliveryFee = 50; // You can adjust this value
  const total = subtotal + deliveryFee;

  const placeorder = async (event) => {
    event.preventDefault();
    let ordereditem = [];
    foodData.map((item) => {
      if (cartitems[item.name] > 0) {
        ordereditem.push({
          name: item.name,
          image:item.img,
          price: item.price,
          total: item.price * cartitems[item.name], // Calculate the total price for this item
        });
      }
    });

    let orderaddress = {
      address: addressdata,
      items: ordereditem,
    };

    try {
      let response = await axios.post(
        "https://orderjoy-backend.onrender.com/api/order/place",
        orderaddress,
        { headers: { token } }
      );
      if (response.data.url) {
        window.location.href = response.data.url; // Redirect to the Stripe checkout page
      } else {
        console.error("Stripe URL not returned");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <>
      <div id="order-section" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "20px" }} className="container-fluid p-5 mt-5 order-container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-2"></div>
          <div className="col-md-4">
          <h2 style={{fontSize:'30px'}} className="text-center mb-5 font-weight-bold ">DELIVERY <span className="greentxt">INFORMATION</span></h2>
            <form onSubmit={placeorder}>
              <div className="row mb-3">
                <div className="col">
                  <input
                    id="firstName"
                    className="form-control"
                    type="text"
                    placeholder="First Name"
                    required
                    value={addressdata.firstname}
                    onChange={(e) =>
                      setaddressdata({ ...addressdata, firstname: e.target.value })
                    }
                  />
                </div>
                <div className="col">
                  <input
                    id="lastName"
                    className="form-control"
                    type="text"
                    placeholder="Last Name"
                    required
                    value={addressdata.lastname}
                    onChange={(e) =>
                      setaddressdata({ ...addressdata, lastname: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mb-3">
                <input
                  id="email"
                  className="form-control"
                  type="email"
                  placeholder="Email Address"
                  required
                  value={addressdata.email}
                  onChange={(e) =>
                    setaddressdata({ ...addressdata, email: e.target.value })
                  }
                />
              </div>

              <div className="mb-3">
                <input
                  id="addressLine1"
                  className="form-control"
                  type="text"
                  placeholder="Flat, House no, Building, Company, Apartment"
                  required
                  value={addressdata.house}
                  onChange={(e) =>
                    setaddressdata({ ...addressdata, house: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  id="addressLine2"
                  className="form-control"
                  type="text"
                  placeholder="Area, Street, Sector, Village"
                  required
                  value={addressdata.street}
                  onChange={(e) =>
                    setaddressdata({ ...addressdata, street: e.target.value })
                  }
                />
              </div>

              <div className="row mb-3">
                <div className="col">
                  <input
                    id="pincode"
                    className="form-control"
                    type="text"
                    placeholder="Pincode"
                    required
                    value={addressdata.pin}
                    onChange={(e) =>
                      setaddressdata({ ...addressdata, pin: e.target.value })
                    }
                  />
                </div>
                <div className="col">
                  <input
                    id="city"
                    className="form-control"
                    type="text"
                    placeholder="Town/City"
                    required
                    value={addressdata.city}
                    onChange={(e) =>
                      setaddressdata({ ...addressdata, city: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mb-4">
                <select
                  id="state"
                  className="form-select"
                  value={addressdata.state}
                  onChange={(e) =>
                    setaddressdata({ ...addressdata, state: e.target.value })
                  }
                  required
                >
                  <option value="" disabled selected>
                    Select State
                  </option>
                  <option value="Alappuzha">Alappuzha</option>
                  <option value="Ernakulam">Ernakulam</option>
                  <option value="Idukki">Idukki</option>
                  <option value="Kannur">Kannur</option>
                  <option value="Kasaragod">Kasaragod</option>
                  <option value="Kollam">Kollam</option>
                  <option value="Kottayam">Kottayam</option>
                  <option value="Kozhikode">Kozhikode</option>
                  <option value="Malappuram">Malappuram</option>
                  <option value="Palakkad">Palakkad</option>
                  <option value="Pathanamthitta">Pathanamthitta</option>
                  <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                  <option value="Thrissur">Thrissur</option>
                  <option value="Wayanad">Wayanad</option>
                </select>
              </div>

              <button className="headerbtn w-100" type="submit">
                Proceed to Checkout
              </button>
            </form>
          </div>
          <div className="col-md-4 mt-4 p-4 rounded border bg-light">
            <h4 className="text-center  mb-4">Cart Total</h4>
            {/* Display Ordered Items */}
            {foodData.map((item) =>
              cartitems[item.name] > 0 ? (
                <div
                  key={item.name}
                  className="d-flex justify-content-between mb-3 "
                >
                  <p className="mb-0">
                    {item.name} x {cartitems[item.name]}
                  </p>
                  <p className="mb-0 fw-bold">
                    ₹{item.price * cartitems[item.name]}
                  </p>
                </div>
              ) : null
            )}
            <div className="d-flex justify-content-between mb-3">
              <p className="mb-0">Subtotal</p>
              <p className="mb-0 fw-bold">₹{subtotal}</p>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <p className="mb-0">Delivery Fee</p>
              <p className="mb-0 fw-bold">₹{deliveryFee}</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-3">
              <p className="mb-0">Total</p>
              <p className="mb-0 fw-bold text-success">₹{total}</p>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </>
  );
}

export default Order;
