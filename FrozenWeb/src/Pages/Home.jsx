import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Offers from "./Home/Offers";
import How from "./Home/How";
import Popular from "./Home/Popular";
import Menu from "./Home/Menu";
import Navbar from "./Home/Navbar";
import Product from "./Home/Product";
import ParentComponent from "./Home/Parent";
import SearchByFood from "./Home/SearchByFood";
import Adv from "./Home/Adv";
import Footer from "./Home/Footer";
import Special from "./Home/Special";

function Home() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Delivery");
  const [refrest, setRefresh] = useState(true)

  const refRestCart = () =>setRefresh(!refrest)

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

 

  const uid = localStorage.getItem("user_id");
  const access = localStorage.getItem("access_token");
  console.log(access);
  return (
    <div>
      <main className="main" id="top">
        <Navbar refreshCart={refrest} />
        <section className="py-5 overflow-hidden bg-primary" id="home">
          <div className="container">
            <div className="row flex-center">
              <div className="col-md-5 col-lg-6 order-0 order-md-1 mt-8 mt-md-0">
                <a className="img-landing-banner" href="#!">
                  <img
                    className="img-fluid"
                    src="/img/gallery/hero-header.png"
                    alt="hero-header"
                  />
                </a>
              </div>
              <div className="col-md-7 col-lg-6 py-8 text-md-start text-center">
                <h1 className="display-1 fs-md-5 fs-lg-6 fs-xl-8 text-light">
                  Are you starving?
                </h1>
                <h1 className="text-800 mb-5 fs-4">
                  Within a few clicks, find meals that
                  <br className="d-none d-xxl-block" />
                  are accessible near you
                </h1>
                <div className="card w-xxl-75">
                  <div className="card-body">
                    <nav>
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button
                          className={`nav-link ${
                            activeTab === "Delivery" ? "active" : ""
                          } mb-3`}
                          onClick={() => handleTabClick("Delivery")}
                          role="tab"
                          aria-selected={activeTab === "Delivery"}
                        >
                          <i className="fas fa-motorcycle me-2"></i>Delivery
                        </button>
                        <button
                          className={`nav-link ${
                            activeTab === "Pickup" ? "active" : ""
                          } mb-3`}
                          onClick={() => handleTabClick("Pickup")}
                          role="tab"
                          aria-selected={activeTab === "Pickup"}
                        >
                          <i className="fas fa-shopping-bag me-2"></i>Pickup
                        </button>
                      </div>
                    </nav>
                    <div className="tab-content mt-3" id="nav-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="nav-home"
                        role="tabpanel"
                        aria-labelledby="nav-home-tab"
                      >
                        <form className="row gx-2 gy-2 align-items-center">
                          <div className="col">
                            <div className="input-group-icon">
                              <i className="fas fa-map-marker-alt text-danger input-box-icon"></i>

                              <input
                                className="form-control input-box form-foodwagon-control"
                                id="inputDelivery"
                                type="text"
                                placeholder="Enter Your Address"
                              />
                            </div>
                          </div>
                          <div className="d-grid gap-3 col-sm-auto">
                            <button className="btn btn-danger" type="submit">
                              Find Food
                            </button>
                          </div>
                        </form>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="nav-profile"
                        role="tabpanel"
                        aria-labelledby="nav-profile-tab"
                      >
                        <form className="row gx-4 gy-2 align-items-center">
                          <div className="col">
                            <div className="input-group-icon">
                              <i className="fas fa-map-marker-alt text-danger input-box-icon"></i>
                              <label
                                className="visually-hidden"
                                htmlFor="inputPickup"
                              >
                                Address
                              </label>
                              <input
                                className="form-control input-box form-foodwagon-control"
                                id="inputPickup"
                                type="text"
                                placeholder="Enter Your Address"
                              />
                            </div>
                          </div>
                          <div className="d-grid gap-3 col-sm-auto">
                            <button className="btn btn-danger" type="submit">
                              Find Food
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Offers />

        <How />

      <ParentComponent refRestCart={refRestCart}/>

       {/* <SearchByFood/> */}
        <Adv/>

       <Special/>

        <section className="py-0">
          <div
            className="bg-holder"
            style={{
              backgroundImage: "url(/img/gallery/cta-two-bg.png)",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>

          <div className="container">
            <div className="row flex-center">
              <div className="col-xxl-9 py-7 text-center">
                <h1 className="fw-bold mb-4 text-white fs-6">
                  Are you ready to order <br />
                  with the best deals?{" "}
                </h1>
                <a className="btn btn-danger" href="/menu" >
                  {" "}
                  PROCEED TO ORDER<i className="fas fa-chevron-right ms-2"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

       <Footer/>
      </main>
    </div>
  );
}
export default Home;
