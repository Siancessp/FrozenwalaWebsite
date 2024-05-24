import React, { useEffect, useState } from "react";
import Api from "../Utills/Api";

const Sidebar = ({ activeButton, onButtonClick }) => {
  const buttons = [
    { id: 1, label: "My Profile" },
    { id: 2, label: "Order History" },
    { id: 3, label: "Log Out" },
  ];
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    const getProfile = async () => {
  const uid = localStorage.getItem("user_id");

      try {
        const response = await Api.get(`profile/?user_id=${uid}`);
        setPhoto(response.data.profile_photo);
        setName(response.data.name);
      } catch (error) {
        console.log("Error fetching profile:", error);
        // Handle error here
      } finally {
        setLoading(false);
      }
    };
  
    getProfile();
  }, []);
  
  return (
    <div
      style={{
        width: "300px",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        marginLeft: "20px",
        marginRight: "20px",
      }}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div style={{ textAlign: "center" }}>
            <img
              src={
                photo ||
                "https://icon-library.com/images/icon-for-profile/icon-for-profile-27.jpg"
              }
              alt="Profile"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <h2 style={{ color: "rgb(255, 152, 0)", margin: "10px 0" }}>{name}</h2>
          </div>
          <hr style={{ borderTop: "1px solid #ddd", margin: "20px 0" }} />
          <div>
            {buttons.map((button) => (
              <button
                key={button.id}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  textAlign: "left",
                  border: "none",
                  borderRadius: "5px",
                  marginBottom: "10px",
                  backgroundColor:
                    button.id === activeButton ? "rgb(255, 152, 0)" : "#eee",
                  color: button.id === activeButton ? "#fff" : "#333",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onClick={() => onButtonClick(button.id)}
              >
                {button.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
