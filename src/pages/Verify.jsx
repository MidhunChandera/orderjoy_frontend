import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Verify() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true); // Add a loading state
  const success = searchParams.get("success");
  const orderId = searchParams.get('orderId');
  const navigate = useNavigate();

  console.log('Success:', success, 'OrderId:', orderId);

  const verifyPayment = async () => {
    try {
      const response = await axios.post('http://localhost:4007/api/order/verify', { success, orderId });

      console.log('Response:', response.data);

      if (response.data.success) {
        toast.success('Payment successful! Thank you!');
        setTimeout(() => {
          navigate('/myorders'); // Redirect to orders page on successful payment
        }, 1500);
      } else {
        toast.error('Payment failed, try again!');
        setTimeout(() => {
          navigate('/cart'); // Redirect to cart for retry
        }, 1000);
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      toast.error('Payment failed. Please try again.');
      setTimeout(() => {
        navigate('/'); // Redirect to home page after delay
      }, 2000);
    } finally {
      setLoading(false); // Stop loading after processing
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [success, orderId]);

  return (
    <>
    <div  className='mt-5' style={{ backgroundColor: "white", minHeight: "100vh", padding: "20px" }}>  {loading ? (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          backgroundColor:'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
         color:'black',
            zIndex: 1000,
          }}
        >
          <div className='d-flex justify-content-center align-items-center flex-column'>
            <div  className="spinner-border  text-dark mb-3" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p>Verifying payment, please wait...</p>
          </div>
        </div>
      ) : (
        <div className="text-center mt-5">
          <p>Redirecting...</p>
        </div>
      )}</div>
    </>
  );
}

export default Verify;
