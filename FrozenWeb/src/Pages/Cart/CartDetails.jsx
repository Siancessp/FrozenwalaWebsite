import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import Api from "../Utills/Api";
import { useNavigate } from "react-router-dom";

function CartDetails() {
  const navigate = useNavigate();

  const [couponApplied, setCouponApplied] = useState(false);
  const [walletApplied, setWalletApplied] = useState(false);

  const uid = localStorage.getItem("user_id");
  const [getProduct, setGetProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [discountPrice, setDiscount] = useState(0);
  const [previousPrice, setPreviousPrice] = useState(0);
  const [walletValue, setWalletValue] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [walletBalance, setWalletBalance] = useState();

  const getProducts = async () => {
    try {
      const response = await Api.get(`get_cart/?user_id=${uid}`);
      setGetProduct(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    getTotalPrice();
    getProducts();
  }, []);

  const getTotalPrice = async () => {
    try {
      const response = await Api.get(`get_total_price/?user_id=${uid}`);
      setTotalPrice(response.data.total_price);
      setDeliveryCharge(response.data.delivery_charge);
      setDiscount(response.data.discounted_price);
      setPreviousPrice(response.data.previous_price);
      setWalletValue(response.data.wallet_value);
    } catch (error) {
      console.log("Error fetching total price:", error);
    }
  };

  const removeItemFromCart = async (itemId) => {
    try {
      await Api.remove(`remove-cart-item/?cart_id=${itemId}`);
      window.location.reload();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const subOne = async (id) => {
    try {
      await Api.post(`decrease/`, { cart_id: id });
      window.location.reload();
    } catch (error) {
      console.log("Error decreasing:", error);
    }
  };

  const addOne = async (id) => {
    try {
      await Api.post(`increase/`, { cart_id: id });
      window.location.reload();
    } catch (error) {
      console.log("Error increasing:", error);
    }
  };

  const applyCoupon = async () => {
    try {
      if (uid && couponCode) {
        await Api.post(`send_coupon/`, {
          coupon: couponCode,
          user_id: uid,
        });
        window.location.reload();
        setCouponApplied(true);
      } else {
        console.log("User ID or Coupon Code missing.");
      }
    } catch (error) {
      console.log("Error applying coupon:", error);
    }
  };

  const applyWallet = async () => {
    try {
      await Api.post(`save_wallet_transaction/`, {
        user_id: uid,
      });
      window.location.reload();
      setWalletApplied(true);
    } catch (error) {
      console.log("Error applying wallet:", error);
    }
  };

  useEffect(() => {
    const getWalletBalance = async () => {
      try {
        const response = await Api.get(`wallet/?user_id=${uid}`);
        setWalletBalance(response.data.wallet_value);
      } catch (error) {
        console.log("Error fetching wallet balance:", error);
      }
    };
    getWalletBalance();
  }, []);

  const checkoutNow = () => {
    navigate("/checkout");
  };

  return (
    <div>
      <Navbar />
      <main
        className="main"
        id="top"
        style={{ paddingTop: "70px", display: "flex" , justifyContent:"space-around", flexWrap: "wrap", margin:50 }}
      >
        <div style={{ flex: "1", marginRight: "20px" }}>
          <h2>Your Cart</h2>
          <div
            style={{
              flex: 1,
            minWidth: "400px",
            maxWidth: "600px",
            borderRadius: "10px",
            marginBottom: "130px",
            padding:"50px 10px 10px 10px"
            }}
          >
            {getProduct.map((item) => (
              <div
                key={item.id}
                style={{
                  minWidth: "20%",
                  margin: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src={`http://app.frozenwala.com/media/${item.product_image}`}

                  alt={item.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginRight: "20px", borderRadius:"10px 0px 0px 10px"
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          marginTop: 2,
                        }}
                      >
                        {item.product_name}
                      </h3>
                      <p style={{ color: "#888", marginBottom: "5px" }}>
                        Price: ₹{item.price}
                      </p>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <button onClick={() => subOne(item.id)}>−</button>
                        <span style={{ margin: "0 10px" }}>
                          {item.quantity}
                        </span>
                        <button onClick={() => addOne(item.id)}>+</button>
                      </div>
                    </div>
                   
                  </div>
                
                </div>
                <button
                      onClick={() => removeItemFromCart(item.id)}
                      style={{
                        backgroundColor: "#F17228",
                        color: "white",
                        border: "none",
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                      }}
                    >
                      Remove
                    </button>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            flex: "1",
            paddingLeft: "20px",
            minWidth: 300,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              style={{
                width: "70%",
                height: 40,
                borderRadius: 10,
                paddingInline: 10,
              }}
            />
            <button
              onClick={applyCoupon}
              className="badge bg-danger p-2 fas fa-tag me-2"
              style={{ borderWidth: 0, height: 40 }}
            >
              Apply Coupon
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <div>
              <h6>Wallet Balance</h6>
              <p>₹{walletBalance}</p>
            </div>
            <button
              onClick={applyWallet}
              className="badge bg-danger p-2 fas fa-tag me-2"
              style={{ borderWidth: 0, height: 40, marginLeft: 20 }}
            >
              Apply Wallet Balance
            </button>
          </div>
          <div
            style={{
              marginTop: "5px",
              borderTop: "1px solid #ccc",
            }}
          >
            <div
              style={{
                marginTop: 5,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p style={{ marginInlineEnd: "10px" }}>Total Price:</p>
              <span style={{ fontWeight: "bold" }}>₹{previousPrice}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ marginInlineEnd: "10px" }}>Delivery Charges:</p>
              <span style={{ fontWeight: "bold" }}>₹{deliveryCharge}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ marginInlineEnd: "10px" }}>Discounted Price:</p>
              <span style={{ fontWeight: "bold" }}>₹{discountPrice}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ marginInlineEnd: "10px" }}>Wallet Discount:</p>
              <span style={{ fontWeight: "bold" }}>₹{walletValue}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ marginInlineEnd: "10px", fontWeight: "bold" }}>
                Payable Amount:
              </p>
              <span style={{ fontWeight: "bold" }}>₹{totalPrice}</span>
            </div>
            <button
              onClick={checkoutNow}
              style={{
                backgroundColor: "#F17228",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "10px 20px",
                marginTop: "20px",
                cursor: "pointer", // Adding cursor style for better usability
              }}
            >
              Proceed To Pay
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CartDetails;
