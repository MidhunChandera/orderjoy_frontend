import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Auth from './pages/Auth';
import Verify from './pages/Verify';
import Myorders from './pages/Myorders';
import About from './pages/About';
import Contactus from './pages/Contactus';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

function App() {
  return (
    <>
      <Header />
      
      {/* ToastContainer is placed here to catch all toast notifications */}
      <ToastContainer position="bottom-right" autoClose={3000} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contactus />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Order />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/myorders' element={<Myorders />} />
        <Route path='/login' element={<Auth register={false} />} />
        <Route path='/register' element={<Auth register={true} />} />
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;
