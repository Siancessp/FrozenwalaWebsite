import React, { useState } from "react";
import Sidebar from "../Profile/Sidebar";
import MainContent from "../Profile/MainContent";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";

const App = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <div>
      <Navbar />
      <div>
        <main className="main" id="top" style={{ paddingTop: "60px" }}>
          <div style={{ display: "flex" }}>
            <Sidebar
              activeButton={activeButton}
              onButtonClick={handleButtonClick}
            />
            <MainContent activeButton={activeButton} />
          </div>
          <Footer />
        </main>
      </div>
     
    </div>
  );
};

export default App;
