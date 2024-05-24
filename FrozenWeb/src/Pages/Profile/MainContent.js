// MainContent.js

import React from "react";
import MyProfile from "./MyProfile";
import Logout from "./Logout";
import OrderHistory from "./OrderHistory";

const MainContent = ({ activeButton }) => {
  const getPageContent = () => {
    switch (activeButton) {
      case 1:
        return <div><MyProfile/></div>;
      case 2:
        return <div><OrderHistory/></div>;
      case 3:
        return <div><Logout/></div>;
      default:
        return <div><MyProfile/></div>;
    }
  };

  return <div style={{ flexGrow: 1, padding: "20px" }}>{getPageContent()}</div>;
};

export default MainContent;
