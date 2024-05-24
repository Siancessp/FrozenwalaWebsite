import React, { useState, useEffect } from "react";
import Api from "../Utills/Api";

const MyProfile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState("");
  const [profileImage, setProfileImage] = useState(null);

 

  useEffect(() => {
    const getProfile = async () => {
  const uid = localStorage.getItem("user_id");

    try {
      const response = await Api.get(`profile/?user_id=${uid}`);
      console.log("get", response.data.profile_photo);
      setPhoto(response.data.profile_photo);
      setEmail(response.data.email);
      setName(response.data.name);
      setPhone(response.data.phone_number);
      setLocation(response.data.bio);
    } catch (error) {
      console.log("Error fetching profile:", error);
    }
  }
  getProfile();
  }, []);

  const handleSubmit = async (e) => {
  const uid = localStorage.getItem("user_id");

    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("user_id", uid);
      formData.append("email", email);
      formData.append("phone_number", phone);
      formData.append("bio", location);
      if (profileImage) {
        formData.append("profile_image", profileImage);
      }
      const response = await Api.postFormdata(`profile/`, formData);
      console.log("Profile updated:", response.data);
    } catch (error) {
      console.log("Error updating profile:", error.response.data);
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  return (
    <div style={{display:"flex", justifyContent:"center", marginTop:50, marginBottom:50,}}>
      <div
        className="py-5 overflow-hidden "
        style={{
          maxWidth: "800px",
          padding: "20px",
          backgroundColor: "#FFF",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          alignSelf:"center"
        }}
      >
       
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "bold", color: "#F17228" }}>
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "16px",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "bold", color: "#F17228" }}>
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "16px",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "bold", color: "#F17228" }}>
              Phone:
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "16px",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "bold", color: "#F17228" }}>
              Location:
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "16px",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "bold", color: "#F17228" }}>
              Profile Picture:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#F17228",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "background-color 0.3s ease",
            }}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
