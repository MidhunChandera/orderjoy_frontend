import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = ({ register }) => {
  const loginurl = "https://orderjoy-backend.onrender.com/api/user/login";
  const registerurl = "https://orderjoy-backend.onrender.com/api/user/register";
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const url = register ? registerurl : loginurl;
      const response = await axios.post(url, userDetails);
  
      // On success, save the token and navigate
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); 
        if (register) {
          toast.success("Registration successful! Please log in.");

          navigate("/login");
        } else {

          toast.success("Login successful!");
       
          // Navigate to home page after a short delay
          setTimeout(() => {
            navigate('/');
            window.location.reload(); // Redirect to home page
          }, 2000);
        }
      }
    } catch (err) {
      setError(
        register
          ? "Registration failed. User might already exist."
          : "Invalid email or password."
      );
    }
  };
  
  return (
    <div
      className="img-fluid "
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://wallpapers.com/images/hd/healthy-food-pictures-ooa1298olf3hm6qz.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="container mt-5">
        <div className="row mt-5">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h1 className="text-center text-light mt-5">
              {register ? "REGISTER" : "LOGIN"}
            </h1>
            <form
              className="my-5 bg-light p-5 shadow border rounded"
              onSubmit={(e) => {
                e.preventDefault(); // Prevent default form submission
                handleSubmit(); 
              }}
            >
              <h5 className="text-center">
                Welcome to <span style={{ color: "yellowgreen" }}>OrderJoy</span>
              </h5>
              <p className="text-center">
                {register
                  ? "Register to grab your food and enjoy delicious meals at your doorstep!"
                  : "Login to enjoy delicious meals at your doorstep!"}
              </p>

              {register && (
                <div className="mb-3 mt-3">
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-control"
                    value={userDetails.username}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, username: e.target.value })
                    }
                    required
                  />
                </div>
              )}

              <div className="mb-3 mt-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  value={userDetails.email}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3 mt-3">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  value={userDetails.password}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                {!register ? (
                  <div>
                    <button
                      type="submit"
                      className="btn btn-warning w-100 rounded-0"
                    >
                      Login
                    </button>
                    <p className="mt-3 text-center">
                      New User? Click here to{" "}
                      <Link to={"/register"} className="text-danger">
                        Register
                      </Link>
                    </p>
                  </div>
                ) : (
                  <div>
                    <button
                      type="submit"
                      className="btn btn-warning w-100 rounded-0"
                    >
                      Register
                    </button>
                    <p className="mt-3 text-center">
                      Already a User? Click here to{" "}
                      <Link to={"/login"} className="text-danger">
                        Login
                      </Link>
                    </p>
                  </div>
                )}
              </div>
              {error && <p className="text-danger text-center">{error}</p>}
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
