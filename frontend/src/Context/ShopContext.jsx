import React, { useState, createContext, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_products, setAll_Products] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [loading, setLoading] = useState(false); // Loader state

  const url = "https://shoppy-ecommerce-website-backend.onrender.com";

  useEffect(() => {
    setLoading(true); // Start loader
    fetch(`${url}/allproducts`)
      .then((response) => response.json())
      .then((data) => setAll_Products(data))
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setLoading(false)); // Stop loader

    if (localStorage.getItem("auth-token")) {
      setLoading(true); // Start loader for cart fetch
      fetch(`${url}/getcart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data))
        .catch((error) => console.error("Error fetching cart:", error))
        .finally(() => setLoading(false)); // Stop loader
    }
  }, []);

  const addToCart = (itemId) => {
    if (!localStorage.getItem("auth-token")) {
      alert("Please login to add products to the cart.");
      return;
    }

    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    fetch(`${url}/addtocart`, {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "auth-token": `${localStorage.getItem("auth-token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId: itemId }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error adding to cart:", error));
  };

  const removeFromCart = (itemId) => {
    if (!localStorage.getItem("auth-token")) {
      alert("Please login to modify your cart.");
      return;
    }

    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    fetch(`${url}/removefromcart`, {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "auth-token": `${localStorage.getItem("auth-token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId: itemId }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error removing from cart:", error));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let cartInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        totalAmount += cartInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const ContextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    loading,
  };

  return (
    <ShopContext.Provider value={ContextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
