import React, { useEffect, useState } from 'react';
import Api from '../Utills/Api';

const QuantityButton = ({ product, getTotalPrice, onPressAddToCart }) => {
  const [quantity, setQuantity] = useState(0);
  const [stock, setStock] = useState();

  const getQuantity = async () => {
    try {
      const uid = localStorage.getItem("user_id");
      const response = await Api.get(
        `get_cart/main/?user_id=${uid}&&product_id=${product.id}`
      );
      setQuantity(response.data.quantity);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const getStock = async () => {
    try {
      const response = await Api.get(`stock/?product_id=${product.id}`);
      setStock(response.data[0].openingstock);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    getStock();
    getQuantity();
  }, []);

  const handlePress = () => {
    if (quantity === 0) {
      getTotalPrice();
      onPressAddToCart(product);
      setQuantity(1);
    }
  };

  const addOne = async (id) => {
    try {
      const uid = localStorage.getItem("user_id");
      if (stock > quantity) {
        await Api.post(`increase/main/`, {
          product_id: id,
          user_id: uid,
        });
        getQuantity();
        getTotalPrice();
        // You may replace the toast with a notification component or similar in React.js
        alert('Quantity increased');
      } else if (stock === quantity) {
        alert(`Only ${stock} available. You cannot add more.`);
      }
    } catch (error) {
      console.log('Error:', error);
      // You may handle errors differently in React.js, such as displaying an error message to the user
    }
  };

  const subOne = async (id) => {
    try {
      const uid = localStorage.getItem("user_id");
      if (quantity > 1) {
        await Api.post(`decrease/main/`, {
          product_id: id,
          user_id: uid,
        });
        getQuantity();
        getTotalPrice();
        alert('Quantity decreased');
      } else if (quantity === 1) {
        await Api.post(`decrease/main/`, {
          product_id: id,
          user_id: uid,
        });
        setQuantity(0);
        getTotalPrice();
        alert('Quantity decreased');
      }
    } catch (error) {
      console.log('Error:', error);
      alert('Failed to decrease quantity');
    }
  };

  return (
    <div>
      {quantity > 0 ? (
        <div style={styles.add}>
          <button onClick={() => subOne(product.id)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => addOne(product.id)}>+</button>
        </div>
      ) : (
        <button style={styles.add} onClick={handlePress}>
          + Add
        </button>
      )}
    </div>
  );
};

export default QuantityButton;

const styles = {
  add: {
    backgroundColor: '#FF4D00',
    padding: '10px',
    borderRadius: '6px',
  },
};
