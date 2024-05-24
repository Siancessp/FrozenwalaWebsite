import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../Utills/Api";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState([]);

  const getHistory = async () => {
    try {
      const uid = localStorage.getItem("user_id");
      const response = await Api.get(`orders/?user_id=${uid}`);
      setHistoryData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching history:", error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  //   const handleButton = (order) => {
  //     if (order.status) {
  //       navigate(`/orderdetails`,{order_id:order.order_id, timeat:order.created_at});
  //     }
  //   };
  const handleButton = (order) => {
    const { order_id } = order; // Encode created_at parameter
    navigate(`/orderdetails/${order_id}/`);
  };
  return (
    <div style={{ backgroundColor: "white", flex: 1 }}>
      <div
        style={{
          padding: "16px",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            borderColor: "rgb(255, 152, 0)",
          }}
        >
          👈 go back
        </button>
        <h1>Order History</h1>
        <span></span>
      </div>

      {historyData.length === 0 ? (
        <div>No history available</div>
      ) : (
        <div>
          {historyData.map((order) => {
            let statusText, color, icon;

            if (order.status === "1") {
              statusText = "Pending";
              color = "#FF9800";
              icon = "clockcircleo";
            } else if (order.status === "2") {
              statusText = "Confirm";
              color = "#03A9F4";
              icon = "checkcircleo";
            } else if (order.status === "3") {
              statusText = "Picked Up";
              color = "#4CAF50";
              icon = "rocket1";
            } else if (order.status === "4") {
              statusText = "Delivered";
              color = "#8BC34A";
              icon = "checkcircle";
            } else if (order.status === "5") {
              statusText = "Cancel";
              color = "#F44336";
              icon = "closecircleo";
            } else if (order.status === "6") {
              statusText = "Return Request";
              color = "#9E9E9E";
              icon = "retweet";
            } else {
              statusText = "Accepted";
              color = "#9C27B0";
              icon = "check";
            }

            return (
              <div
                key={order.id}
                style={{
                  margin: "10px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                }}
                onClick={() => handleButton(order)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "5px",
                  }}
                >
                  <img
                    src="/img/gallery/Frozenwala.png"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "10px",
                    }}
                    alt="logo"
                  />
                  <div style={{ marginLeft: "5px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                        {order.order_id}
                      </span>
                    </div>
                    <p style={{ fontSize: "12px", color: "#80869A" }}>
                      {order.created_at}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#80869A",
                      }}
                    >
                      ₹{order.total_price}
                    </p>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{
                          color: color,
                          fontSize: "12px",
                          marginLeft: "5px",
                        }}
                      >
                        {statusText}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
