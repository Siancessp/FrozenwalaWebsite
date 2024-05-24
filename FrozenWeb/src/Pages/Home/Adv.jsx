import React from 'react'

function Adv() {
  return (
    <div>
        <section>
          <div
            className="bg-holder"
            style={{
              backgroundImage: "url(/img/gallery/cta-one-bg.png)",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>

          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xxl-10">
                <div
                  className="card card-span shadow-warning"
                  style={{ borderRadius: 35 }}
                >
                  <div className="card-body py-5">
                    <div className="row justify-content-evenly">
                      <div className="col-md-3">
                        <div className="d-flex d-md-block d-xl-flex justify-content-evenly justify-content-lg-between">
                          <img
                            src="/img/icons/discounts.png"
                            width="100"
                            alt="..."
                          />
                          <div className="d-flex d-lg-block d-xl-flex flex-center">
                            <h2 className="fw-bolder text-1000 mb-0 text-gradient">
                              Daily
                              <br className="d-none d-md-block" />
                              Discounts{" "}
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 hr-vertical">
                        <div className="d-flex d-md-block d-xl-flex justify-content-evenly justify-content-lg-between">
                          <img
                            src="/img/icons/live-tracking.png"
                            width="100"
                            alt="..."
                          />
                          <div className="d-flex d-lg-block d-xl-flex flex-center">
                            <h2 className="fw-bolder text-1000 mb-0 text-gradient">
                              Live Tracking
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 hr-vertical">
                        <div className="d-flex d-md-block d-xl-flex justify-content-evenly justify-content-lg-between">
                          <img
                            src="/img/icons/quick-delivery.png"
                            width="100"
                            alt="..."
                          />
                          <div className="d-flex d-lg-block d-xl-flex flex-center">
                            <h2 className="fw-bolder text-1000 mb-0 text-gradient">
                              Quick Delivery{" "}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row flex-center mt-md-8">
              <div
                className="col-lg-5 d-none d-lg-block"
                style={{ marginBottom: 135 }}
              >
                <img
                  className="w-100"
                  src="/img/gallery/phone-cta-one.png"
                  alt="..."
                />
              </div>
              <div className="col-lg-5 mt-7 mt-md-0">
                <h1 className="text-primary">Install the app</h1>
                <p>
                  It's never been easier to order food. Look for the finest{" "}
                  <br className="d-none d-xl-block" />
                  discounts and you'll be lost in a world of delectable food.
                </p>
                <a
                  className="pe-2"
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                >
                  <img src="/img/gallery/app-store.svg" width="160" alt="" />
                </a>
                <a href="https://play.google.com/store/apps" target="_blank">
                  <img src="/img/gallery/google-play.svg" width="160" alt="" />
                </a>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Adv