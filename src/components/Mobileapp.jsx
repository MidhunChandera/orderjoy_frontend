import React from 'react';
import mobileimg from '../assets/mobileapp.avif'

function Mobileapp() {
  return (
    <div style={{ backgroundColor: "#f0f0f0" }} className="container-fluid">
      <div className="mobileapp-content container-fluid rounded p-5">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-4">
            <img
              className="app-image img-fluid"
              src={mobileimg}
              alt="Seamless food ordering experience illustration"
            />
          </div>
          <div className="col-md-5 d-flex justify-content-center flex-column mt-5">
            <h1 className="mb-2  ">Download<span className='greentxt'> App</span></h1>
            <h3>Download our app and enjoy an exclusive 20% discount on your first order!</h3>
            <p className="mt-2 mb-4">
              Download the app from <strong>Playstore</strong> or the <strong>App Store</strong> for a seamless experience!
            </p>
            <p>
              With our app, you can explore exclusive offers, track your orders, and enjoy a personalized experience—all at your fingertips.
            </p>
            <div className="d-flex mt-3">
              <a target='_blank' href='https://play.google.com/store/games?hl=en'>   <img
                width={'180px'}
                className="img-fluid ms-0"
                src="https://b.zmtcdn.com/data/webuikit/23e930757c3df49840c482a8638bf5c31556001144.png"
                alt="Playstore Logo"
              /></a>
              <a target='_blank' href='https://www.apple.com/in/app-store/'>  <img
                width={'180px'}
                className="img-fluid ms-2"
                src="https://b.zmtcdn.com/data/webuikit/9f0c85a5e33adb783fa0aef667075f9e1556003622.png"
                alt="App Store Logo"
              /></a>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  );
}

export default Mobileapp;
