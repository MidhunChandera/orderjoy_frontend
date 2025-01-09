import React from "react";
import aboutimg from '../assets/about.webp'
function AboutUs() {
  return (
    <div id="about-section" className="p-3 mt-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh"  }}>
      <div className="container border p-5 mt-5">
      <h2 style={{fontSize:'30px'}} className="text-center mb-5 font-weight-bold ">ABOUT<span className="greentxt"> US</span></h2>

        <div className="row align-items-center">
     
          <div
            className="col-md-5 d-flex justify-content-center"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              className="img-fluid "
              src={aboutimg}
              alt="About Us"
           
            />
          </div>

       
          <div className="col-md-7">
            <p className="lead">
              Welcome to <strong >OrderJoy App</strong>, your trusted partner in satisfying your cravings
              and delivering happiness right to your doorstep. We’re on a mission to connect food lovers with their
              favorite restaurants and dishes, making every meal a delightful experience.
            </p>
            <p className="lead">
              Whether it’s a quick snack, a hearty meal, or a midnight craving, we’re here to ensure you enjoy a seamless
              and satisfying food delivery experience. Our app is designed to be user-friendly, efficient, and packed
              with options to cater to all your food needs.
            </p>
            <p>
              Thank you for choosing <strong>OrderJoy App</strong>. We’re excited to be part of your food
              journey and look forward to serving you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
