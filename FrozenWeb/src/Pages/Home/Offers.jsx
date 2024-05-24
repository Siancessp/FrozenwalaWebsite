import React, { useEffect, useState } from 'react';
import Api from '../Utills/Api';

function Offers() {
  const [getProduct, setGetProduct] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const getOffer = async () => {
    try {
      const response = await Api.get('couponlist/');
      console.log("yoyo", response.data);
      setGetProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    getOffer();
  }, []);

  return (
    <div>
      <section className="py-0">
        <div className="container">
          {/* Show loading spinner if data is being fetched */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="row h-100 gx-2 mt-7">
              {getProduct.map(offer => (
                <div key={offer.id} className="col-sm-6 col-lg-3 mb-3 mb-md-0 h-100 pb-4">
                  <a href={`/offer-details/${offer.id}`}>
                    <div className="card card-span h-100">
                      <div className="position-relative">
                        <img className="img-fluid rounded-3 w-100" src={`https://app.frozenwala.com/${offer.image}`} alt={offer.coupon} />
                        <div className="card-actions">
                          <div className="badge badge-foodwagon bg-primary p-4">
                            <div className="d-flex flex-between-center">
                              <div className="text-white fs-7">{offer.coupon_value}</div>
                              <div className="d-block text-white fs-2">
                                % <br />
                                <div className="fw-normal fs-1 mt-2">Off</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body px-0">
                        <h5 className="fw-bold text-1000 text-truncate">{offer.coupon}</h5>
                        <span className="badge bg-soft-danger py-2 px-3">
                          <span className="fs-1 text-danger">{offer.time_remaining}</span>
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Offers;
