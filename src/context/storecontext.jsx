import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const storecontext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartitems, setcartitems] = useState({});
  const [foodData, setFoodData] = useState([]);
  const [token, settoken] = useState(null); // Initialize token as null
  const apiurl = "http://localhost:4007/api/food/list";

  // Fetch food data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiurl);
        const data = await response.json();
        setFoodData(data); // Store food data in state
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    fetchData();
  }, []);

  // Fetch token from localStorage and load cart data if token exists
  useEffect(() => {
    const fetchedToken = localStorage.getItem("token");
    if (fetchedToken) {
      settoken(fetchedToken);
    }
  }, []); // Runs once when the component mounts

  // Load cart data when token is available
  const loadcartdata = async (token) => {
    try {
      const response = await axios.post('http://localhost:4007/api/cart/get', {}, { headers: { token } });
    console.log(response.data);
    setcartitems(response.data)
    // Set cart items from response (ensure it defaults to an empty object if no data)
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  // Add item to cart
  const addtocart = async (itemid) => {
    setcartitems((prev) => {
      const updatedCart = { ...prev, [itemid]: (prev[itemid] || 0) + 1 };
      return updatedCart;
    });
    if (token) {
      try {
        await axios.post('http://localhost:4007/api/cart/add', { itemid }, { headers: { token } });
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  // Remove item from cart
  const removefromcart = async (itemid) => {
    setcartitems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemid] > 0) {
        updatedCart[itemid] -= 1;
      }
      return updatedCart;
    });
    if (token) {
      try {
        await axios.post('http://localhost:4007/api/cart/remove', { itemid }, { headers: { token } });
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
  };

  // Load cart data when the token changes
  useEffect(() => {
    if (token) {
      loadcartdata(token);
    }
  }, [token]); // Runs when the token is updated

  const contextValue = {
    cartitems,
    setcartitems,
    addtocart,
    removefromcart,
    foodData,
    token
  };

  return <storecontext.Provider value={contextValue}>{props.children}</storecontext.Provider>;
};

export default StoreContextProvider;
