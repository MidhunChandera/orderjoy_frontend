import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Contactus() {
    const [data, setData] = useState({
        name: "",
        email: "",
        messege: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.name || !data.email || !data.messege) {
            alert('All fields are required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4007/api/testimonial/add', data);
            console.log(response);
         if(response.status=='200'){
            toast.success('Testimonial submitted successfully')
            setData({
                name: "",
                email: "",
                messege: ""
            })
         }
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };

    return (
        <>
        <div id='contact-section'>
            <div className="p-3 mt-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
                <div className="container mt-3 p-5">
                    <div className="row">
                        <div className="col-md-6 d-flex flex-column">
                            <h1>GET IN <span className='greentxt'>TOUCH</span></h1>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga fugit quod, porro quia aliquam ea,
                                quo id voluptatum maiores totam voluptas modi nemo excepturi consectetur cumque molestias nulla
                                architecto repellat?
                            </p>
                            <h5>Address:</h5>
                            <p>
                                OrderJoy Restaurant <br />
                                123 Tasty Avenue <br />
                                Foodie City, FL 12345
                            </p>
                            <h5>Email: orderjoy@gmail.com</h5>
                            <h5>Phone: +1 (234) 567-890</h5>
                            <hr />
                            <h5>Follow<span className="greentxt"> Us</span></h5>
                            <div className="d-flex gap-3">
                                <a target="_blank" rel="noreferrer" href="https://facebook.com" className=" hover-icon">
                                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                                </a>
                                <a target="_blank" rel="noreferrer" href="https://twitter.com" className="hover-icon">
                                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                                </a>
                                <a target="_blank" rel="noreferrer" href="https://instagram.com" className=" hover-icon">
                                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                                </a>
                                <a target="_blank" rel="noreferrer" href="https://www.youtube.com/" className=" hover-icon">
                                    <FontAwesomeIcon icon={faYoutube} size="2x" />
                                </a>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-4 mt-2">
                            <form className="p-4 border rounded shadow" onSubmit={handleSubmit}>
                                <h3 className="text-center mb-4">Client Testimonial</h3>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        value={data.name}
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter your name"
                                        aria-label="Name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        value={data.email}
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter your email"
                                        aria-label="Email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea
                                        value={data.messege}
                                        onChange={(e) => setData({ ...data, messege: e.target.value })}
                                        className="form-control"
                                        id="message"
                                        rows="3"
                                        placeholder="Write your testimonial"
                                        aria-label="Message"
                                    ></textarea>
                                </div>
                                <button
                                    style={{ backgroundColor: 'yellowgreen' }}
                                    type="submit"
                                    className="btn w-100"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div></div>
        </>
    );
}

export default Contactus;
