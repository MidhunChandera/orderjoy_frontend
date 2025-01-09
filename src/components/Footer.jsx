import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function Footer() {
  return (
    <>
      <div className='footer '>
        <div id='contact' className="container-fluid app-container bg-dark text-white py-5">
          <div className="row">
            <div className="col-md-2"></div>

            <div className="col-md-2 mb-4">
              <h4>Orderjoy</h4>
              <p>
                At OrderJoy, we deliver delicious meals right to your doorstep. Enjoy fresh, fast, and affordable food with every order.
              </p>
            </div>

            <div className="col-md-2 d-flex flex-column align-items-start mb-4">
              <h5>Quick Links</h5>
              <a href="/" className="text-white mb-2 hover-effect">Home</a>
              <a href="/menu" className="text-white mb-2 hover-effect">Menu</a>
              <a href="/about" className="text-white mb-2 hover-effect">About</a>
            
            </div>

            <div className="col-md-2 d-flex flex-column align-items-start mb-4">
              <h5>Help</h5>
              <a href="/privacy-policy" className="text-white mb-2 hover-effect">Privacy & Policy</a>
              <a href="/terms-of-use" className="text-white mb-2 hover-effect">Terms of Use</a>
              <p>Contact Us: <a href="tel:+1234567890" className="text-white">+1 (234) 567-890</a></p>
            </div>

            <div className="col-md-2 mb-4">
              <h5>Follow Us</h5>
              <div className="d-flex gap-3">
                <a target='_blank' href="https://facebook.com" className="text-white hover-icon">
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a target='_blank' href="https://twitter.com" className="text-white hover-icon">
                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
                <a target='_blank' href="https://instagram.com" className="text-white hover-icon">
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <a target='_blank' href="https://www.youtube.com/" className="text-white hover-icon">
                  <FontAwesomeIcon icon={faYoutube} size="2x" />
                </a>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>

          {/* Footer Bottom */}
          <div className="text-center mt-5">
            <p className="small">&copy; 2024 OrderJoy. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
