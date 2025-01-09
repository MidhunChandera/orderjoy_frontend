import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../assets/logo.png'
import { ToastContainer } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { HashLink } from "react-router-hash-link";
function Header() {
  const [active, setActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  // Toggle menu visibility
  const handleMenu = () => {
    setActive(!active);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the stored token
    setIsLoggedIn(false);
    toast.error('You have successfully logged out')
    navigate('/');
  };

  const checkToken = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkToken(); 
  }, []);

  const handleMyOrdersClick = () => {
    if (!isLoggedIn) {
      toast.info('Please login to view your orders');
      navigate('/login'); 
    } else {
      navigate('/myorders'); 
    }
  };
  const scrollWithOffset = (el) => {
    const yOffset = -70; 
    const yPosition = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: yPosition, behavior: 'smooth' });
  };
  
  return (

    <nav className="w-100">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}

        draggable

        theme="light"

      />
      <div className="logo d-flex align-items-center">
        <img
          src={logo}
          width="60px"
          alt="OrderJoy Logo"
        />
        <h4 className="ms-2 mb-0 d-none d-sm-block">Order<span className='greentxt'>Joy</span></h4>
      </div>

      <ul className={active ? 'active' : ''}>
      {/* Home Link */}
      <li className={window.location.pathname === '/' ? 'active' : ''}>
        <HashLink smooth to="/#hero-section">
          HOME
        </HashLink>
      </li>

      {/* Menu Link */}
      <li className={window.location.pathname === '/menu' ? 'active' : ''}>
        <HashLink smooth to="/menu#menu-section" scroll={scrollWithOffset}>
          MENU
        </HashLink>
      </li>

      {/* About Link */}
      <li className={window.location.pathname === '/about' ? 'active' : ''}>
        <HashLink smooth to="/about#about-section" scroll={scrollWithOffset}>
          ABOUT
        </HashLink>
      </li>

      {/* Contact Link */}
      <li className={window.location.pathname === '/contact' ? 'active' : ''}>
        <HashLink smooth to="/contact#contact-section" scroll={scrollWithOffset}>
          CONTACT
        </HashLink>
      </li>
    </ul>


      <div className="buttons">
        {/* Cart Button */}
        <HashLink scroll={scrollWithOffset}
          smooth to={isLoggedIn ? "/cart#cart-section" : "/login"}
          onClick={() => {
            if (!isLoggedIn) {
              toast.info('Please login');
            }
          }}
        >
          <button className="headerbtn">
            <FontAwesomeIcon icon={faCartShopping} /> Cart
          </button>
        </HashLink>

     
        <Dropdown>
          <Dropdown.Toggle className="headerbtn" id="dropdown-basic">
            <FontAwesomeIcon icon={faUser} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {isLoggedIn ? (
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            ) : (
              <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
            )}
            <Dropdown.Item onClick={handleMyOrdersClick}>My Orders</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="menus">
        <span onClick={handleMenu}>
          < FontAwesomeIcon icon={faBars} />
        </span>
      </div>
    </nav>
  );
}

export default Header;
