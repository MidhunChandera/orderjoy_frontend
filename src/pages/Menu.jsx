import React, { useContext, useEffect, useState } from 'react';
import { storecontext } from '../context/storecontext';  // Adjust path if needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
import { faMagnifyingGlass, faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Import specific icon (Shopping Cart)

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Menu = () => {
  const { foodData, cartitems, addtocart, removefromcart } = useContext(storecontext); // Access foodData from context
  const [filteredData, setFilteredData] = useState([]); // Store filtered data
  const [categoryFilter, setCategoryFilter] = useState("All"); // Default filter set to "All"
  const [searchQuery, setSearchQuery] = useState("");
  
  const [currentpage,setcurrentpage]= useState(1)
  const[postperpage,setpostperpage]=useState(8)

  const indexoflastpost=currentpage*postperpage
  const indexoffirstpost=indexoflastpost-postperpage

  const currentposts=filteredData.slice(indexoffirstpost,indexoflastpost)
const totalpages=Math.ceil(filteredData.length/postperpage)

const paginate=(page)=>setcurrentpage(page)

   // Filters for price, rating, and sorting
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(1200);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState(""); // Sort criteria: "price", "rating", "name"

  // Store the selected item for the modal
  const [selectedItem, setSelectedItem] = useState(null); 

  useEffect(() => {
    let data = foodData;

    // Apply category filter
    if (categoryFilter !== "All") {
      data = data.filter(item => item.category === categoryFilter);
    }

    // Apply search query filter
    if (searchQuery.trim()) {
      data = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price range filter
    data = data.filter(item => item.price >= minPrice && item.price <= maxPrice);

    // Apply rating filter
    data = data.filter(item => item.rating >= minRating);

    // Apply sorting
    if (sortBy === "price") {
      data = data.sort((a, b) => a.price - b.price);
    } else if (sortBy === "rating") {
      data = data.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name") {
      data = data.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredData(data);
  }, [categoryFilter, searchQuery, minPrice, maxPrice, minRating, sortBy, foodData]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (item) => {
    setSelectedItem(item); // Set selected item when an image is clicked
    setShow(true); // Show the modal
  };

  return (
   <div id="menu-section"> <div   className='mt-5'  style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "20px" }}>
      <div  className="container">
        <h2  style={{ fontSize: '30px' }} className="text-center mb-5 font-weight-bold mt-5 ">
          FIND YOUR<span className="greentxt"> DISHES</span>
        </h2>

        {/* Search bar */}
        <div className="d-flex mb-4">
          <input
            type="text"
            className="p-2 rounded shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a dish..."
            style={{
              border: "2px solidrgb(0, 0, 0)",
              borderRadius: "20px",
              fontSize: "16px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        {/* Filter controls */}
        <div className="filters mt-4">
          <div className="row">
            {/* Price Range Filter */}
            <div className="col-md-4">
              <label>Price Range</label>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
                <span className="mx-2">-</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="col-md-4">
              <label>Minimum Rating</label>
              <select
                className="form-control"
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
              >
                <option value={0}>All Ratings</option>
                <option value={1}>1★ & above</option>
                <option value={2}>2★ & above</option>
                <option value={3}>3★ & above</option>
                <option value={4}>4★ & above</option>
              </select>
            </div>

            {/* Sort Options */}
            <div className="col-md-4">
              <label>Sort By</label>
              <select
                className="form-control"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">None</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Buttons */}
        <div className="row mt-5">
          <button onClick={() => setCategoryFilter("All")} className='headerbtn border btn w-25'>All</button>
          <button onClick={() => setCategoryFilter("Breakfast")} className='headerbtn border btn w-25'>Breakfast</button>
          <button onClick={() => setCategoryFilter("Lunch")} className='btn w-25 border headerbtn'>Lunch</button>
          <button onClick={() => setCategoryFilter("Dinner")} className='btn w-25 border headerbtn'>Dinner</button>
          <button onClick={() => setCategoryFilter("Snacks")} className='btn w-25 border headerbtn'>Snack</button>
          <button onClick={() => setCategoryFilter("Dessert")} className='btn w-25 border headerbtn'>Dessert</button>
          <button onClick={() => setCategoryFilter("Beverages")} className='btn w-25 border headerbtn'>Beverages</button>
          <button onClick={() => setCategoryFilter("Salad")} className='btn w-25 border headerbtn'>Salad</button>
        </div>

        {/* Display Dishes */}
        <div className="row mt-4">
          {currentposts.map((item) => {
            const quantity = cartitems[item.name] || 0; // Get the quantity of this item in the cart
            return (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
                <div className="card h-100 p-3" style={{ width: '100%' }}>
                  <img
                    onClick={() => handleShow(item)} // Show modal when clicked
                    src={`http://localhost:4007/images/${item.img}`}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: '150px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex justify-content-between flex-column">
                    <h5 className="card-title">{item.name}</h5>
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <p className="m-0">₹{item.price}</p>
                      <p className="m-0">{item.rating}<span style={{ color: 'yellow' }}>★</span></p>
                    </div>
                  </div>
                  <p>{item.desc.split(' ').slice(0, 5).join(' ')}...</p>

                  {/* Add to Cart Button & Cart Icon */}
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <button  onClick={() => addtocart(item.name)} className="btn btn-outline-secondary btn-sm position-relative">
                      <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                      {/* Display quantity as badge next to the cart icon */}
                      {quantity > 0 && (
                        <span className="badge bg-light text-success border position-absolute" style={{ top: '-5px', right: '-5px', fontSize: '10px' }}>
                          {quantity}
                        </span>
                      )}
                    </button>

                    {/* Position the + and - buttons to the right of the card */}
                    <div className="d-flex ms-2">
                      <button onClick={() => addtocart(item.name)} className="btn btn-sm btn-outline-success ms-2">+</button>
                      <button onClick={() => removefromcart(item.name)} className="btn btn-sm btn-outline-danger ms-2">-</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {filteredData.length > 0 ? (
  <div className="pagination">
    {/* Previous Button */}
    <button disabled={currentpage === 1} className="btn headerbtn">
      <a
        onClick={(e) => {

          const nextPage = currentpage - 1;
          paginate(nextPage); // Handle pagination
        
        }}
          href='#menu-section'
      >
        Previous
      </a>
    </button>

    {/* Page Buttons */}
    {new Array(totalpages).fill(0).map((_, index) => {
  return (
    <button key={index}>
      <a 
        href='#menu-section'
        onClick={() => paginate(index + 1)} // Handle page change
        className="btn headerbtn"
      >
        {index + 1}
      </a>
    </button>
  );
})}

    {/* Next Button */}
    <button disabled={currentpage === totalpages} className="btn headerbtn">
      <a
        onClick={(e) => {
      
          const nextPage = currentpage + 1;
          paginate(nextPage); // Handle pagination
           
        }}
            href='#menu-section'
      >
        Next
      </a>
    </button>
  </div>
) : (
  <p className="text-center mt-5 font-weight-bold">
    oops! no <span className="greentxt">dishes available</span>
  </p>
)}

 



        {/* Modal for item details */}
        {selectedItem && (
          <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title className='greentxt'>{selectedItem.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={`http://localhost:4007/images/${selectedItem.img}`}
                alt={selectedItem.name}
                className="img-fluid"
                style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
              />
              <p>{selectedItem.desc}</p>
              <p><strong>Price: ₹{selectedItem.price}</strong></p>
              <p><strong>Rating: {selectedItem.rating}<span className='text-warning'>★</span></strong></p>
            </Modal.Body>
            <Modal.Footer>
              <Button className='headerbtn' onClick={handleClose}>Close</Button>
             
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
    </div>
  );
};

export default Menu;
