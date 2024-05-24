import React, { useEffect, useState } from "react";
import Api from "../Utills/Api";
import Footer from "../Home/Footer";
import Navbar from "../Home/Navbar";
import { useNavigate } from "react-router-dom";
import useRazorpay from "react-razorpay";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [Razorpay] = useRazorpay();
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedPickup, setSelectedPickup] = useState("");
  const uid = localStorage.getItem("user_id");
  const [getProduct, setGetProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [discountPrice, setDiscount] = useState(0);
  const [previousPrice, setPreviousPrice] = useState(0);
  const [walletValue, setWalletValue] = useState(0);
  const [walletBalance, setWalletBalance] = useState();
  const [couponCode, setCouponCode] = useState("");
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });

  const getProducts = async () => {
    try {
      const response = await Api.get(`get_cart/?user_id=${uid}`);
      setGetProduct(response.data);
    } catch (error) {
      console.log("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    getTotalPrice();
    getProducts();
    getWalletBalance();
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

  const applyCoupon = async () => {
    try {
      if (uid && couponCode) {
        await Api.post(`apply_coupon/`, { coupon: couponCode, user_id: uid });
        window.location.reload();
      } else {
        console.log("User ID or Coupon Code missing.");
      }
    } catch (error) {
      console.log("Error applying coupon:", error);
    }
  };

  const applyWallet = async () => {
    try {
      await Api.post(`apply_wallet/`, { user_id: uid });
      window.location.reload();
    } catch (error) {
      console.log("Error applying wallet:", error);
    }
  };

  let razorpayKeyId = "rzp_test_enEwAJBwuY35MP";
  let razorpayKeySecret = "GDMhskdQyL9mC1OohkGJAoKC";

  const handlePayment = async () => {
    const { name, phone, address, city, state, country, zip } = addressInfo;

    if (
      deliveryOption === "delivery" &&
      (!name ||
        !phone ||
        !address ||
        !city ||
        !state ||
        !country ||
        !zip ||
        !selectedOption)
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      const bodyData = {
        user_id: uid,
        total_amount: totalPrice,
        newname: name,
        address,
        city,
        state,
        country,
        zip_code: zip,
        phone,
        delivery_time: selectedOption,
        coupon_code: couponCode,
        walet_value: walletValue,
        delivery_price: deliveryCharge,
        discounted_price: discountPrice,
        previous_price: previousPrice,
        pick_up: 0,
      };

      const response = await Api.post("create_order/", bodyData);

      if (response.data.status === "success") {
        const options = {
          currency: "INR",
          key: razorpayKeyId,
          amount: totalPrice * 100,
          name: "Cart",
          order_id: response.data.razorpay_order_id,
          handler: async function (response) {
            const bodyData = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };

            console.log("Payment success:", bodyData);

            const verify = await Api.post("verify_payment/", bodyData);

            navigate("/home");
          },
          theme: { color: "#F37254" },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
          window.location.reload();
        });

        rzp1.open();
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      console.error("Payment error:", error);
      // alert(Error: ${error.message});
    }
  };

  const handlePickupPayment = async () => {
    if (
      deliveryOption === "pickup" && !selectedPickup
    ) {
      alert("Please select any time.");
      return;
    }
    try {
      const bodyData = {
        user_id: uid,
        total_amount: totalPrice,
        delivery_time: selectedPickup,
        coupon_code: couponCode,
        delivery_price: deliveryCharge,
        discounted_price: discountPrice,
        previous_price: previousPrice,
        pick_up: 1,
        walet_value: walletValue,
      };
      console.log(bodyData);
      const response = await Api.post(`create_order/`, bodyData);
      console.log(response.data);
        if (response.data.status === 'success') {
          const options = {
            currency: 'INR',
            key: razorpayKeyId,
            amount: totalPrice * 100,
            name: 'Cart',
            order_id: response.data.razorpay_order_id,
            handler:async function (response){
              const bodyData = {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              };

              console.log("Payment success:", bodyData);

              const verify = await Api.post('verify_payment/', bodyData);

                navigate("/home");

          },
            theme: { color: '#F37254' },
          };

          const rzp1 = new Razorpay(options);

          rzp1.on("payment.failed", function (response) {

       window.location.reload()

          });

          rzp1.open();
        } else {
          throw new Error('Failed to create order');
        }
    } catch (error) {
      console.error("Payment error:", error);
      // alert(Error: ${error.message});
    }
  };

  const getWalletBalance = async () => {
    try {
      const response = await Api.get(`wallet/?user_id=${uid}`);
      setWalletBalance(response.data.wallet_value);
    } catch (error) {
      console.log("Error fetching wallet balance:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  const handlePickupOption = (option) => {
    setSelectedPickup(option);
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: 100,
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "300px",
            maxWidth: "500px",
            border: "1px solid rgba(0, 0, 0, 0.125)",
            borderRadius: "10px",
            marginBottom: "130px",
          }}
        >
          <h3
            style={{
              backgroundColor: "#f8f8f8",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              padding: 10,
              borderBottom: "1px solid rgba(0, 0, 0, 0.125)",
            }}
          >
            Customer Details
          </h3>
          <div style={{ paddingInline: 30 }}>
            <button
              onClick={() => setDeliveryOption("delivery")}
              style={{
                marginRight: "10px",
                padding: "8px 15px 8px 15px",
                borderWidth: "0px",
                borderRadius: "10px 10px 0px 0px",
                backgroundColor:
                  deliveryOption === "delivery" ? "#FF4D00" : "inherit",
                color: deliveryOption === "delivery" ? "white" : "inherit",
              }}
            >
              Delivery
            </button>
            <button
              onClick={() => setDeliveryOption("pickup")}
              style={{
                padding: "8px 15px 8px 15px",
                borderWidth: "0px",
                borderRadius: "10px 10px 0px 0px",
                backgroundColor:
                  deliveryOption === "pickup" ? "#FF4D00" : "inherit",
                color: deliveryOption === "pickup" ? "white" : "inherit",
              }}
            >
              Pickup
            </button>
          </div>
          {deliveryOption === "delivery" && (
            <div
              style={{
                backgroundColor: "#FFFEFE",
                minHeight: "10px",
                padding: "20px",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
            >
              <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>
                Add New Address
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                {Object.entries(addressInfo).map(([key, value]) => (
                  <input
                    key={key}
                    type="text"
                    name={key}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    style={{
                      marginBottom: "10px",
                      padding: "5px",
                      border: "0 solid #E0E0E0",
                      backgroundColor: "#f8f8f8",
                      borderRadius: 5,
                    }}
                    value={value}
                    onChange={handleChange}
                  />
                ))}
                <div style={{ marginTop: 10 }}>
                  <h6>Select Delivery Timing:</h6>
                  <label style={{ marginRight: "10px" }}>
                    <input
                      type="radio"
                      name="options"
                      value="Within 1hr"
                      checked={selectedOption === "Within 1hr"}
                      onChange={() => handleOptionChange("Within 1hr")}
                    />
                    Within 1hr
                  </label>
                  <label style={{ marginRight: "10px" }}>
                    <input
                      type="radio"
                      name="options"
                      value="1-3 hrs"
                      checked={selectedOption === "1-3 hrs"}
                      onChange={() => handleOptionChange("1-3 hrs")}
                    />
                    1-3 hrs
                  </label>
                </div>
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#FF4D00",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "30px",
                  }}
                  onClick={handlePayment}
                  // disabled={
                  //   deliveryOption === "delivery" &&
                  //   (!addressInfo.name ||
                  //     !addressInfo.phone ||
                  //     !addressInfo.address ||
                  //     !addressInfo.city ||
                  //     !addressInfo.state ||
                  //     !addressInfo.country ||
                  //     !addressInfo.zip ||
                  //     !selectedOption)
                  // }
                >
                  Proceed to pay
                </button>
              </div>
            </div>
          )}
          {deliveryOption === "pickup" && (
            <div
              style={{
                backgroundColor: "white",
                minWidth: "300px",
                maxWidth: "500px",
                padding: "20px",
              }}
            >
              <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>
                Select Pickup Timing
              </h2>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", fontWeight: "600" }}>
                  <input
                    type="radio"
                    name="pickupTime"
                    value="Within 1hr"
                    checked={selectedPickup === "Within 1hr"}
                    onChange={() => handlePickupOption("Within 1hr")}
                    style={{ marginRight: "5px" }}
                  />
                  Within 1hr
                </div>
                <div
                  style={{ display: "flex", fontWeight: "600", marginTop: 20 }}
                >
                  <input
                    type="radio"
                    name="pickupTime"
                    value="1hr-3hrs"
                    checked={selectedPickup === "1hr-3hrs"}
                    onChange={() => handlePickupOption("1hr-3hrs")}
                    style={{ marginRight: "5px" }}
                  />
                  1hr-3hrs
                </div>
              </div>
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#FF4D00",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "30px",
                }}
                onClick={handlePickupPayment}
                // disabled={deliveryOption === "pickup" && !selectedPickup}
              >
                Proceed to pay
              </button>
            </div>
          )}
        </div>

        <div style={{ flex: 1, minWidth: 300, maxWidth: 500 }}>
          <h3>Items</h3>
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
              <div style={{ display: "flex", width: "60%", borderRadius: 10 }}>
                <img
                  src={`https://app.frozenwala.com/media/${item.product_image}`}
                  alt={item.name}
                  style={{ width: "70px", aspectRatio: 1, borderRadius: 10 }}
                />
                <div style={{ marginLeft: 10 }}>
                  <h3
                    style={{
                      fontSize: "12px",
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
                  <p style={{ color: "#888", fontSize: "12px" }}>
                    Price: ₹{item.price}
                  </p>
                </div>
              </div>
              <span style={{ paddingInline: "20px", marginTop: 10 }}>
                QTY {item.quantity}
              </span>
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
          <div
            style={{
              flex: 1,
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              minWidth: 300,
            }}
          >
            <h5>Price Summary</h5>
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
