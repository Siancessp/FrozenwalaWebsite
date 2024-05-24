import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../Utills/Api";

const OrderDetails = ({  }) => {
    const { orderId } = useParams(); 
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [previous_price, setPreviousPrice] = useState();
  const [total_price, setTotalPrice] = useState();
  const [discount, setDiscount] = useState();
  const [delivery, setDelivery] = useState();
  const [statustext, setStatusText] = useState();
//   const [orderId, setOrderId] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await Api.get(`invoice/?order_id=${orderId}`);
        const orderDetails = response.data.order_details[0];
        console.log("jdfg",response.data);
        setAddress(orderDetails.address);
        setCity(orderDetails.city);
        setName(orderDetails.newname);
        setDiscount(orderDetails.discounted_price);
        setDelivery(orderDetails.delivery_price);
        setState(orderDetails.state);
        setZip(orderDetails.zip_code);
        setPreviousPrice(orderDetails.previous_price);
        setStatusText(orderDetails.status);
        setTotalPrice(orderDetails.total_price);
        // setOrderId(orderDetails.order_id);
        setProducts(response.data.products);
      } catch (error) {
        console.log('Error fetching:', error);
      }
    };

    getHistory();
  }, [orderId]);

  const generatePDF = async () => {
    try {
      const config = {
        headers: {
          Accept: 'application/pdf',
        },
        responseType: 'blob',
      };

      const response = await Api.get(`generate_invoice/?order_id=${orderId}`, config);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log('Error fetching pdf:', error);
    }
  };

  let statusText, color, icon;

  if (statustext == 1) {
    statusText = 'Pending';
    color = '#FF9800';
    icon = 'clockcircleo'; 
  } else if (statustext == 2) {
    statusText = 'Confirm';
    color = '#03A9F4'; 
    icon = 'checkcircleo'; 
  } else if (statustext == 3) {
    statusText = 'Picked Up';
    color = '#4CAF50'; 
    icon = 'rocket1'; 
  } else if (statustext == 4) {
    statusText = 'Delivered';
    color = '#8BC34A'; 
    icon = 'checkcircle'; 
  } else if (statustext == 5) {
    statusText = 'Cancel';
    color = '#F44336';
    icon = 'closecircleo'; 
  } else if (statustext == 6) {
    statusText = 'Return Request';
    color = '#9E9E9E'; 
    icon = 'retweet'; 
  } else {
    statusText = 'Accepted';
    color = '#9C27B0';
    icon = 'check';
  }
  

  return (
    <div style={{ backgroundColor: 'white', flex: 1, padding: "16px" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Order Summary</h1>
        <span></span>
      </div>
      <div>
        <div style={{ flexDirection: 'row', alignItems: 'center' }}>
          <p>This Order Was <span style={{ color: color }}>{statusText}</span></p>
          {/* <AntDesign name={icon} size={16} color={color} style={{ marginLeft: 10 }} /> */}
        </div>
        {/* <p>{created_at}</p> */}
        <hr style={{ marginTop: 20 }} />
        <p style={{ color: '#FF4D00', marginTop: 10 }}>From</p>
        <p>Frozenwala</p>
        <p>{name}</p>
        <p>{address}, {city}, {state}, {zip}</p>
        <hr style={{ marginTop: 30 }} />
        <p>Bill Details</p>
        {products.map(item => (
          <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            <p>{item.name} X {item.item_quantity}</p>
            <p>₹{item.item_new_price}</p>
          </div>
        ))}
        <hr style={{ marginTop: 10, borderStyle: 'dashed' }} />
        <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
          <p>Total Items Price</p>
          <p>₹{previous_price}</p>
        </div>
        <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
          <p>Delivery Partner Fee</p>
          <p>₹{delivery}</p>
        </div>
        <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
          <p>Discount applied</p>
          <p>- ₹{discount}</p>
        </div>
        <hr style={{ marginTop: 10 }} />
        <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
          <p style={{ color: 'black', fontWeight: 'bold' }}>Payable Amount</p>
          <p style={{ color: 'black', fontWeight: 'bold' }}>₹{total_price}</p>
        </div>
      </div>
      <button style={{ backgroundColor: "white", borderRadius: 50, width: "70%", alignSelf: 'center', height: 52, justifyContent: 'center', marginTop: 30, borderWidth: 1, borderColor: "#FF4D00" }} onClick={generatePDF}>
        Generate Invoice
      </button>
    </div>
  );
};

export default OrderDetails;
