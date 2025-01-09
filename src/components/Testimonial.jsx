import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Testimonial() {
  const [data, setData] = useState([]);

  const getTestimonial = async () => {
    try {
      const response = await axios.post("https://orderjoy-backend.onrender.com/api/testimonial/get");
      console.log(response)
      if (response.status === 200) {
        const approvedTestimonials = response.data.filter(
          (testimonial) => testimonial.status === "Approved"
        );
        setData(approvedTestimonials);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };
  console.log(data.l);
  
  useEffect(() => {
    getTestimonial();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mb-5 mt-3">
            <h2 className="text-center mb-4 ">CLIENT<span className="greentxt"> REVIEWS</span></h2>
            <p className="text-center ">WHAT OUR CUSTOMERS SAYS</p>
      {data.length > 2 ? (
        <Slider {...sliderSettings}>
          {data.map((testimonial, index) => (
            <div key={index} className="p-3">
              <div style={{
                width: "400px", 
                minHeight: "150px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                textAlign: "center"
              }} className="card h-100 w-100">
                <div className="card-body">
                  <h5 className="card-title ">{testimonial.name}</h5>
                  <p className="card-text">{testimonial.messege}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : data.length === 2 ? (
        <div className="row justify-content-center">
          {data.map((testimonial, index) => (
            <div key={index} className="col-md-5 m-2 ">
              <div  style={{
             
                minHeight: "150px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                textAlign: "center"
              }} className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{testimonial.name}</h5>
                  <p className="card-text">{testimonial.messege}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : data.length === 1 ? (
        <div className="d-flex justify-content-center">
          <div style={{
       width:'500px',
            minHeight: "150px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            textAlign: "center"
          }} className="card  h-100">
            <div className="card-body">
              <h5 className="card-title">{data[0].name}</h5>
              <p className="card-text">{data[0].messege}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">No testimonials available.</p>
      )}
    </div>
  );
}

export default Testimonial;
