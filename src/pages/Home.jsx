import React, { useContext, useEffect, useState } from 'react';
import Hero from '../components/Hero';
import { storecontext } from '../context/storecontext';



import Mobileapp from '../components/Mobileapp';
import Testimonial from '../components/Testimonial';
import Howitworks from '../components/Howitworks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';






function Home() {
  const [special, setspecial] = useState([]);
  const { addtocart, removefromcart, cartitems } = useContext(storecontext);
  const [apiData, setApiData] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Store selected item for modal

  const apiurl = 'https://orderjoy-backend.onrender.com/api/food/list';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiurl);
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (apiData.length > 0) {
      const specialDishes = apiData.filter(item => item.category === 'special');
      setspecial(specialDishes); // Update the special state with filtered dishes
    }
  }, [apiData]);

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setSelectedItem(item); // Set selected item for the modal
    setShow(true); // Open modal
  };

  return (
    <>
      <Hero />

      <Howitworks/>

      <div id='home-section' style={{ backgroundColor: "#f8f9fa" }} className='container-fluid p-5 '>
        <h2 style={{ fontSize: '30px' }} className="text-center mb-5 font-weight-bold  mt-5">TOP <span className="greentxt ">DEALS</span></h2>
        <div className="row">
          {special.length > 0 ? (
            special.slice(0, 8).map((item) => {
              const quantity = cartitems[item.name] || 0; // Get quantity for the specific item
              return (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
                  <div className="card h-100 p-3 position-relative" style={{ width: '100%' }}>
                    <img
                      onClick={() => handleShow(item)}
                      src={`https://orderjoy-backend.onrender.com/images/${item.img}`}
                      alt={item.name}
                      className="card-img-top"
                      style={{ height: '190px', objectFit: 'cover' }}
                    />
                    <div className="hover-overlay">
                      <h5 style={{ color: 'yellowgreen', fontWeight: 'bold' }}>{item.name}</h5>
                      <p className="text-white">
                        {item.desc.length > 50 ? `${item.desc.substring(0, 90)}...` : item.desc}
                        <div className="d-flex justify-content-between align-items-center w-100 mt-5">
                          <div>  <p>₹{item.price}</p>
                            <p><span className='text-warning'>  ★</span>{item.rating}</p></div>
                          <button onClick={() => addtocart(item.name)} className="btn headerbtn btn-sm position-relative mt-2">
                            <FontAwesomeIcon icon={faCartShopping} />
                            {/* Display quantity as badge next to the cart icon */}
                            {quantity > 0 && (
                              <span className="badge bg-light text-success border position-absolute" style={{ top: '-5px', right: '-5px', fontSize: '10px' }}>
                                {quantity}
                              </span>
                            )}
                          </button>
                        </div>

                      </p>


                    </div>
                  </div>
                </div>

              );
            })
          ) : (
            <p className='text-center'>No special dishes available at the moment.</p>
          )}
        </div>
      </div>

      <Mobileapp />

      <Testimonial />


    </>
  );
}

export default Home;
