import React, { useEffect, useState } from "react";
import Api from "../Utills/Api";

function Product({ categoryId, refreshCart }) {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [stock, setStock] = useState({});
  const uid = localStorage.getItem("user_id");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await Promise.all([getProducts(), getCartItems(), getStock()]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (categoryId) {
      getProducts(categoryId);
    }

    else {
      getAllProducts();
    }
  }, [categoryId]);

  const getProducts = async (categoryId) => {
    console.log(categoryId);
    try {
      const response = await Api.get(
        `category/product-all/?category_id=${categoryId}`
      );
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const getAllProducts = async () => {
    try {
      const response = await Api.get(`product-all/`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };


  const getCartItems = async () => {
    try {
      const response = await Api.get(`get_cart/?user_id=${uid}`);
      const cartItemsMap = {};
      response.data.forEach(item => {
        cartItemsMap[item.product_id] = item.quantity;
      });
      setCartItems(cartItemsMap);
    } catch (error) {
      console.log("Error fetching cart items:", error);
    }
  };

  const getStock = async () => {
    try {
      const response = await Api.get(`stock/`);
      const stockMap = {};
      response.data.forEach(item => {
        stockMap[item.product_id] = item.openingstock;
      });
      setStock(stockMap);
    } catch (error) {
      console.log("Error getting stock:", error);
    }
  };

  const onPressAddToCart = async (productId) => {
    try {
      const response = await Api.post(`add_to_cart/`, {
        product_id: productId,
        u_id: uid,
      });
      refreshCart();
      console.log("Product added to cart:", response.data);
      setCartItems(prevCartItems => ({
        ...prevCartItems,
        [productId]: (prevCartItems[productId] || 0) + 1
      }));
    } catch (error) {
      console.log("Error adding product to cart:", error);
    }
  };

  const addOne = async (productId) => {
    try {
      if (stock[productId] > cartItems[productId]) {
        const response = await Api.post(`increase/main/`, {
          product_id: productId,
          user_id: uid,
        });
        setCartItems(prevCartItems => ({
          ...prevCartItems,
          [productId]: (prevCartItems[productId] || 0) + 1
        }));
        console.log("Quantity increased:", response.data);
      } else {
        console.log("Only", stock[productId], "available. You cannot add more");
      }
    } catch (error) {
      console.log("Error increasing quantity:", error);
    }
  };

  const subOne = async (productId) => {
    try {
      if (cartItems[productId] > 1) {
        const response = await Api.post(`decrease/main/`, {
          product_id: productId,
          user_id: uid,
        });
        setCartItems(prevCartItems => ({
          ...prevCartItems,
          [productId]: prevCartItems[productId] - 1
        }));
        console.log("Quantity decreased:", response.data);
      } else {
        const response = await Api.post(`decrease/main/`, {
          product_id: productId,
          user_id: uid,
        });
        setCartItems(prevCartItems => {
          const updatedCartItems = { ...prevCartItems };
          delete updatedCartItems[productId];
          return updatedCartItems;
        });
        console.log("Quantity decreased:", response.data);
      }
      refreshCart();
    } catch (error) {
      console.log("Error decreasing quantity:", error);
    }
  };

  return (
    <div>
      <section id="testimonial">
        <div className="container">
          <div className="row gx-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="col-sm-6 col-md-4 col-lg-3 h-100 mb-5"
              >
                <div style={{ width: "90%" }}>
                  <div style={{ position: "relative", width: "100%" }}>
                    <img
                      style={{
                        aspectRatio: 1,
                        width: "100%",
                        borderRadius: 20,
                      }}
                      src={`http://app.frozenwala.com/${product.item_photo}`}
                      alt={product.title}
                    />
                    {product.stock === 0 && (
                      <img
                        src="https://png.pngtree.com/png-clipart/20190401/ourlarge/pngtree-sold-out-png-image_859393.jpg"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          borderRadius: 20,
                        }}
                        alt="Sold Out"
                      />
                    )}
                    <div
                      className="badge bg-danger p-2"
                      style={{ position: "absolute", top: 10, left: 10 }}
                    >
                      <i className="fas fa-tag me-2 fs-0"></i>
                      <span className="fs-0">{product.discount}% off</span>
                    </div>
                    {product.most_popular && (
                      <div
                        className="badge bg-soft-success p-2"
                        style={{ position: "absolute", bottom: 10, left: 10 }}
                      >
                        <span className="fw-bold fs-1 text-success">
                          Most Popular
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="card-body ps-0">
                    <div className="d-flex align-items-center mb-3">
                      <div className="flex-1 ms-3">
                        <h5
                          className="mb-0 fw-bold text-1000"
                          style={{
                            lineHeight: "1.5em",
                            height: "3em",
                            overflow: "hidden",
                          }}
                        >
                          {product.title}
                        </h5>
                        <span
                          className="mb-0 "
                          style={{
                            fontSize: 18,
                            fontWeight: "700",
                            color: "#79B93C",
                          }}
                        >
                          ₹{product.item_new_price}
                        </span>
                      </div>
                    </div>
                    <div>
                      {product.stock === 0 ? (
                        <button
                          className="badge bg-soft-success p-2"
                          style={{ borderWidth: 0, cursor: "not-allowed" }}
                          type="button"
                          disabled
                        >
                          <span className="fw-bold fs-1 text-success">
                            Sold Out
                          </span>
                        </button>
                      ) : (
                        <>
                          {cartItems[product.id] ? (
                            <div className="badge bg-soft-success p-2" style={{alignItems:"center"}}>
                          <button onClick={() => subOne(product.id)} style={{borderWidth:0, fontSize:24, backgroundColor:"transparent"}}>-</button>
                          <span style={{color:"black", fontSize:18, }}>{cartItems[product.id]}</span>
                          <button onClick={() => addOne(product.id)} style={{borderWidth:0, fontSize:24, backgroundColor:"transparent"}}>+</button>
                        </div>
                          ) : (
                            <button
                          className="badge bg-soft-success p-2"
                          style={{ borderWidth: 0 }}
                          type="button"
                          onClick={() => onPressAddToCart(product.id)}
                        >
                          <span className="fw-bold fs-1 text-success">
                            + Add to cart
                          </span>
                        </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Product;
