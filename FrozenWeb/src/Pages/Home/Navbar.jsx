import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Api from '../Utills/Api';

function Navbar({refreshCart}) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [cartValue, setCartValue] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    setIsLoggedIn(!!userId);
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/profile"); 
    } else {
      navigate("/login");
    }
  };

  const handleClickCart = () => {
    if (isLoggedIn) {
      navigate("/cart"); 
    } else {
      navigate("/login");
    }
  };

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  const getCartNumber = async () => {
    const uid = localStorage.getItem("user_id");
    try {
      const response = await Api.get(
        `unique-product-count/?user_id=${uid}`
      );
      setCartValue(response.data.unique_product_count);
    } catch (error) {
      console.error("Error fetching cart value:", error);
    }
  };

  useEffect(()=>{
    console.log('refres', refreshCart);
  },[refreshCart])

  useEffect(() => {
    getCartNumber()
  }, [refreshCart]);

 

  return (
    <div>
        <nav
          className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
          data-navbar-on-scroll="data-navbar-on-scroll"
        >
          <div className="container">
            <a
              className="navbar-brand d-inline-flex"
              href="http://app.frozenwala.com/"
            >
              <img
                className="d-inline-block"
                style={{height:"50px"}}
                src="/img/gallery/Frozenwala.png"
                alt="logo"
              />
              <span className="text-1000 fs-3 fw-bold ms-2 text-gradient">
                Frozenwala Food
              </span>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleNavbar}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${navbarOpen ? 'show' : ''}`} style={{justifyContent:"end"}}>
              <form className="d-flex mt-4 mt-lg-0 ms-lg-auto ms-xl-0">
                <button
                  className="btn btn-white shadow-warning text-warning"
                  type="button"
                  onClick={handleClick}
                  style={{
                    
                  }}
                >
                  <i className="fas fa-user me-2" ></i>
                  <text style={{color: isLoggedIn ? '#66ff33' : '',}}>{isLoggedIn ? 'User' : 'Login'}</text>
                </button>
                <button
                  className="btn btn-white  text-warning"
                  type="button"
                  onClick={handleClickCart}
                >
                  <FaShoppingCart fontSize="24px" />
                  <i className="fas fa-user me-2"></i>{cartValue}
                </button>
              </form>
            </div>
          </div>
        </nav>
    </div>
  )
}

export default Navbar;
